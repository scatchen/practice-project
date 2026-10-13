#!/usr/bin/env node

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const { performance } = require("node:perf_hooks");

const projectRoot = path.resolve(__dirname, "..");
const casesPath = path.join(__dirname, "image-search-cases.json");
const libraryPath = path.join(projectRoot, "data", "imageLibrary.js");
const baselinePath = path.join(__dirname, "image-search-baseline.json");

function fail(message) {
    console.error(`ERROR: ${message}`);
    process.exit(1);
}

function loadOfficialSearchFunction() {
    const source = fs.readFileSync(libraryPath, "utf8");
    const context = vm.createContext({
        module: { exports: {} },
        console: { log() {}, warn() {}, error() {} },
    });
    const sourceWithTestAccess = `${source}\n;globalThis.__officialGetDiagramInfo = getDiagramInfo;`;

    new vm.Script(sourceWithTestAccess, { filename: libraryPath }).runInContext(context);

    if (typeof context.__officialGetDiagramInfo !== "function") {
        fail("Could not access the project's getDiagramInfo(question) function.");
    }

    if (!Array.isArray(context.module.exports)) {
        fail("data/imageLibrary.js did not export the expected diagram array.");
    }

    return {
        getDiagramInfo: context.__officialGetDiagramInfo,
        diagrams: context.module.exports,
    };
}

function validateCases(cases, diagrams) {
    if (!Array.isArray(cases)) fail("The test case JSON must contain an array.");

    const expectedFields = [
        "testId",
        "topicId",
        "language",
        "question",
        "expectedImageId",
        "queryType",
        "suite",
    ];
    const testIds = new Set();
    const questions = new Set();
    const diagramIds = new Set(diagrams.map((item) => item.id));
    const topics = new Map();
    let englishCount = 0;
    let chineseCount = 0;

    for (const [index, testCase] of cases.entries()) {
        for (const field of expectedFields) {
            if (!(field in testCase)) fail(`Case ${index + 1} is missing field "${field}".`);
        }

        if (typeof testCase.testId !== "string" || !testCase.testId.trim()) {
            fail(`Case ${index + 1} has an invalid testId.`);
        }
        if (testIds.has(testCase.testId)) fail(`Duplicate testId: ${testCase.testId}`);
        testIds.add(testCase.testId);

        if (typeof testCase.question !== "string" || !testCase.question.trim()) {
            fail(`Case ${testCase.testId} has an empty or invalid question.`);
        }
        if (questions.has(testCase.question)) fail(`Duplicate question text: ${testCase.question}`);
        questions.add(testCase.question);

        if (testCase.language === "en") englishCount += 1;
        else if (testCase.language === "zh-TW") chineseCount += 1;
        else fail(`Case ${testCase.testId} has unsupported language "${testCase.language}".`);

        if (!diagramIds.has(testCase.topicId)) {
            fail(`Case ${testCase.testId} has unknown topicId "${testCase.topicId}".`);
        }
        if (!diagramIds.has(testCase.expectedImageId)) {
            fail(`Case ${testCase.testId} has unknown expectedImageId "${testCase.expectedImageId}".`);
        }
        if (testCase.topicId !== testCase.expectedImageId) {
            fail(`Case ${testCase.testId} has different topicId and expectedImageId.`);
        }
        if (testCase.suite !== "real-life-200") {
            fail(`Case ${testCase.testId} is outside the real-life-200 suite.`);
        }

        const topic = topics.get(testCase.topicId) || { en: 0, "zh-TW": 0 };
        topic[testCase.language] += 1;
        topics.set(testCase.topicId, topic);
    }

    if (cases.length !== 200) fail(`Expected 200 cases; found ${cases.length}.`);
    if (englishCount !== 100) fail(`Expected 100 English cases; found ${englishCount}.`);
    if (chineseCount !== 100) fail(`Expected 100 Traditional Chinese cases; found ${chineseCount}.`);
    if (topics.size !== 20) fail(`Expected 20 topics; found ${topics.size}.`);

    for (const [topicId, counts] of topics) {
        if (counts.en !== 5 || counts["zh-TW"] !== 5) {
            fail(`Topic ${topicId} must have 5 English and 5 zh-TW cases.`);
        }
    }

    return { englishCount, chineseCount, topics };
}

function evaluateCases(cases, getDiagramInfo) {
    // Warm up the same production function, but exclude these calls from timing.
    for (let index = 0; index < 25; index += 1) {
        getDiagramInfo(cases[index % cases.length].question);
    }

    const durationsMs = [];
    const results = cases.map((testCase) => {
        let results;
        let startedAt;
        let elapsedMs;
        try {
            startedAt = performance.now();
            results = getDiagramInfo(testCase.question);
            elapsedMs = performance.now() - startedAt;
        } catch (error) {
            fail(`Search failed for ${testCase.testId}: ${error.message}`);
        }
        durationsMs.push(elapsedMs);

        if (!Array.isArray(results)) {
            fail(`getDiagramInfo returned a non-array for ${testCase.testId}.`);
        }

        const actualTop3 = results.map((item) => {
            if (!item || typeof item.id !== "string") {
                fail(`A search result for ${testCase.testId} has no string id field.`);
            }
            return item.id;
        });

        return {
            ...testCase,
            actualTop3,
            actualTop1: actualTop3[0] || null,
            top1Pass: actualTop3[0] === testCase.expectedImageId,
            top3Pass: actualTop3.includes(testCase.expectedImageId),
            noResult: actualTop3.length === 0,
        };
    });

    return { results, durationsMs };
}

function rate(results, predicate) {
    const selected = results.filter(predicate);
    const top1 = selected.filter((result) => result.top1Pass).length;
    const top3 = selected.filter((result) => result.top3Pass).length;
    return { count: selected.length, top1, top3 };
}

function formatRate(count, total) {
    const percentage = total === 0 ? "0.0" : ((count / total) * 100).toFixed(1);
    return `${count}/${total} (${percentage}%)`;
}

function printSummary(label, counts) {
    console.log(`${label}: Top-1 ${formatRate(counts.top1, counts.count)} | Top-3 ${formatRate(counts.top3, counts.count)}`);
}

function sha256(content) {
    return crypto.createHash("sha256").update(content).digest("hex");
}

function percentile(sortedValues, percentileValue) {
    if (sortedValues.length === 0) return 0;
    const index = Math.ceil(percentileValue * sortedValues.length) - 1;
    return sortedValues[Math.max(0, Math.min(index, sortedValues.length - 1))];
}

function summarizePerformance(durationsMs) {
    const sorted = [...durationsMs].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0
        ? (sorted[middle - 1] + sorted[middle]) / 2
        : sorted[middle];
    return {
        sampleCount: sorted.length,
        averageMs: sorted.reduce((sum, value) => sum + value, 0) / sorted.length,
        medianMs: median,
        p95Ms: percentile(sorted, 0.95),
        maxMs: sorted[sorted.length - 1],
        warmupCalls: 25,
    };
}

function gitCommitSha() {
    try {
        return execFileSync("git", ["rev-parse", "HEAD"], {
            cwd: projectRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
        }).trim();
    } catch {
        return null;
    }
}

function baselineSummary(results, predicate) {
    const selected = results.filter(predicate);
    return {
        count: selected.length,
        top1: selected.filter((result) => result.top1Pass).length,
        top3: selected.filter((result) => result.top3Pass).length,
        noResult: selected.filter((result) => result.noResult).length,
    };
}

function currentSummary(results, predicate) {
    const selected = results.filter(predicate);
    return {
        count: selected.length,
        top1: selected.filter((result) => result.top1Pass).length,
        top3: selected.filter((result) => result.top3Pass).length,
        noResult: selected.filter((result) => result.noResult).length,
    };
}

function percentagePointChange(current, baseline, total) {
    if (total === 0) return "0.0 pp";
    return `${(((current - baseline) / total) * 100).toFixed(1)} pp`;
}

function printCurrentResults(results, validation, performanceSummary) {
    console.log("SMART IMAGE SEARCH TEST RESULTS");
    console.log(`Cases: ${results.length} | English: ${validation.englishCount} | Traditional Chinese: ${validation.chineseCount} | Topics: ${validation.topics.size}`);
    console.log("All cases call the project's getDiagramInfo(question) from data/imageLibrary.js.");
    console.log("");

    printSummary("English", rate(results, (result) => result.language === "en"));
    printSummary("Traditional Chinese", rate(results, (result) => result.language === "zh-TW"));
    printSummary("Overall", rate(results, () => true));
    console.log(`NO RESULT: ${results.filter((result) => result.noResult).length}`);
    console.log("");

    console.log("PER-TOPIC ACCURACY");
    for (const [topicId] of validation.topics) {
        const counts = rate(results.filter((result) => result.topicId === topicId), () => true);
        console.log(`${topicId}: Top-1 ${formatRate(counts.top1, counts.count)} | Top-3 ${formatRate(counts.top3, counts.count)}`);
    }

    const failures = results.filter((result) => !result.top1Pass);
    console.log("");
    console.log(`TOP-1 FAILURES (${failures.length})`);
    if (failures.length === 0) console.log("None");
    for (const result of failures) {
        console.log(`- ${result.testId}`);
        console.log(`  question: ${result.question}`);
        console.log(`  expectedImageId: ${result.expectedImageId}`);
        console.log(`  actualTop1: ${result.actualTop1 || "NO RESULT"}`);
        console.log(`  actualTop3: ${result.actualTop3.length ? result.actualTop3.join(", ") : "NO RESULT"}`);
    }

    console.log("");
    console.log("SEARCH FUNCTION TIMING (Node.js only; excludes startup, file reads, VM setup, output, and LM Studio)");
    console.log(`Node.js: ${process.version} | Warm-up calls excluded: ${performanceSummary.warmupCalls} | Samples: ${performanceSummary.sampleCount}`);
    console.log(`Average: ${performanceSummary.averageMs.toFixed(4)} ms | Median: ${performanceSummary.medianMs.toFixed(4)} ms | P95: ${performanceSummary.p95Ms.toFixed(4)} ms | Max: ${performanceSummary.maxMs.toFixed(4)} ms`);
}

function createBaseline(results, performanceSummary, casesHash, diagrams) {
    const summary = {
        overall: baselineSummary(results, () => true),
        english: baselineSummary(results, (result) => result.language === "en"),
        traditionalChinese: baselineSummary(results, (result) => result.language === "zh-TW"),
    };

    return {
        schemaVersion: 1,
        createdAt: new Date().toISOString(),
        gitCommitSha: gitCommitSha(),
        nodeVersion: process.version,
        diagramCount: diagrams.length,
        testCasesSha256: casesHash,
        testCount: results.length,
        summary,
        performance: performanceSummary,
        results: results.map((result) => ({
            testId: result.testId,
            topicId: result.topicId,
            language: result.language,
            expectedImageId: result.expectedImageId,
            actualTop3: result.actualTop3,
            top1Pass: result.top1Pass,
            top3Pass: result.top3Pass,
            noResult: result.noResult,
        })),
    };
}

function saveBaseline(baseline) {
    try {
        fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`, {
            encoding: "utf8",
            flag: "wx",
        });
    } catch (error) {
        if (error.code === "EEXIST") {
            fail("Baseline already exists; refusing to overwrite tests/image-search-baseline.json.");
        }
        fail(`Could not create baseline: ${error.message}`);
    }
    console.log(`Baseline created: ${path.relative(projectRoot, baselinePath)}`);
}

function loadAndValidateBaseline(casesHash, cases) {
    if (!fs.existsSync(baselinePath)) {
        fail("Baseline does not exist. Run with --save-baseline once to create it.");
    }

    let baseline;
    try {
        baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
    } catch (error) {
        fail(`Could not read or parse baseline: ${error.message}`);
    }

    if (baseline.testCasesSha256 !== casesHash) {
        fail(`Test case SHA-256 mismatch; comparison stopped. Baseline: ${baseline.testCasesSha256}; current: ${casesHash}`);
    }
    if (!Array.isArray(baseline.results) || baseline.results.length !== cases.length) {
        fail("Baseline result count does not match the fixed test case count; comparison stopped.");
    }

    const baselineById = new Map(baseline.results.map((result) => [result.testId, result]));
    for (const testCase of cases) {
        const previous = baselineById.get(testCase.testId);
        if (!previous || previous.expectedImageId !== testCase.expectedImageId) {
            fail(`Baseline case mismatch at ${testCase.testId}; comparison stopped.`);
        }
    }
    return baseline;
}

function printComparison(baseline, currentResults, cases) {
    const previousById = new Map(baseline.results.map((result) => [result.testId, result]));
    const currentById = new Map(currentResults.map((result) => [result.testId, result]));
    const transitions = {
        failToPass: [],
        passToFail: [],
        lowerRankToFirst: [],
        firstDroppedOutOfTop3: [],
        newNoResult: [],
        resolvedNoResult: [],
    };

    for (const testCase of cases) {
        const previous = previousById.get(testCase.testId);
        const current = currentById.get(testCase.testId);
        if (!previous.top1Pass && current.top1Pass) transitions.failToPass.push(testCase.testId);
        if (previous.top1Pass && !current.top1Pass) transitions.passToFail.push(testCase.testId);
        const oldRank = previous.actualTop3.indexOf(testCase.expectedImageId) + 1;
        if (oldRank > 1 && current.actualTop1 === testCase.expectedImageId) transitions.lowerRankToFirst.push(testCase.testId);
        if (previous.top1Pass && !current.top3Pass) transitions.firstDroppedOutOfTop3.push(testCase.testId);
        if (!previous.noResult && current.noResult) transitions.newNoResult.push(testCase.testId);
        if (previous.noResult && !current.noResult) transitions.resolvedNoResult.push(testCase.testId);
    }

    const compareGroup = (label, predicate) => {
        const old = baselineSummary(baseline.results, predicate);
        const now = currentSummary(currentResults, predicate);
        console.log(`${label}:`);
        console.log(`  Baseline Top-1 ${formatRate(old.top1, old.count)} | Top-3 ${formatRate(old.top3, old.count)}`);
        console.log(`  Current  Top-1 ${formatRate(now.top1, now.count)} (${percentagePointChange(now.top1, old.top1, old.count)}) | Top-3 ${formatRate(now.top3, now.count)} (${percentagePointChange(now.top3, old.top3, old.count)})`);
    };

    console.log("BASELINE COMPARISON");
    compareGroup("English", (result) => result.language === "en");
    compareGroup("Traditional Chinese", (result) => result.language === "zh-TW");
    compareGroup("Overall", () => true);
    console.log("");

    const printIds = (label, ids) => console.log(`${label} (${ids.length}): ${ids.length ? ids.join(", ") : "None"}`);
    printIds("Fail → Pass", transitions.failToPass);
    printIds("Pass → Fail", transitions.passToFail);
    printIds("Rank 2/3 → Rank 1", transitions.lowerRankToFirst);
    printIds("Previously Rank 1, now outside Top-3", transitions.firstDroppedOutOfTop3);
    printIds("New NO RESULT", transitions.newNoResult);
    printIds("NO RESULT resolved", transitions.resolvedNoResult);
    console.log("");

    console.log("PER-TOPIC CHANGE (Top-1 / Top-3 percentage points)");
    const topicIds = [...new Set(cases.map((testCase) => testCase.topicId))];
    for (const topicId of topicIds) {
        const predicate = (result) => result.topicId === topicId;
        const old = baselineSummary(baseline.results, predicate);
        const now = currentSummary(currentResults, predicate);
        console.log(`${topicId}: Top-1 ${formatRate(old.top1, old.count)} → ${formatRate(now.top1, now.count)} (${percentagePointChange(now.top1, old.top1, old.count)}); Top-3 ${formatRate(old.top3, old.count)} → ${formatRate(now.top3, now.count)} (${percentagePointChange(now.top3, old.top3, old.count)})`);
    }

    console.log("");
    console.log(`Baseline created: ${baseline.createdAt} | commit: ${baseline.gitCommitSha || "unavailable"} | Node: ${baseline.nodeVersion} | diagrams: ${baseline.diagramCount}`);
}

function main() {
    const args = process.argv.slice(2);
    const mode = args.length === 0 ? "run" : args.length === 1 ? args[0] : "invalid";
    if (!["run", "--save-baseline", "--compare-baseline"].includes(mode)) {
        fail("Usage: node tests/run-image-search-tests.js [--save-baseline | --compare-baseline]");
    }
    if (mode === "--save-baseline" && fs.existsSync(baselinePath)) {
        fail("Baseline already exists; refusing to overwrite tests/image-search-baseline.json.");
    }

    let cases;
    try {
        cases = JSON.parse(fs.readFileSync(casesPath, "utf8"));
    } catch (error) {
        fail(`Could not read or parse ${path.relative(projectRoot, casesPath)}: ${error.message}`);
    }

    const casesHash = sha256(fs.readFileSync(casesPath));
    const baseline = mode === "--compare-baseline"
        ? loadAndValidateBaseline(casesHash, cases)
        : null;

    const { getDiagramInfo, diagrams } = loadOfficialSearchFunction();
    const validation = validateCases(cases, diagrams);
    const { results, durationsMs } = evaluateCases(cases, getDiagramInfo);
    const performanceSummary = summarizePerformance(durationsMs);
    printCurrentResults(results, validation, performanceSummary);

    if (mode === "--save-baseline") {
        saveBaseline(createBaseline(results, performanceSummary, casesHash, diagrams));
    } else if (mode === "--compare-baseline") {
        printComparison(baseline, results, cases);
    }
}

main();

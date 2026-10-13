#!/usr/bin/env node

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const vm = require("node:vm");
const { execFileSync } = require("node:child_process");

const testsDir = __dirname;
const root = path.resolve(testsDir, "..");
const casesPath = path.join(testsDir, "math-search-regression-cases.json");
const sealPath = path.join(testsDir, "math-search-regression-seal.json");
const libraryPath = path.join(root, "data", "imageLibrary.js");

function main() {
    const raw = fs.readFileSync(casesPath);
    const seal = JSON.parse(fs.readFileSync(sealPath, "utf8"));
    const hash = crypto.createHash("sha256").update(raw).digest("hex");
    if (hash !== seal.sha256) throw new Error("Math case file SHA-256 differs from its seal.");
    const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
    if (head !== seal.gitHead) throw new Error(`Git HEAD differs from seal (${head} != ${seal.gitHead}).`);

    const pack = JSON.parse(raw.toString("utf8"));
    const source = fs.readFileSync(libraryPath, "utf8");
    const context = vm.createContext({ module: { exports: {} }, console: { log() {}, warn() {}, error() {} } });
    new vm.Script(`${source}\nglobalThis.__mathTest = { search: getDiagramInfo, diagrams: diagramMap, resetIndex: () => { imageSearchIndex = null; } };`,
        { filename: libraryPath }).runInContext(context);
    const api = context.__mathTest;
    const imageIds = new Set(api.diagrams.map((item) => item.id));
    const caseIds = new Set();
    for (const testCase of pack.cases) {
        if (!testCase.caseId || caseIds.has(testCase.caseId)) throw new Error(`Missing or duplicate caseId: ${testCase.caseId}`);
        caseIds.add(testCase.caseId);
        if (!testCase.question?.trim() || !Array.isArray(testCase.expectedImageIds)) {
            throw new Error(`Invalid question/expectedImageIds in ${testCase.caseId}`);
        }
        for (const id of testCase.expectedImageIds) {
            if (!imageIds.has(id)) throw new Error(`Unknown expected image ${id} in ${testCase.caseId}`);
        }
    }
    if (pack.cases.length !== seal.cases) throw new Error("Case count differs from seal.");

    const target = api.diagrams.find((item) => item.id === "electricity-and-magnetism-basics");
    if (!target) throw new Error("Missing electricity-and-magnetism-basics.");
    const additions = ["電和磁", "電磁關係"];
    if (!additions.every((word) => target.keywords.includes(word))) {
        throw new Error("The two approved magnetism keywords are not both present.");
    }

    function evaluate() {
        return pack.cases.map((testCase) => {
            const ids = api.search(testCase.question).map((item) => item.id);
            const acceptedRank = testCase.expectedImageIds.length
                ? ids.findIndex((id) => testCase.expectedImageIds.includes(id)) + 1
                : null;
            return {
                caseId: testCase.caseId,
                question: testCase.question,
                expectedImageIds: testCase.expectedImageIds,
                top3: ids,
                top1Pass: acceptedRank === 1,
                top3Pass: acceptedRank > 0,
                acceptedRank: acceptedRank > 0 ? acceptedRank : null,
                noResult: ids.length === 0,
            };
        });
    }

    // The pre-keyword control uses the exact integrated search code and the
    // sealed diagram data, with only the two Phase 4G-9D additions removed
    // in memory. No project source is changed by this comparison.
    target.keywords = target.keywords.filter((word) => !additions.includes(word));
    api.resetIndex();
    const before = evaluate();
    target.keywords.push(...additions);
    api.resetIndex();
    const after = evaluate();

    const positives = after.filter((row) => row.expectedImageIds.length > 0);
    const summary = (rows) => ({
        cases: rows.length,
        expectedCases: rows.filter((row) => row.expectedImageIds.length > 0).length,
        top1: rows.filter((row) => row.expectedImageIds.length > 0 && row.top1Pass).length,
        top3: rows.filter((row) => row.expectedImageIds.length > 0 && row.top3Pass).length,
        noResult: rows.filter((row) => row.noResult).length,
    });
    const beforeById = new Map(before.map((row) => [row.caseId, row]));
    const changes = after.filter((row) => {
        const old = beforeById.get(row.caseId);
        return JSON.stringify(old.top3) !== JSON.stringify(row.top3) ||
            old.top1Pass !== row.top1Pass || old.top3Pass !== row.top3Pass || old.noResult !== row.noResult;
    }).map((row) => ({ before: beforeById.get(row.caseId), after: row }));

    const c012 = api.search("電和磁之間有什麼關係？").map((item) => item.id);
    console.log(JSON.stringify({
        suite: seal.suite,
        seal: { sha256: hash, gitHead: head, createdAt: seal.createdAt, cases: pack.cases.length },
        diagramCount: api.diagrams.length,
        mathImageCoverage: `${seal.mathImagesCovered}/${seal.mathImageCount}`,
        beforeKeywords: summary(before),
        afterKeywords: summary(after),
        c012Top3After: c012,
        changedCases: changes,
        cases: after,
    }, null, 2));
}

try {
    main();
} catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exitCode = 1;
}

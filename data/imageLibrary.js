
const diagramMap = [
    {
    id: "triangle-exterior-angle",

    title: "外角定理",

    keywords: [
        "外角定理",
        "外角",
        "三角形外角",
        "外角和",
        "三角形內角",
        "延長線"
    ],

    file: "images/geometry/triangle-exterior-angle.png",

    alt: "外角定理圖",

    category: "geometry",

    grade: 8,

    chapter: "三角形",

    concept: "三角形外角定理",

    difficulty: 1,

    related: [
        "pythagorean"
    ]
},
    {
    id: "pythagorean",

    title: "畢氏定理",

    keywords: [
        "畢氏定理",
        "勾股定理",
        "直角三角形",
        "斜邊",
        "平方和",
        "3 4 5",
        "345三角形",

        "股",
        "弦",
        "股平方",
        "斜邊平方"
    ],

    file: "images/geometry/pythagorean.png",

    alt: "畢氏定理圖",

    category: "geometry",

    grade: 8,

    chapter: "三角形",

    concept: "畢氏定理",

    difficulty: 2,

    related: [
        "triangle-exterior-angle"
    ]
},
{
    id: "pythagorean-theorem-2",

    title: "畢氏定理（完整教學）",

    keywords: [
        "畢氏定理",
        "畢氏",
        "勾股定理",
        "勾股",
        "直角三角形",
        "斜邊",
        "兩股",
        "畢氏數",
        "3 4 5",
        "三角形是直角三角形"
    ],

    file: "images/geometry/pythagorean-theorem-2.png",

    alt: "畢氏定理完整教學圖，包含公式、直角三角形、三四五範例與常見畢氏數",

    category: "geometry",

    grade: 8,

    chapter: "幾何與尺規作圖",

    concept: "畢氏定理",

    difficulty: 2,

    related: [
        "pythagorean"
    ]
},
{
    id: "proportional-segments-parallel-lines",

    title: "比例線段",

    keywords: [
        "比例線段",
        "平行線截線段",
        "平行線",
        "截線段",
        "三條平行線",
        "兩條截線",
        "AB:BC",
        "DE:EF"
    ],

    file: "images/geometry/proportional-segments-parallel-lines.png",

    alt: "比例線段（平行線截線段）",

    category: "geometry",

    grade: 9,

    chapter: "比例線段",

    concept: "平行線截線段成比例",

    difficulty: 2,

    related: []
},
{
    id: "triangle-proportional-segments",

    title: "三角形比例線段",

    keywords: [
        "比例線段",
        "截線段",
        "平行線",
        "三角形比例",
        "相似三角形",
        "DE平行BC"
    ],

    file: "images/geometry/triangle-proportional-segments.png",
    alt: "三角形比例線段（平行線截線）",

    category: "geometry",
    grade: 9,

    chapter: "比例線段",

    concept: "三角形比例線段（平行線截線）",

    difficulty: 2,

    related: [
    "proportional-segments-parallel-lines"
]
},
{
    id: "triangle-angle-sum",

    title: "三角形內角和",

    keywords: [
        "三角形",
        "內角和",
        "三角形內角和",
        "角度",
        "180度",
        "三角形角度",
        "已知兩角求第三角"
    ],

    file: "images/geometry/triangle-angle-sum.png",

    alt: "三角形三個內角 A、B、C 的和為 180 度",

    category: "geometry",

    grade: 7,

    chapter: "三角形",

    concept: "三角形內角和",

    difficulty: 1,

    related: []
},
{
    id: "parallel-lines-transversal-angles",

    title: "平行線與截線的角關係",

    keywords: [
        "平行線",
        "截線",
        "平行線與截線",
        "同位角",
        "內錯角",
        "同側內角",
        "角關係",
        "平行線判定",
        "兩直線平行"
    ],

    file: "images/geometry/parallel-lines-transversal-angles.png",

    alt: "兩條平行線被一條截線所截，顯示同位角、內錯角與同側內角的關係",

    category: "geometry",

    grade: 7,

    chapter: "線與角",

    concept: "平行線與截線的角關係",

    difficulty: 2,

    related: []
},
{
    id: "triangle-congruence",

    title: "三角形全等",

    keywords: [
        "三角形全等",
        "全等三角形",
        "全等",
        "SSS",
        "SAS",
        "ASA",
        "AAS",
        "HL",
        "對應邊",
        "對應角",
        "全等判定",
        "三角形全等判定"
    ],

    file: "images/geometry/triangle-congruence.png",

    alt: "三角形全等及全等三角形判定條件",

    category: "geometry",

    grade: 8,

    chapter: "幾何與尺規作圖",

    concept: "三角形全等與全等判定",

    difficulty: 2,

    related: []
},
{
    id: "triangle-similarity",

    title: "三角形相似",

    keywords: [
        "三角形相似",
        "相似三角形",
        "相似",
        "相似三角形判定",
        "AA",
        "SAS",
        "SSS",
        "對應角",
        "對應邊",
        "對應邊成比例",
        "相似比"
    ],

    file: "images/geometry/triangle-similarity.png",

    alt: "三角形相似，顯示對應角相等與對應邊成比例",

    category: "geometry",

    grade: 8,

    chapter: "幾何與尺規作圖",

    concept: "三角形相似與相似判定",

    difficulty: 2,

    related: [
        "triangle-congruence"
    ]
},
];

// ================================
// 智慧圖庫搜尋
// ================================

function normalizeKeyword(keyword) {

    keyword = keyword.trim();
    keyword = keyword.replace(/\s+/g, "");
    keyword = keyword.toLowerCase();

    return keyword;

}

function calculateScore(item, keyword) {

    let score = 0;

    if (item.title.includes(keyword)) {

    score += 10;

    }

    if (item.concept.includes(keyword)) {

    score += 8;

    }

    if (item.keywords.some(word => word.includes(keyword))) {

    score += 5;

    }

    return score;

}

function filterResults(scoredResults, minScore, limit) {

    const finalResults = [];

    scoredResults.forEach(result => {

        if (result.score >= minScore) {

            finalResults.push({
                ...result.item,
                score: result.score
            });

        }

    });

    return finalResults.slice(0, limit);

}

function sortResults(scoredResults) {

    scoredResults.sort((a, b) => b.score - a.score);

    return scoredResults;

}

function searchImage(keyword) {

    const limit = 3;
    const minScore = 5;

    keyword = normalizeKeyword(keyword);

    if (!keyword) {

        return [];

    }

    const results = [];
    let scoredResults = [];

    diagramMap.forEach(item => {

        const matched =
            item.title.includes(keyword) ||
            item.concept.includes(keyword) ||
            item.keywords.some(
                word => word.includes(keyword)
            );

        if (matched) {

            const score = calculateScore(item, keyword);

            scoredResults.push({
                item: item,
                score: score
            });

        }

    });

    scoredResults = sortResults(scoredResults);

    console.log("🔎 畢氏定理搜尋結果：", scoredResults);

    return filterResults(
        scoredResults,
        minScore,
        limit
    );

}

console.log(searchImage("畢氏"));

// 讓 Node.js 工具可以讀取智慧圖庫資料

if (typeof module !== "undefined") {

    module.exports = diagramMap;

}

function getDiagramInfo(question) {

    const text = question.toLowerCase();

    const results = [];

    for (const item of diagramMap) {

        let score = 0;

        for (const keyword of item.keywords) {

            if (text.includes(keyword.toLowerCase())) {
                score++;
            }

        }

        if (score > 0) {

            results.push({
                item: item,
                score: score
            });

        }
    }

    results.sort((a, b) => b.score - a.score);

    console.log("🖼 圖片搜尋結果：", results);

    return results
        .slice(0, 3)
        .map(result => result.item);
}

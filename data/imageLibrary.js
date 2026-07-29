
const diagramMap = [
    {
    id: "triangle-exterior-angle",

    title: "外角定理",

    keywords: [
        "外角定理",
        "外角",
        "三角形外角",
        "外角和",
        "內角",
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
}
];

// ================================
// 智慧圖庫搜尋
// ================================

function searchImage(keyword) {

    const results = [];

    diagramMap.forEach(item => {

        const matched = item.keywords.some(
            word => word.includes(keyword)
        );

        if (matched) {

            results.push(item);

        }

    });

    return results;

}

console.log(searchImage("畢氏"));

// 讓 Node.js 工具可以讀取智慧圖庫資料

if (typeof module !== "undefined") {

    module.exports = diagramMap;

}

function getDiagram(question) {

    const text = question.toLowerCase();

    let bestMatch = null;
    let bestScore = 0;

    for (const item of diagramMap) {

        let score = 0;

        for (const keyword of item.keywords) {
            if (text.includes(keyword.toLowerCase())) {
                score++;
            }
        }

        console.log(item.id, "score =", score);

        if (score > bestScore) {
            bestScore = score;
            bestMatch = item;
        }
    }

    if (bestMatch) {
        console.log("🖼 最佳圖片：", bestMatch.id);
        return bestMatch.file;
    }

    console.log("🖼 找不到圖片");
    return null;
}

function getDiagramInfo(question) {

    const text = question.toLowerCase();

    let bestItem = null;
    let bestScore = 0;

    for (const item of diagramMap) {

        let score = 0;

        for (const keyword of item.keywords) {
            if (text.includes(keyword.toLowerCase())) {
                score++;
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestItem = item;
        }
    }

    return bestItem;
}
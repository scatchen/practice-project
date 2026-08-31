
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
    id: "triangle-centers",

    title: "三角形三心：外心、內心、重心",

    keywords: [
        "三角形三心",
        "三心",
        "外心",
        "外心定義",
        "外心性質",
        "外接圓",
        "內心",
        "內心定義",
        "內心性質",
        "內切圓",
        "重心",
        "重心定義",
        "重心性質",
        "三中線",
        "中線交點",
        "角平分線交點",
        "垂直平分線交點"
    ],

    file: "images/geometry/a_clean_educational_infographic_poster_in_chinese.png",

    alt: "國中三角形三心教學圖，介紹外心、內心與重心的定義、作法、性質、外接圓、內切圓與重心二比一的分點關係",

    category: "geometry",

    grade: 8,

    chapter: "三角形",

    concept: "外心、內心與重心",

    difficulty: 2,

    related: []
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
    id: "number-line-basics",

    title: "數線基本概念",

    keywords: [
        "數線",
        "數線基本概念",
        "原點",
        "正方向",
        "正數",
        "負數",
        "單位長度",
        "數線上的點",
        "數線上的數",
        "大小比較",
        "數線大小比較",
        "數線距離",
        "距離",
        "絕對值",
        "區間",
        "整數",
        "有理數"
    ],

    file: "images/number-line/number-line-basics.png",

    alt: "數線基本概念教學圖，包含原點、正方向、單位長度、數線上的點、數值大小比較、區間與絕對值",

    category: "coordinate",

    grade: 7,

    chapter: "數與數線",

    concept: "數線、原點、正方向、大小比較、距離與絕對值",

    difficulty: 1,

    related: [
        "coordinate-plane-basics"
    ]
},
{
    id: "coordinate-plane-basics",

    title: "座標平面基本概念",

    keywords: [
        "座標平面",
        "平面座標",
        "直角座標平面",
        "笛卡兒座標平面",
        "座標軸",
        "x軸",
        "x 軸",
        "y軸",
        "y 軸",
        "原點",
        "O(0,0)",
        "座標",
        "座標點",
        "點的座標",
        "有序對",
        "x座標",
        "y座標",
        "第一象限",
        "第二象限",
        "第三象限",
        "第四象限",
        "四個象限",
        "象限",
        "正半軸",
        "負半軸",
        "座標位置",
        "兩點距離",
        "座標距離"
    ],

    file: "images/coordinate/coordinate-plane-basics.png",

    alt: "座標平面基本概念教學圖，包含 x 軸、y 軸、原點、四個象限、點的座標、特殊位置與兩點距離",

    category: "coordinate",

    grade: 7,

    chapter: "座標與數線",

    concept: "座標平面、座標軸、原點、象限與點的座標",

    difficulty: 1,

    related: [
        "number-line-basics"
    ]
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
{
    id: "quadratic-function",

    title: "二次函數",

    keywords: [
        "二次函數",
        "拋物線",
        "二次函數圖形",
        "頂點",
        "對稱軸",
        "開口方向",
        "開口向上",
        "開口向下",
        "y=ax²+bx+c",
        "二次函數頂點",
        "二次函數對稱軸"
    ],

    file: "images/function/quadratic-function.png",

    alt: "二次函數的拋物線圖形，顯示頂點、對稱軸與開口方向",

    category: "function",

    grade: 9,

    chapter: "二次函數",

    concept: "二次函數的圖形與基本性質",

    difficulty: 2,

    related: [
        "linear-function"
    ]
},
{
    id: "quadratic-function-vertex-form",

    title: "二次函數頂點式",

    keywords: [
        "二次函數",
        "二次函數頂點式",
        "頂點式",
        "y=a(x-h)^2+k",
        "拋物線",
        "頂點",
        "對稱軸",
        "開口方向",
        "平移",
        "h k"
    ],

    file: "images/function/quadratic-function-vertex-form.png",

    alt: "二次函數頂點式 y=a(x-h)^2+k 的拋物線圖形，包含頂點、對稱軸、開口方向與截距",

    category: "function",

    grade: 9,

    chapter: "二次函數",

    concept: "二次函數頂點式、頂點與圖形平移",

    difficulty: 2,

    related: [
        "quadratic-function"
    ]
},
{
    id: "quadratic-function-graph-parameters",

    title: "二次函數圖形判讀：a、h、k 的影響",

    keywords: [
        "二次函數",
        "二次函數圖形",
        "頂點式",
        "y=a(x-h)^2+k",
        "a h k",
        "a的影響",
        "h的影響",
        "k的影響",
        "開口方向",
        "開口大小",
        "寬窄",
        "左右平移",
        "上下平移",
        "頂點",
        "對稱軸",
        "拋物線",
        "圖形判讀"
    ],

    file: "images/function/quadratic-function-graph-parameters.png",

    alt: "二次函數頂點式 y=a(x-h)^2+k 中 a、h、k 對拋物線開口方向、寬窄與平移影響的教學圖",

    category: "function",

    grade: 9,

    chapter: "二次函數",

    concept: "二次函數頂點式中 a、h、k 對圖形的影響",

    difficulty: 2,

    related: [
        "quadratic-function",
        "quadratic-function-vertex-form"
    ]
},
{
    id: "quadratic-function-roots-discriminant",

    title: "二次函數與 x 軸的交點、根與判別式",

    keywords: [
        "二次函數",
        "二次函數圖形",
        "判別式",
        "Δ",
        "判別式Δ",
        "b²-4ac",
        "b^2-4ac",
        "x軸交點",
        "x 軸交點",
        "實數根",
        "實根",
        "兩個交點",
        "一個交點",
        "沒有交點",
        "兩個實數根",
        "一個重根",
        "沒有實數根",
        "拋物線",
        "相切",
        "二次方程式的根",
        "根的個數"
    ],

    file: "images/function/quadratic-function-roots-discriminant.png",

    alt: "二次函數與 x 軸交點、方程式的根與判別式 Δ=b²-4ac 的關係，包含兩個交點、一個交點與沒有交點三種情況",

    category: "function",

    grade: 9,

    chapter: "二次函數",

    concept: "二次函數與 x 軸的交點、方程式的根與判別式",

    difficulty: 2,

    related: [
        "quadratic-function",
        "quadratic-function-vertex-form",
        "quadratic-function-graph-parameters"
    ]
},
{
    id: "quadratic-equation-methods-basics",

    title: "配方法與公式解",

    keywords: [
        "配方法",
        "配方法解方程式",
        "配方法解二次方程式",
        "完全平方",
        "完全平方形式",
        "配成完全平方",
        "公式解",
        "公式解法",
        "公式解方程式",
        "二次公式",
        "公式解二次方程式",
        "負b加減根號",
        "-b加減根號",
        "b平方減4ac",
        "b²-4ac",
        "根號b平方減4ac",
        "2a"
    ],

    file: "images/algebra/quadratic-equation-completing-square-formula.png",

    alt: "國中二次方程式配方法與公式解教學圖，包含配方法的步驟、公式解 x 等於負 b 加減根號 b 平方減 4ac 除以 2a，以及判別式的基本概念",

    category: "algebra",

    grade: 9,

    chapter: "二次方程式",

    concept: "二次方程式的配方法與公式解",

    difficulty: 3,

    related: []
},
{
    id: "exponent-laws-basics",

    title: "指數律基本公式",

    keywords: [
        "指數",
        "指數律",
        "指數法則",
        "指數運算",
        "冪",
        "冪次",
        "同底數相乘",
        "同底數相除",
        "次方的次方",
        "積的次方",
        "商的次方",
        "零次方",
        "負指數",
        "分數指數",
        "指數公式",
        "a的m次方",
        "a的n次方",
        "a^m",
        "a^n",
        "a^m乘a^n",
        "a^m除以a^n",
        "指數律整理",
        "指數律總整理"
    ],

    file: "images/algebra/exponent-laws-basics.png",

    alt: "指數律基本公式總整理，包含同底數相乘、同底數相除、次方的次方、積與商的次方、零次方、負指數與分數指數",

    category: "algebra",

    grade: 8,

    chapter: "指數律",

    concept: "指數律基本公式與指數運算",

    difficulty: 2,

    related: []
},
{
    id: "science-notation-basics",

    title: "科學記號",

    keywords: [
        "科學記號",
        "科學記號表示法",
        "科學記號寫法",
        "科學記號表示",
        "用科學記號表示",
        "數字的科學記號",
        "科學記號轉換",
        "科學記號換算",
        "科學記號大小",
        "正指數科學記號",
        "負指數科學記號"
    ],

    file: "images/algebra/science-notation-basics.png",

    alt: "國中科學記號教學圖，說明科學記號的表示法、正負指數、小數點移動方向、數字轉換與基本運算",

    category: "algebra",

    grade: 8,

    chapter: "數與數線",

    concept: "科學記號",

    difficulty: 2,

    related: []
},
{
    id: "continued-proportion-basics",

    title: "連比例",

    keywords: [
        "連比例",
        "連比例觀念",
        "連比例式",
        "連比例表示法",
        "連比例關係",
        "連比",
        "a:b:c",
        "a:b=b:c"
    ],

    file: "images/algebra/continued-proportion-basics.png",

    alt: "國中連比例觀念教學圖，說明連比例的表示方式、三個量之間的比例關係，以及利用相同倍數理解連比例",

    category: "algebra",

    grade: 9,

    chapter: "比例與連比例",

    concept: "連比例的基本觀念與表示法",

    difficulty: 2,

    related: []
},
{
    id: "radical-operations-basics",

    title: "根式的加減乘除與四則運算",

    keywords: [
        "根式",
        "根式運算",
        "根式四則運算",
        "根式的四則運算",
        "根式加法",
        "根式減法",
        "根式乘法",
        "根式除法",
        "根式的加減",
        "根式的乘除",
        "根式加減乘除",
        "根式化簡",
        "根式同類項",
        "同類根式",
        "根式相加",
        "根式相減",
        "根式相乘",
        "根式相除"
    ],

    file: "images/algebra/radical-operations-basics.png",

    alt: "國中根式的加減乘除與四則運算教學圖，說明根式化簡、同類根式的加減，以及根式乘法與除法的基本運算方法",

    category: "algebra",

    grade: 9,

    chapter: "根式的運算",

    concept: "根式的加法、減法、乘法、除法與四則運算",

    difficulty: 3,

    related: []
},
{
    id: "multiplication-formulas-basics",

    title: "乘法公式基本公式",

    keywords: [
        "乘法公式",
        "乘法公式基本公式",
        "和的平方",
        "和的平方公式",
        "差的平方",
        "差的平方公式",
        "平方差",
        "平方差公式",
        "完全平方公式",
        "(a+b)^2",
        "(a-b)^2",
        "(a+b)²",
        "(a-b)²",
        "a+b的平方",
        "a-b的平方",
        "a²+2ab+b²",
        "a²-2ab+b²",
        "a²-b²",
        "兩數和的平方",
        "兩數差的平方",
        "兩數平方差",
        "乘法公式展開",
        "乘法公式應用",
        "代數乘法公式",
        "平方公式",
        "平方差怎麼算",
        "和的平方怎麼算",
        "差的平方怎麼算"
    ],

    file: "images/algebra/multiplication-formulas-basics.png",

    alt: "國中乘法公式教學圖，包含和的平方、差的平方與平方差公式，並搭配簡單算式與展開示例",

    category: "algebra",

    grade: 8,

    chapter: "乘法公式",

    concept: "和的平方、差的平方與平方差公式",

    difficulty: 2,

    related: [
        "exponent-laws-basics"
    ]
},
{
    id: "distributive-law-basics",

    title: "分配律與逆分配律",

    keywords: [
        "分配律",
        "分配律公式",
        "分配法則",
        "乘法分配律",
        "乘法的分配律",
        "逆分配律",
        "提公因數",
        "提出公因數",
        "公因數",
        "括號",
        "去括號",
        "乘開括號",
        "括號展開",
        "分配律展開",
        "分配律應用",
        "負數分配律",
        "正負號",
        "符號變化",
        "負號乘括號",
        "負數乘括號",
        "兩個括號",
        "兩括號展開"
    ],

    file: "images/algebra/distributive-law-basics.png",

    alt: "國中分配律與逆分配律教學圖，包含負數乘括號、兩個括號展開、正負號變化與提公因數",

    category: "algebra",

    grade: 8,

    chapter: "乘法公式與多項式",

    concept: "分配律、逆分配律、括號展開、正負號與提公因數",

    difficulty: 2,

    related: [
        "multiplication-formulas-basics"
    ]
},
{
    id: "commutative-associative-laws-and-equation-solving",

    title: "交換律、結合律與等式解未知數",

    keywords: [
        "交換律",
        "交換律公式",
        "加法交換律",
        "乘法交換律",
        "交換法則",
        "結合律",
        "結合律公式",
        "加法結合律",
        "乘法結合律",
        "結合法則",
        "交換律與結合律",
        "交換結合律",
        "等式",
        "等式解未知數",
        "解未知數",
        "解方程式",
        "解一元一次方程式",
        "一次方程式",
        "移項",
        "移項法",
        "等式移項",
        "移項解方程式",
        "未知數",
        "求未知數",
        "去括號解方程式",
        "方程式移項",
        "等式兩邊",
        "等式性質",
        "加減等式性質",
        "乘除等式性質",
        "驗算"
    ],

    file: "images/algebra/commutative-associative-laws-and-equation-solving.png",

    alt: "國中交換律、結合律與等式解未知數教學圖，包含加法與乘法交換律、結合律，以及利用移項法解一元一次方程式的步驟與驗算",

    category: "algebra",

    grade: 8,

    chapter: "代數運算與一元一次方程式",

    concept: "交換律、結合律、等式性質與移項法解未知數",

    difficulty: 2,

    related: [
        "distributive-law-basics"
    ]
},
{
    id: "cross-multiplication-factoring",

    title: "十字交乘法因式分解",

    keywords: [
        "十字交乘法",
        "十字交乘",
        "十字相乘法",
        "十字交乘法因式分解",
        "十字交乘法分解",
        "二次三項式因式分解",
        "二次三項式",
        "因式分解十字交乘法",
        "十字法因式分解"
    ],

    file: "images/algebra/a_colorful_educational_infographic_poster_about_fa.png",

    alt: "國中因式分解十字交乘法教學圖，說明二次項與常數項的拆解、正負號關係、交叉相乘後相加，以及完整因式分解步驟",

    category: "algebra",

    grade: 8,

    chapter: "因式分解",

    concept: "十字交乘法因式分解二次三項式",

    difficulty: 3,

    related: []
},
{
    id: "linear-function",

    title: "一次函數",

    keywords: [
        "一次函數",
        "一次函數圖形",
        "直線",
        "線性函數",
        "斜率",
        "正斜率",
        "負斜率",
        "y截距",
        "x截距",
        "y=ax+b"
    ],

    file: "images/function/linear-function.png",

    alt: "一次函數的直線圖形，顯示斜率、x截距、y截距與直線升降方向",

    category: "function",

    grade: 9,

    chapter: "一次函數",

    concept: "一次函數的圖形、斜率與截距",

    difficulty: 2,

    related: [
        "quadratic-function"
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

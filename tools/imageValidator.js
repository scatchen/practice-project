// ======================================
// 國中數學教學助手
// V0.8 智慧圖庫 Validator
// ======================================


// ================================
// 1. 載入智慧圖庫資料
// ================================

const imageLibrary = require("../data/imageLibrary.js");

// ================================
// 必要欄位定義
// ================================

const requiredFields = [
    "id",
    "title",
    "keywords",
    "file",
    "alt",
    "category",
    "grade",
    "chapter",
    "concept",
    "difficulty",
    "related"
];


// ================================
// 檢查 ID 是否重複
// ================================

function checkDuplicateId() {

    const ids = imageLibrary.map(item => item.id);

    const duplicates = ids.filter((id, index) => {
        return ids.indexOf(id) !== index;
    });


    if (duplicates.length > 0) {

        console.log("❌ 發現重複 ID：");
        console.log([...new Set(duplicates)]);

    } else {

        console.log("✅ ID 檢查完成，沒有發現重複 ID");

    }

}

// ================================
// 檢查必要欄位
// ================================

function checkRequiredFields() {

    let hasError = false;


    imageLibrary.forEach(item => {

        const missingFields = requiredFields.filter(
            field => !(field in item)
        );


        if (missingFields.length > 0) {

            hasError = true;

            console.log("❌", item.id, "缺少欄位：");
            console.log(missingFields);

        }

    });


    if (!hasError) {

        console.log("✅ 必要欄位檢查完成，所有資料格式正確");

    }

}


// ================================
// 2. 驗證主程式
// ================================

function validateImageLibrary() {

    console.log("🔍 智慧圖庫驗證開始");

    console.log("目前圖片數量：", imageLibrary.length);

    checkDuplicateId();

    checkRequiredFields();

}


// ================================
// 3. 執行驗證
// ================================

validateImageLibrary();
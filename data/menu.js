/**
 * ============================================================
 * MENU DATA
 * ============================================================
 * This is the ONLY file you need to edit to change what the
 * restaurant sells: categories, products, and extras.
 * Nothing here depends on HTML — add or remove items freely.
 * ============================================================
 */

// ------------------------------------------------------------
// CATEGORIES
// order: controls the position in the category bar
// icon:  a single emoji shown next to the category name
// ------------------------------------------------------------
const categories = [
     { id: "sals", name: "عروض",       icon: "🍗", order: 1 },
     { id: "skhn_wmndy", name: "سخن ومندي",       icon: "🍗", order: 2 },
    { id: "mshwyat",    name: "مشويات",   icon: "🥪", order: 3 },
    { id: "frayd_tshykn", name: "فرايد تشيكن",      icon: "🍢", order: 4 },
    { id: "sandwtshat",   name: "ساندوتشات",       icon: "🍛", order: 5 },
    { id: "crepe",         name: "كريبات",        icon: "🌯", order: 6 },
    { id: "sory",        name: "سوري",     icon: "🥤", order: 7 },
    { id: "extras",        name: "مقبلات",      icon: "🍟", order: 8 },
    { id: "nsf_tjhyz",        name: "نصف تجهيز",      icon: "🍟", order: 9 }
];

// ------------------------------------------------------------
// REUSABLE EXTRA GROUPS
// A product references a group by id in its `extraGroups` array.
// `type: "single"`   -> radio buttons  (choose exactly one)
// `type: "multiple"` -> checkboxes     (choose zero or more)
// ------------------------------------------------------------
const extraGroups = {
    sauces: {
        id: "sauces",
        title: "اضافات",
        type: "multiple",
        options: [
            { id: "extra-garlic",    name: "ثوميه",   price: 7.5 },
            { id: "extra-ketchup",   name: "كاتشب",     price: 10 },
            { id: "extra-bbq",       name: "كوكتيل صوص", price: 5 },
            { id: "extra-cheese",    name: "كولسلو",       price: 7.5 },
            { id: "extra-cheese",    name: "قطعه بروست",       price: 45 },
            { id: "extra-cheese",    name: "قطعه استريبس",       price: 20 },
            { id: "salad-friz",    name: "سلطه خضراء",   price: 10 },
            { id: "tehena-friz",    name: "طحينه",   price: 5 },
            { id: "PASMATY-friz",    name: "ارز بسمتي",   price: 30 },
            { id: "makarona-friz",    name: "مكرونه",   price: 30 }
        ]
    },
    saucesPlus: {
        id: "saucesPlus",
        title: "اضافات",
        type: "multiple",
        options: [
            { id: "Plus-friz",    name: "بطاطس",   price: 25 },
            { id: "salad-friz",    name: "سلطه خضراء",   price: 10 },
            { id: "tehena-friz",    name: "طحينه",   price: 5 },
            { id: "Plus-garlic",    name: "تيكساس",   price: 15 },
            { id: "Plus-ketchup",   name: "باربيكيو",     price: 10 },
            { id: "Plus-bbq",       name: "رانش", price: 30 },
            { id: "Plus-cheese",    name: "صوص جبنه",       price: 20 },
            { id: "Plus-cheese",    name: "تايجر",       price: 15 },
            { id: "Plus-cheese",    name: "بيف بيكون",       price: 20 },
            { id: "Plus-cheese",    name: "تركي مدخن",       price: 15 },
            { id: "Plus-cheese",    name: "قطعه برجر",       price: 60 },
            { id: "Plus-cheese",    name: "حلقات بصل",       price: 15 },
            { id: "Plus-cheese",    name: "موتزاريلا استيك",       price: 15 },
            { id: "Plus-cheese",    name: "هاليبينو استيك",       price: 15 },
        ]
    },
    sandwichSize: {
        id: "sandwichSize",
        title: "الحجم",
        type: "single",
        options: [
            { id: "size-regular", name: "عادي",  price: 0 },
            { id: "size-large",   name: "لارج",  price: 25 }
        ]
    },
    mealSides: {
        id: "mealSides",
        title: "الطبق الجانبي",
        type: "single",
        options: [
            { id: "side-rice",   name: "أرز بسمتي", price: 0 },
            { id: "side-fries",  name: "مكرونه",     price: 0 }
            
        ]
    },
    crepeExtras: {
        id: "crepeExtras",
        title: "إضافات الكريب",
        type: "multiple",
        options: [
            { id: "extra-mozzarella", name: "موتزاريلا إضافية", price: 20 },
            { id: "extra-mushroom",   name: "مشروم",           price: 15 }
        ]
    },
    drinkSize: {
        id: "drinkSize",
        title: "الحجم",
        type: "single",
        options: [
            { id: "drink-small", name: "صغير", price: 0 },
            { id: "drink-large", name: "كبير", price: 10 }
        ]
    },
    susOptional: {
        id: "susOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "susMeal", name: "وجبه", price: 160-160 },
            { id: "susHalf", name: "نصف", price: 300-160 },
            { id: "susHalfplus", name: "كيلو الا ربع", price: 450-160 },
            { id: "susbig", name: "كيلو", price: 560-160 }
        ]
    },
    manyMeatOptional: {
        id: "manyMeatOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "manyMeatMeal", name: "وجبه", price: 160-160 },
            { id: "manyMeatHalf", name: "نصف", price: 300-160 },
            { id: "manyMeatHalfplus", name: "كيلو الا ربع", price: 450-160 },
            { id: "manyMeatbig", name: "كيلو", price: 560-160 }
        ]
    },
    mohamerMeatOptional: {
        id: "mohamerMeatOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "mohamerMeatMeal", name: "وجبه", price: 170-170 },
            { id: "mohamerMeatHalf", name: "نصف", price: 330-170 },
            { id: "mohamerMeatHalfplus", name: "كيلو الا ربع", price: 490-170 },
            { id: "mohamerMeatbig", name: "كيلو", price: 650-170 }
        ]
    },
    boftekMeatOptional: {
        id: "boftekMeatOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "boftekMeatMeal", name: "وجبه", price: 165-165 },
            { id: "boftekMeatHalf", name: "نصف", price: 320-165 },
            { id: "boftekMeatHalfplus", name: "كيلو الا ربع", price: 470-165 },
            { id: "boftekMeatbig", name: "كيلو", price: 630-165 }
        ]
    },
    kebdaMeatOptional: {
        id: "kebdaMeatOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "boftekMeatMeal", name: "وجبه", price: 165-165 },
            { id: "boftekMeatHalf", name: "نصف", price: 320-165 },
            { id: "boftekMeatHalfplus", name: "كيلو الا ربع", price: 480-165 },
            { id: "boftekMeatbig", name: "كيلو", price: 650-165 }
        ]
    },
    mandychiknOptional: {
        id: "mandychiknOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "mandychiknMeal", name: "وجبه ورك", price: 90-340 },
            { id: "mandychiknMealll", name: "وجبه صدر", price: 100-340 },
            { id: "mandychiknHalf", name: "نصف", price: 180-340 },
            { id: "mandychiknHalfplus", name: "فرخه الا ربع", price: 260-340 },
            { id: "mandychiknbig", name: "فرخه", price: 340-340 }
        ]
    },
     baneachiknOptional: {
        id: "baneachiknOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "baneachiknMeal", name: "وجبه", price: 95-95 },
            { id: "baneachiknHalf", name: "نصف", price: 180-95 },
            { id: "baneachiknHalfplus", name: "كيلو الا ربع", price: 270-95 },
            { id: "baneachiknbig", name: "كيلو", price: 380-95 }
        ]
    },
    sogokOptional: {
        id: "sogokOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "sogokMeal", name: "وجبه", price: 130-130 },
            { id: "sogokHalf", name: "نصف", price: 250-130 },
            { id: "sogokHalfplus", name: "كيلو الا ربع", price: 375-130 },
            { id: "sogokbig", name: "كيلو", price: 500-130 }
        ]
    },
    koftaOptional: {
        id: "koftaOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "koftaMeal", name: "وجبه", price: 125-125 },
            { id: "koftaHalf", name: "نصف", price: 250-125 },
            { id: "koftaHalfplus", name: "كيلو الا ربع", price: 350-125 },
            { id: "koftabig", name: "كيلو", price: 470-125 }
        ]
    },
    TarbOptional: {
        id: "TarbOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "TarbMeal", name: "وجبه", price: 150-150 },
            { id: "TarbHalf", name: "نصف", price: 290-150 },
            { id: "TarbHalfplus", name: "كيلو الا ربع", price: 430-150 },
            { id: "Tarbbig", name: "كيلو", price: 560-150 }
        ]
    },
    hawawshyOptional: {
        id: "hawawshyOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "haw-origenal", name: "عادي", price: 45-45 },
            { id: "haw-motzarela", name: "موتزاريلا", price: 75-45 }
        ]
    },
    steackOptional: {
        id: "steackOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "steackMeal", name: "وجبه", price: 170-170 },
            { id: "steackHalf", name: "نصف", price: 330-170 },
            { id: "steackHalfplus", name: "كيلو الا ربع", price: 490-170 },
            { id: "steackbig", name: "كيلو", price: 650-170 }
        ]
    },
    shishchiknOptional: {
        id: "shishchiknOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "shishchiknMeal", name: "وجبه ورك", price: 90-340 },
            { id: "shishchiknMealllll", name: "وجبه صدر", price: 100-340 },
            { id: "shishchiknHalf", name: "نصف", price: 180-340 },
            { id: "shishchiknHalfplus", name: "فرخه الا ربع", price: 260-340 },
            { id: "shishchiknbig", name: "فرخه", price: 340-340 }
        ]
    },
   hamamOptional: {
        id: "hamamOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "hamam-origenal", name: "فرد", price: 160-160 },
            { id: "hamam-motzarela", name: "جوز", price: 320-160 }
        ]
    },
    shistaaOptional: {
        id: "shistaaOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "shistaakMeal", name: "وجبه", price: 125-125 },
            { id: "shistaakHalf", name: "نصف", price: 240-125 },
            { id: "shistaakHalfplus", name: "كيلو الا ربع", price: 330-125 },
            { id: "shistaakbig", name: "كيلو", price: 450-125 }
        ]
    },
    mombarOptional: {
        id: "mombarOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "mombarMeal", name: "وجبه", price: 50-50 },
            { id: "mombarHalf", name: "نصف", price: 100-50 },
            { id: "mombarHalfplus", name: "كيلو الا ربع", price: 150-50 },
            { id: "mombarbig", name: "كيلو", price: 200-50 }
        ]
    },
    fataaOptional: {
        id: "fataaOptional",
        title: "اختار بين",
        type: "single",
        options: [
            { id: "fataaMeal", name: "الف جزيره", price: 0 },
            { id: "fataaHalf", name: "باربيكيو", price: 0 },
            { id: "fataaHalfplus", name: "رانش", price: 0 },
            { id: "fataasus", name: "بيج تايستي", price: 0 },
            { id: "fataasuss", name: "شيدر", price: 0 },
            { id: "fataasusss", name: "تايجر", price: 0 }
        ]
    },


};

// ------------------------------------------------------------
// PRODUCTS
// image: path to a product photo (falls back to a category
//        placeholder if the file is missing — see js/app.js)
// badge: short label shown on the card, e.g. "الأكثر طلباً"
//        leave as null if not needed
// extraGroups: array of extraGroups keys above (optional)
// ------------------------------------------------------------
const products = [
     {     id: 2001,
        category: "sals",
        name: "عرض لحم صوص",
        description: "لحم صوص",
        price: 130,
        image: "assets/products/لحم صوص عرض.jpg",
        badge: "خصم خاص ",
        available: false,
        extraGroups: ["susOptional", "mealSides","sauces"]
    },
    {
        id: 1,
        category: "skhn_wmndy",
        name: "لحم صوص",
        description: "لحم صوص",
        price: 160,
        image: "assets/products/لحم صوص.jpg",
        badge: "الأكثر طلباً",
        available: true,
        extraGroups: ["susOptional", "mealSides","sauces"]
    },
    {
        id: 2,
        category: "skhn_wmndy",
        name: "لحم مندي",
        description: "لحم مندي",
        price: 160,
        image: "assets/products/لحم مندي.jpg",
        badge: null,
        available: true,
        extraGroups: ["manyMeatOptional", "mealSides","sauces"]
    },
    {
        id: 3,
        category: "skhn_wmndy",
        name: "لحم محمر",
        description: "لحم محمر",
        price: 170,
        image: "assets/products/لحم محمر.jpeg",
        badge: "الأكثر طلباً",
        available: true,
        extraGroups: ["mohamerMeatOptional", "mealSides","sauces"]
    },
    {
        id: 4,
        category: "skhn_wmndy",
        name: "بوفتيك",
        description: "بوفتيك",
        price: 165,
        image: "assets/products/بوفتيك.jpg",
        badge: null,
        available: true,
        extraGroups: ["boftekMeatOptional" , "saucesPlus", "mealSides","sauces"]
    },
    {
        id: 5,
        category: "skhn_wmndy",
        name: "كبده محمره",
        description: "قرص لحم بقري 150 جرام + جبنة شيدر + خس وطماطم",
        price: 165,
        image: "assets/products/كبده.jpg",
        badge: null,
        available: true,
        extraGroups: ["kebdaMeatOptional", "mealSides","sauces"]
    },
    {
        id: 6,
        category: "skhn_wmndy",
        name: "فراخ مندي",
        description: "فراخ مندي",
        price: 340,
        image: "assets/products/فراخ مندي.jpg",
        badge: "الاكثر مبيعا",
        available: true,
        extraGroups: ["mandychiknOptional", "saucesPlus","mealSides","sauces"]
    },
    {
        id: 7,
        category: "skhn_wmndy",
        name: "بانيه",
        description: "بانيه",
        price: 95,
        image: "assets/products/بانيه.jpg",
        badge: "الاكثر مبيعا",
        available: true,
        extraGroups: ["baneachiknOptional", "mealSides","saucesPlus","sauces"]
    },
    {
        id: 8,
        category: "skhn_wmndy",
        name: "طاجن خضار باللحمه",
        description: "طاجن خضار باللحمه",
        price: 190,
        image: "assets/products/طاجن لحمه.jpg",
        badge: null,
        available: true,
        extraGroups: ["mealSides","sauces"]
    },
    {
        id: 9,
        category: "skhn_wmndy",
        name: "طاجن بصل باللحمه",
        description: "طاجن بصل باللحمه",
        price: 190,
        image: "assets/products/طاجن بصل.jpg",
        badge: null,
        available: true,
        extraGroups: ["mealSides","saucesPlus","sauces"]
    },
    {
        id: 10,
        category: "skhn_wmndy",
        name: "طاجن كوارع",
        description: "طاجن كوارع",
        price: 225,
        image: "assets/products/طاجن كوارع.jpg",
        badge: null,
        available: true,
        extraGroups: ["mealSides","sauces"]
    },
    {
        id: 11,
        category: "skhn_wmndy",
        name: "طاجن عكاوي",
        description: "طاجن عكاوي",
        price: 225,
        image: "assets/products/طاجن كوارع.jpg",
        badge: null,
        available: true,
        extraGroups: ["mealSides","sauces"]
    },
    {
        id: 12,
        category: "skhn_wmndy",
        name: "سجق",
        description: "سجق",
        price: 130,
        image: "assets/products/سجق.jpg",
        badge: null,
        available: true,
        extraGroups: ["sogokOptional", "mealSides","sauces"]
    },
    {
        id: 13,
        category: "skhn_wmndy",
        name: "زنجر",
        description: "زنجر",
        price: 100,
        image: "assets/products/زنجر.jpg",
        badge: "سبايسي",
        available: true,
        extraGroups: ["mealSides","saucesPlus","sauces"]
    },
    {
        id: 14,
        category: "skhn_wmndy",
        name: "ميكس بانيه وكفته",
        description: "ربع بانيه وثمن كفته",
        price: 150,
        image: "assets/products/ميكس بانيه وكفته.jpg",
        badge: null,
        available: true,
        extraGroups: ["mealSides","saucesPlus","sauces"]
    },
    {
        id: 15,
        category: "skhn_wmndy",
        name: "ميكس فراخ وكفته",
        description: "ربع فراخ وثمن كفته",
        price: 150,
        image: "assets/products/ميكس فراخ وكفته.jpg",
        badge: "الأكثر طلباً",
        available: true,
        extraGroups: ["mealSides","saucesPlus","sauces"]
    },
    {
        id: 16,
        category: "mshwyat",
        name: "كفته كندوز",
        description: "كفته كندوز",
        price: 125,
        image: "assets/products/كفته.jpg",
        badge: null,
        available: true,
        extraGroups: ["koftaOptional", "mealSides","saucesPlus","sauces"]
    },
    {
        id: 17,
        category: "mshwyat",
        name: "طرب",
        description: "طرب",
        price: 150,
        image: "assets/products/طرب.jpg",
        badge: null,
        available: true,
        extraGroups: ["TarbOptional","mealSides","saucesPlus","sauces"]
    },
    {
        id: 18,
        category: "mshwyat",
        name: "حواوشي",
        description: " حواوشي عادي او موتزاريلا",
        price: 45,
        image: "assets/products/حواوشي.png",
        badge: null,
        available: true,
        extraGroups: ["hawawshyOptional","sauces"]
    },
    {
        id: 19,
        category: "mshwyat",
        name: "لحم استيك",
        description: "لحم مشوي عالفحم",
        price: 170,
        image: "assets/products/استيك.jpg",
        badge: null,
        available: true,
        extraGroups: ["steackOptional","saucesPlus","sauces"]
    },
    {
        id: 20,
        category: "mshwyat",
        name: "فراخ شيش",
        description: "فراخ مشويه",
        price: 340,
        image: "assets/products/فراخ شيش.png",
        badge: null,
        available: true,
        extraGroups: ["shishchiknOptional","mealSides","saucesPlus","sauces"]
    },
    {
        id: 21,
        category: "mshwyat",
        name: "حمام بلدي",
        description: "حمام بلدي",
        price: 160,
        image: "assets/products/حمام بلدي.png",
        badge: null,
        available: true,
        extraGroups: ["hamamOptional","mealSides","sauces"]
    },
    {
        id: 22,
        category: "mshwyat",
        name: "شيش طاووق",
        description: "شيش طاووق",
        price: 125,
        image: "assets/products/وجبه شيش طاووق.jpg",
        badge: null,
        available: true,
        extraGroups: ["shistaaOptional","mealSides","sauces"]
    },
    {
        id: 23,
        category: "frayd_tshykn",
        name: "فرايد تشيكن 2ق",
        description: "بروست ارز بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 120,
        image: "assets/products/2ق بروست.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 24,
        category: "frayd_tshykn",
        name: "فرايد تشيكن 3ق",
        description: "بروست ارز بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 160,
        image: "assets/products/3ق بروست.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 25,
        category: "frayd_tshykn",
        name: "فرايد تشيكن 4ق",
        description: "بروست ارز بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 190,
        image: "assets/products/4ق بروست.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 26,
        category: "frayd_tshykn",
        name: "استريبس 3ق",
        description: "استريبس ارز بطاطس   ثوميه  كاتشب  كايزر ",
        price: 95,
        image: "assets/products/3ق استريبس.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 27,
        category: "frayd_tshykn",
        name: "استريبس 5ق",
        description: "استريبس ارز بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 120,
        image: "assets/products/5ق استريبس.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 28,
        category: "frayd_tshykn",
        name: "فرايد تشيكن 8ق",
        description: "بروست ارز  بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 385,
        image: "assets/products/8ق بروست.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 29,
        category: "frayd_tshykn",
        name: "فرايد تشيكن 12ق",
        description: "بروست ارز  بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 530,
        image: "assets/products/12ق بروست.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 30,
        category: "frayd_tshykn",
        name: "فرايد تشيكن 16ق",
        description: "بروست ارز  بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 690,
        image: "assets/products/16ق بروست.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 31,
        category: "frayd_tshykn",
        name: "فرايد تشيكن 21ق",
        description: "بروست ارز  بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 900,
        image: "assets/products/21ق بروست.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 32,
        category: "frayd_tshykn",
        name: "استريبس 12ق",
        description: "استريبس ارز بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 290,
        image: "assets/products/12ق استريبس.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 33,
        category: "frayd_tshykn",
        name: "استريبس 21ق",
        description: "استريبس ارز بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 500,
        image: "assets/products/21ق استريبس.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 34,
        category: "frayd_tshykn",
        name: "ميكس بروست واستريبس 4ق",
        description: "استريبس  بروست ارز بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 150,
        image: "assets/products/ميكس 2ق بروست +2 ق استريبس.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 35,
        category: "frayd_tshykn",
        name: "ميكس بروست واستريبس عائلي",
        description: "استريبس  بروست ارز بطاطس  كولسلو  ثوميه  كاتشب  كايزر ",
        price: 485,
        image: "assets/products/ميكس عائلي.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces","saucesPlus"]
    },
    {
        id: 36,
        category: "frayd_tshykn",
        name: "استريبس وجبه اطفال",
        description: "استريبس   بطاطس   عصير   كاتشب   ",
        price: 90,
        image: "assets/products/استريبس اطفال.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces"]
    },
    {
        id: 37,
        category: "frayd_tshykn",
        name: "بروست وجبه اطفال",
        description: "بروست   بطاطس   عصير   كاتشب   ",
        price: 90,
        image: "assets/products/بروست اطفال.jpg",
        badge: null,
        available: true,
        extraGroups: ["sauces"]
    },


//ساندوتشات



    {
        id: 38,
        category: "sandwtshat",
        name: "كلاسيك تشيكن",
        description: "استريبس  مايونيز  خس  خيار  مخلل  طماطم  صوص جبنه ",
        price: 105,
        image: "assets/products/كلاسيك تشيكن.jpg",
        badge: "الاكثر مبيعا",
        available: true,
        extraGroups: ["saucesPlus"]
    },

    {
        id: 39,
        category: "sandwtshat",
        name: "جوسي لوسي",
        description: "استريبس مايونيز  خس خيار مخلل طماطم تركي مدخن صوص جبنه رانش صوص ",
        price: 120,
        image: "assets/products/جوسي لوسي 4.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 40,
        category: "sandwtshat",
        name: "تشيكن ماشروم",
        description: "استريبس مايونيز خس خيار مخلل طماطم بيف بيكون ماشروم كريمي رانش صوص ",
        price: 125,
        image: "assets/products/تشيكن ماشروم.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 41,
        category: "sandwtshat",
        name: "كاوبوي",
        description: "استريبس مايونيز خس خيار مخلل طماطم حلقات بصل تركي مدخن صوص جبنه باربيكيو صوص ",
        price: 130,
        image: "assets/products/كاوبوي.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 42,
        category: "sandwtshat",
        name: "فولكانو",
        description: "استريبس مايونيز خس خيار مخلل طماطم بيف بيكون موتزاريلا صوص الف جزيره ",
        price: 130,
        image: "assets/products/فولكانو.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 42,
        category: "sandwtshat",
        name: "حلال شيستر",
        description: "استريبس مايونيز خس هاليبينو طماطم فلفل الوان دوريتوس اصابع جبنه بيف بيكون صوص سويت شيلي ",
        price: 145,
        image: "assets/products/حلال شيستر.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 43,
        category: "sandwtshat",
        name: "حلال فاير",
        description: "استريبس  مايونيز  خس  هاليبينو طماطم اصابع جبنه بيف بيكون صوص سويت شيلي ",
        price: 130,
        image: "assets/products/حلال فاير.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 44,
        category: "sandwtshat",
        name: "كلاسيك استريبس",
        description: "استريبس  مايونيز  خس  خيار مخلل  طماطم  تركي مدخن  صوص جبنه ",
        price: 105,
        image: "assets/products/كلاسيك استريبس فيلر.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 45,
        category: "sandwtshat",
        name: "زنجر استريبس",
        description: "استريبس  مايونيز  خس  هاليبينو  طماطم  بيف بيكون  صوص سويت شيلي ",
        price: 110,
        image: "assets/products/زنجر استريبس.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 46,
        category: "sandwtshat",
        name: "فاهيتا تشيكن",
        description: "صدور دجاج  مايونيز  خس  هاليبينو  طماطم  ماشروم  زيتون  صوص باربكيو ",
        price: 105,
        image: "assets/products/فاهيتا تشيكن.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 47,
        category: "sandwtshat",
        name: "شيش طاووق",
        description: "شيش طاووق  مايونيز  خس  هاليبينو  طماطم  صوص باربكيو ",
        price: 120,
        image: "assets/products/شيش طاووق.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 48,
        category: "sandwtshat",
        name: "كلاسيك بيف",
        description: "برجر  مايونيز  خس  خيار  طماطم  بصل  صوص جبنه  صوص بيج تيستي ",
        price: 130,
        image: "assets/products/كلاسيك بيف.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 49,
        category: "sandwtshat",
        name: "تشارلي بوي",
        description: "برجر  مايونيز خس  خيار  طماطم  بصل  حلقات بصل  بيف بيكون  صوص جبنه  صوص باربيكيو ",
        price: 160,
        image: "assets/products/تشارلي بوي.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 50,
        category: "sandwtshat",
        name: "تشيزي بيف",
        description: "برجر  مايونيز  خس  خيار  طماطم  بصل  بيف بيكون  موتزاريلا  صوص جبنه ",
        price: 160,
        image: "assets/products/تشيزي بيف.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 51,
        category: "sandwtshat",
        name: "كينج برجر",
        description: "برجر  مايونيز  خس  خيار  طماطم  بصل  بصل مكرم صوص جبنه ",
        price: 125,
        image: "assets/products/كينج برجر.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 52,
        category: "sandwtshat",
        name: "ماشروم بيف",
        description: "برجر  مايونيز  خس  خيار  طماطم  بصل  ماشروم كريمي  صوص الف جزيره ",
        price: 135,
        image: "assets/products/ماشروم بيف.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 53,
        category: "sandwtshat",
        name: "حلال فاير برجر",
        description: "برجر  مايونيز  خس  خيار  طماطم  بصل  بيف بيكون  هاليبينو استيك  صوص سويت شيلي ",
        price: 170,
        image: "assets/products/حلال فاير برجر.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 54,
        category: "sandwtshat",
        name: "ميجا برجر",
        description: "برجر  مايونيز  خس  خيار  طماطم  بصل  تركي مدخن  سلامي  صوص بيج تيستي ",
        price: 145,
        image: "assets/products/ميجا برجر.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },


    //كريبات
    
    {
        id: 55,
        category: "crepe",
        name: "كريب استريبس",
        description: "استريبس  موتزاريلا  كاتشب  مايونيز  فلفل اخضر  زيتون ",
        price: 100,
        image: "assets/products/كريب استريبس.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 56,
        category: "crepe",
        name: "كريب زنجر",
        description: "استريبس  موتزاريلا  كاتشب  مايونيز  فلفل هاليبينو  هوت صوص  فلفل اخضر  زيتون ",
        price: 135,
        image: "assets/products/كريب زنجر.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 57,
        category: "crepe",
        name: "كريب ميكس فراخ",
        description: "استريبس  شيش طاووق  فاهيتا فراخ  موتزاريلا  الف جزيره  كاتشب  مايونيز  فلفل اخضر  زيتون ",
        price: 130,
        image: "assets/products/كريب ميكس فراخ.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 58,
        category: "crepe",
        name: "سوبر كرانشي",
        description: "استريبس  تركي مدخن  صوص رانش  كاتشب  مايونيز  موتزاريلا  فلفل اخضر ",
        price: 130,
        image: "assets/products/سوبر كرانشي.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 59,
        category: "crepe",
        name: "كريب شيش",
        description: "شيش  بصل  فلفل اخضر  زيتون  باربيكيو صوص  موتزاريلا ",
        price: 100,
        image: "assets/products/كريب شيش.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 60,
        category: "crepe",
        name: "كريب فاهيتا",
        description: "فاهيتا فراخ  بصل  فلفل اخضر  ماشروم  زيتون  باربيكيو صوص  كاتشب  مايونيز ",
        price: 110,
        image: "assets/products/كريب شيش.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 61,
        category: "crepe",
        name: "كريب برجر",
        description: "برجر  الف جزيره  موتزاريلا  كاتشب  مايونيز  زيتون ",
        price: 130,
        image: "assets/products/كريب برجر.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 62,
        category: "crepe",
        name: "كريب ميكس لحوم",
        description: "برجر  شريحه سلامي  كفته  بيج تيستي صوص  كاتشب  مايونيز  زيتون ",
        price: 160,
        image: "assets/products/ميكس لحوم.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },

    //سوري

    {
        id: 63,
        category: "sory",
        name: "بطاطس سوري",
        description: "بطاطس  ثوميه  كاتشب  مايونيز ",
        price: 40,
        image: "assets/products/بطاطس سوري.jpg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 64,
        category: "sory",
        name: "شاورما فراخ سوري",
        description: "شيش طاووق وثوميه",
        price: 75,
        image: "assets/products/شاورما سوري.jpg.jpeg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 65,
        category: "sory",
        name: "فاهيتا سوري",
        description: "فاهيتا  فلفل الوان  ماشروم  دره حلوه  باربيكيو",
        price: 75,
        image: "assets/products/فاهيتا سوري.jpeg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 66,
        category: "sory",
        name: "زنجر سوري",
        description: "زنجر  خضار  هاليبينو  سويت شيلي",
        price: 75,
        image: "assets/products/زنجر سوري.jpeg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 67,
        category: "sory",
        name: "شيش طاووق سوري",
        description: "شيش طاووق فلفل الوان  باربيكيو ",
        price: 70,
        image: "assets/products/شيش طاووق سوري.jpg.jpeg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 68,
        category: "sory",
        name: "بانيه سوري",
        description: "بانيه خضار  الف جزيره صوص  ثوميه",
        price: 75,
        image: "assets/products/بانيه سوري.jpeg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 69,
        category: "sory",
        name: "كفته سوري",
        description: "كفته  طحينه  طماطم  خيار مخلل  خضار  بيج تيستي",
        price: 80,
        image: "assets/products/كفته سوري.jpeg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 70,
        category: "sory",
        name: "استريبس سوري",
        description: "استريبس  خضار  خيار مخلل  تركي مدخن  رانش  ثوميه",
        price: 85,
        image: "assets/products/استريبس سوري.jpeg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 71,
        category: "sory",
        name: "بطاطس سوري ميكس جبن",
        description: "بطاطس موتزاريلا صوص جبنه   ثوميه  كاتشب  مايونيز ",
        price: 60,
        image: "assets/products/بطاطس ميكس سوري.jpeg",
        badge: null,
        available: true,
        extraGroups: ["saucesPlus"]
    },
    {
        id: 72,
        category: "extras",
        name: "ممبار",
        description: "ممبار",
        price: 50,
        image: "assets/products/ممبار.jpg",
        badge: null,
        available: true,
        extraGroups: ["mombarOptional"]
    },
    {
        id: 73,
        category: "extras",
        name: "فته",
        description: "فته مع صوص من اختيارك",
        price: 85,
        image: "assets/products/فته.jpg",
        badge: null,
        available: true,
        extraGroups: ["fataaOptional"]
    },
     {
        id: 74,
        category: "extras",
        name: "باكيت بطاطس",
        description: "باكيت بطاطس فارم فرايز",
        price: 20,
        image: "assets/products/بطاطس.jpg",
        badge: null,
        available: true,
        extraGroups: []
    },




];

// ------------------------------------------------------------
// EXPORT — bundles everything into one object used by app.js
// ------------------------------------------------------------
const menuData = {
    categories,
    products,
    extraGroups
};

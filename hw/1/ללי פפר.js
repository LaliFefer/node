//4

const hikeingSites = [
    {
        name: "מצדה",
        address: "מדבר יהודה",
        description: "אתר מורשת עולמית עם נוף מדברי מרהיב",
        entryCost: 29,
        openingHours: {
            open: 8,
            close: 20
        },
        recommendedItems: ["כובע", "מים", "נעלי הליכה", "משקפי שמש"]
    },
    {
        name: "עין גדי",
        address: "מדבר יהודה, ים המלח",
        description: "שמורת טבע עם מעיינות ומפלים",
        entryCost: 28,
        openingHours: {
            open: 8,
            close: 17
        },
        recommendedItems: ["בגד ים", "מים", "נעלי מים", "מגבת"]
    },
    {
        name: "הר חרמון",
        address: "רמת הגולן",
        description: "אתר סקי וטיולים בצפון ישראל",
        entryCost: 49,
        openingHours: {
            open: 8,
            close: 16
        },
        recommendedItems: ["ביגוד חם", "כפפות", "מגלשיים", "משקפי שמש"]
    },
    {
        name: "נחל דוד",
        address: "מדבר יהודה",
        description: "נחל איתן עם בריכות טבעיות",
        entryCost: 27,
        openingHours: {
            open: 9,
            close: 16
        },
        recommendedItems: ["בגד ים", "מים", "כובע", "קרם הגנה"]
    },
    {
        name: "פארק הירדן",
        address: "עמק הירדן",
        description: "פארק מים טבעי על נהר הירדן",
        entryCost: 35,
        openingHours: {
            open: 9,
            close: 17
        },
        recommendedItems: ["בגד ים", "מים", "קרם הגנה", "מגבת"]
    },
    {
        name: "הר תבור",
        address: "הגליל התחתון",
        description: "הר היסטורי עם נוף פנורמי",
        entryCost: 25,
        openingHours: {
            open: 7,
            close: 16
        },
        recommendedItems: ["נעלי הליכה", "מים", "כובע", "משקפי שמש"]
    }
];
//5
hikeingSites.sort((a, b) => b.entryCost - a.entryCost);

//6
//העתקה למערך חדש מיון והוצאת ה1
const newHikingSites = [];

// ...existing code...

console.log("=== האתרים שנבחרו ===");

// האתר הכמעט הכי זול
const copyHikingSites = [...hikeingSites].sort((a, b) => a.entryCost - b.entryCost);
newHikingSites.push(copyHikingSites[1]);
console.log("האתר הכמעט הכי זול:", newHikingSites[0]);

// האתר הזול ביותר שנסגר אחרי 7 בערב
const lateAndCheap = hikeingSites.findLast(site => {
    return site.openingHours.close >= 19;
});
if (lateAndCheap) {
    newHikingSites.push(lateAndCheap);
    console.log("האתר שנסגר אחרי 7:", lateAndCheap);
} 

// האתר היקר ביותר שנפתח לפני 9 בבוקר
const earlyAndExpensive = [...hikeingSites]
    .sort((a, b) => b.entryCost - a.entryCost)
    .find(site => site.openingHours.open < 9);

if (earlyAndExpensive) {
    newHikingSites.push(earlyAndExpensive);
    console.log("האתר היקר ביותר שנפתח לפני 9:", earlyAndExpensive);
}

console.log("\n=== כל האביזרים המומלצים ===");
const allRecommendedItems = hikeingSites.map(site => site.recommendedItems).flat();
console.log(allRecommendedItems);
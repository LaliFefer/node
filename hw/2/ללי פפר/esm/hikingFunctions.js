import hikeingSites from './hikingSites.js';

export function sortSites() {
    hikeingSites.sort((a, b) => b.entryCost - a.entryCost);
}

export function createNewSitesList() {
    //העתקה למערך חדש מיון והוצאת ה1
    const newHikingSites = [];

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

    return newHikingSites;
}

export function printResults(newSites) {
    console.log("\n=== כל האביזרים המומלצים ===");
    const allRecommendedItems = hikeingSites.map(site => site.recommendedItems).flat();
    console.log(allRecommendedItems);
}
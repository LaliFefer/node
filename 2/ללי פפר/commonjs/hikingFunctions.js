const hikeingSites = require('./hikingSites');

function sortSites() {
    hikeingSites.sort((a, b) => b.entryCost - a.entryCost);
}

function createNewSitesList() {
    const newHikingSites = [];
    
    // Get second cheapest site
    const copyHikingSites = [...hikeingSites].sort((a, b) => a.entryCost - b.entryCost);
    newHikingSites.push(copyHikingSites[1]);
    
    // Get latest closing cheap site
    const lateAndCheap = hikeingSites.findLast(site => site.openingHours.close >= 19);
    if (lateAndCheap) {
        newHikingSites.push(lateAndCheap);
    }
    
    // Get earliest opening expensive site
    const earlyAndExpensive = [...hikeingSites]
        .sort((a, b) => b.entryCost - a.entryCost)
        .find(site => site.openingHours.open < 9);
    
    if (earlyAndExpensive) {
        newHikingSites.push(earlyAndExpensive);
    }
    
    return newHikingSites;
}

function printResults(newSites) {
    console.log("=== האתרים שנבחרו ===");
    console.log("האתר הכמעט הכי זול:", newSites[0]);
    if (newSites[1]) console.log("האתר שנסגר אחרי 7:", newSites[1]);
    if (newSites[2]) console.log("האתר היקר ביותר שנפתח לפני 9:", newSites[2]);
    
    console.log("\n=== כל האביזרים המומלצים ===");
    const allRecommendedItems = hikeingSites.map(site => site.recommendedItems).flat();
    console.log(allRecommendedItems);
}

module.exports = { sortSites, createNewSitesList, printResults };

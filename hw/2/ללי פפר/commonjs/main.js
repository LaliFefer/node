const { sortSites, createNewSitesList, printResults } = require('./hikingFunctions');

sortSites();
const newSites = createNewSitesList();
printResults(newSites);


let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const num = Math.floor(Math.random() * 100);
        if (num % 2 === 0) resolve("👍🏻" + num);
        else reject("👎🏻" + num);
    }, 2000);
});

async function handleMyPromise() {
    try {
        const value = await myPromise;
        console.log(value);
    } catch (err) {
        // original code logged the rejection and then attached .then/.catch to the same promise
        // awaiting the same promise here will immediately re-resolve/reject with the settled value
        console.log(err);
        try {
            const value2 = await myPromise;
            console.log("even: " + value2);
        } catch (err2) {
            console.log("failed again: " + err2);
        }
    }
}

handleMyPromise();


function functionreadFile() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const s = "the file read";
            resolve(s);
            // reject("error") // unreachable after resolve
        }, 2000);
    });
}

function toUpperCase(text) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(text.toUpperCase());
        }, 2000);
    });
}

let newFile = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("the text written");
        reject("error");
    }, 2000);
});

(async function main() {
    try {
        const value = await Promise.all([functionreadFile(), toUpperCase("hey what's app?"), newFile]);
        console.log("3 promises succeeded", value);
    } catch (err) {
        // fixed variable name from original (used undefined `error`)
        console.log("one or more promises failed", err);
    }
})();








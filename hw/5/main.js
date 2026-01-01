
let myPromise = new Promise((Resolve, Reject) => {
    setTimeout(() => {
        let num = Math.floor(Math.random() * 100);
        if (num % 2 == 0)
            Resolve("👍🏻" + num);
        else
            Reject("👎🏻" + num);
    }, 2000);
});


myPromise
    .then((value) => {
        console.log(value);
    })
    .catch((value) => {
        console.log(value);
        myPromise.then((value) => {
            console.log("even: " + value);
        }).catch((value) => {
            console.log("failed again: " + value);
        });
    });



function functionreadFile() {
    return new Promise((Resolve, Reject) => {
        setTimeout(() => {
            s = "the file read"
            Resolve(s)
            Reject("error")

        }, 2000);
    });
}
function toUpperCase(text) {
    return new Promise((Resolve, Reject) => {
        setTimeout(() => {
            Resolve(text.toUpperCase())
            Reject("error")

        }, 2000);
    });
}

let newFile = new Promise((Resolve, Reject) => {
    setTimeout(() => {
        Resolve("the text written")
        Reject("error")
    }, 2000);
});

Promise.all([functionreadFile(), toUpperCase("hey what's app?"), newFile])
    .then((value) => {
        console.log("3 promises sucssesed", value)
    })
    .catch((value) => {
        console.log("one or more from promises is filed", error)
    });








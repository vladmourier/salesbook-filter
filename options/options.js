function saveOptions(e) {
    e.preventDefault();
    debugger;
    let minP = parseInt(document.querySelector("#minPrice").value);
    if(isNaN(minP)) minP = 0;

    let maxP = parseInt(document.querySelector("#maxPrice").value);
    if(isNaN(maxP)) maxP = -1;

    browser.storage.local.set({
        minPrice: minP,
        maxPrice: maxP,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#minPrice").value = result.minPrice || 0;
        document.querySelector("#maxPrice").value = result.maxPrice || -1;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.local.get();
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#minPrice").addEventListener("change", saveOptions);
document.querySelector("#maxPrice").addEventListener("change", saveOptions);

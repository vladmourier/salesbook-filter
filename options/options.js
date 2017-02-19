function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        minPrice: document.querySelector("#minPrice").value,
        maxPrice: document.querySelector("#maxPrice").value,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#minPrice").value = result.minPrice || 0;
        document.querySelector("#maxPrice").value = result.maxPrice || 200;
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

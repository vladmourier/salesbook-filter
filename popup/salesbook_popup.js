document.addEventListener("click", (e) => {
    if (e.target.classList.contains("beast")) {
        function onError(error) {
            console.log(`Error: ${error}`);
            browser.tabs.executeScript(null, {
                file: "/content_scripts/beastify.js"
            });

            let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
            gettingActiveTab.then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {minPrice: 0, maxPrice: 100});
            });
        }

        function onGot(item) {
            browser.tabs.executeScript(null, {
                file: "/content_scripts/beastify.js"
            });

            let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
            gettingActiveTab.then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {minPrice: item.minPrice, maxPrice: item.maxPrice});
            });
        }

        let getting = browser.storage.local.get();
        getting.then(onGot, onError);

    }
    else if (e.target.classList.contains("options")) {
        browser.runtime.openOptionsPage();
    }
});

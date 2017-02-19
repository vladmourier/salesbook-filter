/**
 * Makes sure the filter button is only available on facebook for sale posts pages
 */
browser.tabs.query({'active': true, 'lastFocusedWindow': true}).then((tabs) => {
    let url = tabs[0].url;
    let btn = document.querySelector("#filter");
    if (url.indexOf("https://www.facebook.com/groups") > -1 && ( url.indexOf("forsaleposts") > -1 || url.indexOf("for_sale_search") > -1)) {
        btn.removeAttribute("disabled")
    } else {
        btn.setAttribute("disabled", "true");
    }
}).catch(error => console.log("ERREUR : " + error));

/**
 * Handle the click on Filter & options
 */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter")) {
        function onError(error) {
            console.log(`Error: ${error}`);
            browser.tabs.executeScript(null, {
                file: "/content_scripts/filter.js"
            });

            let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
            gettingActiveTab.then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {minPrice: 0, maxPrice: -1});
            });
        }

        function onGot(item) {
            browser.tabs.executeScript(null, {
                file: "/content_scripts/filter.js"
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

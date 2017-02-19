function beastify(request, sender, sendResponse) {
    let PRICE_TAG_CLASS = "_sz6", INFINITE_LOADER_ID= "pagelet_forsale_group_pager";
    let MAX_PRICE = request.maxPrice,
        MIN_PRICE = request.minPrice;
    Array.prototype.forEach.call(
        document.getElementsByClassName(PRICE_TAG_CLASS),
        (element) => {
            let displayedString = element.innerText.substring(0, element.innerText.length - 1).trim().replace(/\s/g, '');
            let displayedPrice = parseInt(displayedString);
            if (displayedPrice > MAX_PRICE || displayedPrice < MIN_PRICE) {
                let ancestor = element.parentElement.parentElement.parentElement.parentElement;
                ancestor.style.display = 'none';
            }
        });
    location.href = "#";
    location.href = "#"+INFINITE_LOADER_ID;
}


browser.runtime.onMessage.addListener(beastify);

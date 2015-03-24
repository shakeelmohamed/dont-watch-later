chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (typeof details && details.hasOwnProperty("url")) {
        if (details.url.indexOf("&list=WL") !== -1) {
            return {redirectUrl: details.url.replace("&list=WL", "")};
        }
    }
    return details;
},
{
    urls : ["*://*.youtube.com/*"]
}, 
["blocking"]
);
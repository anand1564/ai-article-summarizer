chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSummary") {
        const text = document.body.innerText;
        chrome.runtime.sendMessage({ action: "summarize", text: text }, (response) => {
            sendResponse({ summary: response ? response.summary : null });
        });
        return true; 
    }
});

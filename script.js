document.getElementById("summarize").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    document.getElementById('spinner').classList.remove('hidden');

    chrome.tabs.sendMessage(tab.id, { action: "getSummary" }, (response) => {
        document.getElementById('spinner').classList.add('hidden');
        console.log(response);

        if (response && response.summary) {
            document.getElementById('summary').innerText = response.summary;
        } else {
            document.getElementById('summary').innerText = "Something went wrong!";
        }
    });
});

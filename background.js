

const API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
const API_TOKEN = "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"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    summarizeText(request.text)
      .then(summary => sendResponse({ summary }))
      .catch(error => sendResponse({ error: error.toString() }));
    return true;  // Indicates we will send a response asynchronously
  }
});

async function summarizeText(text) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: text })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result[0].summary_text;
}
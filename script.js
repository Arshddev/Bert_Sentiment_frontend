async function analyzeSentiment() {
    const text = document.getElementById("inputText").value;
    const loading = document.getElementById("loading");
    const resultBox = document.getElementById("result-box");
    const resultText = document.getElementById("result");

    if (!text) {
        alert("⚠️ Please enter some text.");
        return;
    }

    loading.style.display = "block";
    resultBox.style.display = "none";

    const apiUrl = "https://2nseydxj3e.execute-api.us-east-1.amazonaws.com/dev/predict"; // Replace with your API Gateway URL

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const result = await response.json();
        const predictions = JSON.parse(result.body);
        const sentiment = predictions[0].label;
        const score = predictions[0].score;
        resultText.innerText = `Sentiment: ${sentiment} (Confidence: ${score.toFixed(2)})`;

        resultBox.style.display = "block";
    } catch (error) {
        resultText.innerText = "⚠️ Error analyzing sentiment. Please try again.";
        resultBox.style.display = "block";
        console.error("Error during fetch:", error);
    } finally {
        loading.style.display = "none";
    }
}

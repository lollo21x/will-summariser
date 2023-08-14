async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

function summarize() {
	const inputData = document.getElementById("input-text").value;
	const inputDataObj = { "inputs": inputData };

	document.getElementById("loading-spinner").style.display = "block";
	document.getElementById("loading-message").style.display = "block";

	query(inputDataObj)
		.then((response) => {
			const summary = response[0].summary_text;
			document.getElementById("output-text").textContent = summary;
		})
		.catch((error) => {
			console.error("Errore durante la richiesta di riassunto:", error);
		})
		.finally(() => {
			document.getElementById("loading-spinner").style.display = "none";
			document.getElementById("loading-message").style.display = "none";
		});
}

function copySummary() {
	const outputText = document.getElementById("output-text").textContent;
	const tempInput = document.createElement("input");
	tempInput.setAttribute("value", outputText);
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand("copy");
	document.body.removeChild(tempInput);

	const successMessage = document.getElementById("copy-success");
	successMessage.style.display = "block";
	setTimeout(function() {
		successMessage.style.display = "none";
	}, 2000);
}

document.addEventListener("DOMContentLoaded", function() {
	const inputElement = document.getElementById("input-text");
	inputElement.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			summarize();
		}
	});
});

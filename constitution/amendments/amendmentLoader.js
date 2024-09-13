document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const amendmentId = urlParams.get('amendment');

    fetch('../constitution.json')
        .then(response => response.json())
        .then(data => {
            const amendment = data.amendments[amendmentId - 1];

            const amendmentNumber = document.getElementById("amendmentNumber");
            const amendmentTitle = document.getElementById("amendmentTitle");
            const displayDoc = document.getElementById("amendmentText");
            
            if (amendment) {

                amendmentNumber.innerHTML = amendment.amendNumber;
                amendmentTitle.innerHTML = amendment.amendTitle;

                const sectionWords = document.createElement("p");
                sectionWords.textContent = amendment.text;
                displayDoc.appendChild(sectionWords);
                const analysisElement = document.querySelector(".analysis");
                analysisElement.innerHTML = amendment.analysis;
                const title = document.querySelector("title");
                title.innerText = amendment.amendNumber;
            } else {
                displayDoc.textContent = "amendment not found!";
            }
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

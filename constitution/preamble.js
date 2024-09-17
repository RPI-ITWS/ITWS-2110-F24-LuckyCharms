document.addEventListener("DOMContentLoaded", function() {
    fetch('constitution.json')
        .then(response => response.json())
        .then(data => {
            const preamble = data.preamble;

            const preambleTitle = document.getElementById("preamble");
            const preambleText = document.getElementById("preambleText");
            
            if (preamble) {

                preambleTitle.innerHTML = preamble.preambleTitle;

                const sectionWords = document.createElement("p");
                preambleText.innerHTML = preamble.Text;
                
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

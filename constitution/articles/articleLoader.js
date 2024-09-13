document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');

    fetch('../constitution.json')
        .then(response => response.json())
        .then(data => {
            const displayDoc = document.getElementById("articleText");

            const articleIndex = data.articles[articleId - 1];

            if (articleIndex) {
                    articleIndex.forEach((section, index) => {
                        const sectionElement = document.createElement("div");
                        const sectionNumber = document.createElement("h3");
                        const sectionWords = document.createElement("p");
                        
                        if (articleIndex.length > 1) {
                            sectionNumber.textContent = `Section ${index + 1}`;
                        }
                        sectionWords.textContent = `${section}`;

                        sectionElement.append(sectionNumber);
                        sectionElement.append(sectionWords);
                        
                        displayDoc.appendChild(sectionElement);
                    });
            } else {
                displayDoc.textContent = "Article not found!";
            }
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

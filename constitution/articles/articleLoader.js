document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');

    fetch('../constitution.json')
        .then(response => response.json())
        .then(data => {
            const article = data.articles[articleId - 1];

            const articleNumber = document.getElementById("articleNumber");
            const articleTitle = document.getElementById("articleTitle");
            const displayDoc = document.getElementById("articleText");
            
            if (article) {

                articleNumber.innerHTML = article.articleNumber;
                articleTitle.innerHTML = article.articleTitle;

                article.sections.forEach((section, index) => {
                    const sectionElement = document.createElement("div");
                    const sectionNumber = document.createElement("h3");
                    const sectionWords = document.createElement("p");
                    
                    if (article.sections.length > 1) {
                        sectionNumber.textContent = `Section ${index + 1}`;
                    }
                    sectionWords.textContent = `${section}`;

                    sectionElement.append(sectionNumber);
                    sectionElement.append(sectionWords);
                    
                    displayDoc.appendChild(sectionElement);
                });
                const analysisElement = document.querySelector(".analysis");
                analysisElement.innerHTML = article.analysis;
            } else {
                displayDoc.textContent = "Article not found!";
            }
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

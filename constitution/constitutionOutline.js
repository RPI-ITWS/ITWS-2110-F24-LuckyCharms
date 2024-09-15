document.addEventListener("DOMContentLoaded", function() {
    fetch('constitution.json')
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const displayArticles = document.getElementById("articles");

            if (articles) {
                articles.forEach((article, index) => {
                    const articleElement = document.createElement("div");
                    const articleNumber = document.createElement("h4");
                    const articleTitle = document.createElement("a");

                    articleNumber.innerHTML = article.articleNumber;
                    articleTitle.innerHTML = article.articleTitle;
                    articleTitle.href = `articles/?article=${index + 1}`;

                    articleElement.onclick = () => {
                        window.location.href = articleTitle.href;
                    };
                    articleElement.style.cursor = "pointer";

                    articleElement.appendChild(articleNumber);
                    articleElement.appendChild(articleTitle);

                    displayArticles.appendChild(articleElement);
                });
            } else {
                displayArticles.textContent = "Article not found!";
            }

            const amendments = data.amendments;
            const displayAmendments = document.getElementById("amendments");

            if (amendments) {
                amendments.forEach((amendment, index) => {
                    const amendmentElement = document.createElement("div");
                    const amendmentNumber = document.createElement("h4");
                    const amendmentTitle = document.createElement("a");

                    amendmentNumber.innerHTML = amendment.amendNumber;
                    amendmentTitle.innerHTML = amendment.amendTitle;
                    amendmentTitle.href = `amendments/?amendment=${index + 1}`;

                    amendmentElement.onclick = () => {
                        window.location.href = amendmentTitle.href;
                    };
                    amendmentElement.style.cursor = "pointer";

                    amendmentElement.appendChild(amendmentNumber);
                    amendmentElement.appendChild(amendmentTitle);

                    displayAmendments.appendChild(amendmentElement);
                });
            } else {
                displayAmendments.textContent = "Amendment not found!";
            }
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});
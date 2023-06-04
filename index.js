const Api_key = "YOUR API KEY HERE"; // get it from https://newsapi.org/

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));
//Reloads the page
function reload() {
    window.location.reload();
}

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${Api_key}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    const newsTemplate = document.getElementById('template-card');
    cardContainer.innerHTML = "";

    if (articles.length === 0) {
        // No articles found
        const noNewsMessage = document.createElement('p');
        noNewsMessage.textContent = "No news related to this found";
        cardContainer.appendChild(noNewsMessage);
        return;
    }

    articles.forEach((article)=> {
        if(!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true);
        fillData(cardClone, article)
        cardContainer.appendChild(cardClone);
    });
}
//fill data in cards
function fillData(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDescription = cardClone.querySelector('#news-description');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;
//Date time
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} • ${date}`;

//Open article when clicked on a new page
    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank");
    });
}

let selectNav = null;
function onNavClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    selectNav?.classList.remove('active');
    selectNav = navItem;
    selectNav.classList.add('active');
}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    selectNav?.classList.remove('active');
    selectNav = null;
});
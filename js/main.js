//! Selectors
const auth = "Eml8dWsZpPrZedSmmvdaHAMW3EjhsasrbVw5HV4t1JBbNrsR8F0dxytU";
const gallery = document.querySelector(".gallery");
const search_input = document.querySelector("#search");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let fetch_link;
let search_value;
let page = 1;
let current_search;

//! Event Listeners
search_input.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    current_search = search_value;
    searchPhotos(search_value);
})
more.addEventListener("click", loadMore);

//! Update Input 
function updateInput(e) {
    search_value = e.target.value;
}


//! Fetch Api
async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method : "GET",
        headers : {
            Accept: "application/json",
            Authorization: auth,
        },
    });
    const data = await dataFetch.json();
    return data;
}

//! Generation
function generationPicture (data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
            <p><i class="fa-solid fa-user"></i> ${photo.photographer}</p>
            <a href="${photo.src.large}" target="_blanc"><i class="fa-sharp fa-solid fa-circle-down"></i> Download</a>
        </div>
        <img src="${photo.src.large}" alt="${photo.photographer}">
        `;
        gallery.appendChild(galleryImg)
    });
} 

//! Created Photos
async function  curatedPhotos() {
    fetch_link = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetch_link);
    generationPicture(data);
}

curatedPhotos();

//! Clear
function clear() {
    gallery.innerHTML = "";
    search_input.innerHTML = "";
}
//! Search Photos
async function searchPhotos(query) {
    clear();
    fetch_link = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetch_link);
    generationPicture(data);
}

//! Load More
async function loadMore() {
    page++;
    if (current_search) {
        fetch_link = `https://api.pexels.com/v1/search?query=${current_search}+query&per_page=15&page=${page}`; 
    } else {
        fetch_link = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetch_link);
    generationPicture(data);
}
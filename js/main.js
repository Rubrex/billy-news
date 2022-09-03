// Global variables
const categoryNav = document.getElementById("category-nav");
const cardsContainer = document.getElementById("cards-container");
// IIFE for loading Categories
(async function getCategory(categoryNav) {
  const uri = "https://openapi.programming-hero.com/api/news/categories";
  const response = await fetch(uri);
  const data = await response.json();
  showCategory(data.data.news_category);
})();

function showCategory(categories) {
  categories.forEach(function (category) {
    const li = document.createElement("li");
    li.innerHTML = `
    <a id="${category.category_id}">${category.category_name}</a>
    `;
    categoryNav.appendChild(li);
  });
}

// Display News When clicked on a category
categoryNav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    loadNews(e.target.id);
  }
});

async function loadNews(category_id) {
  const uri = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const response = await fetch(uri);
  const data = await response.json();
  showNews(data.data);
}

function showNews(allNews) {
  cardsContainer.innerHTML = "";
  allNews.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="bg-white rounded-md shadow-md my-6 cursor-pointer hover:shadow-sm transition-shadow" id="${news._id}">
    <div class="grid grid-cols-1 md:grid-cols-4 p-6">
      <!-- News Image -->
      <div class="mr-2 mb-4 md:mb-0">
        <img
          src="${news.thumbnail_url}"
          alt=""
          class="mx-auto md:mx-0"
        />
      </div>
      <!-- News Description -->
      <div class="col-span-3 flex flex-col justify-around">
        <h2
          class="text-articleHeadingColor text-xl md:text-2xl font-bold"
        >
          ${news.title}
        </h2>
        <p class="text-articlePeraColor text-md md:text-xl mt-2 md:mt-0">
         ${news.details}
        </p>
        <div
          class="flex justify-between flex-wrap items-center mt-4 md:mt-0"
        >
          <!-- Author -->
          <div class="text-articleRatingsColor flex">
            <img src="${news.author.img}" alt="" class="w-12 mr-3" />
            <div class="flex flex-col text-slate-700">
              <p class="font-medium">${news.author.name}</p>
              <p class="text-slate-400">${news.author.published_date}</p>
            </div>
          </div>
          <!-- Views -->
          <div class="font-bold text-xl text-slate-700 px-2">
            <i class="fa-regular fa-eye"></i>
            <span>${news.total_view}</span>
          </div>
          <!-- Star Ratings -->
          <div>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <!-- arrow -->

          <i
            class="fa-solid fa-arrow-right text-blue-600 text-2xl hover:translate-x-1 cursor-pointer transition-all"
          ></i>
        </div>
      </div>
    </div>
  </div>
    `;
    cardsContainer.appendChild(div);
  });
}

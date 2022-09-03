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

// Display if News found and how many
function countNewsOrEmpty(data, catagoryName) {
  const countNews = document.getElementById("count-news");
  if (data.length === 0) {
    countNews.innerText = `No news found for category ${catagoryName}`;
  } else {
    countNews.innerText = `${data.length} Items found for category ${catagoryName}`;
  }
}

// Display News When clicked on a category

categoryNav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    const catagoryName = e.target.innerText;
    loadNews(e.target.id, catagoryName);
    // Clear active class on all buttons
    const navBtns = document.querySelectorAll("#category-nav>li>a");
    navBtns.forEach((btn) => btn.classList.remove("active"));
    // Add active class
    const btn = document.getElementById(e.target.id);
    btn.classList.toggle("active");
  }
});

async function loadNews(category_id, catagoryName) {
  const uri = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const response = await fetch(uri);
  const data = await response.json();
  showNews(data.data);
  countNewsOrEmpty(data.data, catagoryName);
}

function checkMaximumWords(texts) {
  if (texts.length > 500) {
    const trimedText = texts.slice(0, 500) + " ...";
    return trimedText;
  } else {
    return texts;
  }
}

function showNews(allNews) {
  cardsContainer.innerHTML = "";
  allNews.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="bg-white rounded-md shadow-md my-6 cursor-pointer hover:shadow-sm transition-shadow" id="${
      news._id
    }">
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
        <p class="text-articlePeraColor text-md md:text-lg mt-2 md:mt-0">
         ${checkMaximumWords(news.details)}
        </p>
        <div
          class="flex justify-between flex-wrap items-center mt-4 md:mt-0"
        >
          <!-- Author -->
          <div class="text-articleRatingsColor flex">
            <img src="${
              news.author.img
            }" alt="" class="w-12 mr-3 rounded-full" />
            <div class="flex flex-col text-slate-700">
              <p class="font-medium">${
                news.author.name ? news.author.name : "No data found"
              }</p>
              <p class="text-slate-400">${news.author.published_date}</p>
            </div>
          </div>
          <!-- Views -->
          <div class="font-bold text-xl text-slate-700 px-2">
            <i class="fa-regular fa-eye"></i>
            <span>${news.total_view ? news.total_view : "Not Found"}</span>
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

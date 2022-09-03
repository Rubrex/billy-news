// Global variables
const categoryNav = document.getElementById("category-nav");

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
    li.setAttribute("id", category.category_id);
    li.innerHTML = `
    <a>${category.category_name}</a>
    `;
    categoryNav.appendChild(li);
    console.log("worked");
  });
}

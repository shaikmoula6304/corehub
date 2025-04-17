// Get DOM elements
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const blogCards = document.querySelectorAll(".blog-card");

// Event Listeners
searchInput.addEventListener("input", filterPosts);
categorySelect.addEventListener("change", filterPosts);

// Filter Function
function filterPosts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  blogCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();
    const tags = Array.from(card.querySelectorAll(".tag")).map(tag =>
      tag.textContent.toLowerCase()
    );

    const matchesSearch =
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      tags.some(tag => tag.includes(searchTerm));

    const matchesCategory =
      selectedCategory === "all" || tags.includes(selectedCategory.toLowerCase());

    // Show/hide card based on search + category match
    if (matchesSearch && matchesCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

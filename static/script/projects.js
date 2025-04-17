const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Toggle active class
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      const difficulty = card.getAttribute("data-difficulty");
      if (filter === "all" || difficulty === filter) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.opacity = "0";
        setTimeout(() => card.style.display = "none", 300);
      }
    });
  });
});

const modal = document.getElementById("projectModal");
const closeModal = document.querySelector(".close-btn");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("modalTitle").innerText = card.querySelector("h3").innerText;
    document.getElementById("modalTech").innerText = card.querySelector("p:nth-child(2)").innerText;
    document.getElementById("modalDesc").innerText = card.querySelector("p:nth-child(3)").innerText;
    document.getElementById("modalLink").href = card.querySelector("a").href;
    modal.style.display = "block";
  });
});

closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; }


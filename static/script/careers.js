document.getElementById('searchInput').addEventListener('keyup', function () {
    const searchQuery = this.value.toLowerCase();
    const cards = document.querySelectorAll('.career-card');
  
    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      if (title.includes(searchQuery)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
  
// Course Filter Script
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const courseCards = document.querySelectorAll(".course-card");
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        // Add active to clicked button
        button.classList.add("active");
  
        const selectedCategory = button.getAttribute("data-filter");
  
        courseCards.forEach(card => {
          const cardCategory = card.getAttribute("data-category");
  
          if (selectedCategory === "all" || selectedCategory === cardCategory) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  });
  


  const phrases = [
    "Welcome to CoreHub.",
    "Master VLSI, Embedded & Arduino.",
    "Build Projects. Get Inspired.",
    "Your ECE Journey Starts Here."
  ];
  
  let currentPhrase = 0;
  let currentChar = 0;
  const speed = 100;
  const delay = 2000;
  const typewriter = document.getElementById("typewriter");
  
  function type() {
    if (currentChar < phrases[currentPhrase].length) {
      typewriter.textContent += phrases[currentPhrase].charAt(currentChar);
      currentChar++;
      setTimeout(type, speed);
    } else {
      setTimeout(erase, delay);
    }
  }
  
  function erase() {
    if (currentChar > 0) {
      typewriter.textContent = phrases[currentPhrase].substring(0, currentChar - 1);
      currentChar--;
      setTimeout(erase, speed / 2);
    } else {
      currentPhrase = (currentPhrase + 1) % phrases.length;
      setTimeout(type, speed);
    }
  }
  
  document.addEventListener("DOMContentLoaded", type);
  
  
  const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const increment = target / 200;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };

  // Trigger when section scrolls into view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCount();
        observer.unobserve(entry.target); // run only once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);
});

// ====== Mobile Menu Toggle ======
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
}

// ====== Dark Mode Toggle ======
const darkModeToggle = document.querySelector('#darkModeToggle');

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// ====== Year Filter Buttons ======
const yearButtons = document.querySelectorAll('.year-options button');

yearButtons.forEach(button => {
  button.addEventListener('click', () => {
    const year = button.textContent;
    console.log(`Filtering content for: ${year}`);
    // Later: Load specific year-based content here
  });
});

const counters = document.querySelectorAll('.counter');

const runCounter = (counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

counters.forEach(counter => counterObserver.observe(counter));

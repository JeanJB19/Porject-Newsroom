// -------------------- Scroll to Top --------------------
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
  function updateScrollBtn() {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  }

  window.addEventListener("scroll", updateScrollBtn);
  updateScrollBtn(); // run once on load

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// -------------------- Dropdown / Hamburger --------------------
const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");

if (menuToggle && sideMenu) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = sideMenu.style.display === "block";
    sideMenu.style.display = isOpen ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      sideMenu.style.display = "none";
    }
  });

  sideMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sideMenu.style.display = "none";
    });
  });
}

// -------------------- Dark Mode Toggle --------------------
const themeToggle = document.getElementById("themeToggle");

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Only update button if it exists on this page
  if (themeToggle) themeToggle.textContent = isDark ? "☀️" : "🌙";
}

// Load saved theme on every page (even if button is missing)
const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "dark");

// Toggle if button exists
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark"));
  });
}

// Newsletter popup + Formspree success state
(() => {
  const fab = document.getElementById("newsletterFab");
  const modal = document.getElementById("newsletterModal");
  const closeBtn = document.getElementById("newsletterClose");
  const form = modal?.querySelector(".newsletter-form");
  const success = modal?.querySelector(".newsletter-success");

  if (!fab || !modal || !closeBtn || !form || !success) return;

  const open = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    fab.style.display = "none";
  };

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    fab.style.display = "";
  };

  fab.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.querySelectorAll('a[href="#newsletter"]').forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
  });

  // Formspree submit (AJAX)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      form.hidden = true;
      success.hidden = false;
    }
  });
})();

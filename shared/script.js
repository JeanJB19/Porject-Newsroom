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
  updateScrollBtn();

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
    sideMenu.style.display =
      sideMenu.style.display === "block" ? "none" : "block";
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
  if (themeToggle) themeToggle.textContent = isDark ? "☀️" : "🌙";
}

setTheme(localStorage.getItem("theme") === "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark"));
  });
}

// -------------------- Newsletter Modal (Brevo) --------------------
(() => {
  const fab = document.getElementById("newsletterFab");
  const modal = document.getElementById("newsletterModal");
  const closeBtn = document.getElementById("newsletterClose");

  if (!fab || !modal || !closeBtn) return;

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

  // Open modal
  fab.addEventListener("click", open);

  // Close modal
  closeBtn.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Open from menu link
  document.querySelectorAll('a[href="#newsletter"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
  });

})();

// -------------------- Form Handling --------------------
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    // Allow Brevo to handle its own form
    if (form.id === "sib-form") return;

    // Other forms (if any)
    e.preventDefault();

    const data = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const closeSidebar = document.getElementById("closeSidebar");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("backdrop");
  const header = document.getElementById("siteHeader");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a[data-nav-link]");

  function openMenu() {
    if (!sidebar || !backdrop) return;
    sidebar.classList.add("open");
    backdrop.classList.add("active");
    document.body.classList.add("menu-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "true");
    sidebar.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    if (!sidebar || !backdrop) return;
    sidebar.classList.remove("open");
    backdrop.classList.remove("active");
    document.body.classList.remove("menu-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
    sidebar.setAttribute("aria-hidden", "true");
  }

  if (menuButton) menuButton.addEventListener("click", openMenu);
  if (closeSidebar) closeSidebar.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("scroll", function () {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  sidebarLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  const copyButtons = document.querySelectorAll("[data-copy]");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      const value = button.getAttribute("data-copy");
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        const oldText = button.textContent;
        button.textContent = "Скопировано";
        setTimeout(() => {
          button.textContent = oldText;
        }, 1400);
      } catch (error) {
        alert("Не удалось скопировать. Скопируйте вручную: " + value);
      }
    });
  });

  const requestForm = document.getElementById("requestForm");
  if (requestForm) {
    requestForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const company = document.getElementById("company")?.value.trim() || "";
      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      const subject = encodeURIComponent("Заявка с сайта Геотехнология");
      const body = encodeURIComponent(
        "Компания: " + company + "\n" +
        "Контактное лицо: " + name + "\n" +
        "Телефон: " + phone + "\n" +
        "E-mail: " + email + "\n\n" +
        "Сообщение:\n" + message
      );

      window.location.href = "mailto:t-stail@mail.ru?subject=" + subject + "&body=" + body;
    });
  }
});
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  const hideOffset = 90;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - lastScrollY) >= 8) {
      const shouldHide =
        currentScrollY > lastScrollY &&
        currentScrollY > hideOffset &&
        !header.classList.contains("menu-open");

      header.classList.toggle("is-hidden", shouldHide);
      lastScrollY = currentScrollY;
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true }
  );

  /* Mobile menu toggle */
  const menuToggle = header.querySelector(".nav-toggle");
  const navPanel = header.querySelector(".nav-panel");

  function setMenu(open) {
    if (!menuToggle || !navPanel) return;
    navPanel.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
  }

  if (menuToggle && navPanel) {
    menuToggle.addEventListener("click", () => {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });
  }

  /* "Patients & Providers" dropdown */
  const dropdownToggle = header.querySelector(".nav-dropdown-toggle");
  const dropdown = header.querySelector(".nav-dropdown");

  function setDropdown(open) {
    if (dropdownToggle) dropdownToggle.setAttribute("aria-expanded", String(open));
  }

  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", () => {
      setDropdown(dropdownToggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) setDropdown(false);
    });

    dropdown.addEventListener("focusout", (event) => {
      if (event.relatedTarget && !dropdown.contains(event.relatedTarget)) setDropdown(false);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (dropdownToggle && dropdownToggle.getAttribute("aria-expanded") === "true") {
      setDropdown(false);
      dropdownToggle.focus();
    } else if (header.classList.contains("menu-open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  /* Reset the mobile menu when returning to desktop width */
  window.matchMedia("(min-width: 1280px)").addEventListener("change", (mq) => {
    if (mq.matches) setMenu(false);
  });
})();
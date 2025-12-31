(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  const hideOffset = 90;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - lastScrollY) < 8) return;

    if (currentScrollY > lastScrollY && currentScrollY > hideOffset) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
  });
})();

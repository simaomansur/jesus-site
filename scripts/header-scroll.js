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
        currentScrollY > hideOffset;

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
})();
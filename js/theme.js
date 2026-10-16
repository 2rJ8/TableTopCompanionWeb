document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector("[data-theme-toggle]");

  if (!themeToggle) {
    return;
  }

  const savedTheme = localStorage.getItem("table-top-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = document.body.dataset.defaultTheme;
  const initialTheme =
    savedTheme === "dark" ||
    (!savedTheme && (defaultTheme === "dark" || prefersDark))
      ? "dark"
      : "light";

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.body.classList.toggle("theme-after-game", isDark);
    document.body.classList.toggle("theme-daylight", !isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro",
    );
    themeToggle.dataset.tooltip = isDark ? "Tema claro" : "Tema oscuro";

    const icon = themeToggle.querySelector("[data-lucide]");
    if (icon) {
      icon.setAttribute("data-lucide", isDark ? "sun" : "moon");
      window.lucide?.createIcons();
    }
  };

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-after-game")
      ? "light"
      : "dark";
    localStorage.setItem("table-top-theme", nextTheme);
    applyTheme(nextTheme);
  });
});

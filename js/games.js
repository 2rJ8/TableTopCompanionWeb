// Esperamos a que todo el HTML esté cargado antes de buscar elementos.
document.addEventListener("DOMContentLoaded", () => {
  // Guardamos referencias a las partes de la página que vamos a controlar:
  // el formulario, el campo de texto, los filtros y las tarjetas de juegos.
  const searchForm = document.querySelector("[data-game-search]");
  const searchInput = document.querySelector("#game-query");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-game-card]");
  const resultCount = document.querySelector("[data-results-count]");
  const emptyResults = document.querySelector("[data-empty-results]");
  const filterCheckboxes = document.querySelectorAll("[data-filter-checkbox]");
  const clearFiltersButton = document.querySelector("[data-clear-filters]");

  // Si falta algún elemento necesario, detenemos el script.
  // Así evitamos errores si este archivo se usa en otra página.
  if (!searchForm || !searchInput || !resultCount || !emptyResults) {
    return;
  }

  // Al principio se muestran todas las categorías.
  let activeFilter = "todos";

  // Esta función decide qué tarjetas deben aparecer.
  const updateResults = () => {
    // Leemos lo escrito por el usuario:
    // trim() elimina espacios sobrantes y toLocaleLowerCase()
    // permite comparar el texto sin distinguir mayúsculas.
    const query = searchInput.value.trim().toLocaleLowerCase("es");
    let visibleCount = 0;

    // Revisamos las tarjetas una por una.
    const selectedFilters = [...filterCheckboxes]
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    cards.forEach((card) => {
      // Una tarjeta pasa el filtro si:
      // - está seleccionada la opción "todos", o
      // - su categoría coincide con el filtro activo.
      const matchesFilter =
        selectedFilters.length > 0
          ? selectedFilters.includes(card.dataset.category)
          : activeFilter === "todos" || card.dataset.category === activeFilter;

      // data-search contiene las palabras por las que se puede encontrar
      // cada juego, por ejemplo su nombre, temática o mecánica.
      const matchesQuery = (card.dataset.search || "").includes(query);

      // La tarjeta solo se muestra cuando cumple las dos condiciones.
      const isVisible = matchesFilter && matchesQuery;

      // La propiedad hidden añade o quita visualmente la tarjeta.
      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    // Actualizamos el texto "X juegos" de la parte superior.
    // Usamos "juego" en singular cuando solo hay un resultado.
    resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "juego" : "juegos"}`;

    // Mostramos el mensaje de vacío únicamente si no hay resultados.
    emptyResults.hidden = visibleCount !== 0;
  };

  // Evitamos que el formulario recargue la página al pulsar "Buscar".
  // Después volvemos a aplicar la búsqueda.
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateResults();
  });

  // También filtramos mientras el usuario escribe, sin tener que pulsar el botón.
  searchInput.addEventListener("input", updateResults);

  // Añadimos un evento a cada botón de categoría.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // data-filter indica la categoría del botón pulsado.
      activeFilter = button.dataset.filter || "todos";

      // Quitamos el estado activo de los demás botones y se lo damos
      // únicamente al botón que se acaba de pulsar.
      filterButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      // Actualizamos las tarjetas con el nuevo filtro.
      updateResults();
    });
  });

  // Los checkboxes del panel lateral permiten combinar varias categorías.
  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      activeFilter = "todos";
      updateResults();
    });
  });

  // Restablecemos la búsqueda y todos los filtros del panel.
  clearFiltersButton?.addEventListener("click", () => {
    searchInput.value = "";
    filterCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    activeFilter = "todos";
    updateResults();
  });

  // Ejecutamos una primera vez la función para mostrar el estado inicial.
  updateResults();
});

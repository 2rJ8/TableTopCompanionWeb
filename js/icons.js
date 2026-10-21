/*
 * Inicializa los iconos Lucide declarados con data-lucide.
 * La libreria se carga desde el CDN en cada pagina que utilice iconos.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.lucide) {
    console.error("Lucide no se ha cargado. Revisa el script del CDN.");
    return;
  }

  window.lucide.createIcons();
});

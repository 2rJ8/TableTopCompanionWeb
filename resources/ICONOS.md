# Iconos Lucide

La interfaz utiliza [Lucide](https://lucide.dev/) para los iconos. La
documentación de referencia para el tamaño es:
<https://lucide.dev/guide/lucide/basics/sizing>.

El catálogo visual está disponible en
[HTML/iconos.html](../HTML/iconos.html) y se puede abrir desde el botón de
configuración de la página principal.

## Preparar una página nueva

Incluye la hoja de estilos genérica, el CDN de Lucide y el inicializador local
antes de cerrar `body`:

```html
<link rel="stylesheet" href="../CSS/generic/icons.css" />
<script src="https://unpkg.com/lucide@latest"></script>
<script src="../JS/icons.js"></script>
```

Si la página está en la raíz, como `index.html`, utiliza:

```html
<link rel="stylesheet" href="CSS/landing.css" />
<script src="https://unpkg.com/lucide@latest"></script>
<script src="JS/icons.js"></script>
```

`landing.css` ya importa `CSS/generic/icons.css`.

## Usar un icono

Escribe el nombre del icono en `data-lucide`. Lucide reemplazará el elemento
por un SVG cuando se ejecute `createIcons()`:

```html
<button class="btn" type="button">
  <i data-lucide="settings" class="icon--md" aria-hidden="true"></i>
  Configuración
</button>
```

Los nombres disponibles se encuentran en
<https://lucide.dev/icons/>.

## Tamaños disponibles

`icons.css` define tamaños reutilizables:

| Clase       | Tamaño |
| ----------- | -----: |
| `.icon--xs` |  14 px |
| `.icon--sm` |  16 px |
| `.icon--md` |  20 px |
| `.icon--lg` |  24 px |
| `.icon--xl` |  32 px |

Sin una clase de tamaño, el icono utiliza `1em` y se adapta al tamaño de
fuente del elemento que lo contiene. El color se hereda automáticamente de
`currentColor`.

## Accesibilidad

Los iconos decorativos deben incluir `aria-hidden="true"`. Si un icono es la
única información de un botón, el botón debe tener un nombre accesible:

```html
<a
  class="header-icon-button"
  href="HTML/iconos.html"
  aria-label="Configuración"
>
  <i data-lucide="settings" class="icon--md" aria-hidden="true"></i>
</a>
```

## Nota sobre el CDN

El proyecto usa el CDN de Lucide para no añadir un gestor de paquetes. Para
una aplicación sin conexión o producción con control estricto de dependencias,
se puede sustituir posteriormente por el paquete `lucide` o `lucide-static`.

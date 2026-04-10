# CRONO TEST 01
Sistema de cronometraje deportivo GPS — Lo Barnechea / Cajón del Arrayán

## Estructura
```
crono-test-01/
├── index.html        → Redirect a landing
├── landing.html      → Presentación del trazado
├── crono.html        → App de cronometraje con mapa GPS
├── assets/
│   └── ruta.js       → Datos de ruta y waypoints
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── manifest.json     → PWA manifest
├── sw.js             → Service Worker (offline)
└── README.md
```

## Deploy en GitHub Pages
1. Crear repo `crono-test-01` en github.com/horta30
2. Subir todos estos archivos a la rama `main`
3. Settings → Pages → Branch: main → / (root) → Save
4. URL: `https://horta30.github.io/crono-test-01/`

## Trazado
- **INICIO CRONO** → activa el cronómetro automáticamente (radio 30m)
- **W Quebrada** → Parcial 1
- **W Colegio** → Parcial 2
- **W Cajón** → Parcial 3
- **FIN CRONO** → detiene el timer + pantalla de resultados

## Uso
Abrir URL en celular → ACTIVAR GPS → dirigirse al INICIO → el timer arranca solo.

# Assets

```
assets/
├── brand/        Logo AC World (favicon, PWA)
├── fonts/        Polices auto-hébergées : Baloo 2, Baloo Bhaijaan 2, Nunito
├── tech/         Logos de la section « Construit avec »
├── social/       Images de partage 1200×630 (URL stables, non hashées au build)
├── games/<jeu>/  background.webp, icône, screens/*.webp
├── apps/         Visuels des apps masquées (DriveWise)
└── source/       SVG éditables des arrière-plans
```

- Les icônes de Block Drift et Robot Defense sont les fichiers d'origine, inchangés.
- Une capture de jeu : format 1206×2622, convertie en WebP de 520 px de large, dans `games/<jeu>/screens/`.
- Block Drift n'a pas encore de captures : sa page utilise des illustrations. Pour les remplacer, déposez les captures dans `games/block-drift/screens/` et utilisez le bloc `.phone`.

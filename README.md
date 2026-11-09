# Cloudfake Status

Een fictieve statuspagina, gebouwd met Hugo en Tailwind CSS. De verificatiecheckbox weigert iedere poging met toenemend droge feedback.

## Ontwikkelen

```bash
./scripts/setup.sh
./scripts/dev.sh
```

## Productiebuild

```bash
./scripts/build.sh
```

De statische site wordt naar `public/` geschreven.

Hugo en Tailwind draaien als lokale standalone binaries. Node.js en npm zijn
niet nodig.

## GitHub Pages

Iedere push naar `main` bouwt en publiceert de site automatisch via GitHub
Actions. De workflow kan ook handmatig gestart worden via de Actions-tab.

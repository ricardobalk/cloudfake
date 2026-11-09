# Cloudfake Status

Een fictieve beveiligingspagina, gebouwd met Hugo en Tailwind CSS. Na de verificatie verschijnt een zelfgekozen blokkade- of foutpagina.

Kies bovenaan tussen een blokkade, Error 1020 en serverfouten 502 en 520–526.
Met Preview bekijk je het resultaat direct. Het thema volgt standaard je systeem;
je kunt ook Light of Dark kiezen. Beide voorkeuren worden lokaal onthouden.

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

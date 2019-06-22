# GlouGlou
A vine cellar management application
## Features
- Fetch a list of wines from an api
- Store a list of wines in localStorage
- Create a new wine locally
- Display wine's informations
- Remove a wine locally created
- Scan a QRCode and show the wine related to it
- Set an url to fetch the wines on
- Multiples themes availables
## Data model

For now, the app represents a single wine cellar containing multiples wines.
A vine batch present itself like this :
```javascript
{
  "id": 1,
  "bottleCount" : 5000,
  "country" : "Va-t-y quand ?",
  "dateAdded" : 1558001469770,
  "name" : "Chat tout neuf du Pape",
  "year" : 1404,
  "vineYard" : "Vignoble personnage"
}
```

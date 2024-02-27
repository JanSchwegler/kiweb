console.log("test");
const container = document.querySelector('.container');
const containerWidth = container.offsetWidth;
const divWidth = 100; // Breite eines Divs
const marginWidth = 50; // Breite des Abstands zwischen den Divs

// Anzahl der Divs berechnen, die in eine Zeile passen
const divsPerRow = Math.floor(containerWidth / (divWidth + marginWidth));

// Anzahl der Divs berechnen, um die Fläche zu füllen
const totalDivs = Math.ceil(container.childElementCount / divsPerRow) * divsPerRow;

// Divs hinzufügen oder entfernen, um die Fläche zu füllen
while (container.childElementCount < totalDivs) {
  const div = document.createElement('div');
  container.appendChild(div);
}

while (container.childElementCount > totalDivs) {
  container.lastElementChild.remove();
}

// Faktor berechnen, um die Höhe der Divs zwischen 100 und 200 Pixel zu variieren
const factor = Math.random(); // Beispiel für zufälligen Faktor zwischen 0 und 1

// CSS Variable setzen, um die Höhe der Divs zu steuern
container.style.setProperty('--factor', factor);
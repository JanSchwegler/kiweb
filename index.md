Diese Dokumentation zeigt meinen Arbeitsprozess bei der Entwicklung meines Semesterprojekts auf und bietet Einblicke in Herausforderungen, Erfolge und Fortschritte während des gesamten Moduls.

[Hier geht es direkt zum Semesterprojekt](radiohead/){:target="_blank"}

# Auswahl Plakat
Zu Beginn des Moduls habe ich mir die verschiedenen Plakate angesehen und folgende für mich interessante herausgesucht:

![01](doku/posters/radiohead.jpeg) | ![02](doku/posters/02.jpg) | ![03](doku/posters/03.jpeg) | ![04](doku/posters/04.jpeg)
------------ | ------------- | ------------- | -------------
![05](doku/posters/05.png) | ![06](doku/posters/06.png) | ![07](doku/posters/07.jpeg) | ![08](doku/posters/08.jpeg)

Aus den 8 vorausgewählten Plakaten habe ich mich für folgendes Plakat für Radiohead entschieden:

![Radiohead Plakat](doku/posters/radiohead.jpeg)

# Umsetzung
## Planung & Vorarbeit
### Schrift
Bevor ich mit der Umsetzung startete, brauchte ich eine passende Schrift, um das Plakat umzusetzen. Die im Plakat verwendete Schrift ist nicht gratis verfügbar und ich habe mich somit für eine Alternative umgesehen. Nach ein paar Vergleichen, habe ich mich für die Schrift ["Roboto"](https://fonts.google.com/specimen/Roboto){:target="_blank"} entschieden. Diese konnte ich später mit Google Fonts sehr simpel einbinden.

### Konzept
Da im Web im Vergleich zum Originalplakat andere Dimensionen und Möglichkeiten existieren, passte ich das Aussehen und den Aufbau des Plakates etwas an. Mein Plakat wollte ich so adaptieren und umsetzen, dass die Website nur 100vh hoch ist und somit nicht scrollbar. Dadurch wird genau eine Bildschirmgrösse voll mit dem Nachbau des Plakats ausgefüllt. Bevor ich diese Idee in HTML & CSS umsetzt, habe ich diese in Figma kurz umgesetzt und getestet.

Zudem habe ich mir Gedenken dazu gemacht, wie sich das Plakat an die verschiedenen Bildschirmgrössen und Verhältnissen anpasst: Ich habe nun den roten Bandname mit den darüberliegenden Informationen ganz an den unteren Bildschirmrand geschoben und nur darüber die schwarzen Balken erstellt.

Für Animationen, Interaktionen und den detailliertem Mobileaufbau habe ich mich für keine meiner Ideen entschieden und ausgearbeitet, da ich zuerst den Grundaufbau erarbeitet wollte, um diesen im Anschluss weiter auszubauen.

### Github
Von Anfang an habe ich ein GitHub-Repository für das Modul erstellt, um sicherzustellen, dass der neuste Stand meines Codes stets auf allen Geräten verfügbar ist. Zudem habe ich jedoch ebenfalls einen Google Drive Ordner für weitere Inhalte wie die Dokumentation erstellt. Denn zuerst habe ich diese in Google Drive geschrieben, da ich sehr wenig Erfahrung mit GitHub habe und auch die verschiedenen Möglichkeiten nicht kenne. Im Verlauf des Moduls konnte ich mich auch etwas mehr mit GitHub auseinandersetzen und habe somit versucht, GitHub Pages zu verwenden und auch meine Seite direkt mit GitHub onlinezustellen.

## Erster Nachbau mit HTML & CSS
Für den Aufbau in HTML habe ich den Inhalt in zwei Teile unterteilt. Den Bereich mit dem Bandnamen sowie den Informationen am unteren Bildrand und die schwarzen Balken darüber. Zuerst habe ich den Bandnamen auf allen Gerätdimensionen mithilfe von "vw" über die gesamte Breite gestreckt und mit "position: absolute" am unteren Bildrand platziert. Auch den Abstand nach unten habe ich von der Breite abhängig gemacht, damit dieser visuell immer identisch wirkt. Im Anschluss habe ich mithilfe von "Flexbox" die drei Informationsblöcke wie auf dem Poster über dem Bandnamen verteilt. Hier war es eher schwer, die richtigen Abstände und Breiten zu wählen, damit die Inhaltsblöcke auch bei unterschiedlichen Bildschirmbreiten so wie auf dem Plakat aussehen. Die Schwierigkeit kam davon, dass der Bandname mit der Breite mitskaliert, die Schriftgrösse der Informationen jedoch nicht, damit diese auf jeder Breite lesbar sind.

Neben den genannten Positionierungen habe ich in CSS ebenfalls die Schriftfamilie, Schriftschnitt, Schriftfarbe, Hintergrundfarben und Browserrests definiert.

## Adaptive generierung der Balken mit JavaScript
Ich wollte, dass die schwarzen Balken den gesamten freien Bereien über dem Textblock veralufen. Alle Balken sollten ca. so Breit wie auf dem Plakat sein und wenn möglich dessen Breite auch nicht verändern. Da der Obere Bereich, je nach Fenstergrösse unterschiedlich hoch ist, bedeutet das, dass sich die Anzahl der Balken verändern muss, solange wie Höhe dieser und dessen Abstände zueinander statisch ist. Somit habe ich versucht ein JavaScript-Code zu schreiben, welcher den freien oberen Bereich abmisst und mit den Balken auffüllt. Das stellte sich jeodch als viel komplexer heraus als gedacht, denn es tauchten laufend Fehler auf. Beispielsweise wurde aus verschiedenen Gründen Teilweise der Gesamte Body nach oben oder unten verschoben. Das komische war ebenfalls, dass diese Verschiebung oder auch andere Fehler nicht konsistens waren, sondern sich auch ohne Codeanpassung beim nächsten Neuladen etwas veränderten. Somit konnte das Problem auch mit entgegenwirkenden Abständen nicht behoben werden.

Aktuell werden die Balken nun wie folgt generiert:
- Um die Anzahl der Balken zu bestimmen, wird die Höhe der Fläche durch die optimale Balkenhöhe geteilt.
- Mit der berechneten Anzahl und der gesamten Höhe, wird die effektive Höhe der Balken berechnet und in jedem Fall die gesame Fläche zu füllen.
- Im letzten Schritt wir die berechnete Anzahl der Balken mit der berechneten Höhe erstellt und ins HTML eingefügt.

## Responsive
Da die Balken basierend auf den Bildschimdimensionen berechnet werden, müssen diese angepasst werden, soblad sich die Fesntergrösse verändert. Dadurch werden bei jeder Veränderung die Balken entfernt und neu generiert.

Die drei Informationsblöcke müssen sich ebenfalls auf schmaleren Geräten verändern, da diese ansonsten sehr zusammengedrückt werden und unleserlich sind. Für resposive CSS Veränderungen habe ich 2 Breakpoints definert:

Tablet:
`@media screen and (max-width: 991px)`

Mobile:
`@media screen and (max-width: 767px)`

Beim Welchsel auf Tabletgrössen wurden zum aktuellen Stand nur Abstände angepasst. Hingegen bei den Mobilegrössen wurden die Informationsblöcke übereinander statt zuvor nebeneinander angeordnet.

## Erste CSS Animationen


[Link in new Tab](radiohead/){:target="_blank"}
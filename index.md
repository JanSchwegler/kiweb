Diese Dokumentation zeigt meinen Arbeitsprozess bei der Entwicklung meines Semesterprojekts auf und bietet Einblicke in Herausforderungen, Erfolge und Fortschritte während des gesamten Moduls.

[Hier geht es direkt zum Semesterprojekt](radiohead/){:target="_blank"}

# Auswahl Plakat
Zu Beginn des Moduls habe ich mir die verschiedenen Plakate angesehen und folgende für mich interessante herausgesucht:

![01](doku/posters/radiohead.jpeg) | ![02](doku/posters/02.jpg) | ![03](doku/posters/03.jpeg) | ![04](doku/posters/04.jpeg)
------------ | ------------- | ------------- | -------------
![05](doku/posters/05.png) | ![06](doku/posters/06.png) | ![07](doku/posters/07.jpeg) | ![08](doku/posters/08.jpeg)

Aus den 8 vorausgewählten Plakaten habe ich mich für folgendes Plakat für Radiohead entschieden:

![Radiohead Plakat](doku/posters/radiohead.jpeg)

# Umsetzung 1
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
Ich wollte, dass die schwarzen Balken über den gesamten freien Bereich über dem Textblock verlaufen. Alle Balken sollten ca. so breit wie auf dem Plakat sein und wenn möglich dessen Breite auch nicht verändern. Da der obere Bereich je nach Fenstergrösse unterschiedlich hoch ist, bedeutet das, dass sich die Anzahl der Balken verändern muss, solange wie Höhe dieser und dessen Abstände zueinander statisch ist. Somit habe ich versucht, ein JavaScript-Code zu schreiben, welcher den freien oberen Bereich abmisst und mit den Balken auffüllt. Das stellte sich jedoch als viel komplexer heraus als gedacht, denn es tauchten laufend Fehler auf. Beispielsweise wurde aus verschiedenen Gründen teilweise der gesamte Body nach oben oder unten verschoben. Das spezielle daran war ebenfalls, dass diese Verschiebung oder auch andere Fehler nicht konsistent waren, sondern sich auch ohne Codeanpassung beim nächsten Neuladen etwas veränderten. Somit konnte das Problem auch mit entgegenwirkenden Abständen nicht behoben werden.

Aktuell werden die Balken nun wie folgt generiert:
- Um die Anzahl der Balken zu bestimmen, wird die Höhe der Fläche durch die optimale Balkenhöhe geteilt.
- Mit der berechneten Anzahl und der gesamten Höhe wird die effektive Höhe der Balken berechnet und in jedem Fall die gesamte Fläche zu füllen.
- Im letzten Schritt wir die berechnete Anzahl der Balken mit der berechneten Höhe erstellt und ins HTML eingefügt.

## Responsive
Da die Balken basierend auf den Bildschimdimensionen berechnet werden, müssen diese angepasst werden, sobald sich die Fenstergrösse verändert. Dadurch werden bei jeder Veränderung die Balken entfernt und neu generiert.

Die drei Informationsblöcke müssen sich ebenfalls auf schmaleren Geräten verändern, da diese ansonsten sehr zusammengedrückt werden und unleserlich sind. Für responsiv CSS Veränderungen habe ich 2 Breakpoints definiert:

Tablet:
`@media screen and (max-width: 991px)`

Mobile:
`@media screen and (max-width: 767px)`

Beim Wechsel auf Tabletgrössen wurden zum aktuellen Stand nur Abstände angepasst. Hingegen bei den Mobilegrössen wurden die Informationsblöcke übereinander statt zuvor nebeneinander angeordnet.

## Erste CSS Animationen
Schon von Beginn an war mir klar, dass ich die Breite der Balken animieren möchte. Für den Start habe ich mich entschieden, die Animationen mit CSS zu erstellen. Visuell wollte ich, dass sich wie beim Plakat die Balken nur rechts und links kürzen und in der Mitte fortlaufend stehen bleiben. Da sich die Anzahl der Balken verändert, konnte ich die Animationen nicht für alle Möglichkeiten durchplanen. Somit habe ich, um eine Varianz beizubehalten, 6 verschiedene Animationen erstellt, 3 welche den Balken auf der linken Seite kürzen und 3 auf der rechten.

Beispiel:
```
@keyframes bar1 {
  0%   {
    margin-left: -20%;
  }
  50%  {
    margin-left: -40%;
  }
  100% {
    margin-left: -20%;
  }
}
```

Diese Animationen werden nun während der Generierung der Balken zufällig zugewiesen, mit einer zufälligen Dauer von 3 - 6 Sekunden. So konnte ich relativ rasch und ohne ernsthafte Komplikationen einbinden, welche nun das Plakat stark aufwerten.

`div.style.animationName = "bar" + (Math.floor(Math.random() * 6) + 1);`

`div.style.animationDuration = (Math.floor(Math.random() * 4) + 3) + "s";`

Da es öfter als gedacht vorkam, dass mehrere Balken die exakt gleiche Animation und Dauer erhalten haben, habe ich nun die Anzahl der Animationen von gesamthaft 6 auf 10 erhöht. Somit sollte dieser Fall unwahrscheinlicher werden.

## Reaktiv zur Mauposition
Um die Website etwas spannender zu gestalten und eine gewisse Interaktion zu ermöglichen, wollte ich die Website reaktiv zu möglichen  Gerätesensoren verändern. Das Problem ist jedoch, dass die Endgeräte keine gemeinsamen Sensoren besitzen. Ein Tower PC hat beispielsweise sehr wenige oder andere Sensoren als ein Smartphone. Aus diesem Grund habe ich mich für den ersten Versuch auf die Mausposition beschränkt. Diese reaktive Interaktion, sollte im Anschluss mit möglichen Sensoren verbunden werden.

Um eine Tiefe in der Website zu schaffen, wollte ich die bereits Animierten Balken mit der Mausposition nach links oder nach rechts verschieben. Zu Beginn habe ich auspobiert, mit welchen CSS-Manipulationen ich einfach und zuverlässig die gewünschte Verschiebung umsetzen kann. Das war eine Herausforderung, da ich keine Verschiebung oder Abstand verwenden konnten, da die Balken auf beiden Seiten bis nach aussen kommen sollten. Nach verschiedenen Versuchen fand ich die Lösung bei "-Margin". Somit wird der Container der Balken versetzt und gleichzeitig um das verbreitert. Der nachteil liegt darin, dass ich für die eine Seite "margin-left" und für die Andere "margin-right" verwenden muss.

Mit JavaScript habe ich nun versucht die Mausposition in der Breite zu erkennen und auf eine Skala von -1 bis +1 zu übersetzen. Somit konnte ich bei negativen Werten, was eine mausposition auf der linken Seite bedeutet, ein "margin-left" setzen. Somit wird bei positiven Werden ein "margin-right" gesetzt. 

Leider habe ich es mit meinem Code nicht geschafft, ein "Easing" einzufügen. Um einen Sprung zu vermeiden, habe ich beim Verlassen der Maus von der Webiste folgenden Code erstellt. Dieser setzt die vorherigen Margins mit einer Transition von 0.3s auf 0 zurück. Leider konnte ich das Gleiche beim zurückkehren der Maus nicht umsetzten.

```
document.addEventListener('mouseleave', function(event) {
    let barContainer = document.getElementById("barsAnimate");
    barContainer.style.transition = "0.3s";
    barContainer.style.marginLeft = "0%";
    barContainer.style.marginRight = "0%";
});
```

## Überarbeitung Konzept
Bis jetzt habe ich das Plakat auf einer Bildschirmhöhe und -breite umgesetzt. Um mehr entdecken und erleben zu können, wollte ich mehr Inhalt erstellen und hauptsächlich die Website scrollbar machen. Somit habe ich damit begonnen, ein neues Konzept zu entwickeln.

Wie bereits beim ersten Konzept habe ich das Plakat mit dessen Eigenschaften analysiert und weiterentwickelt. Klare Eigenschaften sind:
- Die klaren breiten Rechtecke
- Der Bandname über die gesamte Breite.
- Der schwarzweise Farbstiel
- Die scheinbare horizontale Bewegung der Balken
- Die horizontal bewegte Visualisierung der Musik

Klar war für mich, dass ich die Website über das im Plakat beworbene Konzert mache und somit nicht detailliert auf die Band eingehe. Da meine Website die Musik und dessen immersität zeigen sollte, um das interesse am Konzert zu wecken. Damit war für mich ebenfalls klar, dass ich die Musik der Band in der Website einbinde. Um die visuellen Eigenschaften vom Plakat aufzugreiffen, inludierte ich wie bei der ersten Umsetzung die schwarzen horizontalen Balken.

Schon im Voraus war mir bewusst, dass die Musik erst nach einer Interaktion des Users abgespielt werden kann und somit leider nicht bereits beim laden der Webiste. Somit war sicher, dass beim Einstieg eine ein Playbutton oder eine Musikauswahl erscheinen soll. Um die "Echtheit"

Um meine Ideen zu visualisieren habe ich diese in Figma grob umbesetzt.  


Warum Konzept 2
Idee / Überlegungen





<!---
[Link in new Tab](radiohead/){:target="_blank"}
-->
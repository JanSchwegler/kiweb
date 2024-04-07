Diese Dokumentation zeigt meinen Arbeitsprozess bei der Entwicklung meines Semesterprojekts auf und bietet Einblicke in Herausforderungen, Erfolge und Fortschritte während des gesamten Moduls.

[Hier geht es zur Übersicht](../dokumentation/dokumentation){:target="_blank"}

[Hier geht es direkt zum Semesterprojekt](../v2.2.2_radiohead/){:target="_blank"}

- [Auswahl Plakat](#auswahl-plakat)
- [Sprint 1](#sprint-1)
  - [Planung und Vorarbeit](#planung-und-vorarbeit)
    - [Schrift](#schrift)
    - [Konzept](#konzept)
    - [Github](#github)
  - [Erster Nachbau mit HTML und CSS](#erster-nachbau-mit-html-und-css)
  - [Adaptive generierung der Balken mit JavaScript](#adaptive-generierung-der-balken-mit-javascript)
  - [Responsive](#responsive)
  - [Erste CSS Animationen](#erste-css-animationen)
  - [Reaktiv zur Mauposition](#reaktiv-zur-mauposition)
  - [Überarbeitung Konzept](#überarbeitung-konzept)
- [Sprint 2](#sprint-2)
  - [Grundstruktur](#grundstruktur)
  - [Audioplayer](#audioplayer)
    - [Slider](#slider)
    - [Rotation der Schallplatten](#rotation-der-schallplatten)
    - [Rotation synchron mit der Musik](#rotation-synchron-mit-der-musik)
    - [Minimierung](#minimierung)
    - [Hovertext](#hovertext)
  - [Visualisierung der Audio](#visualisierung-der-audio)
  - [Überarbeitung Konzept (2.2)](#überarbeitung-konzept-22)
  - [Text als Maus](#text-als-maus)
  - [Animierte Balken](#animierte-balken)
  - [Audioplayer](#audioplayer-1)
  - [Ladeanimation](#ladeanimation)
  - [Weitere Schritte](#weitere-schritte)
- [Meine Erkentnisse](#meine-erkentnisse)
  - [Konzept](#konzept-1)
  - [Github](#github-1)
  - [JavaScript](#javascript)
  - [Ziehen von Elementen und Rotation](#ziehen-von-elementen-und-rotation)
  - [Web Audio API](#web-audio-api)
- [Fazit](#fazit)

# Auswahl Plakat
Zu Beginn des Moduls habe ich mir die verschiedenen Plakate angesehen und folgende für mich interessante herausgesucht:

![01](../dokumentation/posters/radiohead.jpeg) | ![02](../dokumentation/posters/02.jpg) | ![03](../dokumentation/posters/03.jpeg) | ![04](../dokumentation/posters/04.jpeg)
------------ | ------------- | ------------- | -------------
![05](../dokumentation/posters/05.png) | ![06](../dokumentation/posters/06.png) | ![07](../dokumentation/posters/07.jpeg) | ![08](../dokumentation/posters/08.jpeg)

Aus den 8 vorausgewählten Plakaten habe ich mich für folgendes Plakat für Radiohead entschieden:

![Radiohead Plakat](../dokumentation/posters/radiohead.jpeg)

# Sprint 1

[Zur Umsetzung 1](../v1_radiohead/){:target="_blank"}

## Planung und Vorarbeit
### Schrift
Bevor ich mit der Umsetzung startete, brauchte ich eine passende Schrift, um das Plakat umzusetzen. Die im Plakat verwendete Schrift ist nicht gratis verfügbar und ich habe mich somit für eine Alternative umgesehen. Nach ein paar Vergleichen, habe ich mich für die Schrift ["Roboto"](https://fonts.google.com/specimen/Roboto){:target="_blank"} entschieden. Diese konnte ich später mit Google Fonts sehr simpel einbinden.

### Konzept
Da im Web im Vergleich zum Originalplakat andere Dimensionen und Möglichkeiten existieren, passte ich das Aussehen und den Aufbau des Plakates etwas an. Mein Plakat wollte ich so adaptieren und umsetzen, dass die Website nur 100vh hoch ist und somit nicht scrollbar. Dadurch wird genau eine Bildschirmgrösse voll mit dem Nachbau des Plakats ausgefüllt. Bevor ich diese Idee in HTML & CSS umsetzt, habe ich diese in Figma kurz umgesetzt und getestet.

Zudem habe ich mir Gedenken dazu gemacht, wie sich das Plakat an die verschiedenen Bildschirmgrössen und Verhältnissen anpasst: Ich habe nun den roten Bandname mit den darüberliegenden Informationen ganz an den unteren Bildschirmrand geschoben und nur darüber die schwarzen Balken erstellt.

Für Animationen, Interaktionen und den detailliertem Mobileaufbau habe ich mich für keine meiner Ideen entschieden und ausgearbeitet, da ich zuerst den Grundaufbau erarbeitet wollte, um diesen im Anschluss weiter auszubauen.

### Github
Von Anfang an habe ich ein GitHub-Repository für das Modul erstellt, um sicherzustellen, dass der neuste Stand meines Codes stets auf allen Geräten verfügbar ist. Zudem habe ich jedoch ebenfalls einen Google Drive Ordner für weitere Inhalte wie die Dokumentation erstellt. Denn zuerst habe ich diese in Google Drive geschrieben, da ich sehr wenig Erfahrung mit GitHub habe und auch die verschiedenen Möglichkeiten nicht kenne. Im Verlauf des Moduls konnte ich mich auch etwas mehr mit GitHub auseinandersetzen und habe somit versucht, GitHub Pages zu verwenden und auch meine Seite direkt mit GitHub onlinezustellen.

## Erster Nachbau mit HTML und CSS
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
[Zum Figma-Konzept](https://www.figma.com/proto/Jf3XwwHms7cNMmfXE3pFYC/Untitled?type=design&node-id=15-2&t=LuxFAy5mCFoXrwBJ-1&scaling=min-zoom&starting-point-node-id=15%3A2&mode=design){:target="_blank"}

Bis jetzt habe ich das Plakat auf einer Bildschirmhöhe und -breite umgesetzt. Um mehr entdecken und erleben zu können, wollte ich mehr Inhalt erstellen und hauptsächlich die Website scrollbar machen. Somit habe ich damit begonnen, ein neues Konzept zu entwickeln.

Wie bereits beim ersten Konzept habe ich das Plakat mit dessen Eigenschaften analysiert und weiterentwickelt. Klare Eigenschaften sind:
- Die klaren breiten Rechtecke
- Der Bandname über die gesamte Breite.
- Der schwarzweise Farbstiel
- Die scheinbare horizontale Bewegung der Balken
- Die horizontal bewegte Visualisierung der Musik

<!--------------------------------------------------- NEW / uncorected --------------------------------------------------->

Klar war für mich, dass ich die Website über das im Plakat beworbene Konzert mache und somit nicht detailliert auf die Band eingehe. Da meine Website die Musik und dessen immersität zeigen sollte, um das interesse am Konzert zu wecken. Damit war für mich ebenfalls klar, dass ich die Musik der Band in der Website einbinde. Um die visuellen Eigenschaften vom Plakat aufzugreiffen, inludierte ich wie bei der ersten Umsetzung die schwarzen horizontalen Balken.

Schon im Voraus war mir bewusst, dass die Musik erst nach einer Interaktion des Benutzenden abgespielt werden kann und somit leider nicht bereits beim laden der Webiste. Dadurch war sicher, dass beim Einstieg eine ein Playbutton oder eine Musikauswahl erscheinen soll. Ich entschied mich für eine Musikauswahl in der Form von verschiedenen Schallplatten. Jede Schallplatte steht für einen spezifischen Song und kann durch einen Slider ausgewählt werden. Um eine Möglichkeit zum Wechselm des laufenden Songs zu bieten, wollte ich die aktive Schallplatte ab Bildschirmrand zeigen und rotieren lassen. Mit einem Klick auf diese, wir einem erneut die Übersicht aller Schallplatten gezeigt. Um die Musik auch wirklich zu erleben, habe ich das ganze so gestaltet, dass zu Beginn eine Schallplatte abgespielt werden muss, um auf den Inahlt der Seite zu gelangen. Nach dem ersten Input kann die Musik nicht mehr gestopt, sondern nur das Lied gewechselt werden. Ich wollte ebenfalls die Schallplatten mit der Maus drehbar machen, für ein authentischeres Gefühl sowie auch um die Seite und die Auswahl interessanter zu gestalten. 

Der Inahlt der Website sollte mit den schwarzen Blaken starten. Diese sollten sich mit der auktuell abgespielten Musik bewegen und diese viualisieren. Beim weiteren Scrollen werden nacheinander drei Ellipsen (verkürzte, grammatikalisch unvollständige Sätze) gezeigt und mit einer kleinen passenden Animation untermauert. Während dem Scrollen auf der Website sollten die Ellipsen in einer horizontalen Bewegung auf dem Bildschirm erschienen und ich in der Y-Koordinate nicht verändern. Beim weiterscrollen werden diese auf der X-Achse weiter verschoben sowie eine zum Text passende Animation wird abgespielt welche sich ebefalls eher horizontal bewegt. Bei denen Bewegungen bin ich mir nocht nicht sicher wie stark sich der eingelendte Text bewegen sollte und ob sich der Text und die Animation eher gegeneinander oder miteinander bewegen. Die Animationen sollten alle an die Scrollposition gebunden sein und somit mit der Scrollgeschwindigkeit vorwärts und rückwärts bewegen. Nach den drei Blöcken mit den Texten und Animationen erscheinen erneut die schwarzen Balken um zum Plakat zurückzukehren. Während diese auf dem Bildschrim ersichtlich sind wird voraussichtlich die Schallplatte auf der rechten Bildschrimseite mitgescrollt, um platz für den abschliessenden Inhalt zu schaffen. Denn zum Ende wird wie bei meiner ersten Umsetzung die Informationen und der Schriftzug "Radiohead" über die gesamte Breite dargestellt für eine klare und abschliessende Website.

Das entdecken der Website sollte angenehm, interessant und immersive sein. Das interesse der benutzende Person sollte geweckt werden und diese leiten. Für ein immersiveres und interessanters Erlebnis wollte ich den gesamten Inhalt der Website etwas verschieben. Diese Verschiebung sollte falls möglich aufgrund der Ausrichtung des Gerätes stattfinden. Falls das Gerät keinen solchen Sensor verbaut hat, sollte die Verschiebung aufgrund der Mausposition erfolgen. Um einen Form von Perspektive zu schaffen, wollte ich allenfalls verschiedene Objekte unterschiedlich stark verschieben. Zum Beispiel könnte die Schallplatte etwas mehr verschoben werden, da diese über dem gesamten Content liegt. 

Beim Konzet habe ich mich an den visuellen Elementen wie den Balken und den Texten orientiert. Zudem war mir die horizontale Bewegung sehr wichtig, ich habe versucht diese oft und passend in das Konzept einzuflechten und nicht mir einer vertikalen Bewegung zu stören. Der Auditive war ebenfalls relavant, wodurch der Audioplayer entstand. Die Informationen und der Bandname habe ich absichtlich erst am Ende der Webseite klar und gross platziert. Diese sollten von der benutzdenen Person entdekckt werden un diesen zuvor durch ein kleines Erlebnis führen, wie es auch das Konzert machen sollte.

# Sprint 2

[Zur Umsetzung 2.1](../v2.1_radiohead/){:target="_blank"}

[Zur Umsetzung 2.2 (finale Umsetzung)](../v2.2.2_radiohead/){:target="_blank"}

Ich habe mich dazu entschieden, die die zweite Umsetzung bzw. die Weiterentwicklung in einem neuen und leeren HTML-Dokument zu beginnen. Aus dem Grund, dass die zweite Umsetzung strukturell anders aufgebaut werden muss, als die Erste.

## Grundstruktur
Zu Beginn habe ich mir eine passende Grundstzuktur für meine HTML-Datei überlegt. Diese ist relevant um meine geplanten Ideen möglichst angenehm implementiere zu können. Wichtig waren hierbei die angedachte Bewegung der gesamten Inhalte basierend auf der Mausposition bzw. der Geräteneigung sowie der Audioplayer, welcher zu Beginn auf dem gesamten Bildschirm und danach an der rechten Bildschribseite ersichtlich ist. Mit diesen Gedanken erstellte ich folgende HTML-Struktur:

```
<body>
    <aside class="" id="audioplayer">

    </aside>
    <main>

    </main>
</body>
```

Mit folgendem CSS:

```
body {
    background-color: #d6d9c8;
    position: relative;
    overflow-x: hidden;
}
aside#audioplayer {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(39, 39, 39);
    z-index: 10;
    overflow: hidden;
}
main {
    width: 80vw;
    padding-top: 50px;
    padding-left: 10vw;
}
```

Im Aside sollte der Audioplayer entstehen, welcher mit position absolut gewünscht platziert werden kann und somit auch zu Beginn über dem gesamten Inhalt mit voller Höhe und Breite stehen kann. Das Main-Tag dient als Container für den gesamten Inhalt welcher mit den spezifischen paddings und der fixen breite ebenfalls perfekt bewegt werden kann.

## Audioplayer
Nach dem Grundaufbau startete ich mit dem Audioplayer beim Seiteneinstieg in voller Bildschrimgrösse.

### Slider
Zu Beginn startete ich mit einem Slider mit welchem durch die Schallplatten gewechselt wird. Um diesen umzusetzen habe ich ein Sliderbeispiel genommen, bei welchem anhand von Buttons sowie per Touch zwischen den Slides gewechselt werden kann. Dieser Slider hatte jeodch einen fixen Start und ein fixes Ende und somit werden die Schallplatten nicht in einem Loop dargestellt. Das wollte ich ändern, und ich habe einige Zeit damit verbracht den Code umzuschreiben, damit ein Loop entsteht. Der eingefügte Code des Sliders funktioniert mit einem display flex Element welches horizontal verschoben wird. Unter anderem habe ich versucht Elemente zu duplizieren oder die Reihenfolge der Elemente zu verändern, um einen Loop zu symulieren. Dies hat jedoch grundlegende Probleme im Code verursacht. Nach längeren Versuchen habe ich eingesehen, dass dieses mit dem Basiscode des Sliders nicht funktionieren wird. Denn dieser ist ganz anders Aufgebaut. somit habe ich deiesen Versuch aufgegeben und den Slider auch ohne Loop belassen. 
 
Während des Aufbaus habe ich darauf geachtet, dass die Slides-Div problemlos um die eigene Achse rotierbar sind, da somit die rotierenden Schallplatten entstehen sollten. Schon zu Beginn habe ich mir überlegt wie ich das Bild der Schallplatte einfügen werde. Dazu habe ich ein Hintergrundbild mit der grösse "contain" verwendet. Da die SChallplatte normalerweise mit einem Boden des Schallplattenspielers rotiert wird, habe ich zusätzlich unter den Slider ein Div erstellt, welches später für diesen Boden verwendet werden kann.

### Rotation der Schallplatten
Die rotation der Schallplatten mit der Maus oder per Touch stellte sich als wesentlich anspruchsvoller und nervenaufreibender heraus als zuvor gedacht. Der Start funktionierte noch relativ angenehm. Ich konnte mit JavaScript die Elemente auswählen und spezifisch mit translate rotieren. Auch die Verbindung mit der Maus und dem Touch funktionierten relativ rasch. Wodurch die Platten manuell gedreht werden konnten. Der ersten Herausvorderung musste ich mich somit rasch stellen - dem neu setzen des Rotationsmittelpunktes. Da sich die Werte durch Screengrössenveränderungen und dem Slidwechsel dauernt veränderten, mussten diese stehts neu gesetzt werden. Diesen musste ich im richtigen moment setzen. Ich analysierte den Slider-Code erneut, um zu sehen wann sich welche Werte verändern um in diesem Moment der Ritationsmittelpunkt zu setzen. Etwas schwerer wurde es noch, als ich zudem bei jedem Slidewechsel die alte Schallplatte auf den 0-Punkt zurücksetzte. Das habe ich am Ende mit einer asynchronen FUnktion erstellt welche beim Wechsel aufgerufen wird, auf das Ende aller Touches und Mouseclicks wartet und zum Schluss die Schallplatte animiert zurücksetzen soll. Diese Animation konnte ich jedoch nicht mit css translate lösen und musste mit js erstellt werden. Wollte ich, dass sich die Schallplatte immer in dieselbe richtung dreht und unterschiedlich schnell, je nach Distanz welche rotiert werden muss.

### Rotation synchron mit der Musik
Die synchronisation der Schallplatten mit der Musik stellte sich als wesentlich anspruchsvoller und nervenaufreibender heraus als zuvor gedacht. Das Einfügen und Abspielen von AUdiodateien funkionierte problemlos. Auch die Erste Verbindung von Audio zu Schallplatte funkionierte zuverlässig. Das erste und Hauptproblem war nun, dass die länge der Audiodatei nur eine Rotation der Schallplatte abbildete. Ich habe nun in viele Stunden auf verschiedenste Arten versucht dieses Problem zu lösen. Relativ zu Beginn habe ich erkannt, dass durch das verbinden mit der Audio, viel Code von meinem scrubbing (das Bewegen der Schallplatte mit der Maus oder oer Touch. Auf der Website wird scratch statt scrubb verwendet) nicht mehr verwendet werden kann auch Teils auch nicht mehr benötigt wird. Die erste Herausvorderung war es, in einer Variable die aktuelle Rotation in mehr als 360 Grad zu speichern. Denn durch das Tracking der Maus position wurde das immer auf 0 zurückgesetzt. Ich startete damit, diese zurücksetzungen bzw. vollen Rotationen zu wählen und diesen als Multiplikator für die gesamte Rotation zu verwenden. 

Beispiel mit aktueller Rotation von 180 Grad und 4 vollen Drehungen:

`(360 * rotationCount) + currentAngle`

`(360 * 4) + 180`

Zu diesem Zeitpunkt wurde jedoch die Schallplatte noch mit einer Spanne von 0 bis 360 Grad bewegt. Um die Sprung von 360 zu 0 zu meistern ohne zurück zu drehen wurde eeine funktion verwendet um den kürzesten Weg zu berechnen und diese Rotation zu nehmen. 

Die noch grössere Herausvorderung stelle sich jedoch erst jetzt, als ein Maximum und Minimum an Rotation eingefügt werden sollte. Mir war hierbei wichtig, dass während des Scrubbings beim Erreichen des Starts und des Ende der Audio die Schallplatte stehen bleibt und nicht weiter dreht. Ein if-Statment einzufügen welches vor der Rotation die Werte prüft, war meine erste Idee. Hier war das Problem, dass im Hintergrund die Rotationen fortgesetzt wurden, was das zurückdrehen sehr unschön erscheinen lies. Ich wollte, dass die Schallplatte beim erreichen des Limits stehen bleibt. Während in diese Richtung gedreht wurd, passiert visuell nichts und auch die Werte im Hintergrund sollten unbeinflusst werden. Sobald eine Gegenrotaion ausgeführt wird, soll die Schallplatte sofort gedreht werden. Das zurücksetzen bzw. stehen lassen des Zählers der vollen Rotationen verursachte Probleme bei der Berechnung der aktuellen ROtation. Auch das Nicht-Aktualisieren der Rotationsposition funktionierte nicht, da somit die Refferenz für die nächste Rotationsdifferenz fehlte. Auch mit einer weiteren Variable löste sich das Problem nicht, denn mensch müsste mit der Maus bis zur entsprechenden Position zurück fahren, um die Schallplatte aufzugreiffen. Da die Schallplatte z.B. nur bis 4 Rotationen und 180 Grad fährt. falls ich nun bei 360 Grad mit der Maus umkehren würde, müsste ich bis 180 zurück rotieren, bis der Wert der Mausposition kleiner wird als die der Schallplatte. Dieses verhalten wollte ich umbedingt vermeiden. Die Schallplatte sollte direkt zurückgedreht werden. Da wurde es mir klar, es reicht nicht, die aktuelle Mausrotation und die vorherige Mausrotation für eine Differenz abzufragen. Ich musste unabhängig von der Rotation und jeglichen Limits, die Differenz der vorherigen und aktuellen Mausposition berechnen und separat abspeiuchern. Sobald die aktuelle Rotation + diese Differenz zu gross bzw. zu klein wird, darf die Schallplatte nicht bewegt werden. 

In diesem Abschnitt wird bei jeder Bewegung des Scrubbings die Differenz des Winkels (angleDiffrence) berechnet:

```
let mouseAngle;
let angleDiffrence;
if (event.type === 'touchmove') {
    let touch = event.touches[0];
    mouseAngle = ((Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
} else {
    mouseAngle = ((Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
}
if (mouseAngle - scrubbMove < -180) {
    scrubbMove -= 360;
} else if (mouseAngle - scrubbMove > 180) {
    scrubbMove += 360;
}
angleDiffrence = mouseAngle - scrubbMove;
scrubbMove += angleDiffrence;
```

Nach der erfolgreichen Berechung wird der Winkel der Schallplatte sowie die Zeit der Audio angepasst:

```
scrubber.style.transform = `rotate(${scrubbAngle + initialScrubberAngle}deg)`;
audio.currentTime = (scrubbAngle + initialScrubberAngle) / 360 * secondsPerRotate;
```

Während des erstellen des Codes musste ich stehts darauf acht geben, an den richtigen Stellen die Audio zu pausieren oder abspielen zu lassen. Beispielweise beim Wechsel der Schallplatten: Es wird wird geprüft ob die letzte Schallplatte abgespielt wurde oder nicht. Falls ja, wird die neue ebenfalls automatisch abgespielt:

```
wasPlaying ? audio.play() : null;
```

Wenn eine Schallplatte zuende Abgespielt wurde, wird der Slider ausgelöst, die Schallplatte gewechselt und automatisch abgespielt. Falls die letzte Schallplatte zu ende gespielt wurde, wird auf die Erste gewechselt:

```
function audioEnded() {
  // start next song / if last -> go to first
  if (currentIndex < slides.length - 1) {
      animateRotation(slides[currentIndex]);
      currentIndex += 1;
      setPositionByIndex();
      updateScrubberCenter();
      initialAudio();
  } else {
      animateRotation(slides[currentIndex]);
      currentIndex = 0;
      setPositionByIndex();
      updateScrubberCenter();
      initialAudio();
  }
}
```

Natürlich muss auch während des abspielens der Audio die Schallplatte gedreht werden:

```
function updateScrubber() {
  scrubber.style.transform = `rotate(${(360 / secondsPerRotate) * audio.currentTime}deg)`;
  if (!audio.paused && !audio.ended) {
      requestAnimationFrame(updateScrubber);
  }
}
```

### Minimierung
Nach meinem Konzept wollte ich, dass durch die Schallplatten geschaut werden kann und ein Song angeklickt und somit abgespielt werden kann. Durch das Abspielen verkleinert sich die Auswahl und es ist nur noch die aktuelle Schallplatte am Festerrand ersichtlich. Mit einem Klick auf diese kann die Auswahl geöffnet und einen neuen Song gewählt werden. Durch meine Grundstruktur habe ich bereits den Audioplayer mit der Schallplattenauswahl absolut nach dem rechten Bildschirmrand platziert. Nun musste nur auf eine eher umständliche Art einen normalen Klick (kein Scrubbing) erkannt werden. Dadurch wird eine CSS-Klasse (audioplayer-close) dem PLayer hinzugefügt welche wenige CSS-Anpassungen vornimmt. Durch einen erneuten klick beim minimierten Player werden die CSS-Anpassungen entfernt:

```
function openPlayer(event) {
  event.preventDefault();
  let clickStartPosition = [], clickEndPosition = [];
  if (event.type === 'touchstart') {
    let touch = event.touches[0];
    clickStartPosition = [touch.clientX, touch.clientY];
    document.addEventListener('touchend', clickEnd);
  } else {
    clickStartPosition = [event.clientX, event.clientY];
    document.addEventListener('mouseup', clickEnd);
  }
  function clickEnd (event) {
    if (event.type === 'touchend') {
      let touch = event.changedTouches[0];
      clickEndPosition = [touch.clientX, touch.clientY];
      document.removeEventListener('touchend', clickEnd);
    } else {
      clickEndPosition = [event.clientX, event.clientY];
      document.removeEventListener('mouseup', clickEnd);
    }
    if (Math.abs(clickStartPosition[0] - clickEndPosition[0]) <= 2 && Math.abs(clickStartPosition[1] - clickEndPosition[1]) <= 2) {
      if (audioplayer.classList.contains('audioplayer-close')) {
        audioplayer.classList.remove('audioplayer-close');
      } else {
        audioplayer.classList.add('audioplayer-close');
      }
    }
  }
}
```

```
aside#audioplayer.audioplayer-close {
  width: calc(15vw + 10px);
  background-color: initial;
}
aside#audioplayer.audioplayer-close #slide-background {
  left: 0;
}
aside#audioplayer.audioplayer-close .slider-container {
  padding-left: 10px;
}
aside#audioplayer.audioplayer-close .arrow {
  opacity: 0;
}
```

Hier gibt es noch kleine Punkte welche noch nicht behoben wurden, bevor ich zum nächsten Schritt gegangen bin. Beispielsweise funktioniert das Scrubbing im Minimierten Player noch nicht wie gewünscht, da das Zentrum nicht korrekt ist oder auch der Schallplattenwechsel sollte noch eine spezifische Animation für die minimierte Ansicht erhalten.

### Hovertext
Um den Audioplayer verständlicher zu machen, wollte ich einen Text bei der Maus einfügen welcher beispielsweise "play" zeigt. Hierfür habe ich ein div erstellt welches für soche Texte verwendet werden kann. in einer Funktion wird zuerst zwischen den möglichen Texten differenziert. Anschliessend wird der Text zu der Mausposition verschoben und zum Schluss der funktion wird das ein- und ausblenden des Textes gesteuert. Hierbei war eine Herausforderung das verzögerte Ausblanden. Wenn die Schallplatte verlassend wird, wird mit einer Verzögerung von 0.3s der Text ausgeblendet. Somit kann per CSS die Deckkraft in dieser Zeit reduziert werden. Das Problem hierbei war, falls in den 0.3s die Maus erneut über die Schallplatte fährt, wird der Text trotzdem ausgeblendet. Zuerst versucht ich das Problem mit `clearTimeout(hideTextTimeout);` zu lösen, jedoch hat das aus unerklährlichen gründen nicht geklappt. Nun habe ich eine zusaätzliche Varable erstellt, welche das Problem löst.

```
let hoverTextElement = document.getElementById("hoverText");
let hoverTextAudioPLayed = false;
let hideTextTimeout = null;
let hotfixStopClear = false;
function hoverText (event) {
    hotfixStopClear = true;
    if (audioplayer.classList.contains('audioplayer-close')) {
        hoverTextElement.innerHTML = "open";
    } else {
        if (hoverTextAudioPLayed) {
            hoverTextElement.innerHTML = "scrubb me!";
        } else {
            hoverTextElement.innerHTML = "play";
        }
    }
    updatePosition(event);
    hoverTextElement.style.display = "block";
    hoverTextElement.style.opacity = "1";
    document.addEventListener('mousemove', updatePosition);
    event.target.addEventListener('mouseleave', () => {
        hoverTextElement.style.opacity = "0";
        hotfixStopClear = false;
        hideTextTimeout = setTimeout(function() {
            if (!hotfixStopClear) {
                document.removeEventListener('mousemove', updatePosition);
                hoverTextElement.style.display = "none";
            }
        }, 300);
    });
    function updatePosition (event) {
        let x = event.clientX;
        let y = event.clientY;
        hoverTextElement.style.left = x + "px";
        hoverTextElement.style.top = y + 30 + "px";
    }
}
```

## Visualisierung der Audio
Schon im Vorfeld habe ich hierzu die Umsetzbarkeit angeschaut und geprüft. Hierfür habe ich mir dieses [Video](https://www.youtube.com/watch?v=uPztDeHWhn8){:target="_blank"} herausgesucht. Jedoch habe ich mich mit dem Code erst zu diesem Zeitpunkt tiefer auseinandergesetzt. Dabei wurde mir bewusst, dass die Visualisierung und Analyse der Audios mittels der "Web Audio API" durchgeführt wird. Schon früh habe ich bemerkt, wenn ich meine Audio-Tags mit der Web Audio API verbinde, diese nicht mehr als nomrale Audio-Tags funktionieren und somit meine bisher erstellten Scripts nicht mehr funktionierten. Auch wenn ich separate Audiodateien mit der Web Audio API laden würde, besteht das Problem, dass diese zwei Instanzen den aktuellen Zustand voneinander nicht kennen und nicht miteinander kommunizieren können. 

Bis ich diese Problematik tiefer verstand und die Funktionsweise der Web Audio API teilweise verstehen konnte habe ich einige Stunden recherchiert und viele Test durchgeführt. Leider konnte auch ChatGPT 3.5 nicht zuverlässig mit dem Problem und mit der komplexen situation umgehen.

## Überarbeitung Konzept (2.2)
Nach der Besprechung am 26.03.2024 mit Hanna Züllig und ihrem Feedback habe ich mir erneut gedanken zu meinem Konzept gemacht um die Wirkung zu optimieren. 
- Aufgrund der Funktion mit der Verschiebung des Inhalt habe ich, im Gegensatz zur ersten Version, einen Abstand vom Bildschrimrand zum Inahlt erstellt. Dieser Abstand diente dazu, dass der Inhalt verschoben werden konnte, jedoch dieser nicht abgeschnitten wurde. Die Website verlohr durch diesen Abstand jedoch an Wirkung. Dieser Abstand soll nun entfernt werden. Somit wird ebenfalls die dazugehörige Funktion entfernt.
- Wie bei der ersten Version und auch dem Plakat, soll der Inhalt den gesamten Platz ausfüllen. Dadurch soll auch die Schallplatte am Seitenrand entfernt werden. Der Player wird nun in die Seite eingebaut, anstatt in einem Popup über der Website zu schweben.

[Konzept für Desktop](https://www.figma.com/proto/Jf3XwwHms7cNMmfXE3pFYC/kiweb-radioheaed?type=design&node-id=0-1&t=mkVTFhbNLKPSuHVB-0&scaling=min-zoom&starting-point-node-id=116%3A2&show-proto-sidebar=1){:target="_blank"}

[Konzept für Mobile](https://www.figma.com/proto/Jf3XwwHms7cNMmfXE3pFYC/kiweb-radioheaed?type=design&node-id=0-1&t=mkVTFhbNLKPSuHVB-0&scaling=min-zoom&starting-point-node-id=116%3A56&show-proto-sidebar=1){:target="_blank"}

Für eine saubere Umgebeung habe ich für das überarbeitet Konzept (Umsetzung 2.2) einen neuen leeren Ordner erstellt und alle notwendigen Dateien neu erstellt. In diesem Zug habe ich auch den Aufbau meiner JavaScript-Dateien neu strukturiert und aufgebaut. Da dieses wahrscheinlich mein grösstes JavaScript-Projekt beisher ist, ist mir erst jetzt bewusst geworden, dass funktionen wie "onload" ("DOMContentLoaded") und "resize" nur einmal und gut geplant eingesetzt werden. Aus diesen Erkentnissen, habe ich eine Hauptdatei "main.js" erstellt. Diese Datei verwaltet diese Funktionen und weitere zentrale und häufig verwendete variablen. Beispielsweise wird auch in dieser Datei die Variablen der Mausposition gesetzt und laufend aktualisiert. 

## Text als Maus
Mithilfe von JavaScript habe ich ein div-Tag mit position absolut an die Mausposition fixiert und den Cursor ausgeblendet. In diesem wird ein Text angezeigt, welcher sich verändert, je nachdem auf welchem Bereich sich die Maus befindet. Damit der Text nicht vom Briwserfenster abgeschnitten werden kann, habe ich jeweils ein Maximum und ein Minimum in der Höhe und Breite definiert. Somit bleibt der Text am Fensterrand kleben, anstatt der Maus weiter nach Aussen zu folgen.

## Animierte Balken
Es sollten, ähnlich wie bei der ersten Version, genau so viele Balken generiert werden, damit die Schallplatten darunter ca. bis zur Hälfte sichtbar sind. Somit wird neuer Inhalt angeschnitten welcher die Benutzenden zum Scrollen animiert. Einige Balken sollten links und einige rechts ausgerichtet sein. Die Bewebung der Balken beschränkt sich jeweis von 100% Breite bis zu minimal 60% Breite. Durch diese Limitierung ist die Mitte des Bildschirmes immer mit Balken bedeckt und die verkürtzung beschränkt sich nur auf die linke oder rechte Seite. Um die Animation spannender zu gestalten sollten diese Werte zufällig gesetzt werden (Das war bei der ersten Version nur teilweise der Fall). 

Für diese Funktionsweise habe ich ein Script erstellt "bars.js" welche basierend auf der Bildschirmhöhe und -breite die korrekte Anzahl an Balken erstellt. Für die Animation mit den zufälligen Werten wird, falls nicht vorhanden, ein style-Tag erstellt. In deisem wird pro Balken eine eigene Animation mit zufälliger Start- und Endbreite erstellt. Für eine sichtbare Animation, wird darauf geschaut, dass der Abstand zwischen der Start- und Endbreite mindestens 15% beträgt. Zudem wird zufällig der Balken rechts oder links angeschlagen sowie eine zufällige Geschwindigkeit vergeben. Da die Balken basierend auf der Bildschirmhöhe und -breite generiert werden, müssen bei jeder grössenänderung die bestehenden Balken gelöscht und neu generiert werden. 

Die Anzahl der Balken habe ich im Anschluss noch so angepasst, dass beim zweiten Abschnitt mit Balken die gesamte Bildschirmhöhe gefüllt wird.

## Audioplayer
Ich habe diese Gelegenheit vom Neuaufbau genutzt um mein Script für den Audioplayer neu mit der Web Audio API aufzubauen. Neben den anderen Vorteilen sollte auch das "Scrubbing" besser funktionieren, da die Audiodatei vorgeladen wird und somit sofort die gewünsche position abspielt. Hierfür habe ich [diesen Code von Stackoverflow](https://stackoverflow.com/questions/60099350/how-can-i-hear-sound-playing-while-scrubbing-the-audio-from-an-audio-tag){:target="_blank"} gefunden. Die grundlegende Logik habe ich zuvor bereits erstellt, jedoch war es herausfordernd die Grundlagen der Web Audio API zu verstehen und anzuwenden. Es stellte sich als wesentlich aufweniger heraus, eine Audio abzuspielen, zu pausieren, weiter abzuspielen und die  aktuelle Abspielzeit anzupassen. Denn eine Audio, so wie ich diese augebaut habe, konnte nicht pasiert und weiter abgespielt werden. Die Idee der API war es hierbei eine Audio zu initialisieren, diese einmal zu starten und einmal zu stoppen. Für die pausierung, musste separat die Zeit festgehalten, die Audio neu initialisiert und ab dem letzten Zeitpunkt neu gestartet werden.

Im Vergleich zu den vorherigen Versionen verzichtete ich durch die Web Audio API auf die Audio-Tags lud die Dateien direkt von der JavaScript-Datei aus.

Als das Laden der Audiodateien endlich funktionierte, fiel mir auf, dass dieser Prozess viel Rechenleitung in anspruch nahm und somit die Website erst 1-2 Sekunden brauchte, um alles zu verarbeiten. Aus diesem Grund habe ich die Anzahl der Songs auf 6 limitiert. Aus Performance und auch ästethischen Gründen, habe ich im Anschluss eine Ladeanimation eingebaut, somit sollte die Website erst dargestellt werden sobald alles geladen wurde.

Für die Berechnung der Rotationsbewegung werden 4 Variablen verwendet. Mit den ersten beiden wird wird die aktuelle und die letzte Position festgehalten verglichen und als dritte Varbiale gespeichert, somit enthällt diese Varable die aktuelle Bewegung. Anschliessend wird geprüft ob die Gesamtbewegung + die aktuelle Bewegung grösser oder kleiner als die Limits sind. Falls das nicht der Fall ist wird die vierte Variable neu gesetzt und als neue Position defineirt. Es ist wichtig, dass diese Varable nur überschrieben wird, falls die aktuellen Limits eingehalten werden, somit kann diese nicht zuvor für die Berechnung verwendet werden.

```
angleDiffrence = mouseAngle - scrubbMove;
    scrubbMove += angleDiffrence;
    // check limits
    if (scrubbAngle + angleDiffrence + initialScrubberAngle > 0 && scrubbAngle + angleDiffrence + initialScrubberAngle < maxSrubberAngle) {
        scrubbAngle += angleDiffrence;
    }
    // rotate scrubber
    scrubber.style.transform = `rotate(${scrubbAngle + initialScrubberAngle}deg)`;
```

In diesem Codeabschnitt wird überprüft ob, die Mausposition über den Nullpunkt fährt, und rechnet minus oder plus eine volle Umdrehung. Da fürht dazu, dass der Code mehr als eine volle Umdrehung erkennt und nicht nur einen Bereich zwischen 0 und 360 abdeckt:

```
if (mouseAngle - scrubbMove < -180) {
        scrubbMove -= 360;
    } else if (mouseAngle - scrubbMove > 180) {
        scrubbMove += 360;
    }
```

Nach der erfolgreichen Umsetzung der Schallplatten, habe ich ein plattenteller eingefügt. Dieses bleibt fortlaufend in der Mitte stehen und symbolisiert somnit die aktive Schallplatte. Beim Abspielen und beim Scrubbing einer Schallplatte, rotiert das Plattenteller mit dieser mit.

## Ladeanimation
Für die Ladeanimation etwas schon von Anfang an klar: Es muss auf das Laden des gesamten Inhalts gewartet werden und anschliessend sollte der sichtbare Breich (die Balken und die Schallplatten) in das Bild animiert werden. Die erste herausforderung war hierbei, dass die Seite immer von ganz oben Startete und nicht an der letzten Position. Zudem wollte ich, dass nicht bereis gescrollt werden kann, wenn die Website noch in der Ladeanimation ist. Diese herausforderung habe ich so gelöst, dass alle Scrollmöglichkeiten ausgeschaltete werden und auch die Höhe der Website auf maximal 100vh zu beschrenken. Nach dem laden werden diese Anpasungen zurückgesetzt und die Animation der Balken und Schallplatten konnte starten.

Ich habe mit mehreren Animationen herumprobiert welche beim Laden erscheinen, bevor der Inhalt geladen wurde. Diese habe ich als Feedback erstellt, um zu zeigen, dass die Seite geladen wird. Jedoch war mir diese Animation nach einiger Zeit zu viel und der Inahlt wurde grundsätzlich schnell geladen, was zu keiner verwirrenden Wartezeit führte. Dadurch habe ich diese wieder entfernt.

## Weitere Schritte
Während des Moduls konnte ich nicht alle Ideen umsetzen und testen. Wenn ich noch mehr Zeit für weitere Umsetzungen hätte, würde ich mich mehr mit der Web Audio API beschäftigen. Unter anderem, hätte ich folgende zwei Ideen gerne noch umgesetzt:
- Anpassung des Tones während des Scrubbings: Da mit der Web Audio API der Ton angepasst werden kann, könnte ein authentischeres Scrubbing-Geräusch erzeugt werden. Zum Beispiel mit der Tonhöhe oder auch mit deim Einfügen einer zusätzlichen Tonspur.
- Balken nach dem Ton animieren: Mit dem Analyser von der Web Audio API können die verschiedenen Tonhöhen gelesen und die Balken anhand dieser animiert werden. Leider hat es für diese Umsetzung zeitlich nicht mehr ausgereicht.

# Meine Erkentnisse
Im Verlauf des Moduls KIWEB habe ich viele verschiedene Skills erlehrnt. Diese können hier nicht alle genant werden. Biepisleweise habe ich neue Details gennengelernt, vieles Repetiert und durch meine Mitstudierenden mit unterschiedlichen Niveaus neue Blickwinkel auf das Thema sehen können, welche mich für die Zukunft begleiten werden. 

## Konzept
Im Verlauf des Moduls habe ich mir gedanken zu einem Bestimmten Plakat gemacht. Wie beispielsweise:
- Was sind die Charakteristiken des Plakats? 
- Was macht dieses Plakat aus?
- Wie können die Kernpunkt adaptiert werden?

Aus diese Fragestellungen entstanden Konzeptideen um ein festes Format auf einer Website abzubilden. Daraus habe ich gelernt die wirtigen Eigenschaten zu erkennen und diese in einer abgewandelten Form in ein neues Konzept einfliessen zu lassen. Sowie auch zu hinterfragen, was macht die Website Spannend. Welche Elemente platziere ich in meinem Konzept wo, um eine gewünschte wirkung zu erzielen. Und wie kann ich den Benutzenden Emotional erreichen um das Interesse zu vertärken.

In meinem zweiten Konzept wollte ich mich zuerst zu weit von meinem Plakat entfernen und mehr bewegende und Interesse weckende Elemente einbauen. Diese Ideen stimmten jedoch nicht mehr mit der Grundidee des Plakates überein. Was mir erneut zeigte, wie ich meine Ideen hinterfrgen und auf das Konzept abstimmen sollte.

## Github
In diesem Modul habe ich das erste mal Github umfänglich verwendet. Was zu einem grossen Wissenszuwachs zu Github führte. Ich habe beispielsweise das Erste mal Markdown verwendet und auch mit Github Pages gearbeitet.

## JavaScript
Ich kannte schon zuvor JavaScript und habe kleinere Umsetzung durchgeführt. Während des Moduls konnte ich viel Übung sammeln beim erstellen von Interaktion mit JavaScript. Mit der Übung habe ich mehr Erfahrungen im Aufbau und der Architektur gesammelt. Diese Erfahrung sind für mich sehr wichtig, denn mit diesen werde ich in Zukunft meinen Aufbau von JavaScript optimieren. Was die den zeitaufwand reduziert und auch die Leistung verbessert.

## Ziehen von Elementen und Rotation
Während des Moduls habe ich das erste mal Elemente erstellt welche mit JavaScript verschoben werden konnten. Zudem Befasste ich mich eine lange Zeit mit Rotationsbewegungen und Rotaionsberechnungen. Zusätzlich war auch die Architektur des Codes sehr relevant. Ich lernte wie ich Limiten in meiner Rotationsbewegung einbauen kann, welche sehr bestimmte Auswirkungen haben sollten. In diesem Schritt setzte ich mich intensiv damit auseinander, welche Werte für was verwendet werden sollten. Und lernte kennen wann welche Werte aktualisiert werden sollten oder eben nicht.

## Web Audio API
Die Web Audio API lernte ich das erste Mal in diesem Modul kennen. Ich wusste zuvor nicht, dass diese existiert. Gegen Ende des Moduls habe ich mich intensiv mit dieser auseinandergesetzt. Trotz meiner erfolgreichen Umsetzung und dem Erlernen des Basiswissens, kann ich nicht von mit behaupten, dass ich diese voll verstanden habe. 

Nach meinem Verständniss muss eine Audiodatei zu Beginn geladen und in einem "AudioCOntext"-Objekt dekodiert und zwischengespiechert werden. Somit ist diese Audiodatei für den Einsatz bereit. Jetzt kann die Datei beispielsweise in den "Buffer" geladen werden, um ein sofortiges abspielen sicherzustellen und auch mit verschiedenen Elementen verknüpft werden. Jede Verwendung der Audiodatei fungiert nun als eigene Instanz und kann nicht mit den anderen instanzen kommuizieren. Durch dieses Verhalten kann, im Vergleich zum Audio-Tag, eine Audiodatei mehrere Male verwendet und somit gleichzeitig abgespielt werden. Diese FUnktionsweise verwirrte mich zu Beginn sehr. In meinem Fall wird nur die aktuelle Datei in den Buffer geladen, der Buffer anschliessend in den Analyser und der Analyzer mit dem Output (dem Lautsprecher). Diese Audio kann nun 1 Mal gestartet und gestoppt werden. Dadurch muss nach einem Stop die genannte Verkettung gelöscht und neu initialisert werden. Für den nächsten Start muss separat die abgespielte Zeit festgehelten werden und somit vom gleichen Zeitpunkt aus gestartet werden.

# Fazit
Das Modul KIWEB hat mir viel Spass gemacht. Ich hatte die Moglichkeit mir viel neues Wissen anzueignen und Neues Auszuprobieren. Hanna Züllig motivierte mich laufend mein Konzept zu verbessern und unterstützte mich bestmöglich. Aus diesem Modul nehme ich viele für mich sehr relevante Erkenntnisse, Erfahrungen und Wissen mit.


<!---
[Link in new Tab](radiohead/){:target="_blank"}

TODO:
- Responsive -> done ?
- Inhaltsverzeichnis in doku aktualisieren

Future changes:
- Change pitch on scratch
- animate bars based on analyser

-->
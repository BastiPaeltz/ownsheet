# markdown-cheat-sheet
chrome extension which generates a cheat sheet from markdown

## was soll es können

* aussehen in etwa von <a href="http://overapi.com/git/">overapi</a>
  * ganze Bildschrimbreite wird für information ausgenutzt, so wie es sein sollte (leider viel zu selten im web)
  
* aber nicht mit vordefinierten spickzetteln wie bei overapi, sondern mit meinen eigenen
  * die ich am liebsten schön schnell in **markdown** schreiben will (wie z.B. <a href="https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.md">hier geschehen</a>.)

**Man schreibt seine Spickzettel in markdown und es wird dann eine webpage generiert, nach dem Prinzip:**
  * pro '## markdown überschrift' (h2 heading) wird ein neuer "farbiger Kasten" (siehe link) erstellt
  * die erste h1 heading wird überschrift der ganzen seite
  * alles was jeweils zwischen zwei h2 headings steht wird inhalt des kastens

## wie solls aussehen / wie könnte mans realisieren

* **startseite**: simple liste wo man mglkeit hat bereits erstellte spickzettel zu löschen oder zu bearbeiten sowie einen button um 
um einen neuen spickzettel zu erstellen
  * **nötige werkzeuge:** simples css, html und javascript
  
* **Erstellen von cheat sheets**: formular feld wo man sein markdown einträgt. 2 optionen: preview, submit. außerdem noch option um zurück zur 
startseite zu kommen
  * **nötige werkzeuge:** simples css, html und javascript, **javascript markdown parser, sobald preview oder submit gedrückt wird.**  
  <a href="https://github.com/chjj/marked">marked</a> sieht gut aus, da es nötig ist den html output noch etwas zu bearbeiten
  (z.B. divs um jeden 'kasten', damit man nachher per css drauf zugreifen kann). marked lässt einen das machen.
  Anschließend wird der html output in den speicher geschrieben.   
  * **speicher**: einfach in json speichern, wo der html output als string drinsteht, + feld für "zu welchem cheat sheet
  gehör ich" und "zu welchem kasten gehör ich" - dead simple. Chrome bietet solchen speicher für extensions
  
* **der eigentliche Spickzettel**: seite, wo man seinen spickzettel (über die ganze breite des bildschirms) angezeigt bekommt.
(sowie eine möglichkeit zurück zur startseite zu gehn)
  * **nötige werkzeuge:** html, css und javascript - das html wird aus dem speicher ins html geholt (blöde formulierung^^).
  damit das alles bunt und cool aussieht und die bildschrimbreite gut ausgenutzt wird ist sicher einiges an css nötig sein.
  
## potenzielle probleme der realisierung

* im moment ist das einzige problem das ich erkennen könnte, dass der markdown parser uns das html nicht nach unsren wünschen bearbeiten lässt

  

  

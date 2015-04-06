# markdown-cheat-sheet
chrome extension which generates a cheat sheet from markdown

## features / was soll es können

* cooles aussehen wie <a href="http://overapi.com/git/">overapi</a>
  * ganze Bildschrimbreite wird für information ausgenutzt, so wie es sein sollte (leider viel zu selten im web)
  
* aber nicht mit vordefinierten spickzetteln wie bei overapi, sondern mit meinen eigenen oder mit coolen, die andere geschrieben haben (z.B. siehe nächster link) 
  * die ich am liebsten schön schnell in **markdown** schreiben will (wie z.B. <a href="https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.md">hier geschehen</a>.)

**Man lädt seinen markdown Spickzettel und es wird dann eine webpage generiert, nach dem Prinzip:**
  * pro '**## markdown überschrift**' (h2 heading in html) wird ein neuer "farbiger Kasten" (siehe overapi link) erstellt
  * die erste h1 heading wird überschrift der ganzen seite
  * alles was jeweils zwischen zwei h2 headings steht wird inhalt des kastens

## wie solls aussehen / grobe realisierung

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
  
## in detail realisierung

### **startseite** : 
* realisiert als **Extension Icon mit popup.html** (siehe <a href="https://developer.chrome.com/extensions/browserAction">Chrome API</a> dazu) mit eingebundenem **popup.js** sowie **main.css**
* "add new cheat sheet" als link -> verweist auf **edit.html**
* bereits erstellte spickzettel als vertikale (von oben nach unten) liste, jeder eintrag hat daneben 2 kleine icons zum bearbeiten und löschen (schraubenschlüssel und großes "X" z.B.) -> eintrag verweist auf **cheatsheet.html** und gibt mit, welche liste ausgewählt wurde, z.B. via **query string**  
* 'bearbeiten' verweist auf **edit.html** und gibt mit welche liste ausgewählt wurde, 'löschen' callt den **storage** und **löscht** den jeweiligen eintrag und updatet bei erfolg **popup.html**, indem der listeneintrag verschwindet 

### **erstellen von cheat sheets**

* realisiert als **edit.html** mit eingebundenem **edit.js** und **markdownparser.js** sowie **main.css**
* sobald es aufgerufen wird, evaluiert das js, welches cheat sheet es holen soll (wenn empty, dann leeres blatt), fetcht daten aus dem <a href="https://developer.chrome.com/apps/app_storage">storage</a> für das jeweilige cheat sheet und popularisiert das edit formular damit. 
* submit und preview als button realisiert
* wenn preview geclickt wird, wird **markdownparser.js** aufgerufen, der versucht den inhalt des formulars zu parsen. Bei Misserfolg wird eine Fehlermeldung ausgegeben. Bei Erfolg wird (vllt. in neuem fenster) **cheatsheet.html%_preview** aufgerufen. 
* wenn submit geclickt wird, wird zusätzlich zu obigen schritten das geparste html als json in storage gespeichert.
* der name des json docs wird aus dem text der h1 überschrift generiert. (somit muss der parser auch implementieren, dass es einen fehler gibt, wenn keine h1 überschrift exisitiert), außerdem enthält es zusätzliche info, die nötig ist (z.B. name aller div classes) sowie das gerenderte html als string
```json

{   
 "name" : "json-cheat-cheet",
 "divs" : ["a", "b"],
 "html" : "
 <h1>json</h1>
 <div class="a">
 <h2>Hi</h2>
 <p>I'm Bob.
 </div>
 <div class="b">
 <h2>Hi Bob.</h2>
 </div>
 "
}
```

### der eigentliche spickzettel

* realisiert als **cheatsheet.html** mit eingebundenem **cheatsheet.js** und **cheatsheet.css**
* js liest aus, welche liste aufgerufen wurde und nimmmt das html aus dem jeweiligen JSON des storage
* das wird dann in cheatsheet.html eingefügt, das an sich (statisch) nur ein bisschen grundlegendes (wie z.B. encoding utf-8) beschreibt, der eigentlche content kommt vom js und wird vom css gestylet, dass es nebeneinander ist und bunt

## potenzielle probleme der realisierung

* markdown parser lässt uns das html mglws. nicht nach unsren wünschen bearbeiten 
* möglicherweise ist pures js zu langsam um das alles nice und responsive darzustellen und man brauch angular o.ä.  
  

  

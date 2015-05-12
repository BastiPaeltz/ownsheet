# markdown-cheat-sheet
chrome extension which generates a cheat sheet from markdown

## features / was soll es können

* cooles aussehen wie <a href="http://overapi.com/git/">overapi</a>
  * ganze Bildschrimbreite wird für information ausgenutzt, so wie es sein sollte - kein ewiges scrollen weil die seite nur die hälfte meines breitbildschrims ausnutzt (leider viel zu selten im web)
  
* aber nicht mit vordefinierten spickzetteln wie bei overapi, sondern mit meinen eigenen oder mit coolen, die andere geschrieben haben (z.B. siehe nächster link) 
  * die ich am liebsten schön schnell in **markdown** schreiben will (wie z.B. <a href="https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.md">hier geschehen</a>.)

**Man lädt seinen markdown Spickzettel und es wird dann eine webpage generiert, nach dem Prinzip:**
  * pro '**## markdown überschrift**' (h2 heading in html) wird ein neuer "farbiger Kasten" (siehe overapi link) erstellt
  * die erste h1 heading wird überschrift der ganzen seite
  * alles was jeweils zwischen zwei h2 headings steht wird inhalt des kastens

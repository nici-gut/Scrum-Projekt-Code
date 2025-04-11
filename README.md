# Climbtime

## Unsere kleine Kletter-App

### Grundregeln für die Arbeit mit Git

Wir sind alle Anfänger! Hier sind einfache, leicht umsetzbare Regeln für den Umgang mit Git:

### 1. Verwendung von Branches

Jeder neue Arbeitsschritt muss in einem neuen Branch erfolgen.

Benenne deinen Branch beschreibend, z. B.:

- feature/<dein-name>-neue-funktion

- bugfix/<dein-name>-fehler-beheben

- hotfix/<dein-name>-kritischer-fehler

Neuen Branch erstellen und direkt wechseln

```git checkout -b <dein-branch-name>```

 Zwischen Branches wechseln

```git checkout <branch-name>```

 Alle bestehenden Branches anzeigen

```git branch```

 Den aktuellen Branch anzeigen

```git branch --show-current```

### 2. Arbeiten mit dem main Branch

Der main Branch ist der stabile Branch.

Wenn du mit dem main Branch arbeitest, stelle sicher, dass er immer aktuell ist (d.h. zieh vorher alle Änderungen mit git pull origin main).

Auf den main Branch wechseln

```git checkout main```

Den main Branch immer auf den neuesten Stand bringen

```git pull origin main```

### 3. Pullen und Pushen

Bevor du an einer Aufgabe arbeitest, ziehe zuerst die aktuellen Änderungen:

```git pull origin main```

Mach deine Änderungen, committe sie mit

```git commit -m <deine-commit-nachricht>```

und pushe sie auf den Remote-Branch:

```git push origin <dein-branch-name>```

### 4. Merge Requests / Pull Requests

Bevor du deinen Branch in main mergen möchtest, öffne einen Pull Request auf GitHub.

Andere Teammitglieder sollen den Code durchlesen und bestätigen (Code Review), bevor der Merge durchgeführt wird.

Auf GitHub einen Pull Request erstellen:

1. Gehe auf die Seite deines Repositories auf GitHub.
2. Du siehst eine Benachrichtigung, dass dein Branch bereit für einen Pull Request ist.
3. Klicke auf "Compare & pull request", um einen Pull Request zu öffnen.
4. Gib eine beschreibende Nachricht ein, warum du die Änderungen vorgenommen hast, und klicke auf "Create pull request".

Wenn du sicherstellen willst, dass dein Branch aktuell mit dem main Branch ist:

```git pull origin main```

Falls es Konflikte gibt, löse sie zuerst und pushe die Änderungen, bevor du den Pull Request erstellst.

Pull Requests auf GitHub können überprüft und gemerged werden, sobald sie vom Team genehmigt wurden.

## Wie arbeite ich mit Git?

Neuen Branch erstellen:
```git checkout -b <dein-branch-name>```
Änderungen machen und committen:

Änderungen speichern:
```git add .```

Committen:
```git commit -m "Beschreibende Nachricht"```

Branch pushen:
```git push origin <dein-branch-name>```

Pull Request auf GitHub erstellen:
Gehe auf GitHub, öffne das Repository, und klicke auf "New Pull Request", um deinen Branch in main zu mergen.

## Konflikte lösen

Falls beim Merge Konflikte auftreten:

Öffne die betroffenen Dateien. (Diese werden nebeneinander angezeit mit Rot & Grün markierten Stellen)

Entscheide, welche Änderungen du behalten möchtest.

Lösche die Konflikt-Markierungen (<<<<<<<, =======, >>>>>>>).

Sobald du die Konflikte in den Dateien gelöst hast, speichere sie und füge die Dateien zum Staging-Bereich hinzu:

```git add <dateiname>```

Committe dann die gelösten Konflikte:

```git commit -m "Konflikte gelöst"```

Wenn der Merge abgeschlossen ist, kann die Änderung auf den Remotebranch gepusht werden:

```git push origin <dein-branch-name>```

## Kommunikation und Zusammenarbeit

Haltet euch an die Branch-Namenskonventionen (wie oben beschrieben).

Bei Problemen oder Unsicherheiten fragt einfach nach!

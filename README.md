# Climbtime
## Unsere kleine Kletter-App

### Grundregeln für die Arbeit mit Git

Wir sind alle Anfänger! Hier sind einfache, leicht umsetzbare Regeln für den Umgang mit Git:

### 1. Verwendung von Branches
Jeder neue Arbeitsschritt muss in einem neuen Branch erfolgen.

Benenne deinen Branch beschreibend, z. B.:

feature/<dein-name>-neue-funktion

bugfix/<dein-name>-fehler-beheben

hotfix/<dein-name>-kritischer-fehler

### 2. Arbeiten mit dem main Branch
Der main Branch ist der stabile Branch.

Wenn du mit dem main Branch arbeitest, stelle sicher, dass er immer aktuell ist (d.h. zieh vorher alle Änderungen mit git pull origin main).

### 3. Pullen und Pushen
Bevor du an einer Aufgabe arbeitest, ziehe zuerst die aktuellen Änderungen:
git pull origin main
Mach deine Änderungen, committe sie und pushe sie auf den Remote-Branch:

git push origin <dein-branch-name>

### 4. Merge Requests / Pull Requests
Bevor du deinen Branch in main mergen möchtest, öffne einen Pull Request auf GitHub.

Andere Teammitglieder sollen den Code durchlesen und bestätigen (Code Review), bevor der Merge durchgeführt wird.

## Wie arbeite ich mit Git?
Neuen Branch erstellen:
git checkout -b <dein-branch-name>
Änderungen machen und committen:

Änderungen speichern:
git add .

Committen:
git commit -m "Beschreibende Nachricht"

Branch pushen:
git push origin <dein-branch-name>

Pull Request auf GitHub erstellen:
Gehe auf GitHub, öffne das Repository, und klicke auf "New Pull Request", um deinen Branch in main zu mergen.

## Konflikte lösen
Falls beim Merge Konflikte auftreten:

Öffne die betroffenen Dateien.

Entscheide, welche Änderungen du behalten möchtest.

Lösche die Konflikt-Markierungen (<<<<<<<, =======, >>>>>>>).

Committe die aufgelösten Konflikte.

## Kommunikation und Zusammenarbeit
Haltet euch an die Branch-Namenskonventionen (wie oben beschrieben).

Bei Problemen oder Unsicherheiten fragt einfach nach!

# 🧗 Kletter-Trainingsplan – JSON-Schema Erklärung

Dieses Dokument beschreibt, wie das JSON-Schema für den Kletter-Trainingsplan aufgebaut ist. Es hilft dabei, neue Trainingseinheiten korrekt hinzuzufügen. So bleibt die Struktur einheitlich und die Daten können problemlos verarbeitet werden.

---

## 🔧 Aufbau des Schemas

Der Trainingsplan ist in Wochen unterteilt:

- `Woche 1/2`
- `Woche 3/4`
- `Woche 5/6`

### 📅 Wochen mit täglichen Übungen

**Gilt für z. B. `Woche 1/2`**

Diese Woche enthält die sieben Wochentage:

- Montag
- Dienstag
- Mittwoch
- Donnerstag
- Freitag
- Samstag
- Sonntag

Jeder Tag enthält eine **Liste von Übungen**.

- exercise (Name der Übung)
- description (Beschreibung der Übung)
- video (falls vorhanden Video passend zur Übung)

#### Beispiel:

```json
{
"Woche 1/2": {
    "Montag": [
    {
        "exercise": "Klimmzüge",
        "description": "3x5 Wiederholungen",
        "video": "videos/klimmzuege.mp4"
    },
    {
        "exercise": "Einarmige Haltearbeit",
        "description": "10–15 Sekunden pro Arm, größere Leiste",
        "video": "videos/haltearbeit.mp4"
    },
    ...
    ]
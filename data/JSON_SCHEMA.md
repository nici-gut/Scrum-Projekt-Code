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

Jeder Tag enthält eine:

**Liste von Übungen**

- exercise (Name der Übung)
- description (Beschreibung der Übung)
- instructions (Anleitung der Übung)
- musclegroup (Muskelgruppen die Angesprochen werden)
- video (Video verlinkung passend zur Übung)
- counter (ob die Übung ein Zähler benötigt: true/false)
- duration (Dauer der Übung in Sekunden)
- pauseDuration (Dauer der Pause in Sekunden)
- sets (Angabe der Set Anzahl)

**Angabe zu den Pausen**

- exercise (Pause)
- description (Beschreibung einer Alternativen Übung)
- video (Video das während der Pause abgespielt wird)
- counter (immer auf False, um einen Timer an zu zeigen)
- duration (Die Dauer der Pause)



#### Beispiel:

```json
{
"Woche 1/2": {
        "Montag": [
      {
        "exercise": "7/3 Intervall-Hängen",
        "description": "7 Sekunden hängen, 3 Sekunden Pause – 6–8 Wiederholungen",
        "instructions": "Hänge dich für 7 Sekunden mit aktiver Schulterkraft ans Griffbrett, gefolgt von 3 Sekunden Pause – halte dabei Körperspannung und kontrollierte Atmung.",
        "musclegroup": "Fingerbeuger, Unterarme, Schultern, Rücken (isometrisch)",
        "video": "videos/73 Intervallhängen.mp4",
        "counter": false,
        "duration": 7,
        "pauseDuration": 3,
        "sets": 8
      },
      {
        "exercise": "Pause",
        "description": "Alternativ Übung",
        "video": "videos/Pause.mp4",
        "counter": false,
        "duration": 90
      },
    ...
    ]
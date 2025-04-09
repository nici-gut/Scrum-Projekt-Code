// Wenn wir auf der Übersichtsseite sind
if (document.getElementById("tage-container")) {
    
  // Die JSON-Datei mit dem Trainingsplan wird geladen
  fetch("trainingsplan.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        let tage = data.wochen[0].tage;
  
        // Für jeden Tag im Trainingsplan...
        for (let i = 0; i < tage.length; i++) {
          let tag = tage[i];
          
          // Ein Button wird erstellt
          let button = document.createElement("button");
          button.textContent = "Tag " + tag.tag + ": " + tag.fokus;
          
          // Beim Klick auf den Button wird zur Detailseite für den Tag navigiert
          button.onclick = function () {
            window.location.href = "tag.html?tag=" + tag.tag;
          };
          
          // Der Button wird in den Container auf der Seite eingefügt
          document.getElementById("tage-container").appendChild(button);
        }
      });
  }
  
  // Wenn wir auf der Tag-Seite sind
  if (document.getElementById("uebungen-liste")) {

    // Die URL-Parameter werden ausgelesen (z. B. ?tag=1)
    let url = new URLSearchParams(window.location.search);
    let tagNummer = url.get("tag");
  
    // Die JSON-Datei mit dem Trainingsplan wird erneut geladen
    fetch("trainingsplan.json")
      .then(function (res) {
        return res.json(); //Als JSON parsen
      })
      .then(function (data) {
        let tage = data.wochen[0].tage; //Alle Tage der Woche holen 

        //Den Tag finden, der zur übergebenen Nummer passt
        let tag = tage.find(function (t) {
          return t.tag == tagNummer;
        });
        
        //Fehlermeldung anzeigen, falls kein passender Tag gefunden wurden 
        if (!tag) {
          document.getElementById("titel").textContent = "Tag nicht gefunden.";
          return;
        }
        
        //Überschrift und Fokuss setzen
        document.getElementById("titel").textContent = "Tag " + tag.tag;
        document.getElementById("fokus").textContent = tag.fokus;
        
        //Für jede Übung des Tages
        for (let i = 0; i < tag.übungen.length; i++) {
          let ü = tag.übungen[i];
  
          let li = document.createElement("li");
  
          li.innerHTML =
            "<strong>" + ü.name + "</strong><br>" +
            (ü.beschreibung ? "Beschreibung: " + ü.beschreibung + "<br>" : "") +
            (ü.wiederholungen ? "Wiederholungen: " + ü.wiederholungen + "<br>" : "") +
            (ü.dauer ? "Dauer: " + ü.dauer + "<br>" : "");
  
          //Das Listenelement wird zur Liste auf der Seite hinzugefügt
          document.getElementById("uebungen-liste").appendChild(li);
        }
      });
  }
  
  
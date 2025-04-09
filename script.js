// Wenn wir auf der Übersichtsseite sind
if (document.getElementById("tage-container")) {
    fetch("trainingsplan.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        let tage = data.wochen[0].tage;
  
        for (let i = 0; i < tage.length; i++) {
          let tag = tage[i];
  
          let button = document.createElement("button");
          button.textContent = "Tag " + tag.tag + ": " + tag.fokus;
  
          button.onclick = function () {
            window.location.href = "tag.html?tag=" + tag.tag;
          };
  
          document.getElementById("tage-container").appendChild(button);
        }
      });
  }
  
  // Wenn wir auf der Tag-Seite sind
  if (document.getElementById("uebungen-liste")) {
    let url = new URLSearchParams(window.location.search);
    let tagNummer = url.get("tag");
  
    fetch("trainingsplan.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        let tage = data.wochen[0].tage;
        let tag = tage.find(function (t) {
          return t.tag == tagNummer;
        });
  
        if (!tag) {
          document.getElementById("titel").textContent = "Tag nicht gefunden.";
          return;
        }
  
        document.getElementById("titel").textContent = "Tag " + tag.tag;
        document.getElementById("fokus").textContent = tag.fokus;
  
        for (let i = 0; i < tag.übungen.length; i++) {
          let ü = tag.übungen[i];
  
          let li = document.createElement("li");
  
          li.innerHTML =
            "<strong>" + ü.name + "</strong><br>" +
            (ü.beschreibung ? "Beschreibung: " + ü.beschreibung + "<br>" : "") +
            (ü.wiederholungen ? "Wiederholungen: " + ü.wiederholungen + "<br>" : "") +
            (ü.dauer ? "Dauer: " + ü.dauer + "<br>" : "");
  
          document.getElementById("uebungen-liste").appendChild(li);
        }
      });
  }
  
  
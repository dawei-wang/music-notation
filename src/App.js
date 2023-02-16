import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { schemeSet1 } from "d3-scale-chromatic";

const COLORS = {
  1: schemeSet1[0],
  2: schemeSet1[1],
  3: schemeSet1[2],
  4: schemeSet1[3],
  5: schemeSet1[4],
  6: schemeSet1[5],
};

const song =
  "G3 G3 G3 D4 G4 F#4 E4 D4 D4 D4 G4 G4 F#4 F#4 E4 E4 D4 G4 D4 G4 F#4 E4 D4";

const underlinedNotes = song.split(" ").map((note) => {
  const octave = note.charAt(note.length - 1);
  const color = COLORS[octave];
  const letterNote = note.slice(0, -1);
  const underlinedNote = letterNote
    .split("")
    .map((c) => `${c}_`)
    .join("");

  return {
    note: underlinedNote.slice(0, -1),
    color,
  };
});

function downloadPdf() {
  const input = document.getElementById("pdf-content");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("the_planets_jupiter.pdf");
  });
}

function App() {
  return (
    <div>
      <div id="pdf-content">
        <h2>The Planets - Jupiter</h2>
        {underlinedNotes.map(({ note, color }, i) => (
          <span key={i} style={{ color, textDecoration: "underline" }}>
            {note}{" "}
          </span>
        ))}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;

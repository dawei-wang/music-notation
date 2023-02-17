import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  2: "#b7e4c7",
  3: "#f6d743",
  4: "#fc913a",
  5: "#e7552c",
  6: "#a1241e",
};

const song =
  "D5 G5 A5 G5 F#5 E5 D5 C#5 D5 F5 E5 D5 C#5 B4 D5 G4 D5 A4 G4 F#4 E4 D4 C#4 D4 F4 E4 D4 C#4 B3 D4 G3 D4 G4 A4 B4 A4 G4 F#4 G4 A4 B4 A4 G4 F#4 E4 D4 E4 F#4 G4 A4 G4 F#4 E4 D4 C#4 D4 E4 F#4 G4 F#4 E4 D4 C#4 B3";

const notes = song.split(" ");

const createGrid = (notes) => {
  let currentOctave = null;
  const grid = [];

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const octave = parseInt(note.charAt(note.length - 1));

    if (octave !== currentOctave) {
      currentOctave = octave;
      grid.push([]);
    }

    const letterNote = note.slice(0, -1);
    const underlinedNote = letterNote
      .split("")
      .map((c) => `${c}_`)
      .join("");

    grid[grid.length - 1].push({
      note: underlinedNote.slice(0, -1),
      color: COLORS[octave],
    });
  }

  return grid;
};

function downloadPdf() {
  const input = document.getElementById("pdf-content");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("jupiter.pdf");
  });
}

function App() {
  const grid = createGrid(notes);

  return (
    <div>
      <div id="pdf-content">
        <h2>Gustav Holst - The Planets: Jupiter</h2>
        {grid.map((row, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "row" }}>
            {row.map(({ note, color }, j) => (
              <span
                key={j}
                style={{
                  color,
                  textDecoration: "underline",
                  marginRight: "5px",
                }}
              >
                {note}{" "}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;

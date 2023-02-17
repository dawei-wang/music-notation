import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  3: "#ffb347",
  4: "#b19cd9",
  5: "#ff6961",
  6: "#77dd77",
  7: "#aec6cf",
};

const song =
  "g4 g4 a4 g4 c5 b4 g4 g4 a4 g4 d5 c5 g4 g4 g4 g4 a4 b4 c5 c5 b4 a4 g4";
const notes = song.split(" ");

const noteGroups = [];
let currentGroup = [];
let prevOctave = null;
for (let i = 0; i < notes.length; i++) {
  const note = notes[i];
  const octave = parseInt(note[note.length - 1]);
  if (prevOctave && octave !== prevOctave) {
    noteGroups.push(currentGroup);
    currentGroup = [];
  }
  currentGroup.push(note);
  prevOctave = octave;
}
noteGroups.push(currentGroup);

function downloadPdf() {
  const input = document.getElementById("pdf-content");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("circle_of_life.pdf");
  });
}

function App() {
  return (
    <div>
      <div id="pdf-content">
        <h2>Circle of Life</h2>
        {noteGroups.map((group, i) => (
          <div
            key={i}
            style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}
          >
            {group.map((note, j) => {
              const octave = parseInt(note[note.length - 1]);
              const color = COLORS[octave];
              const letterNote = note.slice(0, -1);
              return (
                <span key={j} style={{ color, textDecoration: "underline" }}>
                  {letterNote}{" "}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;

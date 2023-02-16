import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  1: "#ff6666",
  2: "#ff9966",
  3: "#ffff66",
  4: "#99ff99",
  5: "#66b3ff",
  6: "#d966ff",
};

const song = "b4 a4 g4 b4 a4 g4 g4 g4 g4 g4 a4 a4 a4 a4 b4 a4 g4";

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

const abcNotation = `X: 1
T: Hot Cross Buns
M: 4/4
L: 1/4
Q: 1/4=120
K: G
${song}`;

function downloadPdf() {
  const input = document.getElementById("pdf-content");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("hot_cross_buns.pdf");
  });
}

function App() {
  const [showAbc, setShowAbc] = useState(false);

  return (
    <div>
      <div id="pdf-content">
        <h2>Hot Cross Buns</h2>
        {underlinedNotes.map(({ note, color }, i) => (
          <span key={i} style={{ color, textDecoration: "underline" }}>
            {note}{" "}
          </span>
        ))}
      </div>
      {showAbc ? (
        <pre>{abcNotation}</pre>
      ) : (
        <button onClick={() => setShowAbc(true)}>Show ABC notation</button>
      )}
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;

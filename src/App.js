import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  e: "#ff6666",
  f: "#ff9966",
  g: "#ffff66",
  a: "#99ff99",
  b: "#66b3ff",
  c: "#d966ff",
  d: "#ff66b3",
};

const song = "e4 d4 c4 d4 e4 e4 e4 g4 g4 g4 g4 e4 e4 e4 e4 d4 d4 e4 d4 c4";

const underlinedNotes = song.split(" ").map((note) => {
  const octave = note.charAt(note.length - 1);
  const color = COLORS[note.charAt(0)];
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
    pdf.save("greensleeves.pdf");
  });
}

function App() {
  return (
    <div>
      <div id="pdf-content">
        <h2>Greensleeves</h2>
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

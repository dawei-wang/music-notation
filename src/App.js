import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  1: "#fdab9f",
  2: "#fddda0",
  3: "#fff3b3",
  4: "#c2eabd",
  5: "#a6c5e5",
  6: "#cb99c9",
};

const song =
  "d6 d6 d6 d5 d6 f6 a6 g5 d6 d6 d6 g6 f6 e6 d6 c6 b5 b5 c6 d6 e6 f6 g6 a6 g6 f6 e6 d6 b5 g5 d6 d6 d6 g6 f6 e6 d6 c6 b5 c6 d6 e6 f6 g6 a6 g6 f6 e6 d6 b5 g5";

const highlightedNotes = song.split(" ").map((note) => {
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
    pdf.save("doctor_who.pdf");
  });
}

function App() {
  return (
    <div>
      <div id="pdf-content">
        <h2>Doctor Who Theme Song</h2>
        {highlightedNotes.map(({ note, color }, i) => (
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

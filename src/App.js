import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  4: "#FFB6C1",
  5: "#F08080",
  6: "#CD5C5C",
  7: "#FFA07A",
  8: "#FA8072",
  9: "#E9967A",
};

const song =
  "E4 E5 D5# E5 D5# B4 D5# B4 D5# E5 D5# C5# D5# C5# A4 D5# A4 D5# C5# D5# B4 D5#";

const underlinedNotes = song.split(" ").map((note, i, notes) => {
  const octave = parseInt(note.charAt(note.length - 1));
  const color = COLORS[octave] || "#000000";
  const letterNote = note.slice(0, -1);
  const underlinedNote = letterNote
    .split("")
    .map((c) => `${c}_`)
    .join("");

  const isLastNote = i === notes.length - 1;
  const nextNoteOctave = isLastNote
    ? null
    : parseInt(notes[i + 1].charAt(notes[i + 1].length - 1));
  const shouldAddLineBreak =
    nextNoteOctave !== null && octave !== nextNoteOctave;

  return {
    note: underlinedNote.slice(0, -1),
    color,
    shouldAddLineBreak,
  };
});

function downloadPdf() {
  const input = document.getElementById("pdf-content");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("nocturne.pdf");
  });
}

function App() {
  return (
    <div>
      <div id="pdf-content">
        <h2>Nocturne by Secret Garden</h2>
        <div style={{ whiteSpace: "nowrap" }}>
          {underlinedNotes.map(({ note, color, shouldAddLineBreak }, i) => (
            <span key={i} style={{ color, textDecoration: "underline" }}>
              {note} {shouldAddLineBreak && <br />}
            </span>
          ))}
        </div>
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;

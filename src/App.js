import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  3: "#FFB6C1",
  4: "#F08080",
  5: "#CD5C5C",
  6: "#FFA07A",
  7: "#FA8072",
  8: "#E9967A",
};

const song =
  "E4 D#4 E4 D#4 E4 B3 D4 C#4 A3 C4 B3 A3 B3 C4 D4 B3 F#3 G#3 B3 A3 C4 B3 A3";

const underlinedNotes = song.split(" ").map((note, i, notes) => {
  const octave = parseInt(note.charAt(note.length - 1));
  const color = COLORS[octave] || "#000000";
  const letterNote = note.slice(0, -1);
  const isSharp = letterNote.includes("#");
  const underlinedNote = letterNote
    .split("")
    .map((c) => `${c}${isSharp ? "_" : ""}`)
    .join("");

  const isLastNote = i === notes.length - 1;
  const nextNoteOctave = isLastNote
    ? null
    : parseInt(notes[i + 1].charAt(notes[i + 1].length - 1));
  const shouldAddLineBreak =
    nextNoteOctave !== null && octave !== nextNoteOctave;

  return {
    note: underlinedNote,
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

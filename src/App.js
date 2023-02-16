import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  1: "#1f77b4",
  2: "#ff7f0e",
  3: "#2ca02c",
  4: "#d62728",
  5: "#9467bd",
  6: "#8c564b",
};

const song =
  "C C G G A A G F F E E D D C G G F F E E D G G F F E E D C C G G A A G F F E E D D C";

const underlinedNotes = song.split(" ").map((note) => {
  const octave = parseInt(note[note.length - 1]);
  const color = COLORS[octave];
  const letterNote = octave ? note.slice(0, -1) : note;
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
    pdf.save("twinkle_twinkle_little_star.pdf");
  });
}

function renderABC() {
  const abcContent = `X:1\nT:Twinkle Twinkle Little Star\nM:4/4\nL:1/4\nK:C\n${song}`;
  const url = `https://www.abcjs.net/abcjs-editor.html?soundFont=gm&midiParams=undefined&editArea=${encodeURIComponent(
    abcContent
  )}`;
  window.open(url);
}

function App() {
  return (
    <div>
      <div id="pdf-content">
        <h2>Twinkle Twinkle Little Star</h2>
        {underlinedNotes.map(({ note, color }, i) => (
          <span key={i} style={{ color, textDecoration: "underline" }}>
            {note}{" "}
          </span>
        ))}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
      <button onClick={renderABC}>Render ABC Notation</button>
    </div>
  );
}

export default App;

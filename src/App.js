import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  2: "#FBB4AE",
  3: "#B3CDE3",
  4: "#CCEBC5",
  5: "#DECBE4",
  6: "#FED9A6",
  7: "#FFFFCC",
  8: "#E5D8BD",
  9: "#FDDAEC",
};

const song =
  "e4 d4 c4 d4 e4 e4 e4 d4 d4 d4 e4 g4 g4 e4 d4 c4 d4 e4 e4 e4 e4 d4 d4 e4 d4 c4";

const coloredNotes = song.split(" ").map((note) => {
  const octave = note.charAt(note.length - 1);
  const color = COLORS[octave];
  const letterNote = note.slice(0, -1);
  return {
    note: letterNote,
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
        {coloredNotes.map(({ note, color }, i) => (
          <span key={i} style={{ color }}>
            {note}{" "}
          </span>
        ))}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;

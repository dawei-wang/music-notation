import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { renderToSvg } from "abcjs";

const COLORS = {
  1: "#ff6666",
  2: "#ff9966",
  3: "#ffff66",
  4: "#99ff99",
  5: "#66b3ff",
  6: "#d966ff",
};

const song =
  "c4 c4 g4 g4 a4 a4 g4 e4 e4 d4 d4 c4 g4 g4 f4 f4 e4 e4 d4 g4 g4 f4 f4 e4 e4 d4 c4 c4 g4 g4 a4 a4 g4 e4 e4 d4 d4 c4";

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
    pdf.save("twinkle_twinkle_little_star.pdf");
  });
}

function downloadAbc() {
  const svgString = renderToSvg(song, {});
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "twinkle_twinkle_little_star.abc";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function App() {
  return (
    <div>
      <div id="pdf-content">
        <h2>Twinkle, Twinkle, Little Star</h2>
        {underlinedNotes.map(({ note, color }, i) => (
          <span key={i} style={{ color, textDecoration: "underline" }}>
            {note}{" "}
          </span>
        ))}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
      <button onClick={downloadAbc}>Download ABC</button>
    </div>
  );
}

export default App;

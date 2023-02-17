import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = {
  2: "#FFB6C1",
  3: "#F08080",
  4: "#CD5C5C",
  5: "#FFA07A",
  6: "#FA8072",
  7: "#E9967A",
};

const song =
  "d3 c3 g3 c4 d4 e4 d4 c4 g3 c4 d4 e4 d4 c4 g3 c4 d4 c4 g3 c4 d4 e4 d4 c4 g3 c4 d4 c4 g3";

const underlinedNotes = song.split(" ").map((note) => {
  const octave = parseInt(note.charAt(note.length - 1));
  const color = COLORS[octave] || "#000000";
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
    pdf.save("nocturne.pdf");
  });
}

function App() {
  const noteGroups = [];
  let lastOctave = 0;
  let group = [];
  for (let i = 0; i < underlinedNotes.length; i++) {
    const { note, color } = underlinedNotes[i];
    const octave = parseInt(note.charAt(note.length - 1));
    if (octave !== lastOctave) {
      noteGroups.push(group);
      group = [{ note, color }];
      lastOctave = octave;
    } else {
      group.push({ note, color });
    }
  }
  noteGroups.push(group);

  return (
    <div>
      <div id="pdf-content">
        <h2>Nocturne by Secret Garden</h2>
        {noteGroups.map((group, i) => (
          <div key={i}>
            {group.map(({ note, color }, j) => (
              <span key={j} style={{ color, textDecoration: "underline" }}>
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

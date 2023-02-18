import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SONGS = [
  {
    name: "Imagine",
    notes:
      "E4 G4 E5 G5 B5 B4 A4 E5 G5 E5 G5 B5 B4 A4 E5 G5 E5 G5 B5 B4 A4 E5 G5 E5 G5 B5",
  },
  {
    name: "Nocturne",
    notes:
      "E4 D#4 E4 D#4 E4 B3 D4 C#4 A3 C4 B3 A3 B3 C4 D4 B3 F#3 G#3 B3 A3 C4 B3 A3",
  },
  {
    name: "Doctor Who Theme",
    notes:
      "D4 G4 G4 A4 G4 B4 A4 G4 G4 A4 G4 B4 A4 G4 G4 A4 G4 B4 A4 G4 G4 A4 G4 B4 A4 G4",
  },
  {
    name: "Greensleeves",
    notes:
      "E4 D4 E4 F#4 G4 F#4 E4 D4 E4 E4 D4 E4 F#4 G4 F#4 E4 D4 E4 F#4 G4 F#4 E4 D4 E4",
  },
  {
    name: "Hot Cross Buns",
    notes: "B4 A4 G4 B4 A4 G4 G4 G4 G4 G4 A4 A4 A4 A4 B4 A4 G4 ",
  },
  {
    name: "Twinkle Twinkle Little Star",
    notes:
      "C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4 G4 G4 F4 F4 E4 E4 D4 G4 G4 F4 F4 E4 E4 D4 C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4",
  },
  {
    name: "Circle of Life",
    notes:
      "E4 E4 F#4 G#4 G#4 F#4 E4 D4 C#4 A3 A3 C#4 E4 E4 C#4 A3 A3 C#4 E4 E4 F#4 G#4 G#4 F#4 E4 D4 C#4 A3 A3 C#4",
  },
  {
    name: "Jupiter",
    notes:
      "C4 C4 C4 C4 C4 C4 C4 C4 E4 E4 E4 E4 E4 E4 E4 E4 G4 G4 G4 G4 G4 G4 G4 G4 E4 E4 E4 E4 E4 E4 E4 E4 C4 C4 C4 C4 C4 C4 C4 C4",
  },
];

function underlineNotes(notes) {
  let octaveIndex = 0;
  const octaves = {};
  return notes.split(" ").map((note, i, arr) => {
    const octave = parseInt(note.charAt(note.length - 1));
    let octaveColor;
    if (!octaves[octave]) {
      octaves[octave] = octaveIndex;
      octaveIndex++;
    }
    const hue = (octaves[octave] / Object.keys(octaves).length) * 360;
    octaveColor = `hsl(${hue}, 90%, 60%)`;

    const letterNote = note.slice(0, -1);
    const isSharp = letterNote.includes("#");
    const underlinedNote = isSharp
      ? letterNote.split("").join("_")
      : letterNote;

    const isLastNote = i === arr.length - 1;
    const nextNoteOctave = isLastNote
      ? null
      : parseInt(arr[i + 1].charAt(arr[i + 1].length - 1));
    const shouldAddLineBreak =
      nextNoteOctave !== null && octave !== nextNoteOctave;

    return {
      note: underlinedNote,
      color: octaveColor,
      shouldAddLineBreak,
    };
  });
}

function downloadPdf() {
  const input = document.getElementById("pdf-content");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("songs.pdf");
  });
}

function App() {
  const pdfContentRef = useRef(null);

  return (
    <div>
      <div ref={pdfContentRef} id="pdf-content">
        {SONGS.map(({ name, notes }, i) => (
          <div key={i}>
            <h2>{name}</h2>
            <div style={{ whiteSpace: "nowrap" }}>
              {underlineNotes(notes).map(
                ({ note, color, shouldAddLineBreak }, i) => (
                  <span key={i} style={{ color, textDecoration: "underline" }}>
                    {note} {shouldAddLineBreak && <br />}
                  </span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;

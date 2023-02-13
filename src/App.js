import React, { useState, useRef, useEffect } from "react";
import * as abcjs from "abcjs";
import PDFDocument from "jspdf";
import "./App.css";
import { saveAs } from "file-saver";

const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#000000",
  "#ffffff",
];

function App() {
  const [abcNotation, setAbcNotation] = useState("");
  const abcContainerRef = useRef(null);

  useEffect(() => {
    setAbcNotation(
      "X:1\nT:Hot Cross Buns\nM:4/4\nK:C\nC C C\nG G G\nA A A\nG\nF F F\nE E E\nD D D\nC"
    );
  }, []);

  const renderAbc = () => {
    abcjs.renderAbc(abcContainerRef.current, abcNotation);
  };

  const handleDownloadPdf = () => {
    const doc = new PDFDocument();
    let octave = 0;

    let x = 50;
    let y = 50;

    abcNotation.split("\n").forEach((note) => {
      doc.fillColor(colors[octave % 8]).text(note, x, y);
      y += 20;

      if (note.includes("'")) {
        octave++;
      }
    });

    doc.output("dataurlnewwindow");
    const pdfData = doc.output();
    const blob = new Blob([pdfData], { type: "application/pdf" });
    saveAs(blob, "hotCrossBuns.pdf");
  };

  return (
    <div className="App">
      <div ref={abcContainerRef} />
      <button onClick={renderAbc}>Render ABC Notation</button>
      <button onClick={handleDownloadPdf}>Download ABC Notation (PDF)</button>
    </div>
  );
}

export default App;

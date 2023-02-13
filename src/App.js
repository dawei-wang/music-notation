import React, { useState, useRef, useEffect } from "react";
import * as abcjs from "abcjs";
import jsPDF from "jspdf";
import "./App.css";
import FileSaver from "file-saver";

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
    fetch("sample-tune.json")
      .then((res) => res.json())
      .then((data) => {
        setAbcNotation(data.abcNotation);
      });
  }, []);

  const renderAbc = () => {
    abcjs.renderAbc(abcContainerRef.current, abcNotation);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    let x = 50;
    let y = 50;
    let line = 0;

    abcNotation.split("\n").forEach((note) => {
      doc.setTextColor(colors[line % 8]);
      doc.text(note, x, y, { underline: true });
      y += 20;
      line++;
    });

    const pdfBlob = doc.output("blob");
    FileSaver.saveAs(pdfBlob, "abcNotation.pdf");
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

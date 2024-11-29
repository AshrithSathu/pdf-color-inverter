import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkIfPDF();
  }, []);

  const checkIfPDF = async () => {
    try {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        setIsChecking(false);
        return;
      }

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          return (
            document.contentType === "application/pdf" ||
            window.location.pathname.toLowerCase().endsWith(".pdf")
          );
        },
      });

      setIsPDF(results[0]?.result || false);
      setIsChecking(false);
    } catch (error) {
      console.error("Failed to check PDF:", error);
      setIsChecking(false);
    }
  };

  const onClick = async () => {
    if (!isPDF) return;

    try {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        console.error("No active tab found");
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const existingCover = document.querySelector(".pdf-inverter-cover");
          if (existingCover) {
            existingCover.remove();
            return;
          }

          const cover = document.createElement("div");
          cover.className = "pdf-inverter-cover";
          const PDFCSS = `
            position: fixed;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: white;
            mix-blend-mode: difference;
            z-index: 1;
          `;
          cover.setAttribute("style", PDFCSS);
          document.body.appendChild(cover);
          console.log("PDF inverter overlay added");
        },
      });

      setIsActive(!isActive);
    } catch (error) {
      console.error("Failed to execute script:", error);
    }
  };

  const openGitHub = () => {
    chrome.tabs.create({
      url: "https://github.com/ashrithsathu/pdf-color-inverter",
    });
  };

  return (
    <div className="container">
      <h1 className="title">PDF Color Inverter</h1>
      <p className="description">
        Instantly switch your PDF to dark mode for better readability and
        reduced eye strain.
      </p>

      <button
        onClick={onClick}
        className={`toggle-button ${!isPDF ? "disabled" : ""}`}
        disabled={!isPDF || isChecking}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 2v12A6 6 0 1 1 8 2z"
            fill="currentColor"
          />
        </svg>
        {isChecking
          ? "Checking page..."
          : !isPDF
          ? "Not a PDF page"
          : isActive
          ? "Disable Dark Mode"
          : "Enable Dark Mode"}
      </button>

      <div className={`status ${isActive ? "active" : ""}`}>
        <span>●</span>
        {isChecking
          ? "Checking page type..."
          : !isPDF
          ? "Please open a PDF file to use this extension"
          : isActive
          ? "Dark mode enabled"
          : "Dark mode disabled"}
      </div>

      <div className="divider" />

      <div className="footer">
        {isPDF
          ? "Press the button above to toggle dark mode for your PDF"
          : "This extension only works on PDF pages"}

        <button onClick={openGitHub} className="github-link">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Report bugs on GitHub
        </button>
        <div className="bug-report">Found a bug? Click above to report it!</div>
      </div>
    </div>
  );
}

export default App;

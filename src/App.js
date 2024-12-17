import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const App = () => {
  const [link, setLink] = useState(''); // State to store the input link
  const [qrVisible, setQrVisible] = useState(false); // State to toggle QR code visibility
  const qrRef = useRef(null); // Reference to the QR code canvas for saving/printing

  // Handle input change
  const handleInputChange = (e) => {
    setLink(e.target.value);
    setQrVisible(false); // Hide QR code until regenerated
  };

  // Generate QR code
  const handleGenerateQR = () => {
    if (link.trim() === '') {
      alert('Please enter a valid link!');
      return;
    }
    setQrVisible(true);
  };

  // Print QR Code
  const handlePrintQR = () => {
    window.print();
  };

  // Save QR Code as an image
  const handleSaveQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL(); // Convert QR code to PNG
    link.click();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>QR Code Generator</h1>

      {/* Input for the link */}
      <input
        type="text"
        placeholder="Enter link here"
        value={link}
        onChange={handleInputChange}
        style={styles.input}
      />

      {/* Generate QR Code */}
      <button onClick={handleGenerateQR} style={styles.button}>
        Generate QR Code
      </button>

      {/* QR Code Display */}
      {qrVisible && (
        <div ref={qrRef} style={styles.qrContainer}>
          <QRCodeCanvas value={link} size={256} />
        </div>
      )}

      {/* Print and Save Buttons */}
      {qrVisible && (
        <div style={styles.actions}>
          <button onClick={handlePrintQR} style={styles.button}>
            Print QR Code
          </button>
          <button onClick={handleSaveQR} style={styles.button}>
            Save QR Code
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
  },
  input: {
    width: '60%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  qrContainer: {
    margin: '20px auto',
    display: 'inline-block',
    padding: '10px',
    background: '#f4f4f4',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  actions: {
    marginTop: '20px',
  },
};

export default App;

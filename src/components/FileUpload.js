import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        onFileUpload(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold flex items-center mb-4 text-blue-700">
        <span className="mr-2">📂</span> Upload Transaction/Logs File
      </h2>

      {/* Upload Button */}
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="block text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-600 file:text-white
                   hover:file:bg-blue-700
                   cursor-pointer mb-4"
      />

      {/* Preview */}
      {fileContent && (
        <div>
          <h3 className="text-lg font-semibold flex items-center mb-2 text-gray-700">
            <span className="mr-2">📝</span> File Preview
          </h3>
          <pre className="bg-gray-900 text-green-400 text-sm rounded-lg p-4 overflow-auto max-h-60">
            {fileContent}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
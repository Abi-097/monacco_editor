import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
const Python = ({
  activeTab,
  theme,
  jsonInput,
  setJsonInput,
  code,
  setCode,
  jsonOutput,
  handleExecute,
  language,
  setLanguage,
}) => {
  useEffect(() => {
    if (activeTab === "Python") {
      setLanguage("python");
    } else if (activeTab === "SQL") {
      setLanguage("sql");
    }
  }, [activeTab]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-2 h-full">
        {/* Left section (full width on md screens, 3 columns on large screens) */}
        <pre className="md:col-span-12 lg:col-span-3 ">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={35}
            className="w-full p-2 border border-gray-300"
            placeholder="Enter JSON input"
            style={{
              backgroundColor: theme === "Dark" ? "#1E1E1E" : "white",
              color: theme === "Dark" ? "#D4D4D4" : "black",
            }}
          />
        </pre>

        {/* Center section (full width on md screens, 6 columns on large screens) */}
        <div className="md:col-span-12 lg:col-span-6 border border-1 border-gray-300">
          <Editor
            height="99%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme={theme === "Dark" ? "vs-dark" : "light"}
          />
        </div>

        {/* Right section (full width on md screens, 3 columns on large screens) */}
        <div className={`md:col-span-12 lg:col-span-3 flex flex-col `}>
          {/* Top right section */}
          <div
            className={`flex-1 border border-1 border-gray-300 w-full ${
              theme === "Dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            } `}
          >
            <pre
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {jsonOutput}
            </pre>
          </div>
          {/* Bottom right section */}
          <div
            className={`flex-1 border border-1 mt-1 border-gray-300 w-full ${
              theme === "Dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            } `}
          >
            {" "}
            <pre
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {jsonOutput}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Python;

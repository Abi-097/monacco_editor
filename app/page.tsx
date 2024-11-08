"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Expand } from "lucide-react";
import { useState } from "react";
import Python from "./components/Python";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Home() {
  const [activeTab, setActiveTab] = useState("Python");
  const [theme, setTheme] = useState("light");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [jsonInput, setJsonInput] = useState("{}"); // JSON input state
  const [code, setCode] = useState(""); // Monaco Editor code state
  const [jsonOutput, setJsonOutput] = useState(""); // JSON output state
  const [language, setLanguage] = useState("python"); // Language state (Python/SQL)

  // Function to handle fetching data from the URL
  const handleFetchFromUrl = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}`);
    }
    return await response.json();
  };

  // Execute code and fetch or use input JSON accordingly
  const handleExecute = async () => {
    try {
      const input = JSON.parse(jsonInput); // Parse input JSON
      let outputData = {};

      // Check if the code includes a fetch URL
      if (code.includes("fetch")) {
        const urlMatch = code.match(/fetch\(['"](.*?)['"]\)/);
        if (urlMatch && urlMatch[1]) {
          const url = urlMatch[1]; // Extract the URL from the code
          const fetchedData = await handleFetchFromUrl(url); // Fetch data from the URL
          outputData = { result: "Fetched data", data: fetchedData };
        }
      } else {
        if (language === "python") {
          outputData = { result: "Python code executed", data: input };
        } else if (language === "sql") {
          outputData = { result: "SQL query executed", data: input };
        }
      }

      setJsonOutput(JSON.stringify(outputData, null, 2)); // Set output JSON
    } catch (error) {
      setJsonOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent
          className={`${
            isFullScreen ? "max-w-full h-full" : "sm:max-w-[1200px]"
          } transition-all duration-300`}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Expand
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="cursor-pointer"
                />
                <p className="text-lg">Custom Code Editor</p>
              </div>
              <div className="mr-4">
                <Select
                  value={theme}
                  onValueChange={(value) => setTheme(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className="border rounded px-2 py-1">
                    <SelectGroup>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="Dark">Dark</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </DialogTitle>
            <hr className="my-3" />
            <DialogDescription className="py-2">
              <div className="flex justify-between items-center border-b pb-2">
                {/* Left Side Tabs */}
                <div className="flex gap-4">
                  <button
                    className={`pb-2 flex items-center gap-2 font-semibold text-black ${
                      activeTab === "Python" ? "border-b-2 border-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("Python")}
                  >
                    <Image
                      src="/python.png"
                      alt="python.png"
                      width={17}
                      height={17}
                    />{" "}
                    Python
                  </button>
                  <button
                    className={`pb-2 flex items-center gap-2 font-semibold text-black ${
                      activeTab === "SQL" ? "border-b-2 border-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("SQL")}
                  >
                    <Image
                      src="/database.png"
                      alt="database.png"
                      width={17}
                      height={17}
                    />{" "}
                    SQL
                  </button>
                  <div className="flex items-center gap-2 pb-2">
                    <p className="text-sm font-semibold">Code</p>
                    <div className="bg-yellow-300 text-black px-2 py-1 rounded">
                      Un Deployed
                    </div>
                    <p className="text-xs text-gray-500">
                      Saved few seconds ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="secondary">Deploy</Button>
                  <Button variant="secondary">Reset</Button>
                  <Select
                  // value={theme}
                  // onValueChange={(value) => setTheme(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Database" />
                    </SelectTrigger>
                    <SelectContent className="border rounded px-2 py-1">
                      <SelectGroup>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="Dark">Dark</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button variant="secondary" onClick={handleExecute}>
                    Test
                  </Button>
                </div>
                {/* Right Side Dropdown */}
              </div>
              <div className="flex items-center justify-between"> </div>
              {/* Tab Content */}
              <div className="mt-4">
                {activeTab === "Python" && (
                  <Python
                    activeTab={activeTab}
                    theme={theme}
                    jsonInput={jsonInput}
                    setJsonInput={setJsonInput}
                    code={code}
                    setCode={setCode}
                    jsonOutput={jsonOutput}
                    // setJsonOutput={setJsonOutput}
                    handleExecute={handleExecute}
                    language={language}
                    setLanguage={setLanguage}
                  />
                )}
                {activeTab === "SQL" && (
                  <div>
                    <Python
                      activeTab={activeTab}
                      theme={theme}
                      jsonInput={jsonInput}
                      setJsonInput={setJsonInput}
                      code={code}
                      setCode={setCode}
                      jsonOutput={jsonOutput}
                      // setJsonOutput={setJsonOutput}
                      handleExecute={handleExecute}
                      language={language}
                      setLanguage={setLanguage}
                    />
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

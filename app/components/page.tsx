"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Expand } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Python");
  const [theme, setTheme] = useState("Light");
  const [isFullScreen, setIsFullScreen] = useState(false);
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
            <DialogTitle className="flex items-center gap-2">
              <Expand
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="cursor-pointer"
              />
              <p>Edit profile</p>
            </DialogTitle>
            <hr className="my-3" />
            <DialogDescription>
              <div className="flex justify-between items-center border-b pb-2">
                {/* Left Side Tabs */}
                <div className="flex gap-4">
                  <button
                    className={`pb-2 ${
                      activeTab === "Python" ? "border-b-2 border-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("Python")}
                  >
                    Python
                  </button>
                  <button
                    className={`pb-2 ${
                      activeTab === "SQL" ? "border-b-2 border-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("SQL")}
                  >
                    SQL
                  </button>
                </div>

                {/* Right Side Dropdown */}
                <div>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                  </select>
                </div>
              </div>

              {/* Tab Content */}
              <div className="mt-4">
                {activeTab === "Python" && <div>{/* Python Components */}</div>}
                {activeTab === "SQL" && <div>{/* SQL Components */}</div>}
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

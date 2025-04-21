import React, { useState } from "react";

const Settings = () => {
  // Custom Test Cases feature state
  const [customTests, setCustomTests] = useState<string[]>([]);
  const [testInput, setTestInput] = useState("");

  const handleAddTest = () => {
    if (testInput.trim()) {
      setCustomTests([...customTests, testInput.trim()]);
      setTestInput("");
    }
  };

  const handleRemoveTest = (idx: number) => {
    setCustomTests(customTests.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
      <div className="bg-background/90 rounded-xl shadow-xl p-6 mt-8 w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">Custom Test Cases</h3>
        <p className="text-muted-foreground mb-2">
          Add, manage, and save your own custom test cases to run on analysis.
        </p>
        <div className="flex gap-2 mb-4">
          <input
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            className="flex-1 bg-muted rounded px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="Enter custom test case..."
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded shadow active:scale-95 hover:bg-primary/90"
            onClick={handleAddTest}
            disabled={!testInput.trim()}
            type="button"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {customTests.length === 0 ? (
            <li className="text-muted-foreground text-sm">No custom test cases added yet.</li>
          ) : (
            customTests.map((test, i) => (
              <li key={i} className="flex items-center justify-between p-2 rounded bg-muted">
                <span>{test}</span>
                <button
                  className="ml-2 text-xs text-red-500 hover:underline"
                  onClick={() => handleRemoveTest(i)}
                  type="button"
                  aria-label={`Remove test case ${i + 1}`}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Settings;

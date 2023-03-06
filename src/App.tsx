import React, { useState } from "react";
import "./App.css";
import "./hljs.css";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "./components/Tabs";
import Editor from "./components/Editor";
import Previewer from "./components/Previewer";
import Cluster from "./components/Cluster";

function App() {
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const tabWidth = `   `;
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      setInput(
        `${input.substring(0, start)}${tabWidth}${input.substring(end)}`
      );
      // Set the cursor position to be after the inserted tab
      e.currentTarget.selectionEnd = start + 1;
    }
  };

  return (
    <div className="App">
      <Tabs className="wrapper stack-m " defaultValue="Edit">
        <h1 className="secondary-font center-text uppercase spaced-lettering">
          Markdown Previewer
        </h1>
        <TabList className="rounded no-rounded-bottom">
          <Cluster>
            <Tab value="Edit" className="">
              Edit
            </Tab>
            <Tab value="Preview" className="">
              Preview
            </Tab>
          </Cluster>
        </TabList>

        <TabPanels className="">
          <TabPanel value="Edit" className="">
            <Editor
              onChange={handleChange}
              input={input}
              onKeyDown={handleKeyDown}
            />
          </TabPanel>
          <TabPanel value="Preview" className="">
            <Previewer input={input} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;

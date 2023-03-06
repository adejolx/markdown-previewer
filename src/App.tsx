import React, { useRef, useState } from "react";
import "./App.css";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "./components/Tabs";
import Editor from "./components/Editor";
import Previewer from "./components/Previewer";
import Cluster from "./components/Cluster";
import defaultText from "./utils/defautText";

function App() {
  const [input, setInput] = useState(defaultText);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && textAreaRef.current) {
      e.preventDefault();
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const start = selectionStart;
      const end = selectionEnd;
      const updatedText =
        input.substring(0, start) + "\t" + input.substring(end, input.length);
      setInput(updatedText);
      textAreaRef.current.value = updatedText;
      textAreaRef.current.setSelectionRange(start + 1, start + 1);
    }
  };

  return (
    <div className="App">
      <Tabs className="wrapper stack-s " defaultValue="Edit">
        <h1 className="secondary-font center-text uppercase spaced-lettering">
          Markdown Previewer 📝
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
              ref={textAreaRef}
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

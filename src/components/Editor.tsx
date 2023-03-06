import { forwardRef } from "react";

type EditorProps = {
  onChange: React.ChangeEventHandler;
  input: string;
  onKeyDown: React.KeyboardEventHandler;
};

const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ onChange, input, onKeyDown }, ref) => (
    <>
      <textarea
        onChange={onChange}
        value={input}
        onKeyDown={onKeyDown}
        style={{ tabSize: 2 }}
        ref={ref}
      ></textarea>
    </>
  )
);

export default Editor;

type EditorProps = {
  onChange: React.ChangeEventHandler;
  input: string;
  onKeyDown: React.KeyboardEventHandler;
};

export default function Editor({ onChange, input, onKeyDown }: EditorProps) {
  return (
    <>
      <textarea
        onChange={onChange}
        value={input}
        onKeyDown={onKeyDown}
      ></textarea>
    </>
  );
}

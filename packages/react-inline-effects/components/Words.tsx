import * as React from "react";
import words from "../misc/tokenizer/words";

export interface WordsProps {
  children: string;
}
const Words: React.FC<WordsProps> = ({ children }) => {
  return (
    <>
      {words(children).map(
        (word, i) => <span key={i}>{word}</span>,
      )}
    </>
  );
};

export default Words;

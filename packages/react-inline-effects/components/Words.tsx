import * as React from "react";
import { split } from "unicode-default-word-boundary";

export interface WordsProps {
  children: string;
}
const Words: React.FC<WordsProps> = ({ children }) => {
  return (
    <>
      {split(children).map(
        (word, i) => <span key={i}>{word}</span>,
      )}
    </>
  );
};

export default Words;

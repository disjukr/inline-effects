import * as React from "react";
import letters from "../misc/tokenizer/letters";

export interface LettersProps {
  children: string;
}
const Letters: React.FC<LettersProps> = ({ children }) => {
  return (
    <>
      {letters(children).map(
        (letter, i) => <span key={i}>{letter}</span>,
      )}
    </>
  );
};

export default Letters;

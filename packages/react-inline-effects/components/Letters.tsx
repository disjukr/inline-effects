import * as React from "react";

export interface LettersProps {
  children: string;
}
const Letters: React.FC<LettersProps> = ({ children }) => {
  return (
    <>
      {children.split("").map(
        (letter, i) => <span key={i}>{letter}</span>,
      )}
    </>
  );
};

export default Letters;

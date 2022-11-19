import React from "react";

export interface ExampleComponentProps {
  text: string;
  t: number;
}
export type ExampleComponent = React.FC<ExampleComponentProps>;

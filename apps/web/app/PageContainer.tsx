"use client";

import * as React from "react";
import {
  Box,
  CheckBox,
  Form,
  FormField,
  Grommet,
  Header,
  Heading,
  Page,
  PageContent,
  RangeInput,
  Select,
  TextInput,
} from "grommet";

import Wiggly from "./example/Wiggly";
import SmoothBounce from "./example/SmoothBounce";
import { ExampleComponent } from "./example/type";
import { NumberInput } from "grommet-controls";

interface Example {
  value: string;
  name: string;
  Component: ExampleComponent;
  duration: number;
  tutorialLink: string;
  sourceCodeUrl: string;
}
const examples: Example[] = [
  {
    value: "wiggly",
    name: "The Wiggly Selector",
    Component: Wiggly,
    duration: 3,
    tutorialLink: "https://www.youtube.com/watch?v=nN_J1_dlYh4",
    sourceCodeUrl:
      "https://raw.githubusercontent.com/disjukr/inline-effects/main/apps/web/app/example/Wiggly.tsx",
  },
  {
    value: "smooth-bounce",
    name: "Smooth Bouncy Text Animation",
    Component: SmoothBounce,
    duration: 1,
    tutorialLink: "https://www.youtube.com/watch?v=9xI9Yn6TE4A",
    sourceCodeUrl:
      "https://raw.githubusercontent.com/disjukr/inline-effects/main/apps/web/app/example/SmoothBounce.tsx",
  },
];

export default function PageContainer() {
  const [text, setText] = React.useState("Inline Effects");
  const {
    value: exampleValue,
    name: exampleName,
    setExampleValue,
    duration: exampleDuration,
    Component,
  } = useExamples();
  const {
    t,
    setT,
    duration,
    setDuration,
    manual,
    setManual,
  } = useT(exampleDuration);
  return (
    <Grommet>
      <Header background="brand">
        <Page kind="narrow">
          <PageContent>
            <Heading level={2}>Inline Effects</Heading>
          </PageContent>
        </Page>
      </Header>
      <Page kind="narrow">
        <PageContent>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "5em",
              overflow: "hidden",
              margin: "1rem 0",
              fontSize: "3rem",
              fontFamily: "sans-serif",
              color: "white",
              background: "black",
            }}
          >
            <Component text={text} t={t} />
          </Box>
          <Form>
            <FormField label="Examples">
              <Select
                options={examples.map((e) => e.value)}
                value={exampleValue}
                valueLabel={exampleName}
                onChange={(e) => setExampleValue(e.target.value)}
              />
            </FormField>
            <FormField label="Text">
              <TextInput
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </FormField>
            <FormField label="Time">
              <RangeInput
                min={0}
                max={1}
                step={0.001}
                value={t}
                onChange={(e) => setT(Number(e.target.value))}
              />
            </FormField>
            <FormField label="Manual">
              <CheckBox checked={manual} onChange={() => setManual(!manual)} />
            </FormField>
            <FormField label="Duration">
              <NumberInput
                min={1}
                max={60}
                value={duration}
                onChange={(e) => setDuration(Number(e.target!.value))}
              />
            </FormField>
          </Form>
        </PageContent>
      </Page>
    </Grommet>
  );
}

function useExamples() {
  const [exampleValue, setExampleValue] = React.useState(examples[0].value);
  const example = React.useMemo(
    () => examples.find((e) => e.value === exampleValue)!,
    [exampleValue],
  );
  return { ...example, setExampleValue };
}

function useT(defaultDuration: number) {
  const [t, setT] = React.useState(0);
  const [duration, setDuration] = React.useState(3);
  const [manual, setManual] = React.useState(false);
  React.useEffect(() => setDuration(defaultDuration), [defaultDuration]);
  React.useEffect(() => {
    if (manual) return;
    const id = setInterval(
      () => setT(getT(performance.now(), duration * 1000, 600)),
      10,
    );
    return () => clearInterval(id);
  }, [manual, duration]);
  return { t, setT, duration, setDuration, manual, setManual };
}

function getT(now: number, duration: number, rest: number): number {
  return (now % (duration + rest)) / duration;
}

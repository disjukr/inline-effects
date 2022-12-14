"use client";

import * as React from "react";
import Link from "next/link";
import GithubCorner from "react-github-corner";
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
import { Github, Youtube } from "grommet-icons";
import { NumberInput } from "grommet-controls";

import Wiggly from "./example/Wiggly";
import SmoothBounce from "./example/SmoothBounce";
import Range from "./example/Range";
import { ExampleComponent } from "./example/type";

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
      "https://github.com/disjukr/inline-effects/blob/main/apps/web/app/example/Wiggly.tsx",
  },
  {
    value: "smooth-bounce",
    name: "Smooth Bouncy Text Animation",
    Component: SmoothBounce,
    duration: 1,
    tutorialLink: "https://www.youtube.com/watch?v=9xI9Yn6TE4A",
    sourceCodeUrl:
      "https://github.com/disjukr/inline-effects/blob/main/apps/web/app/example/SmoothBounce.tsx",
  },
  {
    value: "range",
    name: "How to use the range selector",
    Component: Range,
    duration: 2,
    tutorialLink: "https://www.youtube.com/watch?v=78aT4j247rM",
    sourceCodeUrl:
      "https://github.com/disjukr/inline-effects/blob/main/apps/web/app/example/Range.tsx",
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
    sourceCodeUrl,
    tutorialLink,
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
      <GithubCorner
        href="https://github.com/disjukr/inline-effects"
        target="_blank"
      />
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
            <Box style={{ flexDirection: "row", gap: "1em" }}>
              <Link href={tutorialLink} target="_blank">
                <Youtube size="large" color="#cd201f" />
              </Link>
              <Link href={sourceCodeUrl} target="_blank">
                <Github size="large" color="#333" />
              </Link>
            </Box>
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
          <Box style={{ height: "50vh" }} />
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

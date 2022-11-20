"use client";

import * as React from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import {
  Box,
  Button,
  FileInput,
  FormField,
  Grid,
  Grommet,
  Header,
  Heading,
  Page,
  PageContent,
  Paragraph,
  Stack,
} from "grommet";
import { NumberInput } from "grommet-controls";
import download from "downloadjs";

import { getScreenshotUri, useScreenshots } from "./screenshot";
import RangeSelector from "./RangeSelector";
import { render } from "./renderer";

export default function PageContainer() {
  const { screenshots, onFileChangeHandler } = useScreenshots();
  const [fps, setFps] = React.useState(60);
  const [startFrame, setStartFrame] = React.useState(0);
  const [endFrame, setEndFrame] = React.useState(0);
  const [dimension, setDimension] = React.useState<Dimension | undefined>();
  const [rendering, setRendering] = React.useState(false);
  React.useEffect(() => {
    if (screenshots.length < 1) return;
    setStartFrame(0);
    setEndFrame(Math.max(screenshots.length - 1, 0));
    getImageDimension(getScreenshotUri(screenshots[0])).then(setDimension);
  }, [screenshots.length]);
  return (
    <Grommet>
      <Header>
        <Page>
          <PageContent>
            <Heading level={2}>Video Maker</Heading>
          </PageContent>
        </Page>
      </Header>
      <Page>
        <PageContent>
          <FormField label="Profile JSON">
            <FileInput onChange={onFileChangeHandler} />
          </FormField>
          <FormField label="Dimension">
            {dimension
              ? (
                <Paragraph>
                  {dimension.width}x{dimension.height}
                </Paragraph>
              )
              : <Paragraph>Unknown</Paragraph>}
          </FormField>
          <FormField label="Framerate">
            <NumberInput
              value={fps}
              min={1}
              max={200}
              onChange={(e) => setFps(Number(e.target?.value))}
            />
          </FormField>
          <FormField label="Frames">
            <Box height="small">
              {screenshots.length
                ? (
                  <AutoSizer>
                    {({ width, height }) => (
                      <FixedSizeList
                        layout="horizontal"
                        width={width}
                        height={height}
                        itemCount={screenshots.length}
                        itemSize={300}
                      >
                        {({ index, style }) => (
                          <Stack fill style={style}>
                            <FrameImage
                              src={getScreenshotUri(screenshots[index])}
                            />
                            <Box>
                              <FrameDescription>
                                Frame {index}
                                <br />
                                <Time ms={index * (1000 / fps)} />
                              </FrameDescription>
                            </Box>
                          </Stack>
                        )}
                      </FixedSizeList>
                    )}
                  </AutoSizer>
                )
                : "Empty"}
            </Box>
          </FormField>
          <FormField label="Trim Frames">
            <Box style={{ marginTop: "2em" }}>
              <RangeSelector
                min={0}
                max={Math.max(screenshots.length - 1, 1)}
                step={1}
                values={[startFrame, endFrame]}
                onChange={([startFrame, endFrame]) => {
                  setStartFrame(startFrame);
                  setEndFrame(endFrame);
                }}
              />
            </Box>
            <Grid
              gap="small"
              rows={["auto"]}
              columns={["1/2", "1/2"]}
              areas={[
                { name: "a", start: [0, 0], end: [0, 0] },
                { name: "b", start: [1, 0], end: [1, 0] },
              ]}
            >
              <Box gridArea="a">
                <FormField label="Start Frame">
                  <NumberInput
                    value={startFrame}
                    min={0}
                    max={Math.max(screenshots.length - 1, 1)}
                    onChange={(e) => setStartFrame(Number(e.target?.value))}
                  />
                </FormField>
              </Box>
              <Box gridArea="b">
                <FormField label="End Frame">
                  <NumberInput
                    value={endFrame}
                    min={0}
                    max={Math.max(screenshots.length - 1, 1)}
                    onChange={(e) => setEndFrame(Number(e.target?.value))}
                  />
                </FormField>
              </Box>
            </Grid>
          </FormField>
          <Button
            primary
            label={rendering ? "Rendering... Please Wait" : "Render"}
            size="large"
            alignSelf="start"
            onClick={async () => {
              const width = dimension?.width || 0;
              const height = dimension?.height || 0;
              try {
                setRendering(true);
                const webm = await render(
                  screenshots,
                  width,
                  height,
                  fps,
                  startFrame,
                  endFrame,
                  200,
                );
                download(new Uint8Array(webm), "video.webm", "video/webm");
              } finally {
                setRendering(false);
              }
            }}
          />
        </PageContent>
      </Page>
    </Grommet>
  );
}

const Time: React.FC<{ ms: number }> = ({ ms }) => {
  const s = (ms / 1000) | 0;
  const ss = String(s % 60).padStart(2, "0");
  const m = (s / 60) | 0;
  const mm = String(m % 60).padStart(2, "0");
  return <>{mm}:{ss}:{String((ms % 1000) | 0).padStart(3, "0")}</>;
};

const FrameImage = styled.img`
  position: absolute;
  width: 100%;
  max-height: 100%;
  object-fit: contain;
  top: 50%;
  transform: translateY(-50%);
  outline: 1px solid white;
`;
const FrameDescription = styled.p`
  margin: 0.5em;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  text-shadow: white 1px 0px 0px, white 0.540302px 0.841471px 0px, white -0.416147px 0.909297px 0px, white -0.989992px 0.14112px 0px, white -0.653644px -0.756802px 0px, white 0.283662px -0.958924px 0px, white 0.96017px -0.279415px 0px;
`;

interface Dimension {
  width: number;
  height: number;
}
function getImageDimension(url: string): Promise<Dimension> {
  const image = new Image();
  return new Promise((resolve, reject) => {
    image.onerror = reject;
    image.onload = () => {
      const dimension = {
        width: image.naturalWidth,
        height: image.naturalHeight,
      };
      resolve(dimension);
    };
    image.src = url;
  });
}

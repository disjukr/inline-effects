import * as React from "react";
import { Screenshot } from "./type";

export function getScreenshotUri(screenshot: Screenshot): string {
  return `data:image/png;base64,${screenshot.args.snapshot}`;
}

export function useScreenshots() {
  const [screenshots, setScreenshots] = React.useState<Screenshot[]>([]);
  const onFileChangeHandler = React.useCallback(
    (e?: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const profile = JSON.parse(String(e.target?.result));
        const screenshots = profile.filter(
          (item: any) => item.name === "Screenshot",
        );
        setScreenshots(screenshots);
      };
      reader.readAsText(file);
    },
    [],
  );
  return { screenshots, setScreenshots, onFileChangeHandler };
}

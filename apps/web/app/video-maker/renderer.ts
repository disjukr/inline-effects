import { getScreenshotUri } from "./screenshot";
import { Screenshot } from "./type";

export async function render(
  screenshots: Screenshot[],
  width: number,
  height: number,
  fps: number = 60,
  startFrame: number = 0,
  endFrame: number = screenshots.length - 1,
  bitrate: number = 200,
): Promise<ArrayBuffer> {
  const worker = await createWebmWorker({ width, height, fps, bitrate });
  const canvas = document.createElement("canvas");
  Object.assign(canvas, { width, height });
  const ctx = canvas.getContext("2d")!;
  const drawImage = getDrawImageByUrlFn(canvas);
  const s = Math.min(screenshots.length - 1, startFrame, endFrame);
  const e = Math.max(0, startFrame, endFrame);
  for (let i = s; i <= e; ++i) {
    const screenshot = screenshots[i];
    const dataUri = getScreenshotUri(screenshot);
    await drawImage(dataUri);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    worker.send(imageData.data.buffer);
  }
  return await worker.finish();
}

interface CreateWebmWorkerConfig {
  width: number;
  height: number;
  fps: number;
  bitrate: number;
}
async function createWebmWorker(
  { width, height, fps, bitrate }: CreateWebmWorkerConfig,
) {
  const { worker, objectUrl } = await createWorker(
    "https://unpkg.com/webm-wasm@0.4.1/dist/webm-worker.js",
  );
  worker.postMessage("https://unpkg.com/webm-wasm@0.4.1/dist/webm-wasm.wasm");
  await nextMessage(worker);
  worker.postMessage({
    width,
    height,
    timebaseNum: 1,
    timebaseDen: fps,
    bitrate,
    realtime: false,
  });
  return {
    send(buffer: ArrayBuffer) {
      worker.postMessage(buffer, [buffer]);
    },
    async finish() {
      worker.postMessage(null);
      const webm = await nextMessage<ArrayBuffer>(worker);
      worker.terminate();
      URL.revokeObjectURL(objectUrl);
      return webm;
    },
  };
}

async function createWorker(url: string) {
  const buffer = await fetch(url).then((r) => r.arrayBuffer());
  const objectUrl = URL.createObjectURL(
    new Blob([buffer], { type: "text/javascript" }),
  );
  const worker = new Worker(objectUrl);
  return { worker, objectUrl };
}

function nextMessage<T = any>(target: Worker) {
  return new Promise<T>((resolve) =>
    target.addEventListener(
      "message",
      (e) => resolve(e.data),
      { once: true },
    )
  );
}

function getDrawImageByUrlFn(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const image = new Image();
  return async function draw(url: string): Promise<void> {
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = url;
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
  };
}

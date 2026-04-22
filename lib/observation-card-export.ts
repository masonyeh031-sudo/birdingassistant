function walkNodes(
  sourceNode: Node,
  targetNode: Node,
  callback: (source: HTMLElement, target: HTMLElement) => void
) {
  if (sourceNode.nodeType === Node.ELEMENT_NODE && targetNode.nodeType === Node.ELEMENT_NODE) {
    callback(sourceNode as HTMLElement, targetNode as HTMLElement);
  }

  const sourceChildren = sourceNode.childNodes;
  const targetChildren = targetNode.childNodes;
  const count = Math.min(sourceChildren.length, targetChildren.length);

  for (let index = 0; index < count; index += 1) {
    walkNodes(sourceChildren[index], targetChildren[index], callback);
  }
}

function inlineComputedStyles(source: HTMLElement, target: HTMLElement) {
  const computed = window.getComputedStyle(source);
  const styleText = Array.from(computed).map((property) => `${property}:${computed.getPropertyValue(property)};`).join("");
  target.setAttribute("style", styleText);
}

function cloneNodeForExport(node: HTMLElement) {
  const clone = node.cloneNode(true) as HTMLElement;
  walkNodes(node, clone, inlineComputedStyles);
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  return clone;
}

async function nodeToCanvas(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);
  const scale = Math.max(2, window.devicePixelRatio || 1.5);
  const clone = cloneNodeForExport(node);
  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">${serialized}</foreignObject>
    </svg>
  `;
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("無法產生筆記卡預覽圖。"));
      img.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("目前無法建立筆記卡畫布。");
    }

    context.scale(scale, scale);
    context.drawImage(image, 0, 0, width, height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function triggerDownload(url: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
}

function decodeDataUrl(dataUrl: string) {
  const [, base64 = ""] = dataUrl.split(",");
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function buildSimplePdfFromJpeg(jpegBytes: Uint8Array, imageWidth: number, imageHeight: number) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const usableWidth = pageWidth - margin * 2;
  const usableHeight = pageHeight - margin * 2;
  const imageRatio = imageWidth / imageHeight;

  let drawWidth = usableWidth;
  let drawHeight = drawWidth / imageRatio;

  if (drawHeight > usableHeight) {
    drawHeight = usableHeight;
    drawWidth = drawHeight * imageRatio;
  }

  const originX = (pageWidth - drawWidth) / 2;
  const originY = (pageHeight - drawHeight) / 2;

  const contentStream = `q\n${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${originX.toFixed(2)} ${originY.toFixed(2)} cm\n/Im0 Do\nQ`;
  const encoder = new TextEncoder();
  const objects: Uint8Array[] = [];
  const offsets: number[] = [];
  let cursor = 0;

  function pushChunk(chunk: Uint8Array) {
    objects.push(chunk);
    cursor += chunk.length;
  }

  function pushText(text: string) {
    pushChunk(encoder.encode(text));
  }

  pushText("%PDF-1.4\n");

  const objectTexts = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`,
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
  ];

  objectTexts.forEach((text) => {
    offsets.push(cursor);
    pushText(text);
    if (text.startsWith("4 0 obj")) {
      pushChunk(jpegBytes);
      pushText("\nendstream\nendobj\n");
    }
  });

  offsets.push(cursor);
  pushText(`5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`);

  const xrefOffset = cursor;
  pushText(`xref\n0 6\n0000000000 65535 f \n`);
  offsets.forEach((offset) => {
    pushText(`${offset.toString().padStart(10, "0")} 00000 n \n`);
  });
  pushText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  return new Blob(objects, { type: "application/pdf" });
}

export async function downloadNodeAsJpeg(node: HTMLElement, filename: string) {
  const canvas = await nodeToCanvas(node);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.94);
  triggerDownload(dataUrl, filename);
}

export async function downloadNodeAsPdf(node: HTMLElement, filename: string) {
  const canvas = await nodeToCanvas(node);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.94);
  const jpegBytes = decodeDataUrl(dataUrl);
  const pdfBlob = buildSimplePdfFromJpeg(jpegBytes, canvas.width, canvas.height);
  const url = URL.createObjectURL(pdfBlob);

  try {
    triggerDownload(url, filename);
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
  }
}

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function generate() {
  await mkdir(path.join(root, "public", "icons"), { recursive: true });

  await sharp(path.join(root, "assets", "og-image.svg"))
    .resize(1200, 630)
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(path.join(root, "public", "og-image.png"));

  await sharp(path.join(root, "app", "icon.svg"))
    .resize(192, 192)
    .png({ quality: 92 })
    .toFile(path.join(root, "public", "icons", "icon-192.png"));

  await sharp(path.join(root, "app", "icon.svg"))
    .resize(512, 512)
    .png({ quality: 92 })
    .toFile(path.join(root, "public", "icons", "icon-512.png"));

  await sharp(path.join(root, "app", "apple-icon.svg"))
    .resize(180, 180)
    .png({ quality: 92 })
    .toFile(path.join(root, "public", "apple-touch-icon.png"));

  console.log("Assets gerados: og-image.png, icons/icon-192.png, icons/icon-512.png e apple-touch-icon.png");
}

generate().catch((error) => {
  console.error("Falha ao gerar assets:", error);
  process.exitCode = 1;
});

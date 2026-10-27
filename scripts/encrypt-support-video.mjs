import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const password = process.env.XPAR_VIDEO_PASSWORD;
if (!password) {
  throw new Error("Set XPAR_VIDEO_PASSWORD before encrypting the support video.");
}

const source = resolve("private/videos/ios 0923.mp4");
const destination = resolve("public/support-video.enc");
const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(password, salt, 310_000, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const plaintext = await readFile(source);
const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);

await writeFile(destination, Buffer.concat([
  Buffer.from("XPARVID1"), salt, iv, ciphertext, cipher.getAuthTag()
]));

console.log(`Encrypted support video: ${destination}`);

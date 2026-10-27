# XPAR Instruments Website

Next.js 14 website for XPAR Instruments. Run `npm.cmd run dev` on Windows and open `http://localhost:4000`.

## Support Video

The Support page at `/support/certificate` contains a password-protected product video. Visitors enter the password on the page; their browser downloads and decrypts the encrypted video before playback. No Vercel environment variable is needed for viewing.

The public repository contains only `public/support-video.enc` (AES-256-GCM, with a PBKDF2-SHA256 derived key). The original `ios 0923.mp4` remains local at `private/videos/ios 0923.mp4` and is gitignored. To replace or re-encrypt the video, set `XPAR_VIDEO_PASSWORD` locally and run `node scripts/encrypt-support-video.mjs`; commit the resulting encrypted file, never the original MP4 or password. The encrypted file can be downloaded directly and a weak password can be guessed offline, so use private storage and server authorization if stronger access control is needed.

## Commands

```bash
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run build
```

Most page UI lives in `app/xpar-site.tsx`, with styles in `app/globals.css`. Route metadata and the thin page wrappers live under `app/`.

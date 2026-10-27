# XPAR Instruments Website

Next.js 14 website for XPAR Instruments. Run `npm.cmd run dev` on Windows and open `http://localhost:4000`.

## Support Video

The Support page at `/support/certificate` contains a password-gated product video. The site's `/api/support-video/access` route checks the entered password and returns the ImageKit video URL. The browser then streams the video directly from ImageKit. No Vercel environment variable is needed.

The ImageKit video URL is public. The website password hides the player from casual visitors, but anyone with the direct URL can watch without it. Use a private ImageKit asset and signed URLs if the video must be genuinely access-controlled. The local original at `private/videos/ios 0923.mp4` is gitignored and is not used by the deployed site.

## Commands

```bash
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run build
```

Most page UI lives in `app/xpar-site.tsx`, with styles in `app/globals.css`. Route metadata and the thin page wrappers live under `app/`.

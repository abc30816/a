# Publish this project with GitHub Pages

This repository is configured to build and deploy through GitHub Actions.

1. Create a new GitHub repository. Do **not** upload any GTA game files, extracted archives, models, textures, audio, scripts, or the original executable.
2. Extract this project ZIP, then upload the **contents** of `SanAndreasWebEngine` to the repository root (the `.github` folder must be included).
3. Use `main` as the default branch and push/commit the files.
4. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
5. Open the **Actions** tab. The `Deploy browser build to GitHub Pages` workflow will run after the push. When it succeeds, the deployed URL appears under Settings → Pages and in the workflow deployment.
6. Open that URL in a recent desktop Chromium browser (Chrome or Edge), then select your own local GTA SA folder using the in-page folder picker.

The Vite build uses relative asset paths so it can be hosted at a GitHub Pages project URL such as `https://USERNAME.github.io/REPOSITORY/`.

## Privacy and compatibility

The app reads the selected directory in the browser. The workflow does not receive your game folder. Never commit proprietary game files to GitHub. A browser folder picker is not the same as uploading the selected files to the repository.

This is an early engine prototype, not a complete or mission-playable GTA San Andreas port. Hosting it on Pages does not add missing game systems or assets. Use a recent Chromium-based desktop browser; GitHub Pages hosting does not guarantee mobile compatibility or performance.

# San Andreas Web Engine — independent browser runtime

This is a clean, independently written browser-engine project. It is **not a fork of OpenSA**, does not import OpenSA source, and does not bundle GTA executable code or game assets. It uses only general engine ideas: local-only asset access, spatial world cells, a renderer/streamer split, and isolated gameplay systems.

## What this milestone actually does

- Runs as an independently written browser application using TypeScript, Vite and Three.js/WebGL.
- Reads the selected game directory locally in the browser. It does not upload game files to a server.
- Indexes San Andreas IMG VER2 archives and paired `.dir`/`.img` archives, keeping large archive entries lazy until requested.
- Parses text-format IDE definitions, text IPL `inst` placements, and binary `bnry` streaming IPL instances stored inside IMG archives.
- Walks bounded RenderWare chunk streams and parses a first subset of non-native DFF clump/frame/geometry/atomic data, including material lists and BinMesh triangle-list/triangle-strip indices.
- Decodes a first PC D3D9 TXD subset: DXT1–DXT5 and common raw 16/24/32-bit and luminance formats. The base mip is uploaded; remaining mip levels are bounds-checked and WebGL generates its own mip chain.
- Parses COL2/COL3 compressed triangle meshes and uses them as invisible collision surfaces for the prototype ground raycast.
- Builds a spatial grid and incrementally loads nearby map placements around the Ganton start area.
- Provides a basic third-person movement/camera harness (WASD, mouse look, sprint, jump).
- Includes synthetic fixture tests for IMG, IDE/IPL, RenderWare boundaries, COL3 and DXT1 decoding.

This is original implementation code. It does not import or fork OpenSA, and it does not contain Rockstar code or assets.

## Important: this is not the complete GTA game yet

This milestone is **not yet the complete San Andreas game**. It is an early asset-rendering and movement prototype, not a mission-playable release. It does not yet implement the SCM mission interpreter, cinematic/cutscene pipeline, CJ skin/clothing and IFP skeletal animation, pedestrian/traffic spawning and AI, weapons and damage, full vehicle types and handling, interior/portal streaming, complete rigid-body collision and surface response, radio/music and speech, compatible save games, or the complete HUD/radar/pickup systems. Native DFF geometry (including many platform-instanced meshes), skin/HAnim plugins, paletted TXD entries, COL1 shapes, and several RenderWare extensions remain unsupported. Real retail asset coverage has not yet been validated against your installation. Some models may be missing, incorrectly oriented, untextured or collide imperfectly.

The original game's exact gameplay cannot be honestly claimed until these systems are implemented and tested against a legitimate game copy. The code is structured so they can be added as independent subsystems.

## Run locally

Use Node.js 20.19+ (Node 22 recommended):

```bash
npm install
npm run dev
```

Open the Vite address in Chromium/Chrome and select the main folder containing `gta_sa.exe` (the folder should also contain `models/`, `data/`, `anim/` and `audio/`). Use the directory picker; do not select the entire Windows drive.

Build and tests:

```bash
npm test
npm run typecheck
npm run build
```


## Validation status

The source parser modules pass a strict TypeScript check. Eleven synthetic fixture cases have passed for game-folder indexing, IMG, IDE/IPL (including `bnry` streaming records), RenderWare chunk bounds, DFF geometry/BinMesh, COL3 and DXT1/TXD mip-chain handling. These fixtures validate parser logic only; they are not a substitute for retail-file compatibility tests. The standard `npm test` and Vite production build were not run in the packaging environment because project dependencies were not installed there. Install dependencies first, then run the commands above.

## Coordinate and asset notes

The runtime converts the game's Z-up world coordinates to the renderer's Y-up coordinates. RenderWare chunks are length-checked before parsing. IMG entry data is read lazily from `Blob.slice()` so the browser does not need to copy every large archive into memory at startup.

The DFF reader currently supports non-native geometry and the BinMesh material splits. TXD decoding is wired into material construction for the supported D3D9 formats. Native DFF data and paletted TXD formats still need dedicated decoders; no claim is made that every retail model will render yet.

## Planned engineering stages

1. Validate IMG/IDE/IPL archive resolution against a retail PC data set; add `gta.dat` resource linking, remaining IPL sections and duplicate/LOD pairing rules.
2. Complete PC DFF coverage, including native geometry, skin/HAnim, animated frames, 2dfx and material plugins.
3. Complete TXD palettes, mip/alpha rules and the remaining PC raster variants; validate textures against retail samples.
4. Upgrade COL2/COL3/COL1 and the player capsule to a proper fixed-step collision and surface-response system; add vehicles and their full physics.
5. Implement ped models, IFP animation, CJ components/clothing, vehicle parts and entry/exit/handling.
6. Add traffic and pedestrian task/AI, weapons, health, HUD/radar, pickups, interiors, day/weather, and audio/radio.
7. Implement the correct San Andreas SCM bytecode/runtime and mission state, then validate story progression and save/load against a clean supported PC data set.
8. Performance work: worker-based asset decoding, progressive streaming, GPU texture compression, cache persistence and mobile/desktop input profiles.

## Legal / distribution boundary

This repository contains only original engine code. It does not include Rockstar/Take-Two executables, scripts, models, maps, textures, radio audio, or other copyrighted game data. The user supplies their own legitimate installation locally. Do not commit or publish game files, extracted assets, or proprietary executable code.

import { cp, mkdir, rm } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const outputDir = resolve(repoRoot, '.vercel_build_output');
const outputAssetsDir = resolve(outputDir, 'assets');
const outputFigmaDir = resolve(outputDir, 'figma');

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputAssetsDir, { recursive: true });
await mkdir(outputFigmaDir, { recursive: true });

// Copy root landing page and its static assets.
await cp(resolve(repoRoot, 'index.html'), resolve(outputDir, 'index.html'));
await cp(resolve(repoRoot, 'assets'), outputAssetsDir, { recursive: true, force: true });

// Build React app and copy output under /figma preserving dist contents.
execSync('npm --prefix figma run build', { cwd: repoRoot, stdio: 'inherit' });
await cp(resolve(repoRoot, 'figma', 'dist', 'index.html'), resolve(outputFigmaDir, 'index.html'), { force: true });
await cp(resolve(repoRoot, 'figma', 'dist', 'assets'), resolve(outputFigmaDir, 'assets'), { recursive: true, force: true });

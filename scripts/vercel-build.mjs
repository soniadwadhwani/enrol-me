import { cp, mkdir, rm } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const outputDir = resolve(repoRoot, '.vercel_build_output');

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

// Build React app and copy its dist output directly to the Vercel root.
// With vite base:'./', all asset paths are relative so this works at any path.
execSync('npm --prefix figma run build', { cwd: repoRoot, stdio: 'inherit' });
await cp(resolve(repoRoot, 'figma', 'dist'), outputDir, { recursive: true, force: true });

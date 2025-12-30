# :rocket: Add-on Boilerplate

This TypeScript-based all-in-one template is designed to free Minecraft Bedrock add-on development
from manual labor.

Focus on writing your logic. This template handles all the file copying, syncing, and complex
configuration.

## :building_construction: Architecture & Philosophy

- **:jigsaw: Unified Codebase**: Manage both behavior and resource packs in a single repository.
- **:zap: Automated Workflow**: Accelerate iteration with a single build-and-deploy command (to `com.mojang`).
- **:shield: TypeScript First**: Write safer scripts with pre-configured TypeScript and smart editor features.
- **:package: npm Powered**: Use external libraries effortlessly. Esbuild automatically bundles imported packages.

## :hammer_and_wrench: Setup

1. Create a new repository from this template.

2. Clone your repository locally.

3. Follow the basic setup guide written in [DEVELOPMENT.md](./DEVELOPMENT.md).

4. Open [build script](./scripts/build.ts) and update the add-on name, UUIDs, and pack manfiests, to suit your needs.

5. Replace current `README.md` (this file) with `README.template.md` provided by this template.

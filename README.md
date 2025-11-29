# Minecraft Bedrock Add-on Template

> [!IMPORTANT]
> This template is intended for development on Windows or Linux.
> If you're developing on a platform other than those, please look elsewhere.

Feel free to use this template! No credit is required. 💝

Key highlights of this template:

- 📂 "Project folder" approach - no more dispersed pack locations!
- 📦 Integrate external tools through npm
- 🔍 Minecraft Bedrock Debugger for VSCode pre-configured
- ☑️ Out-of-the-box TypeScript support
- 🧼 Code formatter (Prettier) pre-configured
- 📜 Scriptable pack manifests
- 🔨 One command to build (compile) the add-on:
  - Compiles (and optionally bundles) behavior pack scripts written in JavaScript/TypeScript.
  - Converts [JSON5](https://json5.org/) files into plain JSON.
  - Generates [texture_list.json](https://wiki.bedrock.dev/concepts/textures-list) in resource pack.
  - Creates `.mcpack` or `.mcaddon` archive(s).
  - Copies the processed packs to user-specified locations like `development_behavior_packs`.

## Prerequisites

Please install these tools on your system before proceeding:

- [Git](https://git-scm.com/install/)
- [Node.js](https://nodejs.org/) (v22 or later)
- [pnpm](https://pnpm.io/installation)

If you understand these, things should be easier to understand:

- Git - [Git Tutorial For Dummies ▶️](https://www.youtube.com/watch?v=mJ-qvsxPHpY)
- Basic add-on development - [Bedrock Wiki 🎓](https://wiki.bedrock.dev/guide/introduction)
- JavaScript - [Tutorial by W3Schools 🎓](https://www.w3schools.com/js/)
- Node.js - [Tutorial by W3Schools 🎓](https://www.w3schools.com/nodejs/default.asp)

## Quickstart

1.  [Create a new repository from this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

2.  Clone it locally.

3.  Install dependencies

    Run the following command:

    ```
    pnpm install
    ```

4.  Set environment variables by creating `.env` file

    Create a new file named `.env` and paste the text below to the file.
    Don't forget to replace `{USERNAME}` with your actual user directory name.

    ```env
    # Default paths on Windows. You can specify any directory paths.
    DEV_BEHAVIOR_PACKS_DIR="C:\Users\{USERNAME}\AppData\Roaming\Minecraft Bedrock\Users\Shared\games\com.mojang\development_behavior_packs"
    DEV_RESOURCE_PACKS_DIR="C:\Users\{USERNAME}\AppData\Roaming\Minecraft Bedrock\Users\Shared\games\com.mojang\development_resource_packs"
    ```

5.  Review and edit `scripts/build.ts`

    ⚠️ **You MUST change the values of the `uuids` object!**

    Also you probably want to change the values of `addonNameLabel`, `addonNameSlug`, and manifests.

6.  Build

    Run the following command:

    ```bash
    pnpm run build:dev # Build in development mode
    ```

    After the command is complete, build output can be found in the `build/` folder.
    Also, they should've been copied into the locations you specified earlier in the `.env` file
    (`development_behavior_packs` and `development_resource_packs`).

    Try these too:

    ```bash
    # Watch for file changes and rebuild automatically
    pnpm run build:dev:watch
    ```

    ```bash
    # Create non-dev build v0.6.9
    pnpm dotenv -v VERSION=0.6.9 -- pnpm run build
    ```

## Cheatsheet

Cheatsheet can be found [here](./CHEATSHEET.md).

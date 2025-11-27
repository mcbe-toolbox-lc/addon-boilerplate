# Minecraft Bedrock Add-on Template

> [!IMPORTANT]
> This template is intended for development on Windows or Linux.
> If you are developing on mobile, please look elsewhere.

Feel free to use this template! No credit is required.

Key points:

- 📂 Both the behavior pack and the resource pack reside in the same "project folder"
- 🛡️ Your project folder can be located outside of the potentially dangerous `com.mojang` folder
- ⚡ One command to build (compile) the packs and copy them into the `com.mojang` folder
- ☑️ TypeScript is supported out of the box
- 📦 Easy integration of external packages through npm

Details are explained below.

## Prerequisites

Please install these tools on your system before proceeding:

- [Git](https://git-scm.com/install/)
- [Node.js](https://nodejs.org/) (v22 or later)
- [pnpm](https://pnpm.io/installation)

## Key concepts explained

### Project Folder

Most add-on developers store their packs directly in the `development_behavior_packs` (and/or
`development_resource_packs`) folder inside the `com.mojang` folder.

Packs that belongs to the same project, exist in separate locations and mixed with others.
Which can be quite inconvenient if:

- You hop between packs a lot - _have you ever opened two code editor windows for one project?_
- You want to use Git to manage both packs in a single repository

Plus, storing development data in such internal locations is not a very good idea.
Minecraft might (accidentally) delete your work during an update! 😱

**The "Project Folder" approach can solve this problem.**

The project folder is the single, top-level directory that acts as the centralized workspace for an
add-on, containing both packs and their source code, resources, and build configurations.

Main benefits:

- There's no longer a need to open two code editor windows (one for BP and one for RP)
- Git integration is finally possible
- Isolated from deep hidden locations like the `com.mojang` folder

### Build

_In the world of software development, "build" refers to the process of converting source code and
assets into a deployable software product or component._

In this case, "build" means doing _some nice things_ and copying each pack from source (project
folder) to user-defined location(s).

This template has a custom build system fully configured and ready to go. 🫡

Some nice things that happen during a build operation include:

- Compiling (bundling) behavior pack scripts written in JavaScript/TypeScript
  - External dependencies can be bundled (except for anything under the `@minecraft/` scope)
- Converting [JSON5](https://json5.org/) files into plain JSON
- Generating [texture_list.json](https://wiki.bedrock.dev/concepts/textures-list) in resource pack
- Creating .mcpack or .mcaddon archive(s)

You can also let the build system watch for file changes in the background and re-build when a file
change is detected in source.

While not storing packs directly in the `com.mojang` folder introduces the need for a build system
and makes instant syncing impossible, it also opens up opportunities to make your add-on development
more flexible and enjoyable!

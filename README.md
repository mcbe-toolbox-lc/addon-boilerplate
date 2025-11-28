# Minecraft Bedrock Add-on Template

> [!IMPORTANT]
> This template is intended for development on Windows or Linux.
> If you're developing on a platform other than those, please look elsewhere.

Feel free to use this template! No credit is required. 💝

## Introduction

### The Problem ⚠️

Most add-on developers store their packs like this:

```
AppData
└── ...
    └── com.mojang
        ├── development_behavior_packs
        │   ├── addon-x-bp
        │   ├── addon-y-bp
        │   └── addon-z-bp
        └── development_resource_packs
            ├── addon-x-rp
            ├── addon-y-rp
            └── addon-z-rp
```

Packs of a single add-on are **dispersed and fragmented**.
The biggest problem is probably that **it makes version control difficult**.
You can't easily track changes across both packs simultaneously in a single repository.

### The Solution 💡

The solution is to put both packs in a single "project folder" like this:

```
my-addons
└── addon-x   <--- The project folder, or we can call it a repository
    ├── src
    │   ├── bp
    │   └── rp
    └── ... project-specific files ...
```

This project folder is the single, top-level directory that acts as the **centralized workspace**
for your add-on. It should be the root of your source code and version control (e.g., Git),
**containing both the BP and RP** as well as any source code, resources, and build configurations.

### The Solution Implemented 🏗️

**This template implements the solution above.**

Minecraft won't recognize packs outside the default locations, so this template has a custom build
script that does _some nice things_ and copies each of your packs to where they should be.

Some nice things that happen during a build operation include:

- Compiling (bundling) behavior pack scripts that are written in JavaScript/TypeScript.
  - Optionally, external dependencies can be bundled together.
- Converting [JSON5](https://json5.org/) files into plain JSON.
- Generating [texture_list.json](https://wiki.bedrock.dev/concepts/textures-list) in resource pack.
- Creating `.mcpack` or `.mcaddon` archive(s).

**It's fully configured.**
I've been doing this approach for my recent add-ons, and it works great!

## Prerequisites

If you understand these, things should be easier to understand:

- Git - [Git Tutorial For Dummies ▶️](https://www.youtube.com/watch?v=mJ-qvsxPHpY)
- Basic add-on development - [Bedrock Wiki 🎓](https://wiki.bedrock.dev/guide/introduction)
- JavaScript - [Tutorial by W3Schools 🎓](https://www.w3schools.com/js/)
- Node.js - [Tutorial by W3Schools 🎓](https://www.w3schools.com/nodejs/default.asp)

Please install these tools on your system before proceeding:

- [Git](https://git-scm.com/install/)
- [Node.js](https://nodejs.org/) (v22 or later)
- [pnpm](https://pnpm.io/installation)

## Directory Structure

- `.vscode/`: Configuration for the [Visual Studio Code](https://code.visualstudio.com/) editor.
- `scripts/`: Build scripts and task automation scripts. Not behavior pack scripts!
- `src/`: Contains the BP and the RP.
- `src/bp/`: BP (Behavior Pack) source code and assets.
- `src/rp/`: RP (Resource Pack) source code and assets.
- `.editorconfig`: [EditorConfig](https://editorconfig.org/) file.
- `.gitattributes`: Configures per-path Git behaviors.
- `.gitignore`: Tells Git which files to ignore in a repository.
- `.prettierignore`: Tells Prettier which files to ignore in a repository.
- `.prettierrc`: Prettier (code formatter) configuration.
- `package.json`: Node.js package configuration.
- `pnpm-lock.yaml`: Ensures consistent dependency installs and versions.
- `pnpm-workspace.yaml`: pnpm's workspace configuration file.
- `tsconfig.base.json`: Base TypeScript configuration.
- `tsconfig.json`: TypeScript configuration for BP scripts.

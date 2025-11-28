# Cheatsheet

## Useful links

- [Other repositories from **mcbe-toolbox-lc**](https://github.com/orgs/mcbe-toolbox-lc/repositories)
- [Minecraft: Bedrock Edition Creator Documentation](https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable)
- [Bedrock Wiki](https://wiki.bedrock.dev/)
- [@minecraft/server npm package](https://www.npmjs.com/package/@minecraft/server)

## Directory structure explained

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

## Cleaning build output

```bash
pnpm run clean # This will delete the build/ folder
```

## Installing a package under the scope `@minecraft`

To install `@minecraft/server-ui@2.0.0` for example:

```bash
pnpm install @minecraft/server-ui@2.0.0 --save-exact
```

Don't forget to edit the build script accordingly.

## Upgrading a package under the scope `@minecraft`

To upgrade `@minecraft/server` to `2.3.0` for example:

```bash
pnpm upgrade @minecraft/server@2.3.0 --save-exact
```

Don't forget to edit the build script accordingly.

# Recipes

## :link: Useful Resources

- [Minecraft: Bedrock Edition Creator Documentation](https://learn.microsoft.com/minecraft/creator/?view=minecraft-bedrock-stable)
- [Bedrock Wiki](https://wiki.bedrock.dev/)

## :package: Deployment

To create a release build version `1.2.3`, run:

```bash
# Versioning:    major minor patch
#                     \  |  /
pnpm dotenv -v VERSION=1.2.3 -- pnpm run build
```

Once the operation is complete, you can find the output in the `build` folder.

## :bricks: Modifying Dependencies

> [!IMPORTANT]
> When you install, upgrade or remove a dependency that depends on a specific Minecraft version,
> don't forget to update the [build script](../scripts/build.ts) accordingly!

Links to the `@minecraft` packages on npm:

- [@minecraft/server](https://www.npmjs.com/package/@minecraft/server?activeTab=versions)
- [@minecraft/server-ui](https://www.npmjs.com/package/@minecraft/server-ui?activeTab=versions)

### Installing a `@minecraft` package

To install `@minecraft/server-ui` version `2.0.0`, run:

```bash
pnpm install @minecraft/server-ui@2.0.0 --save-exact
```

> `--save-exact` forces the package manager to save the specific package version in `package.json`,
> preventing automatic upgrades to newer versions.

### Upgrading a `@minecraft` package

To upgrade `@minecraft/server` to `2.4.0`, run:

```bash
pnpm upgrade @minecraft/server@2.4.0
```

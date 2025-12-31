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

## :clipboard: JSON5

[JSON5](https://json5.org/) is an extension to the popular JSON file format that aims to be easier
to write and maintain by hand.

<details>
  <summary><strong>Comparison</strong></summary>

JSON:

```json
{
  // Tedious amount of double quotes...
  "resource_pack_name": "vanilla",
  "texture_name": "atlas.terrain",
  "padding": 8,
  "num_mip_levels": 4,
  "texture_data": {
    "copper_ore": {
      "textures": "textures/blocks/copper_ore"
    },
    "short_grass": {
      "textures": "textures/blocks/tallgrass"
    } // No trailing comma allowed...
  }
}
```

JSON5:

```json5
{
  // No double quotes are needed for keys!
  resource_pack_name: "vanilla",
  texture_name: "atlas.terrain",
  padding: 8,
  num_mip_levels: 4,
  texture_data: {
    copper_ore: {
      textures: "textures/blocks/copper_ore",
    },
    short_grass: {
      textures: "textures/blocks/tallgrass",
    }, // Trailing comma allowed!
  },
}
```

</details>

Perfect for files like `terrain_texture.json` and `crafting_item_catalog.json`!

JSON5 files in source code are be converted to plain JSON in build.

import * as builder from "@mcbe-toolbox-lc/builder";
import packageConfig from "../package.json" with { type: "json" };
import path from "node:path";

// Important environment variables

const isDev = Boolean(builder.getEnv("DEV"));

const version = builder.getEnvWithFallback("VERSION", "0.0.1");
const versionArray = builder.parseVersionString(version); // e.g., [0, 0, 1]
const versionLabel = "v" + versionArray.join("."); // e.g., "v0.0.1"

const shouldWatch = Boolean(builder.getEnv("WATCH")); // Whether to watch for file changes and rebuild

// Manifest is defined similarly to the traditional method:
// https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/packmanifest?view=minecraft-bedrock-stable
//
// Except that we have the power of scripting here!
// These manifest objects are later stringified to JSON.

const addonNameLabel = "Untitled Add-on"; // Human-readable name
const addonNameSlug = "untitled-addon"; // Directory name slug
const minEngineVersion = [1, 21, 110];
const minecraftPackageVersions = builder.getMinecraftPackageVersions(packageConfig);

// https://www.uuidgenerator.net/version4
const uuids = {
	bpHeader: "7f519716-66c1-4d1c-9bb5-dee36e2cbb6e",
	bpDataModule: "c30672bb-446a-458f-95ed-3b8a6e17c999",
	bpScriptsModule: "9ca92e58-0e77-4117-a0fb-44484dd1418f", // Should match the "targetModuleUuid" field in .vscode/launch.json
	rpHeader: "74c625fe-e814-4e85-a845-4018c1741ac5",
	rpResourcesModule: "2f48f6f5-e145-4643-810d-77531a50e249",
} as const;

const bpManifest = {
	format_version: 2,
	header: {
		name: `${addonNameLabel} ${isDev ? "DEV" : versionLabel} [BP]`,
		description: "No description.",
		uuid: uuids.bpHeader,
		version: versionArray,
		min_engine_version: minEngineVersion,
	},
	modules: [
		{
			type: "data",
			uuid: uuids.bpDataModule,
			version: versionArray,
		},
		{
			language: "javascript",
			type: "script",
			uuid: uuids.bpScriptsModule,
			version: versionArray,
			entry: "scripts/main.js",
		},
	],
	dependencies: [
		{
			// Resource pack dependency
			uuid: uuids.rpHeader,
			version: versionArray,
		},
		{
			module_name: "@minecraft/server",
			version: minecraftPackageVersions["@minecraft/server"].replace("^", ""),
		},
		// {
		// 	module_name: "@minecraft/server-ui",
		// 	version: minecraftPackageVersions["@minecraft/server-ui"].replace("^", ""),
		// },
	],
};

const rpManifest = {
	format_version: 2,
	header: {
		name: `${addonNameLabel} ${isDev ? "DEV" : versionLabel} [RP]`,
		description: "No description.",
		uuid: uuids.rpHeader,
		version: versionArray,
		min_engine_version: minEngineVersion,
	},
	modules: [
		{
			type: "resources",
			uuid: uuids.rpResourcesModule,
			version: versionArray,
		},
	],
	capabilities: ["pbr"], // Adding PBR capability is a good practice even if you don't add PBR textures
};

// Define build target paths

const bpTargetDirs: string[] = [];
const rpTargetDirs: string[] = [];
const archiveOptions: builder.ArchiveOptions[] = [];

if (isDev) {
	const devBehaviorPacksDir = builder.getEnvRequired("DEV_BEHAVIOR_PACKS_DIR");
	const devResourcePacksDir = builder.getEnvRequired("DEV_RESOURCE_PACKS_DIR");

	bpTargetDirs.push("build/dev/bp");
	rpTargetDirs.push("build/dev/rp");
	bpTargetDirs.push(path.join(devBehaviorPacksDir!, `${addonNameSlug}-bp-dev`));
	rpTargetDirs.push(path.join(devResourcePacksDir!, `${addonNameSlug}-rp-dev`));
} else {
	const targetPathPrefix = `build/${versionLabel}`;

	bpTargetDirs.push(`${targetPathPrefix}/bp`);
	rpTargetDirs.push(`${targetPathPrefix}/rp`);

	const archivePath = path.join(targetPathPrefix, `${addonNameSlug}-${versionLabel}`);
	archiveOptions.push({ outFile: `${archivePath}.mcaddon` });
	archiveOptions.push({ outFile: `${archivePath}.zip` });
}

// Create a configuration object that will be passed to the build system

const config: builder.ConfigInput = {
	behaviorPack: {
		srcDir: "src/bp",
		targetDir: bpTargetDirs,
		manifest: bpManifest,
		scripts: {
			entry: "src/bp/scripts/index.ts",
			bundle: true,
			sourceMap: isDev,
		},
	},
	resourcePack: {
		srcDir: "src/rp",
		targetDir: rpTargetDirs,
		manifest: rpManifest,
		generateTextureList: true,
	},
	watch: shouldWatch,
	archive: archiveOptions,
	// logLevel: "debug",
};

// Build!

await builder.build(config);

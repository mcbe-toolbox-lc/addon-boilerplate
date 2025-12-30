import * as builder from "@mcbe-toolbox-lc/builder";
import path from "node:path";

// ===========================================================================
// ENVIRONMENT VARIABLES & SETUP
// ===========================================================================

// This script relies on environment variables injected by `dotenv-cli`.
// In your package.json, the build commands should look like:
// "build:dev": "dotenv -v DEV=1 -- tsx scripts/build.ts"
//
// This reads the `.env` file and makes variables (like DEV_BEHAVIOR_PACKS_DIR)

const isDev = Boolean(builder.getEnv("DEV"));
const shouldWatch = Boolean(builder.getEnv("WATCH")); // If true, rebuilds on file changes

// ===========================================================================
// PROJECT CONFIGURATION
// ===========================================================================

const addonConfig = {
	name: "Untitled Add-on",
	slug: "untitled-addon", // Used for file names
	minEngineVersion: [1, 21, 110], // Minimum Minecraft version required
};

// Version handling: Default to 0.0.1 if VERSION env var is missing
const versionRaw = builder.getEnvWithFallback("VERSION", "0.0.1");
const versionArray = builder.parseVersionString(versionRaw); // [0, 0, 1]
const versionLabel = "v" + versionArray.join("."); // "v0.0.1"

// Dynamic Label: Adds "DEV" to the name in-game when in development mode
const displayName = `${addonConfig.name} ${isDev ? "DEV" : versionLabel}`;

// Unique identifiers for the pack modules.
// Generate new ones for every new project: https://www.uuidgenerator.net/version4
const uuids = {
	bpHeader: "7f519716-66c1-4d1c-9bb5-dee36e2cbb6e",
	bpDataModule: "c30672bb-446a-458f-95ed-3b8a6e17c999",
	bpScriptsModule: "9ca92e58-0e77-4117-a0fb-44484dd1418f", // Matches "targetModuleUuid" in .vscode/launch.json
	rpHeader: "74c625fe-e814-4e85-a845-4018c1741ac5",
	rpResourcesModule: "2f48f6f5-e145-4643-810d-77531a50e249",
} as const;

// ===========================================================================
// MANIFEST DEFINITIONS
// ===========================================================================

// Manifests are defined similarly to the traditional method.
// Except that we have the power of scripting!

const bpManifest = {
	format_version: 2,
	header: {
		name: displayName,
		description: "No description.",
		uuid: uuids.bpHeader,
		version: versionArray,
		min_engine_version: addonConfig.minEngineVersion,
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
			entry: "scripts/index.js", // The file result of the bundle process
		},
	],
	dependencies: [
		{
			uuid: uuids.rpHeader, // Link to Resource Pack
			version: versionArray,
		},
		{
			module_name: "@minecraft/server",
			version: "2.2.0", // UPDATE THIS when you update the corresponding npm package
		},
	],
};

const rpManifest = {
	format_version: 2,
	header: {
		name: displayName,
		description: "No description.",
		uuid: uuids.rpHeader,
		version: versionArray,
		min_engine_version: addonConfig.minEngineVersion,
	},
	modules: [
		{
			type: "resources",
			uuid: uuids.rpResourcesModule,
			version: versionArray,
		},
	],
	// "pbr" enables Physically Based Rendering support (texture sets)
	// https://learn.microsoft.com/en-us/minecraft/creator/documents/vibrantvisuals/pbroverview?view=minecraft-bedrock-stable
	capabilities: ["pbr"],
};

// ===========================================================================
// BUILD OUTPUT PATHS
// ===========================================================================

const bpTargetDirs: string[] = [];
const rpTargetDirs: string[] = [];
const archiveOptions: builder.ArchiveOptions[] = [];

if (isDev) {
	// DEVELOPMENT MODE
	// 1. Output to a local 'build' folder for inspection
	bpTargetDirs.push("build/dev/bp");
	rpTargetDirs.push("build/dev/rp");

	// 2. Output directly to the Minecraft's development pack folders (defined in .env)
	const devBpDir = builder.getEnvRequired("DEV_BEHAVIOR_PACKS_DIR");
	const devRpDir = builder.getEnvRequired("DEV_RESOURCE_PACKS_DIR");

	bpTargetDirs.push(path.join(devBpDir!, `${addonConfig.slug}-bp-dev`));
	rpTargetDirs.push(path.join(devRpDir!, `${addonConfig.slug}-rp-dev`));
} else {
	// PRODUCTION MODE
	// 1. Output to a versioned build folder
	const targetPathPrefix = `build/${versionLabel}`;
	bpTargetDirs.push(`${targetPathPrefix}/bp`);
	rpTargetDirs.push(`${targetPathPrefix}/rp`);

	// 2. Create .mcaddon and .zip archives for distribution
	const archivePath = path.join(targetPathPrefix, `${addonConfig.slug}-${versionLabel}`);
	archiveOptions.push({ outFile: `${archivePath}.mcaddon` });
	archiveOptions.push({ outFile: `${archivePath}.zip` });
}

// ===========================================================================
// EXECUTION
// ===========================================================================

const config: builder.ConfigInput = {
	behaviorPack: {
		srcDir: "src/bp",
		targetDir: bpTargetDirs,
		manifest: bpManifest,
		scripts: {
			entry: "src/bp/scripts/index.ts", // Your main TypeScript file
			bundle: true, // Bundles all imports into a single file
			sourceMap: isDev, // Generates .map files for debugging in VS Code
		},
	},
	resourcePack: {
		srcDir: "src/rp",
		targetDir: rpTargetDirs,
		manifest: rpManifest,
		generateTextureList: true, // Automatically updates texture_list.json
	},
	watch: shouldWatch,
	archive: archiveOptions,
	// logLevel: "debug", // Uncomment if you need more logs
};

await builder.build(config);

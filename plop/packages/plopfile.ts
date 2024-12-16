import { type NodePlopAPI } from "plop";

import { registerHelpers } from "../__internal__/registerHelpers.mjs";

export default function (plop: NodePlopAPI) {
  const transformName = (str) => {
    return str.toLowerCase().replace(/ /g, "-");
  };

  registerHelpers(plop);

  plop.setGenerator("ts-package", {
    description: "A new TypeScript package in our monorepo",
    prompts: [
      {
        type: "list",
        message: "What type of package is this?",
        name: "type",
        choices: [
          {
            name: "An API library",
            value: "api",
          },
          {
            name: "A Utility library",
            value: "lib",
          },
          {
            name: "A Platform services library",
            value: "platform",
          },
          {
            name: "None of these (or a custom type)",
            value: "none",
          },
        ],
      },
      {
        type: "input",
        name: "name",
        message: "Package name (without type prefix): ",
      },
      {
        type: "input",
        name: "description",
        message: "Package description: ",
      },
      {
        type: "list",
        message: "Does this package need a build step?",
        name: "build",
        choices: [
          {
            name: "No, this package will be directly imported by consumers",
            value: "no",
          },
          {
            name: "Yes, this package needs to be built before being imported by consumers",
            value: "yes",
          },
        ],
      },
    ],
    actions: (data) => {
      if (!data?.name) {
        throw new Error("Name is required");
      }

      if (!data?.description) {
        throw new Error("A package description is required");
      }

      if (!data?.type) {
        throw new Error("Type is required");
      }

      if (!data?.build) {
        throw new Error("Build information is required");
      }

      const packageName = transformName(data.name);
      const packageType = data.type;
      const packageFolderName = packageType === "none" ? packageName : `${packageType}-${packageName}`;
      const isBuildable = data.build === "yes";

      const repoRoot = process.cwd();
      const plopDestDir = `${repoRoot}/packages/${packageFolderName}`;

      const FILES_TO_ALWAYS_COPY = ["eslint.config.js", "vitest.config.ts", "tsconfig.json"];
      const FOLDERS_TO_ALWAYS_COPY = ["ambient", "exports", "src", "tests"];

      const buildDependentFilesToCopy = isBuildable ? ["tsup.config.ts"] : [];
      const filesToCopyOver = [...FILES_TO_ALWAYS_COPY, ...buildDependentFilesToCopy];

      const packageJsonFile = isBuildable ? "package.build.json" : "package.consume.json";

      const actions: ReturnType<NodePlopAPI["setGenerator"]>["actions"] = [];

      actions.push({
        type: "add",
        path: `${plopDestDir}/package.json`,
        templateFile: `template/${packageJsonFile}`,
      });

      filesToCopyOver.forEach((file) => {
        actions.push({
          type: "add",
          path: `${plopDestDir}/${file}`,
          templateFile: `template/${file}`,
        });
      });

      FOLDERS_TO_ALWAYS_COPY.forEach((folder) => {
        actions.push({
          type: "addMany",
          destination: `${plopDestDir}`, // Add folders to new app root
          templateFiles: `template/${folder}/**/*`,
          verbose: false,
        });
      });

      return [
        ...actions,
        // package.json
        {
          type: "modify",
          path: `${plopDestDir}/package.json`,
          pattern: /(-- PLOP PACKAGE NAME HERE --)/gi,
          template: packageFolderName,
        },
        {
          type: "modify",
          path: `${plopDestDir}/package.json`,
          pattern: /(-- PLOP PACKAGE DESCRIPTION HERE --)/gi,
          template: "{{description}}",
        },
      ];
    },
  });
}

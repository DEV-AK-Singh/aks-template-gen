// src/commands/create.js
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer"); 

// copyFiles
function copyFiles(srcDir, destDir) {
  const files = fs.readdirSync(srcDir);
  files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    if (fs.statSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile);
      copyFiles(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

async function create(projectName, opts) {   
  try {
    const prompt = inquirer.createPromptModule();

    if(!projectName) {
      const answers = await prompt([
        {
          type: "input",
          name: "projectName",
          message: "Project name:",
        },
      ]);
      projectName = answers.projectName;
    }
    
    if(!opts.template) {
      const answers = await prompt([
        {
          type: "select",
          name: "template",
          message: "Template name:",
          choices: ["node", "express", "react", "next"],
        },
      ]);
      opts.template = answers.template;
    }

    const selectedFeatures = [];
    if(opts.typescript) selectedFeatures.push("TypeScript");
    if(opts.docker) selectedFeatures.push("Docker");
    if(opts.prisma) selectedFeatures.push("Prisma"); 

    const projectConfig = {
      name: projectName,
      template: opts.template,
      installDeps: opts.install,
      features: selectedFeatures,
    };

    console.log("\n✅ Project config:");
    console.log(projectConfig);

    const templatePath = path.join(__dirname, "../../templates", projectConfig.template);
    const projectPath = path.join(process.cwd(), projectName);

    if(fs.existsSync(projectPath)) {
      console.log("\n❌ Project already exists in this folder.");
      process.exit(1);
    } 

    fs.mkdirSync(projectPath);

    copyFiles(templatePath, projectPath);

    fs.writeFileSync(path.join(projectPath, "config.json"), JSON.stringify(projectConfig, null, 2));

    if(projectConfig.installDeps) {
      console.log("\nInstalling dependencies...");
      const { execSync } = require("child_process");
      execSync("npm install", { cwd: projectPath });
    }

    console.log("\n✅ Project created successfully in", projectPath);

  } catch (err) {
    console.error("\n❌ Failed to create project:");
    console.error(err && err.stack ? err.stack : err);
    process.exitCode = 1;
  }
}

module.exports = create;

/**
 * Quick test harness:
 * Run: node src/commands/create.js
 * This allows testing the script directly (useful while developing).
 * When used by commander, commander will call the exported function instead.
 */
if (require.main === module) {
  // Example: run interactive test if executed directly
  (async () => {
    console.log("Running create.js directly for testing...");
    await create(undefined, {}); // interactive run
  })();
}

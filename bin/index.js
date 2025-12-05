#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

// version
program
  .version("1.0.0")
  .name("aks-template-gen")
  .description("A template generator for common projects");

// load commands
program
  .command("create [projectName]")
  .description("Create a new project")
  .option("--template [name]", "Template folder to use")
  .option("-t, --typescript", "Use TypeScript")
  .option("-d, --docker", "Include Docker support")
  .option("-p, --prisma", "Add Prisma ORM")
  .option("--no-install", "Skip package installation")
  .action((projectName, options) => { 
    const create = require("../src/commands/create");
    create(projectName, options);
  });

program.parse(process.argv);

#!/usr/bin/env node

const { execSync } = require("child_process");

const chalk = require("chalk");
const inquirer = require("inquirer");
const figlet = require("figlet");
const fs = require("fs-extra");

const gitCloneCommand =
  "git clone https://github.com/GO-Karma/karma-social-react-native-onboarding.git";

const installDependenciesCommands = {
  yarn: "cd karma-social-react-native-onboarding && yarn",
  npm: "cd karma-social-react-native-onboarding && npm i",
  pnpm: "cd karma-social-react-native-onboarding && pnpm install",
};
const gitInitCommand = "cd karma-social-react-native-onboarding && git init";

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }

  return true;
};

const init = async () => {
  console.log(chalk.yellow("\nDownloading template..."));

  const isDownloaded = runCommand(gitCloneCommand);

  if (!isDownloaded) process.exit(-1);

  console.log(chalk.green("\nTemplate downloaded\n"));

  fs.removeSync("./karma-social-react-native-onboarding/.git");

  runCommand(gitInitCommand);

  console.log("");

  const prompt = inquirer.createPromptModule();

  const packageManagerQuestion = {
    type: "list",
    name: "package-manager",
    message:
      "Which package manager do you use. We prefer yarn and recommend it",
    default: "yarn",
    choices: ["yarn", "npm", "pnpm"],
  };

  const answer = await prompt(packageManagerQuestion);

  const installDependenciesCommand =
    installDependenciesCommands[answer["package-manager"] || "npm"];

  console.log(chalk.yellow("\nDownloading dependencies..."));

  const isDependenciesDownloaded = runCommand(installDependenciesCommand);

  if (!isDependenciesDownloaded) process.exit(-1);

  figlet("GoKarma!", "Slant", (err, data) => {
    console.log(chalk.hex("#7D24E7")(data));
    console.log(
      chalk.green(
        "\nCongratulations! Everything done. Run following command to change directory"
      )
    );
    console.log(chalk.blue("\ncd karma-social-react-native-onboarding\n"));
  });
};

init();

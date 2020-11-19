const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];

function renderSite(){
if(!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
}fs.writeFileSync(outputPath, render(team), "UTF8")
}

function switchStatement() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which Employee",
        choices: ["Engineer", "Intern", "Manager", "Done"],
        name: "switch",
      },
    ])
    .then(function (answer) {
      switch (answer.switch) {
        case "Engineer":
          askEngineer();
          break;
        case "Intern":
          askIntern();
          break;
        case "Manager":
          askManager();
          break;

        case "Done":
          renderSite();
          break;
      }
    });
}

const managerQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "What is your name",
  },
  {
    type: "input",
    name: "managerId",
    message: "What is your ID",
  },
  {
    type: "input",
    name: "managerOffice",
    message: "What is your office number",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is your E-mail",
  },
];
const engineerQuestions = [
  {
    type: "input",
    name: "engineerName",
    message: "What is your name",
  },
  {
    type: "input",
    name: "engineerId",
    message: "What is your ID",
  },
  {
    type: "input",
    name: "engineerGithub",
    message: "What is your GitHub",
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "What is your E-mail",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "internName",
    message: "What is your name",
    validate: function(answer) {
        if(answer !== "") {
            return true
        } return "please enter your name"
    }
  },
  {
    type: "input",
    name: "internId",
    message: "What is your ID",
    validate: function(answer){
        if(!isNaN(answer)){
            return true
        }return "please enter a number"
    }
  },
  {
    type: "input",
    name: "internSchool",
    message: "What is your school",
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is your E-mail",
  },
];

function askIntern() {
  inquirer
    .prompt(internQuestions)
    .then(function ({ internName, internEmail, internId, internSchool }) {
      const intern = new Intern(
        internName,
        internId,
        internEmail,
        internSchool
      );
      console.log(intern);
      team.push(intern);
      switchStatement();
    });
}

function askManager() {
  inquirer
    .prompt(managerQuestions)
    .then(function ({ managerName, managerEmail, managerId, managerOffice }) {
      const manager = new Manager(
        managerName,
        managerId,
        managerEmail,
        managerOffice
      );
      console.log(manager);
      team.push(manager);
      switchStatement();
    });
}

function askEngineer() {
  inquirer
    .prompt(engineerQuestions)
    .then(function ({
      engineerName,
      engineerEmail,
      engineerId,
      engineerGithub,
    }) {
      const engineer = new Engineer(
        engineerName,
        engineerId,
        engineerEmail,
        engineerGithub
      );
      console.log(engineer);
      team.push(engineer);
      switchStatement();
    });
}

switchStatement();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

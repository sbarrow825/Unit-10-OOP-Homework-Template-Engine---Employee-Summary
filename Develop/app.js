const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function getAllEmployeeInformation() {
    try {
        const { number } = await inquirer.prompt({
            message: "How many employees are on your team? (including you)",
            name: "number"
        });
        allEmployees = [];
        for (i = 0; i < number; i += 1) {
            console.log(`for employee number ${i + 1}`)
            const { name } = await inquirer.prompt({
                message: "What is this employee's name?",
                name: "name"
            })
            const { ID } = await inquirer.prompt({
                message: `What is ${name}'s ID number?`,
                name: "ID"
            })
            const { email } = await inquirer.prompt({
                message: `What is ${name}'s email?`,
                name: "email"
            })
            const newEmployeeObject = await getEmployeeObject(name, ID, email);
            allEmployees.push(newEmployeeObject);
        }
        await writeFileAsync(outputPath, render(allEmployees), "utf8");
    } catch (err) {
        console.log(err);
    }
}

async function getEmployeeObject(name, ID, email) {
    try {
        const { role } = await inquirer.prompt({
            message: `What is ${name}'s role? Manager, Intern, or Engineer`,
            name: "role"
        })
        if (role.toLowerCase() === "intern") {
            const { school } = await inquirer.prompt({
                message: `Where does ${name} go to school?`,
                name: "school"
            })
            return new Intern(name, ID, email, school);
        } else if (role.toLowerCase() === "engineer") {
            const { github } = await inquirer.prompt({
                message: `What is ${name}'s github profile name?`,
                name: "github"
            })
            return new Engineer(name, ID, email, github);
        } else if (role.toLowerCase() === "manager") {
            const { officeNumber } = await inquirer.prompt({
                message: `What is ${name}'s office number?`,
                name: "officeNumber"
            })
            return new Manager(name, ID, email, officeNumber);
        } else {
            console.log("Invalid input, role must be intern, engineer, or manager")
            return getEmployeeObject(name, ID, email);
        }
    } catch (err) {
        console.log(err);
    }
}

function buildhtml(employees) {

}

getAllEmployeeInformation()
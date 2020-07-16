const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

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
        render(allEmployees);
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
            return new Intern(name, id, email, school);
        } else if (role.toLowerCase() === "engineer") {
            const { github } = await inquirer.prompt({
                message: `What is ${name}'s github profile name?`,
                name: "github"
            })
            return new Engineer(name, id, email, github);
        } else if (role.toLowerCase() === "manager") {
            const { officeNumber } = await inquirer.prompt({
                message: `What is ${name}'s office number?`,
                name: "officeNumber"
            })
            return new Manager(name, id, email, officeNumber);
        } else {
            console.log("Invalid input, role must be intern, engineer, or manager")
            return getRoleSpecificParameter(name, ID, email);
        }
    } catch (err) {
        console.log(err);
    }
}

function buildhtml(employees) {

}

getAllEmployeeInformation()

// for (i = 0; i < number; i += 1) {
//     console.log(`for employee number ${i + 1}`);
//     async function getEmployeeType() {
//         try {
//             const { type } = await inquirer.prompt({
//                 message: "What is this employee's role? Manager, Engineer, or Intern",
//                 name: "type"
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     if (type.toLowerCase() === "manager") {

//     }
// }

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

const inquirer = require('inquirer');
const db = require('./db'); 

function loadMainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: 'View All Employees', value: 'VIEW_EMPLOYEES' },
          { name: 'Add Employee', value: 'ADD_EMPLOYEE' },
          { name: 'Update Employee Role', value: 'UPDATE_EMPLOYEE_ROLE' },
          { name: 'View All Roles', value: 'VIEW_ROLES' },
          { name: 'Add Role', value: 'ADD_ROLE' },
          { name: 'View All Departments', value: 'VIEW_DEPARTMENTS' },
          { name: 'Add Department', value: 'ADD_DEPARTMENT' },
          { name: 'Quit', value: 'QUIT' },
        ],
      },
    ])
    .then((res) => {
      switch (res.action) {
        case 'VIEW_EMPLOYEES':
          viewEmployees();
          break;
        case 'ADD_EMPLOYEE':
          addEmployee();
          break;
        case 'UPDATE_EMPLOYEE_ROLE':
          updateEmployeeRole();
          break;
        case 'VIEW_ROLES':
          viewRoles();
          break;
        case 'ADD_ROLE':
          addRole();
          break;
        case 'VIEW_DEPARTMENTS':
          viewDepartments();
          break;
        case 'ADD_DEPARTMENT':
          addDepartment();
          break;
        case 'QUIT':
          console.log('Goodbye!');
          process.exit();
      }
    });
}

// View all employees
function viewEmployees() {
  db.getAllEmployees()
    .then((rows) => {
      console.table(rows);
    })
    .then(() => loadMainMenu())
    .catch((err) => console.error(err));
}

// Add a new employee
function addEmployee() {
  db.getAllRoles()
    .then((roles) => {
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      return inquirer.prompt([
        { name: 'firstName', message: "Employee's first name:" },
        { name: 'lastName', message: "Employee's last name:" },
        {
          type: 'list',
          name: 'roleId',
          message: "Employee's role:",
          choices: roleChoices,
        },
      ]);
    })
    .then((answers) => db.addEmployee(answers))
    .then(() => console.log('Employee added successfully!'))
    .then(() => loadMainMenu())
    .catch((err) => console.error(err));
}

// Update an employee's role
function updateEmployeeRole() {
  Promise.all([db.getAllEmployees(), db.getAllRoles()])
    .then(([employees, roles]) => {
      const employeeChoices = employees.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      return inquirer
        .prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: "Select an employee to update:",
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'roleId',
            message: "Select the new role:",
            choices: roleChoices,
          },
        ])
        .then((answers) => db.updateEmployeeRole(answers));
    })
    .then(() => console.log('Employee role updated successfully!'))
    .then(() => loadMainMenu())
    .catch((err) => console.error(err));
}

// View all roles
function viewRoles() {
  db.getAllRoles()
    .then((rows) => {
      console.table(rows);
    })
    .then(() => loadMainMenu())
    .catch((err) => console.error(err));
}

// Add a new role
function addRole() {
  db.getAllDepartments()
    .then((departments) => {
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      return inquirer.prompt([
        { name: 'title', message: 'Role title:' },
        { name: 'salary', message: 'Role salary:' },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Department:',
          choices: departmentChoices,
        },
      ]);
    })
    .then((role) => db.addRole(role))
    .then(() => console.log('Role added successfully!'))
    .then(() => loadMainMenu())
    .catch((err) => console.error(err));
}

// View all departments
function viewDepartments() {
  db.getAllDepartments()
    .then((rows) => {
      console.table(rows);
    })
    .then(() => loadMainMenu())
    .catch((err) => console.error(err));
}

// Add a new department
function addDepartment() {
  inquirer
    .prompt([{ name: 'name', message: 'Department name:' }])
    .then((department) => db.addDepartment(department))
    .then(() => console.log('Department added successfully!'))
    .then(() => loadMainMenu())
    .catch((err) => console.error(err));
}

// Start the application
loadMainMenu();

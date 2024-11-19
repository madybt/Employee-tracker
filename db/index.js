const db = require('./connection'); // Assume you have a database connection setup

module.exports = {
  getAllEmployees: () =>
    db.query('SELECT id, first_name, last_name, title FROM employees'),
  addEmployee: ({ firstName, lastName, roleId }) =>
    db.query('INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)', [firstName, lastName, roleId]),
  updateEmployeeRole: ({ employeeId, roleId }) =>
    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]),
  getAllRoles: () =>
    db.query('SELECT id, title, salary FROM roles'),
  addRole: ({ title, salary, departmentId }) =>
    db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]),
  getAllDepartments: () =>
    db.query('SELECT id, name FROM departments'),
  addDepartment: ({ name }) =>
    db.query('INSERT INTO departments (name) VALUES (?)', [name]),
};

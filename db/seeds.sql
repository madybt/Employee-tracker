\c employees;
-- Insert data into the department table
INSERT INTO department (id,name) 
VALUES 
( 001,'Engineering'),
( 002, 'Human Resources'),
( 003,'Sales'),
( 004,'Marketing');

-- Insert data into the role table
INSERT INTO role (id,title, salary, department_id) VALUES 
('Software Engineer', 85000, 1),
('HR Manager', 70000, 2),
('Sales Representative', 60000, 3),
('Marketing Specialist', 55000, 4);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
( 'John', 'Doe', 1, NULL),    -- No manager
( 'Jane', 'Smith', 2, 1),     -- John is Jane's manager
( 'Emily', 'Davis', 3, 1),    -- John is Emily's manager
( 'Michael', 'Brown', 4, 2);  -- Jane is Michael's manager

-- Select all data from the employee table
SELECT * FROM employee; 
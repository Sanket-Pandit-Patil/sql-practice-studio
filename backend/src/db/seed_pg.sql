-- Drop tables if they exist to ensure clean schema update
DROP TABLE IF EXISTS employee_projects;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

-- Create departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

-- Create employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    job_title VARCHAR(100),
    salary DECIMAL(12, 2),
    department VARCHAR(100),
    department_id INTEGER REFERENCES departments(id),
    hire_date DATE DEFAULT CURRENT_DATE
);

-- Create projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    budget DECIMAL(12, 2),
    department_id INTEGER REFERENCES departments(id)
);

-- Create employee_projects (Many-to-Many)
CREATE TABLE employee_projects (
    employee_id INTEGER REFERENCES employees(id),
    project_id INTEGER REFERENCES projects(id),
    role VARCHAR(50),
    PRIMARY KEY (employee_id, project_id)
);

-- Seed departments
INSERT INTO departments (id, name, location) VALUES
(1, 'Engineering', 'San Francisco'),
(2, 'Product', 'New York'),
(3, 'Marketing', 'London'),
(4, 'Sales', 'Singapore'),
(5, 'HR', 'San Francisco');

-- Seed employees
INSERT INTO employees (first_name, last_name, email, job_title, salary, department, department_id, hire_date) VALUES
('Alice', 'Johnson', 'alice@example.com', 'Senior Engineer', 120000, 'Engineering', 1, '2022-01-15'),
('Bob', 'Smith', 'bob@example.com', 'Software Engineer', 95000, 'Engineering', 1, '2022-03-10'),
('Charlie', 'Brown', 'charlie@example.com', 'Product Manager', 110000, 'Product', 2, '2021-11-20'),
('David', 'Wilson', 'david@example.com', 'UI/UX Designer', 85000, 'Product', 2, '2023-02-01'),
('Eve', 'Davis', 'eve@example.com', 'Marketing Lead', 105000, 'Marketing', 3, '2022-06-15'),
('Frank', 'Miller', 'frank@example.com', 'Content Strategist', 75000, 'Marketing', 3, '2023-01-10'),
('Grace', 'Lee', 'grace@example.com', 'Sales Executive', 80000, 'Sales', 4, '2022-09-20'),
('Henry', 'Taylor', 'henry@example.com', 'Tech Lead', 140000, 'Engineering', 1, '2020-05-12'),
('Ivy', 'Chen', 'ivy@example.com', 'Data Analyst', 90000, 'Engineering', 1, '2022-08-05'),
('Jack', 'Moore', 'jack@example.com', 'Account Manager', 85000, 'Sales', 4, '2021-04-18'),
('Kelly', 'Zhang', 'kelly@example.com', 'HR Director', 115000, 'HR', 5, '2020-10-10'),
('Leo', 'Kim', 'leo@example.com', 'Junior Developer', 70000, 'Engineering', 1, '2023-05-20'),
('Mia', 'Patel', 'mia@example.com', 'Marketing Coordinator', 65000, 'Marketing', 3, '2023-03-12');

-- Seed projects
INSERT INTO projects (name, budget, department_id) VALUES
('Titanium Infrastructure', 500000.00, 1),
('Nebula Frontend', 150000.00, 1),
('Global Payroll System', 300000.00, 5),
('Talent Pipeline 2024', 80000.00, 5),
('Customer Portal', 200000.00, 2),
('Launch Campaign', 120000.00, 3);

-- Seed employee project assignments
INSERT INTO employee_projects (employee_id, project_id, role) VALUES
(1, 1, 'Lead Architect'),
(2, 1, 'Senior Developer'),
(2, 2, 'UI Specialist'),
(8, 1, 'Security Specialist'),
(9, 2, 'Data Lead'),
(3, 5, 'Product Owner'),
(4, 5, 'Designer'),
(11, 3, 'Project Sponsor'),
(11, 4, 'Strategy Lead'),
(5, 6, 'Marketing Lead'),
(6, 6, 'Copywriter'),
(12, 1, 'Developer Intern');

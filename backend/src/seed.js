require('dotenv').config();
const mongoose = require('mongoose');
const Assignment = require('./models/Assignment');

const assignments = [
    // BASIC
    {
        title: 'Basic Employee Lookup',
        difficulty: 'Basic',
        description: 'Get familiar with basic SELECT statements.',
        question: 'Find all employees who work in the "Engineering" department. Return their first_name, last_name, and job_title.',
        relatedTables: ['employees', 'departments'],
    },
    {
        title: 'Department Overview',
        difficulty: 'Basic',
        description: 'Simple data retrieval from the departments table.',
        question: 'List all department names and their locations from the company. Return "name" and "location".',
        relatedTables: ['departments'],
    },
    {
        title: 'Salaried Employees',
        difficulty: 'Basic',
        description: 'Filtering data using mathematical conditions.',
        question: 'Find all employees who earn more than $90,000. Return their full name (first_name, last_name) and salary.',
        relatedTables: ['employees'],
    },
    // INTERMEDIATE
    {
        title: 'Department Salary Analysis',
        difficulty: 'Intermediate',
        description: 'Practice JOINs and GROUP BY operations.',
        question: 'Calculate the average salary for each department. Return the department name and the average_salary. Sort by average_salary in descending order.',
        relatedTables: ['employees', 'departments'],
    },
    {
        title: 'Employee Count by Department',
        difficulty: 'Intermediate',
        description: 'Using COUNT and GROUP BY together.',
        question: 'Count how many employees work in each department. Return the department name and the employee count as "total_employees".',
        relatedTables: ['employees', 'departments'],
    },
    {
        title: 'Company Veterans',
        difficulty: 'Intermediate',
        description: 'Working with dates and ordering.',
        question: 'Find all employees who joined before 2022. Return their first_name, last_name, and hire_date. Sort by hire_date with the oldest first.',
        relatedTables: ['employees'],
    },
    // ADVANCED
    {
        title: 'Project Assignments',
        difficulty: 'Advanced',
        description: 'Complex JOINs across multiple tables.',
        question: 'List all employees who are working on the "Titanium Infrastructure" project. Return their first name, last name, and their role on the project.',
        relatedTables: ['employees', 'projects', 'employee_projects'],
    },
    {
        title: 'High-Budget Departments',
        difficulty: 'Advanced',
        description: 'Using HAVING and aggregate functions.',
        question: 'Find departments that have a total project budget exceeding $400,000. Return the department name and the sum of their project budgets.',
        relatedTables: ['departments', 'projects'],
    },
    {
        title: 'Top Earners in Tech',
        difficulty: 'Advanced',
        description: 'Complex filtering or ranking.',
        question: 'Find the employee with the highest salary in the "Engineering" department. Return their full name and job title.',
        relatedTables: ['employees', 'departments'],
    }
];

const seedDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) throw new Error('MONGO_URI is missing');

        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        await Assignment.deleteMany({});
        await Assignment.insertMany(assignments);

        console.log('Successfully seeded assignments!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();

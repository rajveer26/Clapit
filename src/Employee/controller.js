const pool = require('../../db');
const queries = require('./queries');
const getEmployee = async (req,res)=>{
    setTimeout(()=>{
    pool.query(queries.getEmployees,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
},3000);
};
const getEmployeeByEmpId = async (req,res)=> {
    setTimeout(() => {
        const emp_id = parseInt(req.params.emp_id);
        pool.query(queries.getEmployeeByEmpId, [emp_id], (error, results) => {
            console.log(emp_id);
            if (error) throw error;
            res.status(200).json(results.rows);
        });
    }, 3000);
};

const addEmployee = async (req,res)=> {
    setTimeout(() => {
        const {emp_id, name, email, phone_number} = req.body;
        //check if email exists
        pool.query(queries.checkEmailExists, [email], (error, results) => {
            if (results.rows.length) {
                res.send("Email already exists");
            } else {
                //add employee to db
                pool.query(queries.addEmployee, [emp_id, name, email, phone_number], (error, results) => {
                    if (error) throw error;
                    res.status(201).send("Employee detail inserted successfully!");
                    console.log("Employee created");
                });
            }
        });

    }, 3000);
};

const removeEmployee = async (req,res)=> {
    setTimeout(() => {
        const emp_id = parseInt(req.params.emp_id);
        pool.query(queries.getEmployeeByEmpId, [emp_id], (error, results) => {
            if (!(results.rows.length)) {
                res.send("Employee does not exists in the database");
            } else {
                pool.query(queries.removeEmployeeByEmpId, [emp_id], (error, results) => {
                    if (error) throw error;
                    res.status(200).send("Employee removed successfully");
                });
            }
        });
    }, 3000);
};

const updateEmployee = async (req,res)=> {
    setTimeout(() => {
        const emp_id = parseInt(req.params.emp_id);
        const {name} = req.body;
        pool.query(queries.getEmployeeByEmpId, [emp_id], (error, results) => {
            if (!(results.rows.length)) {
                res.send("Employee does not exists in the database");
            } else {
                pool.query(queries.updateEmployee, [name, emp_id], (error, results) => {
                    if (error) throw error;
                    res.status(200).send("Employee updated successfully");
                });
            }
        });
    }, 3000);
};
   module.exports = {
    getEmployee,
    getEmployeeByEmpId,
    addEmployee,
    removeEmployee,
    updateEmployee
};
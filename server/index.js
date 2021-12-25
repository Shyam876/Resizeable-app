const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./utils/config')

//All the DB connection and update functions are stored seperatly in Model.DBOperations.js
const {getEmployeeData, addDataToEmployee, updateEmployeeData} = require("./Model/DBOperations")


const app = express();
app.use(cors())

//Check if there's a token from clientside
app.use((req, res, next) => {
    const token = req.get('Authorization')

    if (token) {
        req.token = token
        next()
    } else {
        res.status(403).send({
        error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
        })
    }
})

//execute user request to get all data from employee table
app.get('/employeeData', (req, res) => {
    console.log("Getting Data")
    getEmployeeData()
    .then( (result) => {
        res.send(result[0])
    })
    .catch((err) => {
        console.log("Error caught : ",err)
    })
})

//execute user request to add an employee
app.post('/createEmp', bodyParser.json(), (req, res) => {
    const { name, age, number } = req.body
    const empdata = {"name":name,"age":age,"number":number}
    addDataToEmployee(empdata)
    .then(() => {
        res.send("added Data Successfully")
    })
    .catch((err) => {
        res.send(err)
    })
})

//execute user request to update an employee
app.post('/updateEmp', bodyParser.json(), (req, res) => {
    console.log("in Update")
    const { id, name, age, number } = req.body
    const empdata = {"id":id, "name":name,"age":age,"number":number}
    updateEmployeeData(empdata)
    .then(()=>{
        res.send("Updated Successfully")
    })
    .catch((err) => {
        res.send(err)
    })
})


app.listen(config.port, () => {
    console.log('Server listening on port %s', config.port)
})

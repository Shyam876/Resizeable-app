const sequelize = require('sequelize')

const initialData = { 
    "name" : "Shyam",
    "age" : 23,
    "number" : "1234567890"
 }

 //Connecting to DB.
const connection = new sequelize('employee','root','Syam123$@' ,{
    dialect : 'mysql',
    define: {
      timestamps: false //Have disabled timestamps default for all future tables
    }
});

//To create a table employee.
const employee = connection.define('employee', {
    ename : {
        type : sequelize.STRING(25),
        notNull: true
    },
    age : {
        type : sequelize.INTEGER,
        notNull: true
    },
    enumber : {
        type : sequelize.STRING(15),
        notNull: true
    },
});


//perform add employee.
const addDataToEmployee = (input) => {
    const sql = `
        INSERT INTO employees (ename, age, enumber)
        VALUES ( '${input.name}', ${input.age}, '${input.number}');
    `
    return connection.query(sql, {
        type: sequelize.QueryTypes.INSERT
    })
}

//Perform Update.
const updateEmployeeData = (input) => {
    return connection.query(`UPDATE employees set ename='${input.name}', age=${input.age}, enumber='${input.number}' WHERE id=${input.id}`)
}

//perform getAll data from employee.
const getEmployeeData = () => {
    return connection.query(`select * from employees`)
}


//DB Connection, table creation, add a single employee to table for starters.
connection
    .sync({
        loggin: console.log,
        force : true
    })
    .then(()=>{
        console.log('Connect established successfully');

        addDataToEmployee(initialData);
    })
    .catch(err =>{
        console.error('unable toconnect to the database', err);
})

module.exports= {connection, getEmployeeData, addDataToEmployee, updateEmployeeData};
import './App.css';

//Two components inside out App the Add and Update
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';

//To update and use redux state
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import employee, {addUser, incrementAddCount,incrementUpdateCount } from "./Features/employee";

import React, {useEffect } from 'react';

//The module that makes API calls to node server
import * as EmpAPI from "./utils/empAPI";

//To implement resizeable split screens
import ReactSplit, { SplitDirection } from '@devbookhq/splitter'


function App() {

  const dispatch = useDispatch();

  //To maintain arecord of Add and Update operations
  const addCount = useSelector((state) => state.employee.addCount)
  const updateCount = useSelector((state) => state.employee.updateCount)

  /*Executes when used adds employee data and clicks addData
     -> the first Line is making API call to Node server to update Database and updates user about status.
     -> Second line is updating the addCount in redux state */
  const createEmployee = (employeeData) =>{
    EmpAPI.create(employeeData).then((statusCode)=>{
      if(statusCode === 200){
        document.getElementById("AddMessage").innerHTML="Employee Data added successfully."
      }else{
        document.getElementById("AddMessage").innerHTML="There was an error. Please check DB connections andtry again"
      }
    })
    dispatch(incrementAddCount())
  }

  /*Executes when used updates employee data
     -> the first Line is making API call to Node server to update Database and updates user about status.
     -> Second line is updating the UpdateCount in redux state*/
  const updateEmployee = (id, employeeData) =>{
    
    EmpAPI.update({id:id, name:employeeData.name, age:employeeData.age, number:employeeData.number}).then((statusCode)=>{
      if(statusCode === 200){
        document.getElementById("UpdateMessage").innerHTML="Employee Data updated successfully."
      }else{
        document.getElementById("UpdateMessage").innerHTML="There was an error. Please check DB connections andtry again"
      }
    })
    dispatch(incrementUpdateCount())
  }

  /*Everytime there's an add or update operation
   get updated data from employee table in MySQL and update state respectively*/
  useEffect(() => {
    EmpAPI.getAll()
      .then((contacts) => {
        dispatch(addUser(contacts))
      })
  });

  return(
    /*Implements a Split-screen with resizeable componets
     3 components are added -> AddEmployee and UpdateEmployees that split horizontally
                            -> the Add and Update count components that splits with above two vertically*/
    <ReactSplit
      direction={SplitDirection.Vertical}
      minHeights={[150, 100]}>

      <ReactSplit
        direction={SplitDirection.Horizontal}
        minWidths={[250, 250]}>
        <div id="horzSplit1"><AddEmployee onCreateEmployee={createEmployee}/></div>
        <div id="horzSplit2"><UpdateEmployee onUpdateEmployee={updateEmployee} /></div>
      </ReactSplit>
    <div id="vertSplit1">
      <div id="vertSplit">
      <p id="addCounter">Number of times added : {addCount}</p>
      <p id="updateCounter">Number of times Updated : {updateCount}</p>
      </div>
    </div>
    </ReactSplit>
  );
}

export default App;

import React from 'react';
import { useSelector } from "react-redux";
import SeriealizeForm from 'form-serialize'


export const UpdateEmployee = (props) => {

    const employees = useSelector((state) => state.employee.value);

    /* When user clicks update Employee
     ->gets the ID of employee by which values in table to be updated
     -> checks if ID is valid and if valid resets the form and transfers 
        data to App.js where actuall API call to update DB is perfrmed.*/
    const handleSubmit= (e) => {
        e.preventDefault()
        const id = document.getElementById("idSelect").value;
        if(id === "ID"){
            document.getElementById("UpdateMessage").innerHTML = "Please select an ID";
        }else{
            const values = SeriealizeForm(e.target, {hash:true})
            document.getElementById("UpdateForm").reset();
            document.getElementById("UpdateMessage").innerHTML = "";
            if(props.onUpdateEmployee){
                props.onUpdateEmployee(id,values)
            }
        }
    }


    /* Additional function to update input feildd by info of employee
       according to his/her ID*/
    const setEmployeeToUpdate = (value, emps) => {
        const id = document.getElementById("idSelect").value;
        if(id !== "ID"){
            let employee = emps.filter((emp) => emp.id == value )
            document.getElementById("ename").value = employee[0].ename;
            document.getElementById("age").value = employee[0].age;
            document.getElementById("enumber").value = employee[0].enumber;
        }else{
            document.getElementById("UpdateForm").reset();
        }
    }

    return (
        <div id="updateEmployee">
            <form onSubmit={handleSubmit} id="UpdateForm">
                    <div>
                        {/* Get all the ID's available in table and update a drop down structure */}
                        <select id="idSelect" onChange={(event) => setEmployeeToUpdate(event.target.value,employees)}>
                            <option value="ID">ID</option>
                            {employees.map((option) => (
                                <option key={option.id} value={option.id}>{option.id}</option>
                            ))}
                        </select>
                        <input id="ename" type="text" name="name" placeholder="Name"/><br/>
                        <input id="age" type="number" name="age" placeholder="Age"/><br/>
                        <input id="enumber" type="text" name="number" placeholder="Number"  /><br/>
                        <p id="UpdateMessage"></p><br/>
                        <button>Update Contact</button>
                    </div>

            </form>
        </div>
    );
}

export default UpdateEmployee;
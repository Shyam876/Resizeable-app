import SeriealizeForm from 'form-serialize'

function AddEmployee(props){

    /* When user clicks Add Employee
    this function takes control back to app.js where API call is performed to update state and DB.*/
    const handleSubmit= (e) => {
        e.preventDefault()
        const values = SeriealizeForm(e.target, {hash:true})
        document.getElementById("AddForm").reset()
        if(props.onCreateEmployee){
            props.onCreateEmployee(values)
        }
    }

    return(
        <div id="addEmployee">
            <form onSubmit={handleSubmit} id="AddForm">
                    <div>
                        <input type="text" name="name" placeholder="Name"/><br/>
                        <input type="number" name="age" placeholder="Age"/><br/>
                        <input type="text" name="number" placeholder="Number"  /><br/>
                        <p id="AddMessage"></p>
                        <button>Add Employee</button>
                    </div>

            </form>
        </div>
    );
}

export default AddEmployee;
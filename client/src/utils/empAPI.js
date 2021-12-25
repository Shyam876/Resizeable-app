const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5000'

//Create a token to compareon server side.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
'Accept': 'application/json',
'Authorization': token
}

//Fetch all the data available in employee table
export const getAll = () =>
  fetch(`${api}/employeeData`, { headers })
    .then((res) => res.json())
    .then((data) => data)

//Update employee according to given ID
export const update = (body) =>
    fetch(`${api}/updateEmp`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
})
.then((res) => res.status)

//Add Employee
export const create = (body) =>
    fetch(`${api}/createEmp`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
}).then((res) => res.status)
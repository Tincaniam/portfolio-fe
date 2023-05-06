import { CCard} from '@coreui/react';
import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";

export const AddProjectPage = () => {

    const [name, setName] = useState('');
    const [status, setStatus] = useState('In Progress');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [date, setDate] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const history = useHistory();

    const addProject = async () => {
        const newProject = {name, status, description, link, date};
        const response = await fetch('/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
            const json = await response.json();
            alert(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.status === 201){
            alert("Successfully added the project.");
            history.push("/");
        }
    };

    const generateProject = async () => {
        const response = await fetch('http://localhost:4000/ideas', {
        method: 'GET'
        });
        const data = await response.json();

        const rando = Math.floor(Math.random() * data.length)

        if (window.confirm(`Add project idea ${data[rando]}?`)){
            const name = `${data[rando]}`;
            const status = "In Progress";
            const description = `${data[rando]}`;

            const currentDate = new Date();
            const currentDayOfMonth = currentDate.getDate();
            const currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();
            currentYear = currentYear.toString().substr(-2);
            const dateString = ('0' + (currentMonth + 1)).slice(-2) + "-" + ('0' + (currentDayOfMonth)).slice(-2) + "-" + currentYear;
            const date = dateString

            const newProject = {name, status, description, date}
            const response = await fetch('/projects', {
                method: 'POST',
                body: JSON.stringify(newProject),
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                if (response.status === 201){
                    console.log(newProject);
                    alert("Successfully added the project.");
                    history.push("/");
                } else {
                    alert(`Failed to add the project, status code = ${response.status}. Please note, all fields but link are required, and date must be in the form MM-DD-YY.`);
                }
        }
    };

    return (
        <div>
            <CCard style={{backgroundColor:'#4D4D4D', margin:'3%', padding:'3%'}}>
            <h2>Add Project</h2>
            <p style={{fontSize: 17}}>Add a new project to your portfolio! Need inspiration? Check out the "Give me a project idea" button below!</p>
            </CCard>
            <CCard style={{backgroundColor:'#4D4D4D', margin:'3%', padding:'3%'}}>
            <input
                type="text"
                placeholder="Enter name here..."
                value={name}
                onChange={e => setName(e.target.value)}
                className={emptyFields.includes("name") ? "error" : "projectField"}
                />
            <select
                type="text"
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="projectField">
                    <option defaultValue={"In Progress"} value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
            </select>   
            <input
                type="text"
                value={description}
                placeholder="Enter description here..."
                onChange={e => setDescription(e.target.value)}
                className={emptyFields.includes("description") ? "error" : "projectField"}
                />
            <input
                type="url"
                value={link}
                placeholder="Enter the link to your code/project!"
                onChange={e => setLink(e.target.value)}
                className="projectField" />
            <input
                type="string"
                value={date}
                placeholder="MM-DD-YY"
                onChange={e => setDate(e.target.value)}
                className={emptyFields.includes("date") ? "error" : "projectField"}
                />

            <button className="button-medium"
            style={{maxWidth:'20%', marginLeft: '40%', padding: '2%'}}
                onClick={generateProject}
                data-tip data-for="generateTip"
            >Give me a project idea!</button>
            <ReactTooltip delayShow={1000} id="generateTip" place="bottom" effect="solid">
            Call an API that generates a new project idea for you! Get inspired!
            </ReactTooltip>
            <button className="button-medium" style={{maxWidth:'20%', marginLeft: '40%', padding: '2%'}}
                onClick={addProject}
            >Add</button>
            </CCard>
        </div>
    );
}

export default AddProjectPage;
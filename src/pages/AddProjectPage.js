import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddProjectPage = () => {

    const [name, setName] = useState('');
    const [status, setStatus] = useState('In Progress');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [date, setDate] = useState('');

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
        if (response.status === 201){
            alert("Successfully added the project.");
        } else {
            alert(`Failed to add the project, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Add Project</h2>
            <input
                type="text"
                placeholder="Enter name here..."
                value={name}
                onChange={e => setName(e.target.value)} className="projectField"/>
            <select
                type="text"
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="projectField" >
                    <option selected value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
            </select>   
            <input
                type="text"
                value={description}
                placeholder="Enter description here..."
                onChange={e => setDescription(e.target.value)}
                className="projectField" />
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
                className="projectField" />

            <button class="button-medium"
                onClick={addProject}
            >Add</button>
        </div>
    );
}

export default AddProjectPage;
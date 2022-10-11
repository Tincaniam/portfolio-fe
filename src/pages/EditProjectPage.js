import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditProjectPage = ({projectToEdit}) => {

    const [name, setName] = useState(projectToEdit.name);
    const [status, setStatus] = useState(projectToEdit.status);
    const [description, setDescription] = useState(projectToEdit.description);
    const [link, setLink] = useState(projectToEdit.link);
    const [date, setDate] = useState(projectToEdit.date);

    const history = useHistory();

    const editProject = async () => {
        const editedProject = {name, status, description, link, date};
        const response = await fetch(`/projects/${projectToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify(editedProject),
        headers: {
            'Content-Type': 'application/json',
        },
        });
        if (response.status === 200){
            alert("Successfully edited the project.");
        } else {
            alert(`Failed to edit the project, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Edit Project</h2>
            <input
                type="text"
                placeholder="Enter name here..."
                value={name}
                onChange={e => setName(e.target.value)}
                className="projectField" />
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
                onClick={editProject}
            >Save</button>
        </div>
    );
}

export default EditProjectPage;
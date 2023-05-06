import React, { useState } from 'react';
import { CCard} from '@coreui/react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const EditProjectPage = ({projectToEdit}) => {

    const [name, setName] = useState(projectToEdit.name);
    const [status, setStatus] = useState(projectToEdit.status);
    const [description, setDescription] = useState(projectToEdit.description);
    const [link, setLink] = useState(projectToEdit.link);
    const [date, setDate] = useState(projectToEdit.date);
    const [emptyFields, setEmptyFields] = useState([]);
    

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

        if (!response.ok) {
            const json = await response.json();
            alert(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.status === 200){
            alert("Successfully edited the project.");
            history.push("/");
        }
    };
    

    return (
        <div>
            <CCard style={{backgroundColor:'#4D4D4D', minWidth:'50%', margin:'3%', padding:'3%'}}>
            <h2>Edit Project</h2>
            <p style={{fontSize: 17}}>
            Edit your existing projects to your portfolio! Need inspiration? Check out the "Give me a project idea" when you <Link to="/add-project"><button className="button-small">Add a project!</button></Link></p>
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
                className={emptyFields.includes("text") ? "error" : "projectField"}
                >
                    <option value="In Progress">In Progress</option>
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
                onClick={editProject}
            >Save</button>
            </CCard>
        </div>
    );
}

export default EditProjectPage;
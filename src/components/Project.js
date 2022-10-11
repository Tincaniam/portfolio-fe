import React from 'react';
import {MdDeleteForever, MdEdit} from "react-icons/md";
//import { Collapsible } from './ProjectList';

function Project({ project, onDelete, onEdit }) {
    return (
        /*
        <tr>
            <td>{project.name}</td>
            <td>{project.status}</td>
            <td>{project.description}</td>
            <td>{project.link}</td>
            <td>{project.date}</td>
            <td><MdEdit onClick={ () => onEdit(project)}/></td>
            <td><MdDeleteForever onClick={ () => onDelete(project._id)}/></td>
        </tr>
        */
       <div style={{padding:"2px"}}>
        <p>
        <br></br>
        <h3>{project.name}</h3>
        <button class="button-small" onClick={ () => onEdit(project)}>Edit</button><button class="button-small" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) onDelete(project._id) } }>Delete</button>

        </p>
        <p style={{fontSize:"small"}}>
        {project.status} - {project.date}
        </p>
        <p style={{fontSize:"small"}}>
        {project.link}
        </p>
        <p style={{fontSize:"small"}}>
        {project.description}
        </p>
       </div>
    );
}

export default Project;
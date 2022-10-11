import React from 'react';

function Project({ project, onDelete, onEdit }) {
    return (

       <div style={{padding:"2px"}}>
        <br></br>
        <h3>{project.name}</h3>
        <button className="button-small" onClick={() => { onEdit(project) } }>Edit</button><button className="button-small" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) onDelete(project._id) } }>Delete</button>

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
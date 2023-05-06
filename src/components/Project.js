import React from 'react';
import { CCard } from '@coreui/react';

function Project({ project, onDelete, onEdit }) {
    return (

       <CCard style={{backgroundColor:'#4D4D4D', margin:'3%', padding:'3%'}}>
        <br></br>
        <h3>{project.name}</h3>
        <div style={{maxWidth:'100%', margin:'auto', padding:'2%'}}>
        <button className="button-small" onClick={() => { onEdit(project) } }>Edit</button><button className="button-small" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) onDelete(project._id) } }>Delete</button>
        </div>
        <p style={{fontSize:"small"}}>
        {project.status} - {project.date}
        </p>
        <p style={{fontSize:"small"}}>
        {project.link}
        </p>
        <p style={{fontSize:"small"}}>
        {project.description}
        </p>
        <div style={{padding:'2%'}}></div>
       </CCard>
    );
}

export default Project;
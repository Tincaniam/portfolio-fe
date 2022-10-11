import React from 'react';
import Project from './Project';


function ProjectList({ projects, onDelete, onEdit }) {
    return (
        <div style={{width:"100%"}}>
                {projects.map((project, i) => <Project project={project}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
        </div>
    );
}

export default ProjectList;

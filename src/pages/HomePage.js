import React from 'react';
import ProjectList from '../components/ProjectList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function HomePage({setProjectToEdit}) {
    const [projects, setProjects] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/projects/${_id}`, {method: 'DELETE'});
        if (response.status === 204){
            setProjects(projects.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete project with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = project => {
        setProjectToEdit(project);
        history.push("/edit-project");
    }

    const loadProjects = async project => {
        const response = await fetch('/projects');
        const data = await response.json();
        setProjects(data);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <div>
            <h4>Welcome to :Folio!</h4>
            <p style={{ fontSize: 20}}>Here you can easily track and manage your projects, or even get inspired!</p>
            <p style={{ fontSize: 24}}>Below you will find your created projects.</p>
            <p style={{ fontSize: 17}}>Looking a little empty? Hit the plus button on the top-right or click <Link to="/add-project">here!</Link></p>
            <p style={{ fontSize: 17}}>Need inspiration? Check out the Generate Project Idea option when you <Link to="/add-project">add a project!</Link></p>
            <ProjectList projects={projects} onDelete={onDelete} onEdit={onEdit}></ProjectList>
        </div>
    );
}

export default HomePage;
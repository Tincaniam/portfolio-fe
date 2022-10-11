import { Link } from 'react-router-dom';

function Navigation (){
    return (
    <nav>
        <p>
            <Link to="/">
                <button type="button">Home</button>
            </Link>
            <Link to="/add-exercise">
                <button type="button">Add an exercise</button>
            </Link>
        </p>
    </nav>
)};

export default Navigation;
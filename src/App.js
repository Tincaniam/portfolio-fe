import './App.css';
import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ReactTooltip from "react-tooltip";
import HomeRounded from "@material-ui/icons/HomeRounded";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddProjectPage from './pages/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import AboutProjectPage from './pages/AboutProjectPage';
import AdvancedPage from './pages/AdvancedPage';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {

  const [projectToEdit, setProjectToEdit] = useState();

  return (

    <div className="App">
      <Router>
        <AppBar position = "static" style={{backgroundColor: "#04AA6D"}}>
          <Toolbar>
          <Link to="/">
          <IconButton
            type="button"
            edge="start"
            data-tip data-for="homeTip"
            style={{
              marginRight: 20,
            }}
            aria-label="HomePage"
          >
            <HomeRounded />
          </IconButton>
          </Link>
          <ReactTooltip delayShow={1000} id="homeTip" place="top" effect="solid">
            Go to the Home page.
          </ReactTooltip>
          <Typography
            variant="h3"
            style={{
              flexGrow: 1, align:"center"
            }}
          >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:Folio
          </Typography>
            <Link to="/about-project">
              <IconButton
                type="button"
                edge="end"
                data-tip data-for="aboutTip"
                style={{
                  marginLeft: 20,
                }}
                aria-label="about-project"
              >
              <QuestionMarkIcon />
              </IconButton>
            </Link>
            <ReactTooltip delayShow={1000} id="aboutTip" place="top" effect="solid">
              Learn more about :Folio.
            </ReactTooltip>
            <Link to="/advanced">
              <IconButton
                type="button"
                edge="end"
                data-tip data-for="advancedTip"
                style={{
                  marginLeft: 20,
                }}
                aria-label="advanced"
              >
              <SettingsIcon />
              </IconButton>
            </Link>
            <ReactTooltip delayShow={1000} id="advancedTip" place="top" effect="solid">
              For the tinkerers!
            </ReactTooltip>
            <Link to="/add-project">
              <IconButton
                type="button"
                edge="end"
                data-tip data-for="addTip"
                style={{
                  marginLeft: 20,
                }}
                aria-label="add-project"
              >
              <AddIcon />
              </IconButton>
            </Link>
            <ReactTooltip delayShow={1000} id="addTip" place="top" effect="solid">
              Create a new project!
            </ReactTooltip>
          </Toolbar>
        </AppBar>

        <div className="App-header">
          <br></br>
          <Route path="/" exact>
            <HomePage setProjectToEdit={setProjectToEdit}/>
          </Route>
          <Route path="/about-project">
            <AboutProjectPage />
          </Route>
          <Route path="/advanced">
            <AdvancedPage />
          </Route>
          <Route path="/add-project">
            <AddProjectPage />
          </Route>
          <Route path="/edit-project">
            <EditProjectPage projectToEdit={projectToEdit}/>
          </Route>
          </div>
        <footer>
        <p>&copy; 2022 Matt Tinnel</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
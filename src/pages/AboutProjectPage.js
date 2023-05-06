import React from 'react';
import { CCard} from '@coreui/react';

export const AboutProjectPage = () => {

    return (
        <div>
            <CCard style={{backgroundColor:'#4D4D4D', minWidth:'50%', margin:'3%', padding:'3%'}}>
            <h2>About :Folio</h2>
            <br></br>
            <h3>
                :Folio is designed to be a simple and intuitive portfolio and project tracking app.
            </h3>
            <br></br>
            <p>
                :Folio itself is also a portfolio project, built with progessive technologies and practices.
            </p>
            </CCard>
            <CCard style={{backgroundColor:'#4D4D4D', minWidth:'50%', margin:'3%', padding:'3%'}}>
            <p>
            This project utilizes the MERN stack:
            </p>
                <div>
                    <p>Mongoose database</p>
                    <p>Express and Nodejs in the application layer</p>
                    <p>React for the presentation latyer</p>
                </div>
                </CCard>


        </div>
    );
}

export default AboutProjectPage;
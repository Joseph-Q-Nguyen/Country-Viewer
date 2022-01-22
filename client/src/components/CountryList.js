import React from "react";

import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Country.css";
import { DEPLOYMENT_URL } from '../Constants';

function CountryList(props) {
    return(
        <div>
        {
            props.data ? props.data.map((d) => {
              return (
                <div key={ d.name.common }>
                  <div 
                    className="card" key={ d.name.common }
                  >
                    <Card onClick={event =>  window.location.href= DEPLOYMENT_URL + '/country/' + d.ccn3} style={{ width: "100%" }}>
                      <Card.Img variant="top" src={ d.flags.png } />
                      <Card.Body>
                        <Card.Title>{ d.name.official }</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                  <br/>
                </div>  
              )
            }) :
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          </div>
    );
}

export default CountryList;
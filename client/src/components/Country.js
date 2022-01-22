import React from "react";
import {
    useParams
  } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Country.css";
import CountryList from './CountryList';

function Country() {
    let { code } = useParams();
    const [data, setData] = React.useState(null);
    const [status, setStatus] = React.useState(false);
    const [borders, setBorders] = React.useState([]);

    React.useEffect(() => {
        fetch("https://restcountries.com/v3.1/alpha/" + code)
        .then((res) => res.json())
        .then((data) => {
            document.title = data[0].name?.common;
            setData(data[0]); 
            //console.log(data[0]);
            setStatus(data?.status);

            if (data[0]?.borders)
            {
                fetch("https://restcountries.com/v3.1/alpha?codes=" + data[0].borders.toString())
                .then((res) => res.json())
                .then((data) => { setBorders(data); console.log(data) });
            }
        });
    }, []);


    return (
        status === 404 ? 
        <div>
             <h1>
                The country you requested does not exist! Please check your spelling.
             </h1>
        </div> :
        data ?
         <div>   
            <h1>Common Name: { data?.name?.common }</h1>  
            <h1>Official Name: { data?.name?.official }</h1>  
            <img className="flag-border" src={ data?.flags?.png } ></img>
            <h1>Population: { data?.population?.toLocaleString("en-US")}</h1>  
            <h1>Region: { data?.region}</h1>  
            <a href={ data?.maps.googleMaps }><h1>Location</h1></a>
            <h1>Bordering Countries:</h1> 
            <CountryList data={ borders }/>
         </div> : 
         <div>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
         
    );
}

export default Country;
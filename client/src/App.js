import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Country from "./components/Country";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { DEPLOYMENT_URL } from "./Constants";

function App() {
  const src = require("./globe.png");
  const [searched, setSearched] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  React.useEffect(() => {
    if (searched) {
      window.location.href =
        DEPLOYMENT_URL + "/?search=" + value + "&region=" + region;
    }
  }, [searched]);

  return (
    <div className="App">
      Boi
      <Navbar className="nav-bar" variant="light" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={src}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Countries
          </Navbar.Brand>
          <form
            onSubmit={() => {
              setSearched(true);
            }}
          >
            <label>Search for Countries:</label>
            <input
              type="text"
              name="search"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <label>Filter by Region:</label>
            <select
              onChange={(e) => {
                setRegion(e.target.value);
              }}
            >
              <option value="not-selected"></option>
              <option value="africa">Africa</option>
              <option value="americas">Americas</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
            <input type="submit" value="Search" />
          </form>
        </Container>
      </Navbar>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/country/:code" element={<Country />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CountryList from "./CountryList";

function Home() {
  const [data, setData] = React.useState(null);
  const [params, setParams] = useSearchParams();
  const search = params.get("search");
  const region = params.get("region");

  let api = "https://restcountries.com/v3.1/all";

  if (search && search !== "null") {
    api = "https://restcountries.com/v3.1/name/" + search;
  }

  const [status, setStatus] = React.useState(false);

  React.useEffect(() => {
    document.title = "Countries";

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        console.log(api);

        if (Array.isArray(data) && region && region !== "null") {
          console.log("Filtering");
          data = data.filter(
            (d) => d.region.toLowerCase() === region.toLowerCase()
          );
        }

        setStatus(data?.status);
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {status === 404 ? (
        <div className="center">
          <h1>
            The country you requested does not exist! Please check your
            spelling.
          </h1>
        </div>
      ) : (
        <div>
          <h1>Countries:</h1>
          <CountryList data={data} />
        </div>
      )}
    </div>
  );
}

export default Home;

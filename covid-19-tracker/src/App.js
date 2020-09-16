import React, { useEffect, useState } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]); //set initial value = empty array
  const [country, setCountry] = useState("WorldWide");
  //state = how to write a variable in REACT <<<<<

  //https://disease.sh/v3/covid-19/countries

  //useeffect = runs a piece of code
  //based on a given condition

  useEffect(() => {
    //runs when the component loads and not again
    //async -> send request to server, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []); //add in [] it will run everytime the [] changes

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/*loop thorugh the countries and show dropdown list of options */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={1234} total={2000} />

          <InfoBox title="Recovered" cases={1532} total={3000} />

          <InfoBox title="Deaths" cases={2345} total={4000} />
        </div>

        {/* Map */}
        <Map></Map>
      </div>
      <Card className="app_right">
        <CardContent>
          <h2>Live Cases by Country</h2>
          <h3>Worldwide New Cases</h3>
        </CardContent>
        {/* Table */}
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;

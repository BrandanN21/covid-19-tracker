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
import Table from "./Table";

function App() {
  const [countries, setCountries] = useState([]); //set initial value = empty array
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
          setTableData(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []); //add in [] it will run everytime the [] changes

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    //make a call to service
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        //all of the data from the country response
        setCountryInfo(data);
      });
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  };
  console.log(countryInfo);
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
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map></Map>
      </div>
      <Card className="app_right">
        <CardContent>
          <h2>Live Cases by Country</h2>
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
        </CardContent>
        {/* Table */}

        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;

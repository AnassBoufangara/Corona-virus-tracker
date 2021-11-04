import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import numeral from 'numeral';
import { countriesList, countryCodeInfo } from './api';
import { printState } from './utils/Util';
import InfoBox from './components/InfoBox/InfoBox';
import Table from './components/Table/Table';
import LineGraph from './components/LineGraph/LineGraph';
import Map from './components/Map/Map';

import './App.css';
import "leaflet/dist/leaflet.css";

const App = () => {
  //--> States
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setselectedCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  //--> Effects
  useEffect(() => {
    countriesList(setCountries, setTableData, setMapCountries);
    setMapZoom(6);
  }, []);

  useEffect(() => {
    countryCodeInfo(selectedCountry, setCountryInfo, setMapCenter, setMapZoom);
    console.log("From Use Effect");
  }, []);

  const onCountryChange = async(e) => {
    const countryCode = e.target.value;
    setselectedCountry(countryCode);
    console.log({countryCode});
    //Data depand on country-code
    countryCodeInfo(countryCode, setCountryInfo, setMapCenter, setMapZoom);
  }

  return (
    //use 'app' as class name because we will use the "BEM" naming convention*
    <div className="app"> 
     {/* Header */}
      <div className="app_left">
        <div className="app_header">
          <h1>Corono virus Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={selectedCountry} onChange={onCountryChange}>
              <MenuItem value="worldwide"> Worldwide </MenuItem>
              {
                countries?.map((country, i) => (
                  <MenuItem key ={i} value={country.value}> {country.name} </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/* Info-Boxes */}
        <div className="app_state">
          <InfoBox onClick={e => setCasesType("cases")} title="Coronavirus Cases" isRed active={casesType === "cases"} cases={printState(countryInfo.todayCases)} total={numeral(countryInfo.cases).format("0.0a")}/>  
          <InfoBox onClick={e => setCasesType("recovered")} title="Recovered" active={casesType === "recovered"} cases={printState(countryInfo.todayRecovered)} total={numeral(countryInfo.recovered).format("0.0a")}/>  
          <InfoBox onClick={e => setCasesType("deaths")} title="Deaths" isRed active={casesType === "deaths"} cases={printState(countryInfo.todayDeaths)} total={numeral(countryInfo.deaths).format("0.0a")}/>  
        </div>

        {/* Map */}
        <Map casesType={casesType} center={mapCenter} zoom={mapZoom} countries={mapCountries}  />
      </div>

      <Card className="app_right">
        <CardContent>
          {/* Tables */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          {/* Graph */}
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

import axios from 'axios';
import { sortData, buildChartData } from '../utils/Util';

export const countriesList = async(setCountries, setTableData, setMapCountries) => {
    try {
        await fetch('https://disease.sh/v3/covid-19/countries')
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data?.map((country) => (
                    {
                        name: country.country,   
                        value: country.countryInfo.iso2
                    }
                ));
            setCountries(filteredData);
            setTableData(sortData(data)); 
            setMapCountries(data);
         });
        
    }catch(countriesListErr) {
        console.log({countriesListErr});
    }
}


export const countryCodeInfo = async(countryCode, setCountryInfo, setMapCenter, setZoomCenter) => {
    const url = (countryCode === 'worldwide') ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    try {
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {  
                setCountryInfo(data);
                if (countryCode !== 'worldwide') {
                    let lat = data.countryInfo.lat;
                    let long = data.countryInfo.long;
                    setMapCenter({lat: lat, long: long});
                    setZoomCenter(5);
                } else {
                    setMapCenter({ lat: 34.80746, lng: -40.4796 });
                    setZoomCenter(3);
                }
            }
        );
        
    }catch(countriesListErr) {
        console.log({countriesListErr});
    }
}



export const historicalData = async(setData, casesType) => {
    try {
        await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=60')
            .then((response) => response.json())
            .then((data) => { 
                let utilData = buildChartData(data, casesType); 
                setData(utilData);
            }
        );
        
    }catch(countriesListErr) {
        console.log({countriesListErr});
    }
}

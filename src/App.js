import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [countriesAPI, setCountriesAPI] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  const [cityList, setCityList] = useState([]);
  const [singleCity, setSingleCity] = useState("");
  const [msg, setMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const fetchCountriesAPI = async () => {
    try {
      const api = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      setErrorMsg(false);
      setCountriesAPI(api.data.data);
    } catch (error) {
      setErrorMsg(true);
      setCountriesAPI([]);
    }
  };

  const getCities = (country) => {
    setMsg(false);
    setSingleCountry(country);
    setSingleCity("");

    const findCities = countriesAPI.find((c) => c.country === country);
    setCityList(findCities.cities);
  };

  const handleSubmit = () => {
    if (singleCountry && singleCity) {
      setMsg(true);
    }
  };

  useEffect(() => {
    fetchCountriesAPI();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Select Your Hometown</h1>
        <div>
          {countriesAPI && (
            <select
              onChange={(e) => getCities(e.target.value)}
              value={singleCountry}
            >
              <option hidden>Select Country</option>
              {countriesAPI.map((c, index) => {
                return (
                  <option value={c.country} key={index}>
                    {c.country}
                  </option>
                );
              })}
            </select>
          )}
          {singleCountry && cityList && (
            <select
              onChange={(e) => setSingleCity(e.target.value)}
              value={singleCity}
            >
              <option hidden>Select City</option>
              {cityList.map((city, index) => {
                return (
                  <option value={city} key={index}>
                    {city}
                  </option>
                );
              })}
            </select>
          )}
          <button onClick={handleSubmit}>Go</button>
          <div>
            {msg && (
              <h3>
                Your country name is {singleCountry} and city is {singleCity}
              </h3>
            )}
          </div>
          <div>{errorMsg && <h3>Something went wrong... try again.</h3>}</div>
        </div>
      </div>
    </div>
  );
};

export default App;

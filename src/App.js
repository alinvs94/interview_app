import "./App.css";
import { InputControl } from "./InputControl/InputControl";
import { SearchBar } from "./SearchBar/SearchBar";
import { SearchBarV2 } from "./SearchBarV2/SearchBarV2";
import { useState } from  'react';

function App() {
  const[searchState, setSearchState] = useState(true);

  const myArray = [
    {
      id: 1,
      manufacturer: "Honda",
      year: new Date("2012-07-15"),
      passengers: 5,
    },
    {
      id: 2,
      manufacturer: "Bmw",
      year: new Date("2015-08-24"),
      passengers: 3,
    },
    {
      id: 3,
      manufacturer: "Dacia",
      year: new Date("2003-01-01"),
      passengers: 5,
    },
    {
      id: 4,
      manufacturer: "Fiat",
      year: new Date("2020-10-08"),
      passengers: 9,
    },
    {
      id: 5,
      manufacturer: "Renault",
      year: new Date("2008-02-17"),
      passengers: 3,
    },
    {
      id: 6,
      manufacturer: "Ferrari",
      year: new Date("2008-05-02"),
      passengers: 2,
    },
    {
      id: 7,
      manufacturer: "Scania",
      year: new Date("2020-12-29"),
      passengers: 9,
    },
    {
      id: 8,
      manufacturer: "Dacia",
      year: new Date("2003-10-09"),
      passengers: 2,
    },
    {
      id: 9,
      manufacturer: "Fiat",
      year: new Date("2015-01-01"),
      passengers: 5,
    },
    {
      id: 10,
      manufacturer: "Honda",
      year: new Date("2011-03-22"),
      passengers: 3,
    },
    {
      id: 11,
      manufacturer: "Honda",
      year: new Date("2011-03-22"),
      passengers: 7,
    },
  ];

  const setSearchBar = () => {
    setSearchState(!searchState)
  }

  const buttonValue = searchState ? 'V1' : 'V2';

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ alignSelf: "center" }}>Interview app</h1>
      <InputControl></InputControl>
      <button style={{width:'7rem', marginLeft: "2rem", marginTop:'3rem'}} onClick={setSearchBar}>{`SearchBar ${buttonValue}`}</button>
      <SearchBar searchState={searchState} myArray={myArray}></SearchBar>
      <SearchBarV2 searchState={searchState} myArray={myArray}></SearchBarV2>
    </div>
  );
}

export default App;

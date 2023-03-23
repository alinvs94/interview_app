import { useRef, useState } from "react";
import { CarComponent } from "./CarComponent/CarComponent";

export function SearchBar(props) {
  const [searchType, setSearchType] = useState("Manufacturer");
  const [carsArray, setCarsArray] = useState([]);

  const inputElement = useRef();

  let searchedCarsArray = [];
  let searchedCarsElement;
  let inputValue;

  let carObject = props.myArray.map((element) => {
    return (
      <CarComponent
        key={element.id}
        manufacturer={element.manufacturer}
        year={element.year}
        passengers={element.passengers}
      ></CarComponent>
    );
  });

  const handleKey = (event) => {
    inputValue = inputElement.current.value.toLowerCase();

    if (inputValue !== "") {
      if (searchType === "Manufacturer") {
        props.myArray.map((element) => {
          let car;
          if (element.manufacturer.toLowerCase() === inputValue) {
            car = element;
          }
          if (car !== undefined) {
            searchedCarsArray.push(car);
          }
        });
      } else if (searchType === "Year") {
        props.myArray.map((element) => {
          let car;
          if (element.year.getFullYear() == inputValue) {
            car = element;
          }
          if (car !== undefined) {
            searchedCarsArray.push(car);
          }
        });
      } else if (searchType === "Passengers") {
        props.myArray.map((element) => {
          let car;
          if (element.passengers === parseInt(inputValue)) {
            car = element;
          }
          if (car !== undefined) {
            searchedCarsArray.push(car);
          }
        });
      }
    } else {
      setCarsArray((prevState) => (prevState = props.myArray));
    }

    if (searchedCarsArray.length > 0) {
      setCarsArray((prevState) => (prevState = searchedCarsArray));
    }
  };

  if (carsArray) {
    searchedCarsElement = carsArray.map((element) => {
      return (
        <CarComponent
          key={element.id}
          manufacturer={element.manufacturer}
          year={element.year}
          passengers={element.passengers}
        ></CarComponent>
      );
    });
  }

  return (
    <div
      style={{
        marginLeft: "2rem",
        marginTop: "1rem",
        display: `${props.searchState ? "none" : "flex"}`,
        flexDirection:'column',
      }}
    >
      <form
        htmlFor="searchBar"
      >
        <label style={{ fontWeight: "bold" }}>Search your ideal vehicle</label>
        <div style={{ marginTop: "1rem" }}>
          <select
            defaultValue={"Manufacturer"}
            onChange={(option) => setSearchType(option.target.value)}
            style={{ marginRight: "1rem" }}
          >
            <option value="Manufacturer">By Manufacturer</option>
            <option value="Year">By Year</option>
            <option value="Passengers">By Passengers</option>
          </select>
          <input
            onKeyUp={handleKey}
            ref={inputElement}
            id="searchBar"
            type="search"
            placeholder={` Type ${searchType}`}
            style={{ width: "20rem", height: "2rem" }}
          ></input>
        </div>
      </form>
      <div style={{height:'30rem' , overflow:'auto', width:'fit-content'}}>
        {carsArray.length > 0 && inputValue !== ""
          ? searchedCarsElement
          : carObject}
      </div>
    </div>
  );
}

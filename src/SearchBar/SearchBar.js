import { useRef, useState } from "react";
import { CarComponent } from "./CarComponent/CarComponent";

export function SearchBar() {
  const [searchType, setSearchType] = useState("Manufacturer");
  const [carsArray, setCarsArray] = useState([]);

  const inputElement = useRef();

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
  ];

  let searchedCarsArray = [];
  let searchedCarsElement;
  let inputValue;

  let carObject = myArray.map((element) => {
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

    if(inputValue !== '') {
      if (searchType === "Manufacturer") {
         myArray.map((element) => {
           let car;
           if (element.manufacturer.toLowerCase() === inputValue) {
             car = element;
           }
           if (car !== undefined) {
             searchedCarsArray.push(car);
           }
         });
       } else if (searchType === "Year") {
         myArray.map((element) => {
            let car;
            if (element.year.getFullYear() == inputValue) {
              car = element;
            }
            if (car !== undefined) {
              searchedCarsArray.push(car);
            }
          });
       } else if (searchType === "Passengers") {
         myArray.map((element) => {
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
      setCarsArray(prevState => prevState = myArray)
    }


    if(searchedCarsArray.length > 0) {
      setCarsArray (prevState => prevState = searchedCarsArray); 
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
    <div style={{ marginLeft: "2rem", marginTop: "3rem" }}>
      <form
        htmlFor="searchBar"
        style={{ display: "flex", flexDirection: "column" }}
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
      <div>
        {carsArray.length > 0 && inputValue !== '' ? searchedCarsElement : carObject}
      </div>
    </div>
  );
}

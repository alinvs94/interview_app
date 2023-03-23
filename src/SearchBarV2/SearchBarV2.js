import { useRef, useState, useEffect } from "react";
import { CarComponent } from "../SearchBar/CarComponent/CarComponent";

export function SearchBarV2(props) {
   const [yearState, setYearState] = useState(true);
   const [passengersState, setPassengersState] = useState(true);

   const [byManufacturer, setByManufacturer] = useState([]);
   const [byYear, setByYear] = useState([]);
   const [byPassengers, setByPassengers] = useState([]);
   const [cars, setCars] = useState([]);

   const manufacturerElement = useRef();
   const yearElement = useRef();
   const passengersElement = useRef();

   useEffect(() => {
      setCars((prevState) => {
         return (prevState = props.myArray);
      });
   }, []);

   function handleManufacturer(event) {
      const manufacturerValue = manufacturerElement.current.value;
      let carsArray = [];

      if (manufacturerValue !== "") {
         carsArray = props.myArray.filter((element) => element.manufacturer.toLowerCase() === manufacturerValue.toLowerCase());
         if (carsArray.length > 0) {
            setYearState(false);
            setByManufacturer((prevState) => (prevState = carsArray));
         } else {
            setYearState(true);
         }
      } else {
         setYearState(true);
         setPassengersState(true);
         manufacturerElement.current.value = "";
         passengersElement.current.value = "";
         yearElement.current.value = "";
         setByManufacturer([]);
         setByYear([]);
         setByPassengers([]);
      }
   }

   function handleYear(event) {
      const yearValue = yearElement.current.value;
      let carsArray = [];
      if (event.key !== "Tab") {
         if (yearValue !== "") {
            carsArray = byManufacturer.filter(
               (element) => element.year.getFullYear() === parseInt(yearValue)
            );

            if (carsArray.length > 0) {
               setPassengersState(false);
               setByYear((prevState) => (prevState = carsArray));
            } else {
               setPassengersState(true);
            }
         } else {
            setPassengersState(true);
            passengersElement.current.value = "";
            yearElement.current.value = "";
            setByYear((prevState) => {
               return (prevState = byManufacturer);
            });
            setByPassengers([]);
         }
      }
   }

   function handlePassengers(event) {
      const passengersValue = passengersElement.current.value;
      let carsArray = [];

      if (event.key !== "Tab") {
         if (passengersValue !== "") {
            carsArray = byYear.filter(
               (element) => element.passengers === parseInt(passengersValue)
            );

            if (carsArray.length > 0) {
               setByPassengers((prevState) => (prevState = carsArray));
            }
         } else {
            setByPassengers((prevState) => {
               return (prevState = byYear);
            });
         }
      }
   }

   let displayCars = cars.map((element) => {
      return (
         <CarComponent
            key={element.id}
            manufacturer={element.manufacturer}
            year={element.year}
            passengers={element.passengers}
         ></CarComponent>
      );
   });

   if (
      byManufacturer.length > 0 &&
      byYear.length > 0 &&
      byPassengers.length > 0
   ) {
      displayCars = byPassengers.map((element) => {
         return (
            <CarComponent
               key={element.id}
               manufacturer={element.manufacturer}
               year={element.year}
               passengers={element.passengers}
            ></CarComponent>
         );
      });
   } else if (byManufacturer.length > 0 && byYear.length > 0) {
      displayCars = byYear.map((element) => {
         return (
            <CarComponent
               key={element.id}
               manufacturer={element.manufacturer}
               year={element.year}
               passengers={element.passengers}
            ></CarComponent>
         );
      });
   } else if (byManufacturer.length > 0) {
      displayCars = byManufacturer.map((element) => {
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
            display: `${props.searchState ? "flex" : "none"}`,
            marginLeft: "2rem",
            marginTop: "1rem",
            flexDirection: "column",
         }}
      >
         <h2>Search your vehicle</h2>

         <div className="container">
            <form className="search" style={{ display: "flex", gap: "1rem" }}>
               <div>
                  <label
                     htmlFor="manufacturerInput"
                     style={{ marginRight: "0.5rem" }}
                  >
                     Manufacturer
                  </label>
                  <input
                     id="manufacturerInput"
                     type={"text"}
                     placeholder=" Type here"
                     ref={manufacturerElement}
                     style={{ width: "11rem" }}
                     onKeyUp={handleManufacturer}
                  ></input>
               </div>

               <div>
                  <label htmlFor="yearInput" style={{ marginRight: "0.5rem" }}>
                     Year
                  </label>
                  <input
                     id="yearInput"
                     type={"text"}
                     placeholder={`${
                        yearState ? " Manufacturer first" : " Type year"
                     }`}
                     ref={yearElement}
                     disabled={yearState}
                     style={{ width: "11rem" }}
                     onKeyUp={handleYear}
                  ></input>
               </div>

               <div>
                  <label
                     htmlFor="passengersInput"
                     style={{ marginRight: "0.5rem" }}
                  >
                     Passengers
                  </label>
                  <input
                     id="passengersInput"
                     type={"number"}
                     placeholder={`${
                        passengersState
                           ? yearState
                              ? " Waiting for manufacturer"
                              : " Waiting for year"
                           : " Type passengers"
                     }`}
                     ref={passengersElement}
                     disabled={passengersState}
                     style={{ width: "11rem" }}
                     onKeyUp={handlePassengers}
                  ></input>
               </div>
            </form>

            <div className="list">{displayCars ? displayCars : "none"}</div>
         </div>
      </div>
   );
}

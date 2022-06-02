import axios from "axios";
import { CategoryScale, Chart } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";


const YearlyReservationsGraph = () => {
    Chart.register(CategoryScale);
    const [yearlyReservations, setYearlyReservations] = useState([]);
    useEffect(() => {
           axios.get("/api/reservation/yearly?email="
           + localStorage.getItem(LocalStorageItem.EMAIL), {
              headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization:
                  "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
              },
              
          })
          .then((response) => {
              setYearlyReservations(response.data)
          })
       }, []);
   
   
     return (
       <div className="w-full mt-12 ml-36 mx-auto max-w-xl">
           <h2 className="text-xl font-bold leading-7 text-gray-900 mb-8 sm:text-3xl sm:truncate">
           Yearly reservations
         </h2>
           <Bar
             data={{
               // Name of the variables on x-axies for each bar
               labels: ["2018", "2019", "2020", "2021","2022"],
               datasets: [
                 {
                   // Label for bars
                   label: "reservation number",
                   // Data or value of your each variable
                   data: yearlyReservations,
                   // Color of each bar
                   backgroundColor: ["red" , "lightblue", "yellow", "lightgreen", "orange"],
                   // Border color of each bar
                   borderColor:  ["red" , "lightblue", "yellow", "lightgreen", "orange"],
                   borderWidth: 0.5,
                 },
               ],
             }}
             // Height of graph
             height={800}
             width={1200}
           />
         </div>
     );
};

export default YearlyReservationsGraph;
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";

const MonthlyReservationsGraph = () => {
 Chart.register(CategoryScale);
 const [monthlyReservations, setMonthlyReservations] = useState([]);
 useEffect(() => {
        axios.get("/api/reservation/monthly?year=2022&email="
        + localStorage.getItem(LocalStorageItem.email), {
           headers: {
             Accept: "application/json",
             "Content-type": "application/json",
             Authorization:
               "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
           },
           
       })
       .then((response) => {
           setMonthlyReservations(response.data)
       })
    }, []);


  return (
    <div className="w-full mt-12 ml-36 mx-auto max-w-xl">
        <h2 className="text-xl font-bold leading-7 text-gray-900 mb-8 sm:text-3xl sm:truncate">
        Monthly reservations
      </h2>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["January", "February", "March", "April","May","June","July", "August", "September", 
            "October","November","December"],
            datasets: [
              {
                // Label for bars
                label: "reservation number",
                // Data or value of your each variable
                data: monthlyReservations,
                // Color of each bar
                backgroundColor: ["red" , "#9966cc", "#7FFFD4", "#b9f2ff", "#50C878", "#498877", 
                "#9b111e", "#B4C424", "#0F52BA", "#a8c3bc", "#ffc87c", "#a3928f"],
                // Border color of each bar
                borderColor:  ["red", "#9966cc", "#7FFFD4", "#b9f2ff", "#50C878", "#498877", 
                "#9b111e", "#B4C424", "#0F52BA", "#a8c3bc", "#ffc87c", "#a3928f"],
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
export default MonthlyReservationsGraph;

'use client'
import {Chart as ChartJS, ArcElement, Legend, Tooltip, plugins } from "chart.js";
import { plugin } from "postcss";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);  //Enable these building blocks for this bundle


const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const accountNames = accounts.map((a)=> a.name);
    const balances = accounts.map((a)=> a.currentBalance);
    const data = {
      datasets: [
        {
          label: "Banks",
          data: balances,
          backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
        },
      ],
      labels: accountNames,
      hoverOffset: 4,
    };
    const options = {
        cutout: '60%',
        plugins: {
            legend: {
                display:false
            }
        }
    }

  return <Doughnut 
    data={data} 
    options={options}
  />;
}

export default DoughnutChart;

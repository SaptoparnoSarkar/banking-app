'use client'
import {Chart as ChartJS, ArcElement, Legend, Tooltip, plugins } from "chart.js";
import { useTheme } from "next-themes";
import { plugin } from "postcss";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);  //Enable these building blocks for this bundle


const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const { theme } = useTheme(); //Gets current Theme
    const [mount, setMount] = useState(false);

    useEffect(() => setMount(true),[]); //Wait for Mount to avoid hydration error. 

    const colors =
      theme === "dark"
        ? ["#3B82F6", "#F59E2B", "#0D9488"]
        : ["#0747b6", "#2265d8", "#2f91fa"];


    const accountNames = accounts.map((a)=> a.name);
    const balances = accounts.map((a)=> a.currentBalance);
    const data = {
      datasets: [
        {
          label: "Banks",
          data: balances,
          backgroundColor: colors,
          borderColor: theme === "dark" ? "#101828" : "#ffffff",
          borderWidth: 2,
        },
      ],
      labels: accountNames,
      hoverOffset: 4,
    };
    const options = {
      cutout: "60%",
      plugins: {
        legend: { display: false },
      },
    };

  return <Doughnut 
    data={data} 
    options={options}
  />;
}

export default DoughnutChart;

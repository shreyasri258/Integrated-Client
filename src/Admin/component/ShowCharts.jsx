import { useState } from "react";
import BarChart from "./Charts/BarChart"
import PieChart from "./Charts/PieChart"

function ShowCharts({ labels, answersFreq, chartLabel }) {
  const [selectedChart, setSelectedChart] = useState("bar");
  return (
    <div className=" flex flex-col gap-3 justify-start items-center w-full h-screen">
      <div className=" flex w-1/6 justify-between rounded-full border-1 border-blue-500">
        <div
          className={`flex justify-center flex-1 p-1 rounded-l-full cursor-pointer ${
            selectedChart === "bar"
              ? "bg-blue-700 text-white "
              : " hover:bg-blue-300"
          } `}
          onClick={() => setSelectedChart("bar")}
        >
          <span className={`text-sm tracking-wide font-semibold`}>
            Bar Chart
          </span>
        </div>
        <div
          className={`flex justify-center flex-1 p-1 rounded-r-full cursor-pointer ${
            selectedChart === "pie"
              ? "bg-blue-700 text-white "
              : " hover:bg-blue-300"
          } `}
          onClick={() => setSelectedChart("pie")}
        >
          <span className={`text-sm tracking-wide font-semibold`}>
            Pie Chart
          </span>
        </div>
      </div>
      {selectedChart === "bar" && (
        <div className=" mt-9 flex w-96 h-96 justify-center ">
        <BarChart
          labels={labels}
          answersFreq={answersFreq}
          chartLabel={chartLabel}
        />
      </div>
      
      
      )}

      {selectedChart === "pie" && (
        <div className="flex justify-center w-full h-96">
          <PieChart
            labels={labels}
            answersFreq={answersFreq}
            chartLabel={chartLabel}
          />
        </div>
      )}
    </div>
  );
}

export default ShowCharts;

import React from "react";
import Chart from "react-google-charts";

const Progression = () => {
  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: "string", label: "Task ID" },
            { type: "string", label: "Task Name" },
            { type: "string", label: "Resource" },
            { type: "date", label: "Start Date" },
            { type: "date", label: "End Date" },
            { type: "number", label: "Duration" },
            { type: "number", label: "Percent Complete" },
            { type: "string", label: "Dependencies" },
          ],
          [
            "2014Spring",
            "Norsk kurs",
            "spring",
            new Date(2021, 2, 22),
            new Date(2021, 8, 20),
            null,
            100,
            null,
          ],
          [
            "2014Summer",
            "Data kurs",
            "summer",
            new Date(2021, 5, 21),
            new Date(2021, 8, 20),
            null,
            100,
            null,
          ],
          [
            "2014Autumn",
            "CV kurs",
            "autumn",
            new Date(2021, 2, 21),
            new Date(2021, 11, 20),
            null,
            100,
            null,
          ],
          [
            "2014Winter",
            "Bank kurs",
            "winter",
            new Date(2021, 11, 21),
            new Date(2021, 12, 21),
            null,
            100,
            null,
          ],
        ]}
        options={{
          height: 400,
          gantt: {
            trackHeight: 30,
          },
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default Progression;

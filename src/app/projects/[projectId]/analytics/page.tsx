"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { postReq } from "@/components/Menu";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Task } from "@/storage/models/Tasks";


const statusArr = ["To Do", "In Progress", "Testing", "Done"];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics() {
  const { project } = useSelector(({ project, user }: RootState) => ({
    project,
  }));
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (project.ProjectID > 0) {
      (async () => {
        const { tasks } = (await postReq("getTasks", {
          ProjectID: project.ProjectID,
        })) as { tasks: Task[] };
        console.log(tasks);
        if (tasks) {
          setData({
            labels: statusArr,
            datasets: [
              {
                label: "Task",
                data: statusArr.map(
                  (status) =>
                    tasks.filter((task) => task.status === status).length
                ),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      })();
    }
  }, [project.ProjectID]);
  console.log(data);

  return <div className="chart">
    <h1>Tasks Statistic</h1>
    {data && <Doughnut data={data} />}
    </div>;
}

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const MainPageChart = ({ data }) => {
    const [dailytemperature, setDailyTemperature] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        if (data) {
            const dailytemperature = data["weather_data"].map((item) =>
                parseFloat(item.temperature.toFixed(1))
            );
            const City = data["weather_data"].map((item) => item.city);
            setDailyTemperature(dailytemperature);
            setCity(City);
        }
    }, [data]);

    const options = {
        title: {
            text: "Lämpötilat",
            left: "center",
            textStyle: {
                color: "white",
            },
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            orient: "horizontal",
            left: "right",
            textStyle: {
                color: "white",
            },
        },
        xAxis: {
            type: "category",
            data: city,
            axisLabel: {
                rotate: 0,
                color: "white",
            },
        },
        yAxis: {
            type: "value",
            axisLabel: {
                color: "white",
            },
        },
        series: [
            {
                name: "Lämpötilat",
                type: "bar", // Change to bar chart
                data: dailytemperature, // Use temperatures for the y-axis
                smooth: true,
                itemStyle: {
                    color: 'gray',
                },
            },
        ],
    };

    return (
        <div>
            {dailytemperature && city ? (
                <ReactECharts
                    option={options}
                    style={{ height: "15vw", width: "45vw" }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MainPageChart;
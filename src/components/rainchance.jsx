import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Button from 'react-bootstrap/Button';

const RainChance = ({ data }) => {
    const [rainprobability, setRainprobability] = useState(null);
    const [time, setTime] = useState(null);
    const [filterdtimes, setFilteredTimes] = useState(null);
    const [filteredprobabilitys, setFilteredProbabilitys] = useState(null);
    const [showFiltered, setShowFiltered] = useState(false); // State to toggle between filtered and full data

    const formatTimes = (times) => {
        const weekdays = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];
        const formattedTimes = times.map((time) => {
            const [datePart, timePart] = time.split(' ');
            const date = new Date(datePart);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const weekday = weekdays[date.getDay()];
            return `${day}.${month}, ${weekday}, Kello: ${timePart}`;
        });
        return formattedTimes;
    };

    useEffect(() => {
        if (data) {
            const rainprobability = data["weather_data"][2].map(item => item.rain_probability);
            const times = data["weather_data"][2].map(item => item.timestamp);
            setTime(formatTimes(times));
            setRainprobability(rainprobability);

            const filtered = times.filter(item => item.startsWith(times[0].split(' ')[0]));
            const filtered_rainprob = rainprobability.slice(0, filtered.length);
            setFilteredTimes(formatTimes(filtered));
            setFilteredProbabilitys(filtered_rainprob);

            console.log(filtered, filtered_rainprob);
        }
    }, [data]);

    const options = {
        title: {
            text: 'Sateen todennäköisyys',
            left: 'center',
            textStyle: {
                color: 'white',
            },
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                const i = params[0].dataIndex;
                const displayTime = showFiltered ? filterdtimes : time;
                const displayRainProb = showFiltered ? filteredprobabilitys : rainprobability;
                return `Pvm: ${displayTime[i]}<br>Sateen todennäköisyys ${displayRainProb[i]} %`;
            }
        },
        legend: {
            orient: 'horizontal',
            left: 'right',
            textStyle: {
                color: 'white',
            },
        },
        xAxis: {
            type: 'category',
            data: showFiltered ? filterdtimes : time,
            axisLabel: {
                rotate: 0,
                color: 'white',
            },
        },
        yAxis: [
            {
                type: "value",
                axisLabel: {
                    formatter: '{value} %',
                    color: 'white',
                },
            },
        ],
        series: [
            {
                name: "Sateen todennäköisyys",
                type: "line",
                data: showFiltered ? filteredprobabilitys : rainprobability,
                smooth: true,
                itemStyle: {
                    color: 'orange',
                },
            },
        ],
    };

    return (
        <div>
            <Button
                variant="outline-light"
                onClick={() => setShowFiltered(!showFiltered)}
            >
                {showFiltered ? "Tulevat sademäärät" : "Tämän päivän sademäärät"}
            </Button>
            <ReactECharts option={options} style={{ height: '13vw', width: '45vw', color: "white" }} />
        </div>
    );
};

export default RainChance;
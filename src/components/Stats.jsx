import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState } from 'react';
import { useEffect } from 'react';

export default function BasicBars() {

  const [stats, setStats] = useState({'Zumba':0});

  const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

  useEffect(() => {
    
    const getTrainings = async () => {

      const updatedStats = { ...stats };

      fetch(REST_URL)
          .then(response => response.json())
          .then(responseData => {
              console.log("responseData" + responseData)
              responseData.map(training => {
                if(training.activity in updatedStats){
                  updatedStats[training.activity] = updatedStats[training.activity] + training.duration;
                } else{
                  updatedStats[training.activity] = training.duration;
                }
                setStats(updatedStats);
                console.log(stats);
              })
          })
          .catch(error => {
              console.log(error)
          })
  };

    getTrainings();
  }, []);

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: Object.keys(stats) }]}
      series={[{ data: Object.values(stats) }]}
      width={1300}
      height={700}
    />
  );
}
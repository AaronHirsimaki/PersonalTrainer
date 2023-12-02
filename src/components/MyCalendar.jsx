import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import moment from 'moment';
import Training from './training';
import dayjs from 'dayjs'
import { useEffect } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';


export default function MyCalendar(props){

  const localizer = dayjsLocalizer(dayjs)

  const [trainings, setTrainings] = useState([])

  const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {

      const updatedTrainings = [...trainings];

        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData)
                responseData.map(training => (
                  updatedTrainings.push(
                  {
                  id: training.id,
                  title: training.activity, // Set title to the activity or provide a suitable property
                  start: new Date(training.date),
                  end: moment(training.date)
                    .add(training.duration, 'minutes')
                    .toDate(),
                  attendees: training.customer.firstname,
                }
                )
                ));
                setTrainings(updatedTrainings);
            })
            .catch(error => {
                console.log(error)
            })
    };


  return(
  <div>
    <Calendar
      localizer={localizer}
      events={trainings}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700, width: 1500 }}
    />
  </div>
  )
}


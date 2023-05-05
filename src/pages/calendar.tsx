import React, { useEffect, useState} from "react";
import { NextPage } from "next";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from 'moment';

moment.locale("es");
//momentLocalizer(moment);
const localizer = momentLocalizer(moment);

const events = [{
  title: 'Evento 1',
  allDay: false,
  start: new Date('2023-5-4 11:00:00'), //año, mes, dia 
  end: new Date('2023-5-4 17:00:00'),
},
{
  title: 'Evento 2',
  allDay: false,
  start: new Date('2023-5-5 10:00:00'),
  end: new Date('2023-5-5 12:00:00'),
}];

const CalendarPage: NextPage = () => {
  const [allEvents, setAllEvents] = useState(events);

  return (
    <div className="container mx-auto px-10">
      <h1 className="text-4xl my-8">Visualización de eventos</h1>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultDate={new Date(2018, 0, 29)}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
      />
    </div>
  );
};

export default CalendarPage;

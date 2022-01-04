import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //state declare for day,appoinment and interview
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //Fetch the data
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //function for book interview
  function bookInterview(id, interview) {
   
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      const days = updateSpots(appointments);
      setState({ ...state, appointments, days });
    });
   
  }

  //function for cancel interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      const days = updateSpots(appointments);
      setState({ ...state, appointments, days });
    });
  }

  //Update spots function
  const updateSpots = (newAppointments) => {
    return state.days.map((eachDay) => {
      let freeSpots = 0;

      for (const id of eachDay.appointments) {
        if (!newAppointments[id].interview) freeSpots++;
      }

      const updatedSpotsPerDay = { ...eachDay, spots: freeSpots };
      return updatedSpotsPerDay;
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

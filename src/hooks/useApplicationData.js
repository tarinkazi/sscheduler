import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  //state declare for day,appoinment and interview
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

//Fetch the data
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
    .then((all) => 
    {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))

    })
      .catch((err) => 
      {
        console.log(err);
      });
  }, []);

  //function for book interview
  function bookInterview(id, interview) {
    const freeSpotChanged = { ...state }.appointments[id].interview === null ? -1 : 0;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => 
      {
        const days = updateSpots(id, freeSpotChanged);
        setState({ ...state, appointments });
      })
      .catch((err) => 
      {
        console.log(err);
      });
  }

  //function for cancel interview
  function cancelInterview(id) {
    const appointments = { ...state.appointments };
    const freeSpotChanged = 1;
    appointments[id].interview = null;

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => 
      {
        const days = updateSpots(id, freeSpotChanged);
        setState({ ...state, appointments });
      })
      .catch((err) => 
      {
        console.log(err);
      });
  }

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => 
      {
        setState({ ...state, appointments });
      })
      .catch((err) => 
      {
        console.log(err);
      });
  };

  //Update spots function
  const updateSpots = (id, dif) => {
    const newDays = [...state.days];
    newDays.forEach(item => {
      if (item.appointments.indexOf(id) > -1) {
        item.spots += dif;
      }
    });
    return newDays;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  }

};


export function getAppointmentsForDay(state, day) {
  let correctDay={};
  let appointments=[];
  for(let i=0; i<state.days.length; i++) {
    if(state.days[i].name === day) {
      correctDay=state.days[i]
    }
  }

  if(correctDay && correctDay.appointments) {
    for(let i=0; i < correctDay.appointments.length; i++) {
      let id = correctDay.appointments[i]
      appointments.push(state.appointments[`${id}`])
    }
  }
  return appointments
}

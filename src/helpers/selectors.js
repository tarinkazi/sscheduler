

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

export function getInterview(state, interview) {

  let interviewobj={};
  let obj = null;
  if(interview !== null ){

    for(let key in state.interviewers){
    
      if (state.interviewers[key].id === interview.interviewer) {
        let temp = interview.student;
    
        interviewobj.student=temp;
        let tmp1=state.interviewers[key]
        interviewobj.interviewer=tmp1
        console.log(interviewobj)
        
      }
    }
    return interviewobj;
    
  } 
  return obj;

}
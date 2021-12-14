export function getAppointmentsForDay(state, day) {
  const appointmentsArr = [];

  state.days.forEach((item) => {
    if (item.name === day) {
      item.appointments.forEach((appt) => {
        if (appt.id === state.appointments.id) {
          appointmentsArr.push(state.appointments[appt]);
        }
      });
    }
  });

  return appointmentsArr;
}

export function getInterview(state, interview) {

  let interviewobj={};
  let obj = null;
  console.log("Interview obj",interview, state.interviewers);
  if(interview !== null ){

    for(let key in state.interviewers){
    
      if (state.interviewers[key].id === interview.interviewer) {
        let temp = interview.student;
    
        interviewobj.student=temp;
        let tmp1=state.interviewers[key]
        interviewobj.interviewer=tmp1
       
        
      }
    }
    console.log("interviewobj after", interviewobj)
    return interviewobj;
    
  } 
  return obj;

}

export function getInterviewersForDay(state, day) {
	const interviewerArr = [];

  if (state.days.length === 0){
    return [];
  }

	state.days.forEach((item) => {
		if (item.name === day) {
			item.interviewers.forEach((int) => {
				if (int.id === state.interviewers.id) {
					interviewerArr.push(state.interviewers[int]);
				}
			});
		}
	});

	return interviewerArr;
}
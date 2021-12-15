import React from "react";
import Button from "components/Button.js"
import InterviewerList from "components/InterviewerList.js"
import { useState } from "react";


export default function Form(props){
  const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error, setError] = useState("");


const reset = () => {
  setStudent('');
  setInterviewer(null);
};

const cancel = () => {
  reset();
  setError(null);
  props.onCancel();
};

function validate(name) {
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }
  setError(null);
  props.onSave(name, interviewer);
}


  return(
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()}
    autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        placeholder="Enter Student Name"
        name={props.student}
        type="text"
        value ={student}
        onChange={(event) => 
          setStudent(event.target.value)}
          data-testid="student-name-input"
      />
      <section className="appointment__validation">{error}</section>

    </form>
    <InterviewerList 
    interviewers={props.interviewers}
    value={interviewer}
    onChange = {setInterviewer}
    />
    
    </section>

  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      {/* <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button> */}
      <Button confirm onClick={() => validate(student)}>Save</Button>
    </section>
  </section>

</main>

  );
}
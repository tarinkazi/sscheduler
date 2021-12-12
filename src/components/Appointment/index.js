import "components/Appointment/styles.scss";
import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Error from "./Error";
import Form from "./Form";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  let interviewers=[];
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return(

    
    <article className="appointment" >
        {props.time ? <Header time={props.time}/> : 'No Apppointments'}
       
      
        {mode === EMPTY && <Empty onAdd={() =>transition(CREATE)} />
        }

{mode === SHOW && (

        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
         />
)}
{mode === CREATE && (
  <Form
  interviewers={interviewers}
  onCancel = {() =>
  back(Empty)
  }
  />
)}
         
    </article>

  );
}
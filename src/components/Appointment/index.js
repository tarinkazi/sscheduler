import "components/Appointment/styles.scss";
import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Error from "./Error";
import Form from "./Form";
import Show from "./Show";
import Status from "./Status";

export default function Appointment(props){
  return(

    
    <article className="appointment" >
        {props.time ? <Header time={props.time}/> : 'No Apppointments'}
        {props.interview ?
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        />:<Empty/>}
   
    
    </article>

  );
}
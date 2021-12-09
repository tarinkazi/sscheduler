import "components/Appointment/styles.scss";
import React from "react";
import Header from "./Header";
import Empty from "./Empty";
export default function Appointment(props){
  return(

    <article className="appointment">
    {props.time ?`Appointment is 
    ${props.time}`:` No Appointment`}
    </article>

  );
}
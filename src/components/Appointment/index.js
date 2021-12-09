import "components/Appointment/styles.scss";
import React from "react";
export default function Appointment(props){
  return(

    <article className="appointment">
    {props.time ?`Appointment is 
    ${props.time}`:` No Appointment`}
    </article>

  );
}
import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
const parseDays = props.days.map(day => 
<DayListItem 
key={day.id}
name={day.name}
spots={day.spots}
selected={day.name===props.value}
onChange={props.onChange}
/>)
//console.log(props);
  return (
    <ul>
            {parseDays}
    </ul>
  )
}
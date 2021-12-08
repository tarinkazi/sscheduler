import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
const parseDays = props.days.map(value => 
<DayListItem 
key={value.id}
name={value.name}
spots={value.spots}
selected={value.name===props.value}
onChange={props.onChange}
/>)
console.log(props);
  return (
    <ul>
            {parseDays}
    </ul>
  )
}
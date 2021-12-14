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

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  //let interviewers=[];
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {

        transition(SHOW);
      })
  }

  function onDelete() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
  }


  return (


    <article className="appointment" >
      {props.time ? <Header time={props.time} /> : 'No Apppointments'}


      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />
      }
      {mode === SAVING && <Status message={'Saving...'} />}

      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === SHOW && (

        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.name}
          onDelete={()=>transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(Empty)}
          onSave={save}
        />

      )}
      {mode === CONFIRM && (
        <Confirm
        message={`Are you sure you want to delete?`}
        onConfirm={() => onDelete()}
        onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
        interviewers={props.interviewers}
					student={props.interview.student}
					interviewer={props.interview.interviewer.id}
					onCancel={() => back()}
					onSave={save}

        />
      )}

    </article>

  );
}
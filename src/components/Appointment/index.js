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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { history, transition, back } = useVisualMode
  (
    props.interview ? SHOW : EMPTY
  );
//For saving interview
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
      .catch(error => 
        transition(ERROR_SAVE, true));

  };

  //Delete Interview

  function onDelete() {
    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (


    <article className="appointment" >
      {props.time ? <Header time={props.time} /> : 'No Apppointments'}

      {history[history.length-1] === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {history[history.length-1] === SAVING && <Status message={'Saving...'} />}
      {history[history.length-1] === DELETING && <Status message={'Deleting'} />}
      {history[history.length-1] === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {history[history.length-1] === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(Empty)}
          onSave={save}
        />
      )}
      {history[history.length-1] === CONFIRM && (
        <Confirm
          message={`Are you sure you want to delete?`}
          onConfirm={()=>onDelete()}
          onCancel={() => back()}
        />
      )}
      {history[history.length-1] === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}
      {history[history.length-1] === ERROR_SAVE && (
        <Error
          message='Error, cant save Appointment, try again...'
          onClose={() => back()}
        />
      )}
      {history[history.length-1] === ERROR_DELETE && <Error message={'Error deleting encountered. Sorry!'} onClose={() => back()}
 
      />
      }

    </article>

  );
}
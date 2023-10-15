import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../slices/todoSlice";
import { toast } from "react-toastify";

export function TodoModal(props) {
  const [value, setValue] = useState("");
  const [complete, setComplete] = useState("incomplete");
  const options = ["incomplete", "completed"];
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.edittodoelement) {
      setValue(props.edittodoelement.title);
      setComplete(props.edittodoelement.status);
      // console.log(props.edittodoelement.status);
    } else {
      setValue("");
      setComplete("incomplete");
    }
  }, [props.edittodoelement]);
  function addTodoFunc() {
    if (value !== "") {
      if (props.edittodoelement) {
        dispatch(
          editTodo({
            id: props.edittodoelement.id,
            title: value,
            status: complete,
            time: props.edittodoelement.time,
          })
        );
        props.setedittodoelement(null);

        toast.success("Task Updated successfully");
      } else {
        dispatch(
          addTodo({
            title: value,
            status: complete,
          })
        );
        toast.success("Task Added");
      }
      setValue("");
      setComplete("incomplete");
      props.onHide();
    } else {
      toast.error("Please enter a title");
    }
  }

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#ecedf6", border: "none" }}
      >
        <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
          {props.edittodoelement ? "Edit TODO" : "Add TODO"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="formBody" style={{ backgroundColor: "#ecedf6" }}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor="type">Status</label>
        <select
          id="type"
          value={complete}
          onChange={(e) => setComplete(e.target.value)}
        >
          {options.map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
          {/* <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option> */}
        </select>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#ecedf6", border: "none" }}>
        <Button type="submit" variant="primary" onClick={addTodoFunc}>
          {props.edittodoelement ? "Update Todo" : "Add Todo"}
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            props.setedittodoelement(null);
            return props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

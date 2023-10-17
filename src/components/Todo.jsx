import React, { useState } from "react";
import { format } from "date-fns";
import Button from "react-bootstrap/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { TodoModal } from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../slices/todoSlice";
import { toast } from "react-toastify";

function Todo() {
  const [modalShow, setModalShow] = React.useState(false);
  const [editTodoElement, setEditTodoElement] = React.useState(null);
  const todoData = useSelector((state) => state.todo);
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  React.useEffect(() => {
    // console.log(todoData);
  }, [todoData]);

  const deleteTodo = (id) => {
    dispatch(removeTodo({ id: id }));
    toast.success("Todo Deleted Successfully");
  };
  return (
    <div className="todos">
      <div className="buttonArea">
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Create
        </Button>
        <select
          id="status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Completed</option>
        </select>
      </div>
      {todoData.length > 0 ? (
        <div className="todoArea">
          {todoData
            .filter((element) => {
              if (filter === "all") return true;
              return filter === "complete"
                ? element.status === "completed"
                : element.status === "incomplete";
            })
            .map((element) => (
              <div className="todoList" key={element.id}>
                <div className="title">
                  <p>{element.title}</p>
                  <p>{format(new Date(element.time), "p, MM/dd/yyyy")}</p>
                </div>

                <div className="buttons">
                  <p>
                    {element.status === "incomplete"
                      ? "inCompleted"
                      : "Completed"}
                  </p>
                  <button onClick={() => deleteTodo(element.id)}>
                    <MdDelete className="delete" />
                  </button>
                  <button
                    onClick={() => {
                      setModalShow(true);
                      setEditTodoElement(element);
                    }}
                  >
                    <MdEdit className="edit" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="noTodo">
          <p>No Todos</p>
        </div>
      )}
      <TodoModal
        edittodoelement={editTodoElement}
        setedittodoelement={setEditTodoElement}
        show={modalShow}
        onHide={() => {
          setEditTodoElement(null);
          setModalShow(false);
        }}
      />
    </div>
  );
}

export default Todo;

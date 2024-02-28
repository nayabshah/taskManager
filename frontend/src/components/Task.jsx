import { MdDeleteForever } from "react-icons/md";
import DialogAlert from "./DialogAlert";
import { useState } from "react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { MdEditNote } from "react-icons/md";
import MyModal from "./MyModal";

const Task = ({ task, deleteTask }) => {
  const dateObj = new Date(task.DueDate);
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB").format(dateObj);
  return (
    <div
      className="task"
      style={{
        position: "relative",
      }}
    >
      <div className="section-header">
        <h3>{task.Title}</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className="due-date">Due Date: {formattedDate}</p>
          <IconButton
            style={{
              position: "absolute",
              top: "-19px",
              right: "1px",
              backgroundColor: "#FBA834",
              color: "#fff",
            }}
            aria-label="delete"
            onClick={() => setOpenModal(true)}
          >
            <MdEditNote />
          </IconButton>
        </div>
      </div>
      <div>
        <p className="section-description">{task.Description}</p>
        <p>Priority: {task.Priority}</p>
      </div>
      <div className="section-header">
        <p className="status">Status: {task.Status}</p>

        <div className="tags-container">
          {task.Tags && task.Tags.length > 0
            ? task.Tags.map((tag) => (
                <p key={tag.id} className="tags">
                  {tag.text}
                </p>
              ))
            : null}

          <Button onClick={handleClickOpen}>
            <MdDeleteForever fill={"red"} />
          </Button>
        </div>
      </div>
      {open ? (
        <DialogAlert
          open={open}
          handleClose={() => setOpen(false)}
          handleUpdate={() => {
            deleteTask(task._id);
            setOpen(false);
          }}
        />
      ) : null}
      {openModal ? (
        <MyModal open={openModal} setOpen={setOpenModal} task={task} />
      ) : null}
    </div>
  );
};

export default Task;

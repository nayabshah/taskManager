import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import toast from "react-hot-toast";
import withTasksList from "../hoc/withTasksList";
import { useDispatch, useSelector } from "react-redux";
import { setTasksList } from "../reducers/tasksReducer";
import MyRadio from "./Radio";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  color: "black",
  width: "800px",
};

const MyModal = withTasksList(({ setOpen, open, task, getTasks, pageData }) => {
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(
    dayjs(task?.DueDate ? task.DueDate : new Date())
  );
  const [tags, setTags] = useState(task?.Tags ? task.Tags : []);
  const [status, setStatus] = useState(task?.Status ? task.Status : "Pending");
  const [priority, setPriority] = useState(
    task?.Priority ? task.Priority : "low"
  );
  const [formData, setFormData] = useState({
    title: task?.Title ? task.Title : "",
    assignedTo: task?.AssignedTo ? task.AssignedTo : "",
    description: task?.Description ? task.Description : "",
  });

  const { tasks } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!task) {
        const { data } = await axios.post("/api/tasks", {
          Title: formData.title,
          AssignedTo: formData.assignedTo,
          Description: formData.description,
          DueDate: new Date(value),
          Tags: tags,
          Priority: priority,
        });

        const newList = [data, ...tasks];

        dispatch(setTasksList(newList));
        toast.success("New Task Added");
      } else {
        await axios.put(`/api/tasks/${task._id}`, {
          Title: formData.title,
          AssignedTo: formData.assignedTo,
          Description: formData.description,
          DueDate: new Date(value),
          Tags: tags,
          Priority: priority,
          Status: status,
        });

        getTasks();
        toast.success("Task Updated");
      }

      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{
            gridColumn: "1/-1",
            textAlign: "center",
          }}
        >
          Add New Task
        </Typography>
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 150px",
            gap: "20px",
          }}
          onSubmit={onFormSubmit}
        >
          <Box>
            <label htmlFor="title">Title</label>
            <input
              className="form-input"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={onChange}
            />
            <label htmlFor="name">
              Assigned To (Person name responsible for completing the task)
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={onChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={onChange}
            ></textarea>
          </Box>

          <MyRadio
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />

          {task?.Status ? (
            <MyRadio
              radioStyle={{
                gridColumn: "1/-1",
                gridRow: "3",
              }}
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: "pending", label: "Pending" },
                { value: "in progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
              ]}
            />
          ) : null}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select Due Date and Time"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>

          <div
            style={{
              gridColumn: "1/-1",
              gridRow: "4/6",
            }}
          >
            <ReactTags
              tags={tags}
              inputFieldPosition="inline"
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              autocomplete
            />
          </div>
          <input
            type="submit"
            value="Submit"
            style={{ gridColumn: "1/-1", gridRow: "6" }}
          />
        </form>
      </Box>
    </Modal>
  );
});
export default MyModal;

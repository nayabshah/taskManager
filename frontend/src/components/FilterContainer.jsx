import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { setTasksList } from "../reducers/tasksReducer";
import { WithContext as ReactTags } from "react-tag-input";
import MyRadio from "./Radio";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const FilterContainer = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState([]);

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

  const onSearch = async (e) => {
    try {
      const commaSeparatedTags = tags.map((item) => item.text).join(",");
      const { data } = await axios.get(
        `/api/tasks?title=${search}&status=${status}&priority=${priority}&tags=${commaSeparatedTags}`
      );
      dispatch(setTasksList(data.tasks));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <aside>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn" onClick={onSearch}>
          <FaSearch />
        </button>
      </div>
      <div
        style={{
          margin: "20px 10px",
        }}
      >
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
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
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
      <Button onClick={onSearch}>Search</Button>
    </aside>
  );
};

export default FilterContainer;

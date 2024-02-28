import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import MyModal from "./MyModal";
const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <h1>Task Manager</h1>
      <button className="add-task-btn" onClick={() => setOpen(true)}>
        <IoAddOutline />
      </button>
      {open ? <MyModal open={open} setOpen={setOpen} /> : null}
    </header>
  );
};

export default Header;

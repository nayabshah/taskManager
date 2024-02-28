import Pagination from "@mui/material/Pagination";
import Task from "./Task";
import withTasksList from "../hoc/withTasksList";
import { Box, Typography } from "@mui/material";
import { Circles } from "react-loader-spinner";
import { useSelector } from "react-redux";

const TaskList = withTasksList(({ deleteTask, handlePageChange, pageData }) => {
  const { tasks, currentPage } = useSelector((state) => state.tasks);

  return pageData.loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : (
    <section className="task-list">
      {tasks && tasks.length > 0
        ? tasks.map((task) => (
            <Task key={task._id} deleteTask={deleteTask} task={task} />
          ))
        : null}
      <div className="pagination">
        {tasks && tasks.length > 0 ? (
          <>
            <Pagination
              count={pageData.count}
              color="secondary"
              onChange={handlePageChange}
              size="small"
            />
          </>
        ) : (
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
              }}
            >
              No Task available
            </Typography>
          </Box>
        )}
      </div>
    </section>
  );
});

export default TaskList;

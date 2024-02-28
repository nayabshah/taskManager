import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setTasksList } from "../reducers/tasksReducer";
import toast from "react-hot-toast";

const withTasksList = (Component) => {
  return (props) => {
    const { tasks, currentPage } = useSelector((state) => state.tasks);

    const dispatch = useDispatch();
    const [pageData, setPageData] = useState({
      totalTasks: 0,
      count: 1,

      limit: 5,
      loading: false,
    });

    useEffect(() => {
      if (!tasks) {
        getTasks();
      }
    }, [tasks]);

    const getTasks = async () => {
      try {
        setPageData({ ...pageData, loading: true });
        const { data } = await axios.get(
          `/api/tasks?limit=${pageData.limit}&page=${currentPage}`
        );
        dispatch(setTasksList(data.tasks));
        setPageData({
          ...pageData,
          totalTasks: data.totalTask,
          count: data.totalPages,
          loading: false,
        });
        dispatch(setCurrentPage(currentPage));
      } catch (error) {
        toast.error(error.message);
      }
    };

    const handlePageChange = async (event, value) => {
      try {
        const { data } = await axios.get(
          `/api/tasks?limit=${pageData.limit}&page=${value}`
        );
        dispatch(setCurrentPage(+value));
        dispatch(setTasksList(data.tasks));
      } catch (error) {
        toast.error(error.message);
      }
    };

    const deleteTask = async (id) => {
      try {
        await axios.delete(`/api/tasks/${id}`);
        getTasks();
      } catch (error) {
        toast.error(error.message);
      }
    };
    return (
      <Component
        {...props}
        handlePageChange={handlePageChange}
        getTasks={getTasks}
        deleteTask={deleteTask}
        setPageData={setPageData}
        pageData={pageData}
      />
    );
  };
};

export default withTasksList;

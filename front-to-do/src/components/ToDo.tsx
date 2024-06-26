import { axiosInstance } from "@/instance";
import React, { useEffect, useState } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

type ToDoProps = {
  handleAddTask: () => void;
  showModal: boolean;
  handleUpdateTask: (id: string) => void;
  updateModal: boolean;
  handleUpdateToDone: (id: string) => void;
};

export const ToDo: React.FC<ToDoProps> = ({
  handleAddTask,
  showModal,
  handleUpdateTask,
  updateModal,
  handleUpdateToDone,
}) => {
  const [toDo, setToDo] = useState<Task[]>([]);
  const [newPriority, setNewPriority] = useState("");

  const fetchToDo = async () => {
    try {
      const response = await axiosInstance.get("/todo");
      setToDo(response.data.todo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchToDo();
  }, [newPriority, showModal, updateModal]);

  const handlePriorityChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    taskId: String
  ) => {
    const priority = e.target.value;
    try {
      const response = await axiosInstance.put(`/taskPriority/${taskId}`, {
        priority: priority,
      });
      setNewPriority(priority);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: String) => {
    try {
      const response = await axiosInstance.delete(`/taskDelete/${id}`);
      alert(response.data.message);
      fetchToDo();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="text-stone-500">
      <div className="w-[300px] bg-stone-300 p-4 flex flex-col justify-between gap-3 rounded-lg">
        <div className="flex gap-3">
          <span>To do</span>
          <span className="text-gray-400">{toDo.length}</span>
        </div>
        {toDo.map((list, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg flex justify-between border border-stone-400 hover:scale-105 duration-300"
          >
            <button
              className="group flex justify-start"
              onClick={() => handleUpdateToDone(list._id)}
            >
              <i className="fa-regular fa-circle-check group-hover:scale-125 duration-200"></i>
            </button>
            <div className="w-[180px] flex flex-col gap-3">
              <div className="font-bold">{list.title}</div>
              <div className="w-[170px] break-words">{list.description}</div>
              <select
                className="border text-xs p-1 rounded-lg"
                value={list.priority}
                onChange={(e) => handlePriorityChange(e, list._id)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <i
                className="fa-solid fa-trash cursor-pointer hover:scale-125 duration-300"
                onClick={() => handleDelete(list._id)}
              ></i>
              <i
                className="fa-solid fa-pen-to-square cursor-pointer hover:scale-125 duration-300"
                onClick={() => handleUpdateTask(list._id)}
              ></i>
            </div>
          </div>
        ))}
        <div>
          <button
            onClick={handleAddTask}
            className="border border-stone-500 py-1 px-2 w-full flex justify-start items-center rounded-lg text-white bg-stone-400 hover:text-stone-400 hover:bg-white duration-300"
          >
            <i className="fa-solid fa-plus mr-2"></i>Add task
          </button>
        </div>
      </div>
    </div>
  );
};

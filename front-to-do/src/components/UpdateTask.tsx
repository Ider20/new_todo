import { axiosInstance } from "@/instance";
import React, { useEffect, useState } from "react";

type UpdateTaskProps = {
  setUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateModal: boolean;
  taskIdToUpdate: string;
};

export const UpdateTask: React.FC<UpdateTaskProps> = ({
  setUpdateModal,
  updateModal,
  taskIdToUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Low");

  const fetchTaskToUpdate = async (taskIdToUpdate: string) => {
    try {
      const response = await axiosInstance.get(
        `/taskToUpdate/${taskIdToUpdate}`
      );
      const taskToUpdate = response.data.taskToUpdate;
      setTitle(taskToUpdate.title);
      setDescription(taskToUpdate.description);
      setStatus(taskToUpdate.status);
      setPriority(taskToUpdate.priority);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTaskToUpdate(taskIdToUpdate);
  }, [taskIdToUpdate]);

  const handleClose = (e: React.MouseEvent<HTMLInputElement>) => {
    if ((e.target as HTMLElement).classList.contains("bg-back-color")) {
      setUpdateModal(!updateModal);
    }
  };

  const handleSubmit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    console.log(status);
    if (title === "") {
      alert("Please fill the title");
    } else if (description === "") {
      alert("Please fill the description");
    } else {
      try {
        const response = await axiosInstance.put(`/updateTask/${id}`, {
          title,
          description,
          status,
          priority,
        });
        alert(response.data.message);
        setUpdateModal(false);
      } catch (error) {
        console.error(error);
        setUpdateModal(false);
      }
    }
  };

  return (
    <div
      className="fixed bg-back-color w-full h-full flex justify-center items-center text-stone-500 z-10"
      onClick={handleClose}
    >
      <div className="bg-white p-8 rounded-lg">
        <div className="text-3xl font-bold">Update Task</div>
        <form
          onSubmit={(e) => handleSubmit(e, taskIdToUpdate)}
          className="flex flex-col gap-6 w-[300px] rounded-lg"
        >
          <div>
            <p className="text-xs">Title</p>
            <input
              type="text"
              className="border w-full h-8 px-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p className="text-xs">Description</p>
            <textarea
              className="border w-full h-[100px] px-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <p className="text-xs">Status</p>
            <select
              name=""
              id=""
              className="rounded-lg border w-full py-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Stuck">Stuck</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <p className="text-xs">Priority</p>
            <select
              name=""
              id=""
              className="rounded-lg border w-full py-1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button
            type="submit"
            className="border border-stone-400 rounded-lg text-white py-1 bg-stone-400 hover:text-stone-400 hover:bg-white duration-300"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

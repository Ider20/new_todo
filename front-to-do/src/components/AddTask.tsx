import { axiosInstance } from "@/instance";
import React, { useState } from "react";

type AddTaskProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
};

export const AddTask: React.FC<AddTaskProps> = ({
  setShowModal,
  showModal,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Low");

  const handleClose = (e: React.MouseEvent<HTMLInputElement>) => {
    if ((e.target as HTMLElement).classList.contains("bg-back-color")) {
      setShowModal(!showModal);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(status);
    if (title === "") {
      alert("Please fill the title");
    } else if (description === "") {
      alert("Please fill the description");
    } else {
      try {
        const response = await axiosInstance.post("/addTask", {
          title,
          description,
          status,
          priority,
        });
        alert(response.data.message);
        setShowModal(false);
      } catch (error) {
        console.error(error);
        setShowModal(false);
      }
    }
  };

  return (
    <div
      className="fixed bg-back-color w-full h-full flex justify-center items-center text-stone-500"
      onClick={handleClose}
    >
      <div className="bg-white p-8 rounded-lg">
        <div className="text-3xl font-bold">Add Task</div>
        <form
          onSubmit={handleSubmit}
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
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

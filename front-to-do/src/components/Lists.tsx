import React, { useState } from "react";
import { ToDo } from "../components/ToDo";
import { InProgress } from "../components/InProgress";
import { Stuck } from "../components/Stuck";
import { Done } from "../components/Done";
import { AddTask } from "../components/AddTask";
import { UpdateTask } from "../components/UpdateTask";
import { axiosInstance } from "../instance";
import { Loading } from "../components/Loading";

export const Lists = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [taskIdToUpdate, setTaskIdToUpdate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = () => {
    setShowModal(!showModal);
  };

  const handleUpdateTask = (id: string) => {
    setUpdateModal(!updateModal);
    setTaskIdToUpdate(id);
  };

  const handleUpdateToDone = async (id: string) => {
    setLoading(true);
    const done = "Done";
    try {
      const response = await axiosInstance.put(`/taskToDone/${id}`, { done });
      console.log(response);
    } catch (error) {
      alert("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="bg-admin-cover bg-cover flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="h-full w-full">
            {showModal && (
              <AddTask setShowModal={setShowModal} showModal={showModal} />
            )}
            {updateModal && (
              <UpdateTask
                setUpdateModal={setUpdateModal}
                updateModal={updateModal}
                taskIdToUpdate={taskIdToUpdate}
              />
            )}
          </div>
          <div className="flex flex-col items-center bg-admin-cover bg-cover h-screen">
            <div className="text-white text-3xl font-bold mt-10">
              To Do Lists
            </div>
            <div className="flex mt-[120px] gap-4">
              <ToDo
                handleAddTask={handleAddTask}
                showModal={showModal}
                handleUpdateTask={handleUpdateTask}
                updateModal={updateModal}
                handleUpdateToDone={handleUpdateToDone}
              />
              <InProgress
                handleAddTask={handleAddTask}
                showModal={showModal}
                handleUpdateTask={handleUpdateTask}
                updateModal={updateModal}
                handleUpdateToDone={handleUpdateToDone}
              />
              <Stuck
                handleAddTask={handleAddTask}
                showModal={showModal}
                handleUpdateTask={handleUpdateTask}
                updateModal={updateModal}
                handleUpdateToDone={handleUpdateToDone}
              />
              <Done
                handleAddTask={handleAddTask}
                showModal={showModal}
                handleUpdateTask={handleUpdateTask}
                updateModal={updateModal}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

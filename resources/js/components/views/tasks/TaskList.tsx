import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import { truncateText } from "../../utils/string";
import { countCompleted } from "../../utils/count";
import apiService from "../../services/apiService";

const TaskList = () => {
    const { taskList, updateContextData } = useTaskContext();

    const countTask = () => {
        return taskList.filter((task) => task.completed == 1).length;
    };
    const renderList = (task) => {
        const { title, id, description } = task;
        return (
            <div className="rounded-xl bg-base-100/60 p-6" key={id}>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-8">
                        <div className="text-xl text-bold">
                            {title.toUpperCase()}
                        </div>
                        <div className="text-xm">
                            {truncateText(description)}
                        </div>
                    </div>
                    <div>
                        <ul className="menu bg-base-200/20 menu-xs rounded-box p-2 my-4">
                            <li>
                                <div
                                    className="lg:tooltip"
                                    data-tip="Mask as done"
                                >
                                    <svg
                                        onClick={() => markAsDone(id)}
                                        width={20}
                                        height={20}
                                        fill="none"
                                        className="stroke-current"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </div>
                            </li>
                        </ul>
                        <ul className="menu bg-base-200/20 menu-xs rounded-box p-2 my-4">
                            <li>
                                <div
                                    className="lg:tooltip"
                                    data-tip="Delete task"
                                >
                                    <svg
                                        onClick={() => deleteTask(id)}
                                        width={20}
                                        height={20}
                                        fill="none"
                                        className="stroke-current"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                    </svg>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const markAsDone = (id) => {
        apiService
            .put("mark-as-done/" + id)
            .then(() => {
                updateContextData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteTask = (id) => {
        apiService
            .delete("delete-task/" + id)
            .then(() => {
                updateContextData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="card bg-slate-500/50">
            <div className="card-body">
                <div className=" flex justify-between">
                    <h2 className="card-title text-gray-300 text-3xl">
                        Your Task
                    </h2>
                    <ul className="menu bg-base-200 w-56 rounded-box">
                        <li>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Completed Tasks: {countCompleted(taskList)}
                            </a>
                        </li>
                    </ul>
                </div>
                <p className="text-gray-300/60 text-sm">
                    {""}
                    The only way to achieve the impossible is to believe it is
                    possible.
                </p>

                <div className="flex flex-col gap-4 mt-5 max-h-[35rem] overflow-y-auto px-5">
                    {taskList.map(renderList)}
                </div>
            </div>
        </div>
    );
};

export default TaskList;

import * as React from "react";
import apiService from "../../services/apiService";
import { useTaskContext } from "../../context/TaskContext";

const TaskForm = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const { updateContextData } = useTaskContext();

    const handleSubmit = () => {
        apiService
            .post("save-task", {
                title,
                description,
            })
            .then(() => {
                setTitle("");
                setDescription("");
                updateContextData();
            });
    };

    return (
        <div className="flex flex-col gap-3">
            <input
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
                type="text"
                placeholder="Title"
                className="input input-bordered w-full "
            />
            <textarea
                value={description}
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
                placeholder="Description"
                className="textarea textarea-bordered textarea-sm min-h-40"
            ></textarea>
            <button className="btn btn-accent" onClick={handleSubmit}>
                Save Task
            </button>
        </div>
    );
};

export default TaskForm;

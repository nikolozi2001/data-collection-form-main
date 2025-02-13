import React, { useState } from "react";

const TaskDataCollectionForm: React.FC = () => {
  const [tasks, setTasks] = useState([{ output: "", input: "" }]);
  const [isAddTaskButtonDisabled, setIsAddTaskButtonDisabled] = useState(true);

  const handleTaskInputChange = (index: number, field: "output" | "input", value: string) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
    validateTaskInputs(newTasks);
  };

  const validateTaskInputs = (tasks: { output: string; input: string }[]) => {
    const lastTask = tasks[tasks.length - 1];
    if (lastTask.output.trim() !== "" && lastTask.input.trim() !== "") {
      setIsAddTaskButtonDisabled(false);
    } else {
      setIsAddTaskButtonDisabled(true);
    }
  };

  const handleAddTaskClick = () => {
    setTasks([...tasks, { output: "", input: "" }]);
    setIsAddTaskButtonDisabled(true);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <label htmlFor={`output-${index}`}>Output:</label>
          <select
            id={`output-${index}`}
            value={task.output}
            onChange={(e) => handleTaskInputChange(index, "output", e.target.value)}
            required
          >
            <option value="">Select output</option>
            <option value="output1">Output 1</option>
            <option value="output2">Output 2</option>
            {/* Add more options as needed */}
          </select>
          <br />
          <label htmlFor={`input-${index}`}>Input:</label>
          <select
            id={`input-${index}`}
            value={task.input}
            onChange={(e) => handleTaskInputChange(index, "input", e.target.value)}
            required
          >
            <option value="">Select input</option>
            <option value="input1">Input 1</option>
            <option value="input2">Input 2</option>
            {/* Add more options as needed */}
          </select>
          <br />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddTaskClick}
        disabled={isAddTaskButtonDisabled}
      >
        Add new task
      </button>
    </div>
  );
};

export default TaskDataCollectionForm;

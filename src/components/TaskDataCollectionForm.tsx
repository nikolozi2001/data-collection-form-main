import React, { useState, useEffect } from "react";
import "../styles/TaskDataCollectionForm.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";
import MailIcon from "@mui/icons-material/Mail";

const TaskDataCollectionForm: React.FC = () => {
  interface Task {
    outputs: string[];
    inputs: string[];
  }

  const initialTasks: Task[] = [
    {
      outputs: ["SMS Chart"],
      inputs: ["Customer Tech Pack"],
    },
    {
      outputs: ["Email Report"],
      inputs: ["Financial Data"],
    },
    {
      outputs: ["Dashboard Report", "Performance Metrics"],
      inputs: ["Sales Data", "Customer Feedback"],
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddTaskButtonDisabled, setIsAddTaskButtonDisabled] = useState(true);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    validateTaskInputs(tasks);
  }, [tasks]);

  const handleTaskInputChange = (
    index: number,
    field: "outputs" | "inputs",
    value: string[]
  ) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
    validateTaskInputs(newTasks);
  };

  const validateTaskInputs = (
    tasks: { outputs: string[]; inputs: string[] }[]
  ) => {
    const lastTask = tasks[tasks.length - 1];
    if (lastTask.outputs.length > 0 && lastTask.inputs.length > 0) {
      setIsAddTaskButtonDisabled(false);
    } else {
      setIsAddTaskButtonDisabled(true);
    }

    const allTasksValid = tasks.every(
      (task) => task.outputs.length > 0 && task.inputs.length > 0
    );
    setIsDoneButtonDisabled(!allTasksValid);
  };

  const handleAddTaskClick = () => {
    setTasks([...tasks, { outputs: [], inputs: [] }]);
    setIsAddTaskButtonDisabled(true);
  };

  const handleDeleteTaskClick = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleDoneClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    const formData = { userId: "JohnSmith123", jobTitle: "Merchant", tasks };
    fetch("https://api.example.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form. Please try again.");
      });
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  return (
    <form className="task-data-collection-form">
      <MailIcon className="mail-icon" fontSize="large" />
      <h2>Tell us about yourself</h2>
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          {" "}
          <p className="nowrap">{index + 1} I create the</p>{" "}
          <span>
            <select
              id={`outputs-${index}`}
              value={task.outputs}
              onChange={(e) =>
                handleTaskInputChange(
                  index,
                  "outputs",
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              required
            >
              <option value="SMS Chart">SMS Chart</option>
              <option value="Email Report">Email Report</option>
              <option value="Dashboard Report">Dashboard Report</option>
              <option value="Performance Metrics">Performance Metrics</option>
            </select>
          </span>
          <p className="nowrap">using the</p>
          <span>
            <select
              id={`inputs-${index}`}
              value={task.inputs}
              onChange={(e) =>
                handleTaskInputChange(
                  index,
                  "inputs",
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              required
            >
              <option value="Customer Tech Pack">Customer Tech Pack</option>
              <option value="Financial Data">Financial Data</option>
              <option value="Sales Data">Sales Data</option>
              <option value="Customer Feedback">Customer Feedback</option>
            </select>
          </span>
          <HighlightOffIcon
            className="delete-icon"
            onClick={() => handleDeleteTaskClick(index)}
          />
        </div>
      ))}
      <button
        type="button"
        className="add-task-button"
        onClick={handleAddTaskClick}
        disabled={isAddTaskButtonDisabled}
      >
        <AddIcon />
        Add new task
      </button>
      <br />
      <button
        type="button"
        className="done-button"
        onClick={handleDoneClick}
        disabled={isDoneButtonDisabled}
      >
        Done
      </button>

      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to submit the form?</p>
          <button type="button" onClick={handleConfirmSubmit}>
            Yes
          </button>
          <button type="button" onClick={handleCancelSubmit}>
            No
          </button>
        </div>
      )}
    </form>
  );
};

export default TaskDataCollectionForm;

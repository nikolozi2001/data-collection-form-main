import { useState } from "react";
import "./App.css";
import UserInfoForm from "./components/UserInfoForm";
import TaskDataCollectionForm from "./components/TaskDataCollectionForm";

function App() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(2);
  };

  return (
    <div style={{ padding: "20px" }}>
      {step === 1 && <UserInfoForm onNext={handleNext} />}
      {step === 2 && <TaskDataCollectionForm />}
    </div>
  );
}

export default App;

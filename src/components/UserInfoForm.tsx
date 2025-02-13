import React, { useState } from "react";
import "../App.css";

interface UserInfoFormProps {
  onNext: () => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onNext }) => {
  const [userId, setUserId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = () => {
    if (userId.trim() !== "" && jobTitle.trim() !== "") {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <form>
      <label htmlFor="user-id">User ID:</label>
      <input
        type="text"
        id="user-id"
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
          handleInputChange();
        }}
        required
      />
      <br />
      <label htmlFor="job-title">Job Title:</label>
      <input
        type="text"
        id="job-title"
        value={jobTitle}
        onChange={(e) => {
          setJobTitle(e.target.value);
          handleInputChange();
        }}
        required
      />
      <br />
      <button
        type="button"
        onClick={onNext}
        disabled={isButtonDisabled}
      >
        Next
      </button>
    </form>
  );
};

export default UserInfoForm;

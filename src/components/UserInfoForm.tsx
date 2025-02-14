import React, { useState } from "react";
import "../styles/UserInfoForm.css";
import MailIcon from "@mui/icons-material/Mail";

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
    <form className="user-info-form">
      <MailIcon className="mail-icon" fontSize="large" />
      <h2>Tell us about yourself</h2>
      <input
        type="text"
        id="user-id"
        placeholder="Enter your user ID"
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
          handleInputChange();
        }}
        required
      />
      <br />
      <input
        type="text"
        id="job-title"
        placeholder="Enter your job title"
        value={jobTitle}
        onChange={(e) => {
          setJobTitle(e.target.value);
          handleInputChange();
        }}
        required
      />
      <br />
      <button
        className="next-button"
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

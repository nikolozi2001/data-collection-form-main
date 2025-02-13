import React, { useState } from 'react';

const App: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleInputChange = () => {
        if (userId.trim() !== '' && jobTitle.trim() !== '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const handleNextClick = () => {
        // Logic to navigate to the next screen
        console.log('Navigating to the next screen...');
    };

    return (
        <div>
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
                    onClick={handleNextClick}
                    disabled={isButtonDisabled}
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default App;

import React, { useEffect, useState } from "react";
import AccountSetupForm from "./AccountSetupForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAccountSetup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const userId = sessionStorage.getItem('userId');
            const accessToken = sessionStorage.getItem('access_token');

            const response = await axios.get(
                `http://localhost:4000/api/profile${userId}`,
                {
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setUserData(response.data.data);
        }catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data. Please try again");
        }finally{
            setLoading(false);
        }
    };
    fetchUserData();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      const userId = sessionStorage.getItem('userId');
      const accessToken = sessionStorage.getItem('access_token');

      const response = await axios.post(
        "http://localhost:4000/register/addUserStep2",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Server Response:", response.data);
      // Redirect or perform other actions on successful submission
      navigate('/Login');
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <AccountSetupForm onSubmit={handleFormSubmit} />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}

export default MyAccountSetup;

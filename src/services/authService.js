import axios from "axios";

const verifyAccessToken = async (accessToken) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/login/verifyAccessToken',
      { accessToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data && response.data.valid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error verifying access token', error);
    return false;
  }
};

export default verifyAccessToken;

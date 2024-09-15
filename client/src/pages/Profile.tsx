import React from 'react'; // Import React library
import instance from '../utils/axios'; // Import axios instance
import { useUser } from '../contexts/userAuth'; // Import useUser hook from userAuth context

// Function to format date
function dateFormat(expiredAt: any) {
  try {
    if (!expiredAt) {
      throw new Error("Error"); // Throw error if expiredAt is falsy
    }
    const date = new Date(expiredAt); // Create Date object from expiredAt
    // Format date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    }).format(date);
    return formattedDate; // Return formatted date
  } catch (error) {
    return null; // Return null if there's an error
  }
}

// Profile component
function Profile() {
  const { user } = useUser(); // Access user object from userAuth context

  // Function to handle logout
  function logout() {
    instance.post("/logout").then(response => { // Send POST request to logout endpoint
      localStorage.removeItem("access_token"); // Remove access_token from localStorage
      window.location.reload(); // Reload the window to clear user session
    });
  }

  // Render profile information
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h1>Mon profil</h1> {/* Heading */}
      <p>Page de profil.</p> {/* Description */}
      <p>FullName: {user?.name}</p> {/* Display user's full name */}
      <p>E-mail: {user?.email}</p> {/* Display user's email */}
      <p>Type profile (admin/user): {user?.type}</p> {/* Display user's type (admin/user) */}
      <p>Expired At: {dateFormat(user?.expiredAt)}</p> {/* Display formatted expiration date */}
      <a href="javascript:void(0)" onClick={logout}>logout</a> {/* Logout link */}
    </div>
  );
}

export default Profile; // Export Profile component as default
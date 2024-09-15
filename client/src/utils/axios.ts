import axios from "axios"; // Import Axios library

// Create an Axios instance with custom configuration
const instance = axios.create({
    baseURL: 'http://localhost:5000', // Base URL for API requests
    headers: {
        'Accept': "application/json", // Specify the Accept header for JSON responses
        "Content-Type": "application/json" // Specify the Content-Type header for JSON requests
    }
});

// Axios request interceptor to add Authorization header with bearer token
instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("access_token"); // Retrieve access token from localStorage
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header with bearer token
    }
    return request; // Return modified request configuration
}, (error) => {
    // Handle request error (if needed)
    // You can log the error or handle it accordingly
    return Promise.reject(error); // Reject the request promise with the error
});

export default instance; // Export the configured Axios instance as default
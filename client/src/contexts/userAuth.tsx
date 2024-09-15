// Import necessary modules and components from React and other files
import React from 'react';
import Login from '../pages/Login';
import instance from '../utils/axios';

// Define the structure of the User object using a TypeScript interface
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    expiredAt?: string; // Optional property
}

// Define the properties for the UserContext
interface UserContextProps {
    user: User | null; // User object or null if not authenticated
    setUser: (user: User | null) => void; // Function to update the user state
}

// Create a React Context with an undefined initial value
const UserContext = React.createContext<UserContextProps | undefined>(undefined);

// Define a UserProvider component to manage user state and provide context to children components
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    // State to hold the user object, initially null
    const [user, setUser] = React.useState<User | null>(null);
    
    // State to track loading status, initially true
    const [loading, setLoading] = React.useState(true);
    
    // Function to fetch user data from the server
    const fetchUser = async () => {
        try {
            const response = await instance.get("/user"); // Fetch user data
            setUser(response.data); // Update user state with fetched data
        } catch (error) {
            // Handle error gracefully
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched or on error
        }
    };

    // useEffect to call fetchUser once when the component mounts
    React.useEffect(() => {
        fetchUser();
    }, []); // Empty dependency array ensures this runs only once

    // Render a loading message while data is being fetched
    if(loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div>loading...</div>
            </div>
        )
    }

    // Provide the user state and setUser function to children components via UserContext
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextProps => {
    const context = React.useContext(UserContext); // Retrieve context value
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider'); // Ensure hook is used within a UserProvider
    }
    return context; // Return context value
};

// Authenticated component to conditionally render children or redirect to Login component based on authentication status
export const Authenticated: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
    const user = useUser(); // Get user context
    return !!user.user ? children : <Login />; // Render children if user is authenticated, otherwise render Login component
}
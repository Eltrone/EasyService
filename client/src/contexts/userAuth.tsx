import React from 'react';
import Login from '../pages/Login';
import instance from '../utils/axios';

interface Provider {
    id: number;
    user_id: number;
    company_name: string;
    logo: string;
    address: string;
    phone_number: string;
    email: string;
    description: string;
    website: string;
    status: string;
    contact_first_name: string;
    contact_last_name: string;
    contact_position: string;
    contact_phone_number: string;
    contact_email: string;
    created_at: string;
    updated_at: string;

    countries: number[];
    services: number[];
    activities: number[];
    product_types: number[];
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    providers: Provider[];
    created_at: string;
    updated_at: string;
    expired_at?: string;
}

interface Data {
    id: number;
    name: string;
}

interface Config {
    services: Array<Data>;
	product_types: Array<Data>;
	countries: Array<Data>;
	activities: Array<Data>;
}

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    config: Config | null;
}

const UserContext = React.createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [user, setUser] = React.useState<User | null>(null);
    const [config, setConfig] = React.useState<Config | null>(null);
    const [loading, setLoading] = React.useState(true);
    
    const fetchUser = async () => {
        try {
            const response = await instance.get("/protected");
            setUser(response.data?.user);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    async function fetchConfigs() {
		try {
			const response = await instance.get<Config>('/configs');
			setConfig(response.data);
		} catch (error) {
			console.error('Failed to fetch configs:', error);
		}
	}

    React.useEffect(() => {
        fetchConfigs().finally(fetchUser)
    }, []);

    if(loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div>loading...</div>
            </div>
        )
    }

    return (
        <UserContext.Provider value={{ user, setUser, config }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const Authenticated: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
    const user = useUser();
    return !!user.user ? children : <Login />;
}
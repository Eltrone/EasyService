import axios from "../utils/axios";
import React from "react";
import { useParams } from "react-router-dom";

async function fetchProvider(id: number) {
    try {
        const response = await axios.get<any>(`/providers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch providers:', error);
        return null;
    }
}

const Provier = () => {

    const params = useParams();
    const [provider, setProvider] = React.useState(null)

    const uid: any = params.id;

    const handler = async (id: number) => {
        const provider = await fetchProvider(id);
        setProvider(provider)
    }

    React.useEffect(() => {
        handler(uid);
    }, [uid]);

    return (
        <div className="h100vh">
            <div className="container">
                {JSON.stringify(provider)}
            </div>
        </div>
    )
}

export default Provier;
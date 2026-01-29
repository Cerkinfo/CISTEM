import { useState } from 'react';
import { useSession } from '../ctx';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signOut, session } = useSession();
    const navigate = useNavigate();

    const logOut = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!session) throw new Error("Not authenticated");
            else {
                await signOut();
                setSuccess(true);
                navigate('/login');
            }
        } catch (err) {
            setError('Logout failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        logOut,
        isLoading,
        success,
        error,
    };
}
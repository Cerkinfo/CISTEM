import { login as schema } from '@pkg/schemas/login';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useSession } from '../ctx';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signIn, session } = useSession();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setError(null);
            try {
                const { data: auth, error } = await signIn(
                    'email', 
                    {'email': values.email,
                    'password': values.password}
                )
                if (!session) throw new Error("Not authenticated");
                else if (auth) {
                    setSuccess(true);
                    navigate('/', {replace: true});
                }
            } catch (err) {
                setError('Login failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
    });

    return {
        formik,
        isLoading,
        success,
        error,
    };
}
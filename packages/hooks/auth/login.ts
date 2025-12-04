import { login as schema } from '@pkg/schemas/login';
import { useState } from 'react';
import { useFormik } from 'formik';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
                // Simulate login API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSuccess(true);
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
import { signup as schema } from '@pkg/schemas/signup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { supabase } from '@pkg/functions/Client';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../ctx';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signUp, session } = useSession();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            pseudo: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setError(null);
            try {
                const { data: auth, error } = await signUp(
                    'email', 
                    {'email': values.email,
                    'password': values.password}
                )
                if (!session) throw new Error("Not authenticated");
                else if (auth) {
                    let user = {
                        id: session.user.id,
                        email: values.email,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        pseudo : values.pseudo
                    }
                    const { data, error } = await supabase.functions.invoke('create-user', {
                        body: JSON.stringify({user}),
                        headers: {
                            Authorization: `Bearer ${session.access_token}`
                        }
                    })
                    if (error) throw Error("User can't be create")
                    else {
                        setSuccess(true);
                        navigate("/", {replace: true})
                    }
                } else throw Error ("An error was occured")
            } catch (error) {
                setError('SignUp failed. Please try again.');
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
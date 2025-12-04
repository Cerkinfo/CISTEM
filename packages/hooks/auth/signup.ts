import { signup as schema } from '@pkg/schemas/signup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { handleSignup } from '@pkg/functions/session/signup';
import { supabase } from '@pkg/functions/Client';
import type { User } from '@pkg/types/Auth';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
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
                const { data: auth, error } = await handleSignup({
                    provider: 'email',
                    credentials: {
                    'email': values.email,
                    'password': values.password}
                })
                const session = (await supabase.auth.getSession()).data.session;
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
                        setUser(data)
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
        user,
        success,
        error,
    };
}
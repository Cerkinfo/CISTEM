import { signup as schema } from '@pkg/schemas/signup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useSession } from '../ctx';
import { useUserCheck } from '@pkg/functions/user/checkUser';
import { useUserLink } from '@pkg/functions/user/linkUser';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { signUp } = useSession();
    const { checkUser, isLoading: ilc } = useUserCheck();
    const { linkUser, isLoading: ill } = useUserLink();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            setIsLoading(true)
            setError(null)
            try {
                const exists = await checkUser(values.email)
                if (!exists) {
                    formik.setErrors({email: "L'email n'existe pas dans la liste des pré-enregistrement"});
                    throw new Error('User not pre-registered');
                }
                const { error: signUpError } = await signUp(
                'email', {
                    email: values.email,
                    password: values.password,
                })
                if (signUpError) throw signUpError
                const linked = await linkUser()
                if (!linked) {
                    formik.setErrors({email: "Il y a eu un soucis lors de la liaison des comptes. Contactez fosdem@cerkinfo.be"});
                    throw new Error('User not linked');
                }
                setSuccess(true)
                navigate('/')
            } catch (err) {
                setError('SignUp failed. Please try again.')
            } finally {
                setIsLoading(false)
            }
        }
    });

    return {
        formik,
        isLoading,
        success,
        error,
    };
}
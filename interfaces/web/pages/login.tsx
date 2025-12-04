import { useNavigate } from "react-router-dom";
import { useLanguage } from "@pkg/contexts/LanguageContext";
import { EmailInput } from '@front/components/form/inputs/EmailInput';
import { PasswordInput } from '@front/components/form/inputs/PasswordInput';
import { SubmitButton } from '@front/components/form/buttons/SubmitButton';
import { useEffect } from "react";
import { supabase } from "@client";
import { useLogin } from "@pkg/hooks/auth/login";
import CISTEM from "@front/components/utils/CISTEM";
import Loading from "@front/components/utils/Loading";

export const Login:React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { formik, isLoading, success, error } = useLogin();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate('/');
            }
        };
        checkSession();
    }, [navigate]);

    return (
        <div className="page-auth">
        <section className="s-login menu">
            {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>:
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CISTEM size={150}/>
                </div>
                <h2>{t('login.connexion')}</h2>
                <form onSubmit={formik.handleSubmit} className="s-login__form ws-form">
                    <EmailInput formik={formik} />
                    <PasswordInput formik={formik} />
                    <SubmitButton formik={formik} loading={isLoading} text='login.signin' textLoading='authenticating' />
                </form>
                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
                    <p>Un problème ? Contactez : 
                        <a href="mailto:fosdem@cerkinfo.be" style={{color: '#666', marginLeft: '5px' }}>
                            fosdem@cerkinfo.be
                        </a>
                    </p>
                </div>
            </>
            }
        </section>
        </div>
    );
}
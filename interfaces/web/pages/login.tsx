import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLanguage } from "@pkg/contexts/LanguageContext";
import { EmailInput } from '@front/components/form/inputs/EmailInput';
import { PasswordInput } from '@front/components/form/inputs/PasswordInput';
import { SubmitButton } from '@front/components/form/buttons/SubmitButton';
import { useLogin } from "@pkg/hooks/auth/login";
import CISTEM from "@front/components/utils/CISTEM";
import Loading from "@front/components/utils/Loading";
import { useSession } from "@pkg/hooks/ctx";
import "@styles/pages/auth.scss";

export const Login:React.FC = () => {
    const { t } = useLanguage();
    const { session, user } = useSession();
    const navigate = useNavigate();
    const { formik, isLoading, success, error } = useLogin();

    if (session && user) return <Navigate to={'/'} />

    return (
        <div className="page-auth">
        <section className="menu">
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
                <div className="subscribe">
                    <p>Première connexion ? Cliquez ici : 
                        <Link to={'/signup'}>
                            {t('signup.signup')}
                        </Link>
                    </p>
                </div>
                <div className="problem">
                    <p>Un problème ? Contactez : 
                        <a href="mailto:fosdem@cerkinfo.be">
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
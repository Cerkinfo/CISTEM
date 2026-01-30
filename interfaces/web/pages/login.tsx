import { Link, Navigate } from "react-router-dom";
import { EmailInput } from '@front/components/form/inputs/EmailInput';
import { PasswordInput } from '@front/components/form/inputs/PasswordInput';
import { SubmitButton } from '@front/components/form/buttons/SubmitButton';
import { useLogin } from "@pkg/hooks/auth/login";
import CISTEM from "@front/components/utils/CISTEM";
import Loading from "@front/components/utils/Loading";
import { useSession } from "@pkg/hooks/ctx";
import "@styles/pages/auth.scss";

export const Login:React.FC = () => {
    const { session, user } = useSession();
    const { formik, isLoading } = useLogin();

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
                <h2>Connexion</h2>
                <form onSubmit={formik.handleSubmit} className="s-login__form ws-form">
                    <EmailInput formik={formik} />
                    <PasswordInput formik={formik} />
                    <SubmitButton formik={formik} loading={isLoading} text="Se connecter" />
                </form>
                <div className="subscribe">
                    <p>Première connexion ? Cliquez ici : 
                        <Link to={'/signup'}>
                            S'inscrire
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
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@pkg/contexts/LanguageContext";
import { EmailInput } from '@front/components/form/inputs/EmailInput';
import { PasswordInput } from '@front/components/form/inputs/PasswordInput';
import { SubmitButton } from '@front/components/form/buttons/SubmitButton';
import { useEffect } from "react";
import { supabase } from "@client";
import { useSignup } from "@pkg/hooks/auth/signup";
import CISTEM from "@front/components/utils/CISTEM";
import Loading from "@front/components/utils/Loading";
import { TextInput } from "@front/components/form/inputs/TextInput";

export const Signup:React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { formik, isLoading, success, error } = useSignup();

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
        <section className="menu">
            {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>:
            <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CISTEM size={150}/>
                </div>
                <h2>{t('signup.inscription')}</h2>
                <h4>Un pré-compte utilisateur (hors mot de passe) a été créé pour vous par l'administrateur. <br/>
                    Pour vous y lier, veuillez utiliser l'email que vous avez fourni dans le formulaire d'inscription des bénévoles. <br />
                    Le mot de passe entré ici par contre, sera connu de vous seul, car encrypté pas un service tiers fiable. <br/>
                    Une fois la jointure créée, votre session et votre pré-compte seront relié et vous pourrez naviguer dans le CISTEM.
                </h4>
                <form onSubmit={formik.handleSubmit} className="s-login__form ws-form">
                    <EmailInput formik={formik} />
                    <PasswordInput formik={formik} />
                    <SubmitButton formik={formik} loading={isLoading} text='signup.signup' textLoading='authenticating' />
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
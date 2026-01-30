import { useLanguage } from "@pkg/contexts/LanguageContext"
import { Link } from "react-router-dom";
import "@styles/components/user-block.scss"

export function UserBlock({ user, role } : { user: any, role?: boolean }) {
    const { t } = useLanguage();
    return (
        <Link to={`/profile/${user.pseudo}`} >
            <div className="user">
                <img src={user.image} alt={user.pseudo} />
                <div className="user-infos">
                    <h1>{user.pseudo}</h1>
                    {role && <p>{t(user.role)}</p>}
                </div>
            </div>
        </Link>
    )
}
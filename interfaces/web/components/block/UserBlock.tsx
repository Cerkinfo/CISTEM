import { Link } from "react-router-dom";
import "@styles/components/user-block.scss"
import { getRole } from "@pkg/utils/string";

export function UserBlock({ user, role } : { user: any, role?: boolean }) {
    return (
        <Link to={`/profile/${user.pseudo}`} >
            <div className="user">
                <img src={user.image} alt={user.pseudo} />
                <div className="user-infos">
                    <h1>{user.pseudo}</h1>
                    {role && <p>{getRole(user.role)}</p>}
                </div>
            </div>
        </Link>
    )
}
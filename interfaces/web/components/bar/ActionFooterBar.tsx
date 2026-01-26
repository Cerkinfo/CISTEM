import "@styles/components/action-bar.scss"
import { useSession } from "@pkg/hooks/ctx"
import { RoleToString } from "@pkg/utils/RoleToString";
import { Admin } from "../block/actions/admin";

export function ActionFooterBar() {
    const { user, isLoading } = useSession();

    function getModals(role: string) {
        switch (role) {
            case 'ADMIN': return (<Admin />);
            default: return ([])
        }
    }

    if (isLoading || !user) return null;
    return (
        <footer className="action-bar">
            <ul>
                <li className="role">
                    {RoleToString(user?.role)}
                </li>
                {getModals(user?.role)}
            </ul>
        </footer>
    )
}
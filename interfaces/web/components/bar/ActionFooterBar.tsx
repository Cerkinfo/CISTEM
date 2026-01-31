import "@styles/components/action-bar.scss"
import { useSession } from "@pkg/hooks/ctx"
import { Admin } from "../block/actions/admin";
import { ManagerBar } from "../block/actions/manager-bar";
import type { Role } from "@pkg/types/Auth";
import { getRole } from "@pkg/utils/string";

export function ActionFooterBar() {
    const { user, isLoading } = useSession();

    function getModals(role: Role) {
        switch (role) {
            case 'ADMIN': return (<Admin />);
            case 'MANAGER_BAR': return (<ManagerBar />);
            case 'WATER_SELLER': return(<ManagerBar />);
            default: return ([])
        }
    }

    if (isLoading || !user) return null;
    return (
        <footer className="action-bar">
            <ul>
                <li className="role">
                    {getRole(user?.role)}
                </li>
                {getModals(user?.role)}
            </ul>
        </footer>
    )
}
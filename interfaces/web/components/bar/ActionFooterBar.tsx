import "@styles/components/action-bar.scss"
import { useSession } from "@pkg/hooks/ctx"
import { Admin } from "../block/actions/admin";
import { useLanguage } from "@pkg/contexts/LanguageContext";
import { ManagerBar } from "../block/actions/manager-bar";
import type { Role } from "@pkg/types/Auth";

export function ActionFooterBar() {
    const { user, isLoading } = useSession();
    const { t } = useLanguage();

    function getModals(role: Role) {
        switch (role) {
            case 'ADMIN': return (<Admin />);
            case 'MANAGER_BAR': return (<ManagerBar />)
            default: return ([])
        }
    }

    if (isLoading || !user) return null;
    return (
        <footer className="action-bar">
            <ul>
                <li className="role">
                    {t(user?.role)}
                </li>
                {getModals(user?.role)}
            </ul>
        </footer>
    )
}
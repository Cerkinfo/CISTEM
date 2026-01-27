import "@styles/components/action-bar.scss"
import { useSession } from "@pkg/hooks/ctx"
import { Admin } from "../block/actions/admin";
import { useLanguage } from "@pkg/contexts/LanguageContext";

export function ActionFooterBar() {
    const { user, isLoading } = useSession();
    const { t } = useLanguage();

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
                    {t(user?.role)}
                </li>
                {getModals(user?.role)}
            </ul>
        </footer>
    )
}
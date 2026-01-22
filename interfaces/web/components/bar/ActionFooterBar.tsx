import "@styles/components/action-bar.scss"
import { useSession } from "@pkg/hooks/ctx"
import { RoleToString } from "@pkg/utils/RoleToString";

function getList(role: string) {
    switch (role) {
        case 'ADMIN': return ([
            {name: 'Ajouter un composent', action: ''}
        ]);
        default: return ([])
    }
}

export function ActionFooterBar() {
    const { user, isLoading } = useSession();

    if (isLoading || !user) return null;
    return (
        <footer className="action-bar">
            <ul>
                <li className="role">
                    {RoleToString(user?.role)}
                </li>
                <li>
                    test
                </li>
            </ul>
        </footer>
    )
}
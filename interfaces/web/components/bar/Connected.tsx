import { useSession } from "@pkg/hooks/ctx";

export default function Connected({ pseudo }: { pseudo: string }) {
    const { isUserOnline, user, isLoading } = useSession();

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            {isUserOnline(pseudo) ? 
                <div style={{color: 'green'}}>Connecté</div>
            : 
                <div style={{color: 'red'}}>Déconnecté</div>
            }
        </div>
    )
}
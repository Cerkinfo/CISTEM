import { useSession } from "@pkg/hooks/ctx"
import "@styles/components/mini-profile.scss";

export default function Profile() {
    const { user } = useSession();
    return (
        <section className="mini-profile">
            <img src={user?.image || `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${user?.first_name}_${user?.last_name}`} />
        </section>
    )
}
import { AddDrainPoint } from "@front/components/block/actions/AddDrainPoint";
import { useSession } from "@pkg/hooks/ctx";
import { useItem } from "@pkg/hooks/fetch/getItem";
import { Navigate, useParams } from "react-router-dom";

export function DrainIdActions() {
    const { user, isLoading: ilu } = useSession();
    const { id } = useParams<{id: string}>()
    if (!id && !user) return null;

    const { item: drain, isLoading: ili } = useItem({tableName: 'drain', key: id, eq: 'id'});

    if(!user && !ilu) return <Navigate to={'/404'} replace />
    if (!drain && !ili) return <Navigate to={'/404'} replace />

    if (drain && !drain.name) return <AddDrainPoint id={id || ''}/>

    return (
        <>Scan</>
    )
}
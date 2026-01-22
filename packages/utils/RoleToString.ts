import type { User } from "@pkg/types/Auth";

export function RoleToString(role: User["role"]) {
    switch (role) {
        case 'ADMIN' : return "Administrateur";
        case 'TREZ' : return "Trésorier";
        case 'MANAGER_BAR' : return "Manageur de bar";
        case 'MANAGER_STOCK' : return "Manageur du stock";
        case 'MANAGER_DRAIN' : return "Manageur des vidnages";
        case 'WATER_SELLER' : return "Responsable d'un point d'eau";
        case 'BENEVOLE' : return "Bénévole";
        default : return "";
    }
}
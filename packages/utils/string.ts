import type { Role } from "@pkg/types/Auth";

export function capitalize(str: string) {
    if(!str) return 'undefined'
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getRole(role: Role) {
    switch (role) {
        case ('ADMIN') : return "Administrateur";
        case ('TREZ') : return "Trésorier";
        case ('MANAGER_BAR') : return "Manageur de bar";
        case ('MANAGER_STOCK') : return "Manageur du stock";
        case ('MANAGER_DRAIN') : return "Manageur des vidanges";
        case ('WATER_SELLER') : return "Responsable d'un point d'eau";
        case ('BENEVOLE') : return "Bénévole";
    }
}

export function getOrderStatus(status: string) {
    switch (status) {
        case 'PENDING': return "En cours...";
        case 'SENDED': return "Envoyée!";
        case 'ABORTED': return "Annulée.";
    }
}

export function getDrainStatus(status: string) {
    switch (status) {
        case 'EMPTY': return 'Vide';
        case 'SUFFICIENT': return 'Pas vide mais suffisent';
        case 'EMPTIED': return 'A été vidé';
    }
}

export function getTranslations(t: string) {
    switch (t) {
        case ('ADMIN') : return "Administrateur";
        case ('TREZ') : return "Trésorier";
        case ('MANAGER_BAR') : return "Manageur de bar";
        case ('MANAGER_STOCK') : return "Manageur du stock";
        case ('MANAGER_DRAIN') : return "Manageur des vidanges";
        case ('WATER_SELLER') : return "Responsable d'un point d'eau";
        case ('BENEVOLE') : return "Bénévole";
        case 'PENDING': return "En cours...";
        case 'SENDED': return "Envoyée!";
        case 'ABORTED': return "Annulée.";
        case 'EMPTY': return 'Vide';
        case 'SUFFICIENT': return 'Pas vide mais suffisent';
        case 'EMPTIED': return 'A été vidé';
        default: return t;
    }
}
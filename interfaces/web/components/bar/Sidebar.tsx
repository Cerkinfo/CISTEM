// UI from : https://codepen.io/onediv/pen/WNOdMWw

import "@styles/components/sidebar.scss";
import { Box, Calendar, CISTEM, Inventory, Peoples, ProgressBar } from "../utils/icons";
import CISTEM_text from "../utils/CISTEM";
import Profile from "../block/Profile";
import { useSession } from "@pkg/hooks/ctx";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const { user } = useSession();
    const location = useLocation();
    return (
        <nav className="navbar">
            <ul className="navbar__menu">
                <li className="navbar__item">
                    <Link to={`/profile/${user?.pseudo}`} className="navbar__link" state={{ from: location }} replace>
                        <Profile /><span>Mon profile</span>
                    </Link>
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><CISTEM size={'50'}/><span>How To FOSDEM</span></a>
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><Calendar size={'50'}/><span>Horaires</span></a> 
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><ProgressBar size={'50'}/><span>Listes</span></a>
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><Box size={'50'}/><span>Bacs de vidanges</span></a>
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><Inventory size={'50'}/><span>Inventaire</span></a>
                </li>
                <li className="navbar__item">
                    <a href="#" className="navbar__link"><Peoples size={'50'}/><span>Bénévoles</span></a>
                </li>
                <li className="navbar__item" style={{marginTop: 'auto', marginBottom: '20px'}}>
                    <a href="#" className="navbar__link"><CISTEM_text size={25} only={'text'} color={'white'}/><span>Crédits</span></a>
                </li>
            </ul>
        </nav>
    )
}
import { FaHome, FaCalendarAlt, FaUsers, FaChartBar } from "react-icons/fa";
import { BsConeStriped } from "react-icons/bs";

const NavLinks = [
    {
        label: "Home",
        icon: FaHome,
        path: "/"
    },
    {
        label: "Kalendarz",
        icon: FaCalendarAlt,
        path: "/calendar"
    },
    {
        label: "Zawodnicy",
        icon: FaUsers,
        path: "/players"
    },
    {
        label: "Treningi",
        icon: BsConeStriped,
        path: "/training"
    },
    {
        label: "Statystyki",
        icon: FaChartBar,
        path: "/statistics"
    },
]

export default NavLinks
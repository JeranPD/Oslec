import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BiStats, BiData } from "react-icons/bi";
import { AiOutlineFileSearch, AiFillFileAdd
} from "react-icons/ai";

const links = [
  {
    id: 1,
    text: "Dashboard",
    path: "/dashboard",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "all customer",
    path: "/dashboard/all-customer",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add customer",
    path: "/dashboard/add-customer",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "analytics",
    path: "/dashboard/analytics",
    icon: <BiStats />,
  },
  {
    id: 5,
    text: "Generating Reports",
    path: "/dashboard/customer",
    icon: <BiData />,
  },
  {
    id: 6,
    text: "Records",
    path: "/dashboard/records",
    icon: <AiOutlineFileSearch />,
  },
  {
    id: 7,
    text: "Supplier",
    path: "/dashboard/supplier",
    icon: <AiFillFileAdd />,
  },
  {
    id: 8,
    text: "profile",
    path: "/dashboard/profile",
    icon: <ImProfile />,
  },
];

export default links;


import { Menu, Plus, BellIcon, Cross, HomeIcon, UsersIcon, TrainTrackIcon, ShoppingBag } from 'lucide-react'
export const sidebarConfig = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    heading: "Welcome Back, Admin",
    subHeading: "Here's how your gym is performing",
    icon:HomeIcon,
    actionButton: "Add Member",
  },
  {
    name: "Members",
    path: "/admin/members",
    heading: "Members Management",
    subHeading: "Manage all your gym members",
    actionButton: "Add Member",
    icon:HomeIcon,
  },
  {
    name: "MemberShip Plans",
    path: "/admin/membership-plans",
    heading: "Membership Plans",
    subHeading: "Manage your gym membership plans",
    actionButton: "Add Plan",
    icon:HomeIcon,
  },
  {
    name: "Products",
    path: "/admin/products",
    heading: "Products",
    subHeading: "Manage your fitness products inventory",
    actionButton: "Add Product",
    icon:HomeIcon,
  },
  {
    name: "Invoices",
    path: "/admin/invoices",
    heading: "Bills and Invoices",
    subHeading: "History and record of bills and invoices",
    actionButton: "Generate Bill",
    icon:HomeIcon,
  },
];
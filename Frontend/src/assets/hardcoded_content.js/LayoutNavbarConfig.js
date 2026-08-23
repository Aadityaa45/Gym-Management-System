import {
    LayoutDashboard,
    Users,
    CreditCard,
    ShoppingBag,
    FileText,
    Receipt,
} from "lucide-react";

export const sidebarConfig = [

    {
        name: "Dashboard",
        path: "/admin/dashboard",
        heading: "Welcome Back, Admin",
        subHeading: "Here's how your gym is performing",
        icon: LayoutDashboard,
        actionButton: "Add Member",
        actionButtonRoute: "/admin/registration"
    },

    {
        name: "Members",
        path: "/admin/members",
        heading: "Members Management",
        subHeading: "Manage all your gym members",
        actionButton: "Add Member",
        icon: Users,
        actionButtonRoute: "/admin/registration"
    },

    {
        name: "MemberShip Plans",
        path: "/admin/membership-plans",
        heading: "Membership Plans",
        subHeading: "Manage your gym membership plans",
        actionButton: "Add Plan",
        icon: CreditCard,
        actionButtonRoute: "/admin/add-plans"
    },

    {
        name: "Products",
        path: "/admin/products",
        heading: "Products",
        subHeading: "Manage your fitness products inventory",
        actionButton: "Add Product",
        icon: ShoppingBag,
        actionButtonRoute: "/admin/add-products"
    },

    {
        name: "Invoices",
        path: "/admin/manage-invoices",
        heading: "Bills and Invoices",
        subHeading: "History and record of bills and invoices",
        actionButton: "Generate Bill",
        icon: FileText,
        actionButtonRoute: "/admin/add-invoices"
    },

    {
        name: "Expenses",
        path: "/admin/manage-expanses",
        heading: "Expenses and Spending",
        subHeading: "History and record of expenditures",
        actionButton: "Add Expense",
        icon: Receipt,
        actionButtonRoute: "/admin/add-expense"
    },

];
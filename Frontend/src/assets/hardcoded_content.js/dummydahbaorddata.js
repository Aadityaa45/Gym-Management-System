export const dashboardData = {
  stats: [
    {
      id: 1,
      title: "Total Members",
      number: "1,248",
      percentage: "+12.5%",
      color: "#8B5CF6",
      trend: [
        { value: 900 },
        { value: 780 },
        { value: 1050 },
        { value: 2220 },
        { value: 1180 },
        { value: 1220 },
        { value: 550 },
      ],
    },

    {
      id: 2,
      title: "Today's Attendance",
      number: "342",
      percentage: "+8.4%",
      color: "#22C55E",
      trend: [
        { value: 280 },
        { value: 290 },
        { value: 310 },
        { value: 300 },
        { value: 325 },
        { value: 338 },
        { value: 342 },
      ],
    },

    {
      id: 3,
      title: "Monthly Revenue",
      number: "₹2.45L",
      percentage: "+15.2%",
      color: "#F97316",
      trend: [
        { value: 120000 },
        { value: 145000 },
        { value: 165000 },
        { value: 190000 },
        { value: 215000 },
        { value: 230000 },
        { value: 245000 },
      ],
    },

    {
      id: 4,
      title: "Active Memberships",
      number: "1,012",
      percentage: "+5.1%",
      color: "#06B6D4",
      trend: [
        { value: 850 },
        { value: 890 },
        { value: 910 },
        { value: 940 },
        { value: 970 },
        { value: 995 },
        { value: 1012 },
      ],
    },
  ],

  revenueChart: [
    // { month: "Jan", revenue: 120000 },
    // { month: "Feb", revenue: 145000 },
    // { month: "Mar", revenue: 165000 },
    // { month: "Apr", revenue: 190000 },
    // { month: "May", revenue: 215000 },
    // { month: "Jun", revenue: 245000 },
    { date: "1 May", revenue: 8000 },
  { date: "5 May", revenue: 25000 },
  { date: "8 May", revenue: 18000 },
  { date: "12 May", revenue: 40000 },
  { date: "15 May", revenue: 30000 },
  { date: "20 May", revenue: 45000 },
  { date: "22 May", revenue: 68540 },
  { date: "26 May", revenue: 48000 },
  { date: "29 May", revenue: 65000 },
  { date: "31 May", revenue: 72000 },
  ],

  attendanceChart: [
    { day: "Mon", attendance: 280 },
    { day: "Tue", attendance: 320 },
    { day: "Wed", attendance: 300 },
    { day: "Thu", attendance: 350 },
    { day: "Fri", attendance: 342 },
    { day: "Sat", attendance: 410 },
    { day: "Sun", attendance: 275 },
  ],

  membershipDistribution: [
    {
      name: "Basic",
      value: 437,
    },
    {
      name: "Standard",
      value: 374,
    },
    {
      name: "Premium",
      value: 312,
    },
    {
      name: "Personal Training",
      value: 125,
    },
  ],

  expiringMemberships: [
    {
      name: "Rahul Sharma",
      daysLeft: 2,
      plan: "Premium",
    },
    {
      name: "Aman Verma",
      daysLeft: 3,
      plan: "Basic",
    },
    {
      name: "Rohit Singh",
      daysLeft: 5,
      plan: "Standard",
    },
    {
      name: "Vikas Patel",
      daysLeft: 7,
      plan: "Premium",
    },
  ],

  recentActivities: [
    {
      id: 1,
      action: "New member joined",
      member: "Rahul Sharma",
      time: "2 min ago",
    },

    {
      id: 2,
      action: "Membership renewed",
      member: "Aman Verma",
      time: "10 min ago",
    },

    {
      id: 3,
      action: "Payment received",
      member: "Rohit Singh",
      time: "20 min ago",
    },

    {
      id: 4,
      action: "Attendance marked",
      member: "Priya Jain",
      time: "25 min ago",
    },
  ],

  topSellingProducts: [
    {
      product: "Protein Powder",
      sales: 145,
    },

    {
      product: "Shaker Bottle",
      sales: 122,
    },

    {
      product: "Gym Gloves",
      sales: 95,
    },

    {
      product: "Mass Gainer",
      sales: 80,
    },

    {
      product: "Resistance Band",
      sales: 72,
    },
  ],
};
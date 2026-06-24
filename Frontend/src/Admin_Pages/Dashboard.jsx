import react, { useEffect, useState } from 'react'
import KPI_cards from '../components/Dashbaord_components/Kpi_cards';
import { Users } from 'lucide-react';
import { dashboardData } from '../assets/hardcoded_content.js/dummydahbaorddata';
import RevenueChart from '../components/Dashbaord_components/Revenue_Chart';
const Dashboard = () =>{
    const [dashboardKPIData,setDashboardKPIData] = useState([])
    const [revenueChartData,setRevenueChartData] = useState([])

    useEffect(()=>{
        setDashboardKPIData(dashboardData.stats)
        setRevenueChartData(dashboardData.revenueChart)
    },[])
    return(
        <div>
            {/* kPI section */}
            <div className='flex items-start justify-start gap-5 mt-5 ml-5'>
                {dashboardKPIData.map((item)=>(
                    <KPI_cards
                        key={item.id}
                        title={item.title}
                        numbers={item.number}
                        percentage={item.percentage}
                        color={item.color}
                        chartData={item.trend}
                    />
                ))}
            </div>

            {/* charts secttion */}
            <div className='flex items-center justify-start gap-4 mt-5 ml-5'>
                <RevenueChart 
                    total_revenue={"₹2,45,680"}
                    percentage={15.7}
                    revenueData={revenueChartData}
                />
                <RevenueChart 
                    total_revenue={"₹2,45,680"}
                    percentage={15.7}
                    revenueData={revenueChartData}
                />
                
            </div>
            
        </div>
    )
}

export default Dashboard;
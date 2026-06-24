import react, { useEffect, useState } from 'react'
import KPI_cards from '../components/Dashbaord_components/Kpi_cards';
import { Users } from 'lucide-react';
import { dashboardData } from '../assets/hardcoded_content.js/dummydahbaorddata';
const Dashboard = () =>{
    const [dashboardKPIData,setDashboardKPIData] = useState([])

    useEffect(()=>{
        setDashboardKPIData(dashboardData.stats)
    },[])
    return(
        <div>
            {/* kPI section */}
            <div className='flex items-start justify-start gap-5 mt-5 ml-5'>
                {dashboardKPIData.map((item)=>(
                    <KPI_cards
                        key={item.id}
                        title={item.title}
                        numbers={item.numbers}
                        percentage={item.percentage}
                        color={item.color}
                        chartData={item.trend}
                    />
                ))}
                {/* <KPI_cards
                    title="Total Members"
                    numbers="1,248"
                    percentage="12.5%"
                    color="#8B5CF6"
                    icon={<Users size={20} color="white" />}
                    chartData={chartData}
                /> */}
            </div>
            
        </div>
    )
}

export default Dashboard;
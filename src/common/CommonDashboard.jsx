import React from 'react'
import { useSelector } from 'react-redux';
import CommonHeader from './CommonHeader';
import Dashboard from '../components/enterprise/Dashboard'
import ConsumerDashboard from '../components/consumer/ConsumerDashboard';
import DeliveryboyDashboard from '../components/deliveryboy/DeliveryboyDashboard';
function CommonDashboard() {
  const user = useSelector((state)=>state.auth.user)
  return (
    <div>
        <CommonHeader userData={user} />
        {user?.userDetails?.role==='ENTERPRISE' && <Dashboard/>}
        {user?.userDetails?.role==='CONSUMER' && <ConsumerDashboard/>}
        {user?.userDetails?.role==='DELIVERY_BOY' && <DeliveryboyDashboard/>}
    </div>
  )
}

export default CommonDashboard

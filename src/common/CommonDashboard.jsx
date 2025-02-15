import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CommonHeader from './CommonHeader';
import Dashboard from '../components/enterprise/Dashboard'
import ConsumerDashboard from '../components/consumer/ConsumerDashboard';
import DeliveryboyDashboard from '../components/deliveryboy/DeliveryboyDashboard';
import { getMapsApiKey } from '../utils/Constants';
function CommonDashboard() {
  const user = useSelector((state)=>state.auth.user)
  const [mapKey, setMapKey] = useState(null);

  useEffect(() => {
    const fetchMapKey = async () => {
      try {
        const key = await getMapsApiKey();
        setMapKey(key);
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };
    if(user?.userDetails?.role==='CONSUMER'){
      fetchMapKey();
    }
    
  }, []);
  return (
    <div>
       {}
        <CommonHeader userData={user} />
        {user?.userDetails?.role==='ENTERPRISE' && <Dashboard/>}
        {user?.userDetails?.role==='CONSUMER' && mapKey!==null &&   <ConsumerDashboard mapApiKey={mapKey}/>}
        {user?.userDetails?.role==='DELIVERY_BOY' && <DeliveryboyDashboard/>}
    </div>
  )
}

export default CommonDashboard

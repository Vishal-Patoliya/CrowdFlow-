import React, { useState } from 'react';
import Layout from './components/Layout';
import LiveMap from './components/LiveMap';
import WaitTimes from './components/WaitTimes';
import Parking from './components/Parking';
import Safety from './components/Safety';
import QuickActions from './components/QuickActions';
import Alerts from './components/Alerts';
import { useEventData } from './hooks/useEventData';

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const { zones, queues, parking, headCount } = useEventData();

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} headCount={headCount}>
      <div className="h-full flex flex-col">
        {activeTab === 'map' && <LiveMap zones={zones} />}
        {activeTab === 'queues' && <WaitTimes queues={queues} />}
        {activeTab === 'parking' && <Parking parking={parking} />}
        {activeTab === 'safety' && <Safety />}
        {activeTab === 'actions' && <QuickActions />}
        {activeTab === 'alerts' && <Alerts />}
      </div>
    </Layout>
  );
}

export default App;

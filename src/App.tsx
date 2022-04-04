import React from 'react'
// Antd
import 'antd/dist/antd.css'
// MobX
import { Provider } from 'mobx-react'
import locationStore from './stores/locationStore'
// Components
import AppHeader from './components/AppHeader'
import AppPricingTable from './components/AppPricingTable'

const stores = { locationStore }

const App = () => {
  return (
    <Provider {...stores}>
      <div className={'bg-slate-50 min-h-screen'}>
        <div className={'max-w-5xl mx-auto p-10 flex flex-wrap justify-center items-center'}>
          <AppHeader />
          <div className={'mb-10 w-full'} />
          <AppPricingTable />
        </div>
      </div>
    </Provider>
  )
}

export default App

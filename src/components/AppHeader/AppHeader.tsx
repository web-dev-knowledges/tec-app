import React from 'react'
import { inject, observer } from 'mobx-react'

interface AppHeaderProps {
  locationStore?: any;
}

const AppHeader = (props: AppHeaderProps) => {

  const { locationStore } = props
  const { selectedLocation } = locationStore

  const setSelectedLocation = (locationName: string): void => {
    locationStore.setSelectedLocation(locationName)
  }

  return (
    <div className={'flex justify-between items-center w-full'}>
      <h1 className={'text-blue-900 font-bold text-2xl'}>Plan Details</h1>
      <select onChange={e => setSelectedLocation(e.target.value)}
              className={'w-40 border-2 py-1 px-2.5'}
              defaultValue={selectedLocation}>
        <option value='singapore'>Singapore</option>
        <option value='vietnam'>Vietnam</option>
      </select>
    </div>
  )
}

export default inject('locationStore')(observer(AppHeader))

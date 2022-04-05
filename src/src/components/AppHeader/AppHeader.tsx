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
      <select onChange={(e: any) => setSelectedLocation(e)} defaultValue={selectedLocation} className={'w-40'}>
        <option value='singapore'>Singapore</option>
        <option value='vietnam'>Vietnam</option>
      </select>
    </div>
  )
}

export default inject('locationStore')(observer(AppHeader))

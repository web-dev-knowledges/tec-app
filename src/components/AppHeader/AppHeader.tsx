import React, { useEffect } from 'react'
import { Select } from 'antd'
import { inject, observer } from 'mobx-react'

const { Option } = Select

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
      <Select onChange={e => setSelectedLocation(e)} defaultValue={selectedLocation} className={'w-40'}>
        <Option value='singapore'>Singapore</Option>
        <Option value='vietnam'>Vietnam</Option>
      </Select>
    </div>
  )
}

export default inject('locationStore')(observer(AppHeader))

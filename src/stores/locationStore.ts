import { makeAutoObservable, runInAction } from 'mobx'

export interface LocationStoreInterface {
  selectedLocation: string;
}

class LocationStore implements LocationStoreInterface {
  selectedLocation = 'singapore'

  constructor() {
    makeAutoObservable(this)
  }

  setSelectedLocation(locationName: string): void {
    runInAction(() => {
      this.selectedLocation = locationName
    })
  }
}

export default new LocationStore()

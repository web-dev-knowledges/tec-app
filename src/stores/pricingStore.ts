import { makeAutoObservable } from 'mobx'
import { tableData, tableData2 } from '../mock/mock'
import { Pricing } from '../models/pricing.model'

class PricingStore {

  pricingData: Pricing[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getPricingData(selectedLocation: string): Pricing[] {
    switch (selectedLocation) {
      case 'singapore':
        return tableData as Pricing[]
      case 'vietnam':
        return tableData2 as Pricing[]
      default:
        return tableData as Pricing[]
    }
  }
}

export default new PricingStore()

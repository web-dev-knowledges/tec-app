import { makeAutoObservable } from 'mobx'
import { singaporeData, vietnameseData } from '../mock/mock'
import { Pricing } from '../models/pricing.model'

class PricingStore {

  pricingData: Pricing[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getPricingData(selectedLocation: string): Pricing[] {
    switch (selectedLocation) {
      case 'singapore':
        return singaporeData as Pricing[]
      case 'vietnam':
        return vietnameseData as Pricing[]
      default:
        return []
    }
  }
}

export default new PricingStore()

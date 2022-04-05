import { makeAutoObservable } from 'mobx'

class PricingStore {
  constructor() {
    makeAutoObservable(this)
  }

}

export default new PricingStore()

import { create } from 'zustand'
import { CurrencyRateProps } from './types/currency.types'

interface StoreState {
  rates: CurrencyRateProps[]
  setRates: (rates: CurrencyRateProps[]) => void
}

export const useStore = create<StoreState>((set) => ({
  rates: [],
  setRates: (newRates) => set(() => ({ rates: newRates })),
}))

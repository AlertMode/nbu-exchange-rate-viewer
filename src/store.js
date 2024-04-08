import { create } from 'zustand'

export const useStore = create((set) => (
    {
        rates: [],
        setRates: (rates) => set(() => ({ rates: rates}))
    }
))
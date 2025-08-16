import { create } from 'zustand'

export const userStore = create((set, get) => ({
    user: {
        accountAddress: undefined
    },
    updateAddress: (newUser: any) => set((state: any) => ({
        user: {...state.user, ...newUser}
    }))
}))
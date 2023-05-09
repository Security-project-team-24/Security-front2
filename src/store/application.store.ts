import { AuthStore, authStoreSlice } from './auth-store/auth.store';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type AppStore = AuthStore
export const useApplicationStore = create<AppStore>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a)
        })),
        {
            partialize: ({ loginStateRes, user }) => ({
                loginStateRes: {
                    data: loginStateRes.data,
                    status: "IDLE",
                    error: null
                },
                user,
            }),
            name: 'application-store',
        }
    )
)

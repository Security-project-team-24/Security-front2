import { AuthStore, authStoreSlice } from './auth-store/auth.store';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { ProjectStore, projectStoreSlice } from './project-store/project.store';
import { UserStore, userStoreSlice } from './user-store/user.store';

export type AppStore = AuthStore & ProjectStore & UserStore
export const useApplicationStore = create<AppStore>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a),
            ...projectStoreSlice(...a),
            ...userStoreSlice(...a)
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

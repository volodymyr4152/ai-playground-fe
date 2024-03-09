import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


interface ISelectedChatInfo {
  selectedChatId: string
  setSelectedChatId: (newSelectedChatId: string) => void
}

export const useSelectedChatInfo = create<ISelectedChatInfo>()(
  persist(
    (set, get) => ({
      selectedChatId: undefined,
      setSelectedChatId: (newSelectedChatId) => set(
        (state) => ({...state, selectedChatId: newSelectedChatId})
      ),
    }),
    {
      name: 'selectedChatInfo', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  )
)

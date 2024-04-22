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
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  )
)

interface IInputBoxProps {
  selectedRole: string
  setSelectedRole: (newRole: string) => void
  currentContent: string
  setCurrentContent: (newContent: string) => void
  userName: string
  setUserName: (newUserName: string) => void
  formattingCode: string
  setFormattingCode: (newFormattingCode: string) => void
}

export const useUserInputState = create<IInputBoxProps>()(
  persist(
    (set, get) => ({
      selectedRole: 'user',
      setSelectedRole: (newRole) => set(
        (state) => ({...state, selectedRole: newRole})
      ),
      currentContent: '',
      setCurrentContent: (newContent) => set(
        (state) => ({...state, currentContent: newContent})
      ),
      userName: null,
      setUserName: (newUserName) => set(
        (state) => ({...state, userName: newUserName})
      ),
      formattingCode: '({message}) => `[Slack] VH: ${JSON.stringify(message)}`',
      setFormattingCode: (newFormattingCode) => set(
        (state) => ({...state, formattingCode: newFormattingCode})
      ),

    }),
    {
      name: 'userInputBoxState', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  )
)

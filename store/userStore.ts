import { create } from 'zustand';

//store type
interface storeType {
    isAdmin: boolean,
    setIsAdmin: (value: boolean) => void
}

//creating the store useing create<type> method of zustand
export const userStore = create<storeType>(
    //set is used to store the values in store
    (set) => (
        {
            isAdmin: false,
            setIsAdmin: (value) => set(
                {
                    isAdmin: value
                }
            )
        }
    )
);
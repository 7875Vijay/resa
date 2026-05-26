import { propertyTypes } from "@/types/propertyTypes";
import { create } from "zustand";


interface propertySearchStoreType {

    search: string;
    type: propertyTypes;
    bedrooms: number | null;
    bathrooms: number | null;
    minPrice: number | null;
    maxPrice: number | null;

    setSearch: (value: string) => void;
    setType: (value: propertyTypes) => void;
    setBedrooms: (value: number | null) => void;
    setBathrooms: (value: number | null) => void;
    setMinPrice: (value: number | null) => void;
    setMaxPrice: (value: number | null) => void;

    setResetSearch: () => void;
    
}

export const useFilterStore = create<propertySearchStoreType>((set)=>({

  search: "",
  type: null,
  bedrooms: null,
  bathrooms: null,
  minPrice: null,
  maxPrice: null,

  setSearch: (value) => set({ search: value }),
  setType: (value) => set({ type: value }),
  setBedrooms: (value) => set({ bedrooms: value }),
  setBathrooms: (value) => set({ bathrooms: value }),
  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),

  setResetSearch: ()=>{
    set({
        search: "",
        type: null,
        bedrooms: null,
        bathrooms: null,
        minPrice: null,
        maxPrice: null
    })
  }

}))
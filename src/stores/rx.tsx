import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface dose {
  id: number;
  is_morning: boolean;
  is_afternon: boolean;
  is_evening: boolean;
  morning_dose: number;
  evening_dose: number;
  afternoon_dose: number;
}

interface time {
  id: number;
  time: number;
  time_type: "daily" | "one day off";
  take_type: number;
}
interface duration {
  id: number;
  days: number;
  nose: number;
}
interface drug {
  id: number;
  drug_name: string;
  Duration: duration;
  Time: time;
  Dose: dose;
}
interface rx_list {
  id: number;
  name: string;
  isactive: boolean;
  no_of_drug: number;
  Drug: drug[];
}
interface entire_Rx_data {
  rx: rx_list[];
  add_rx: (rx: string) => number;
  add_drug: (d: drug, id: number) => void;
  rename: (name: string, id: number) => void;
  active_change: (id: number) => void;
  drug_list_selector:(id:number)=>any
}
export const useBookStore = create(
  persist<entire_Rx_data>(
    (set) => ({
      rx: [
        {
          id: 1,
          name: "group: 1",
          no_of_drug: 5,
          isactive: false,
          Drug: [{
            id:1,
            drug_name:"taste",
            Duration:{
              id:1,days:2,
              nose:1
            },
            Time:{
              id:1,time:1,time_type:"daily",take_type:2
            },Dose:{
              id:1,
              is_morning: true,
              is_afternon: false,
              is_evening: false,
              morning_dose: 1,
              evening_dose: 0,
              afternoon_dose:0,
            }
          }],
        },
        {
          id: 2,
          name: "group: 2",
          no_of_drug: 3,
          isactive: false,
          Drug: [],
        },
        {
          id: 3,
          name: "group: 6",
          no_of_drug: 1,
          isactive: false,
          Drug: [],
        },
        {
          id: 4,
          name: "group: 4",
          no_of_drug: 0,
          isactive: false,
          Drug: [],
        },
      ],
      add_rx: (rx:string) =>{
        const rx_create={
          id: 5,
          name: rx,
          no_of_drug: 0,
          isactive: false,
          Drug: [], 
        }
        
        set((state) => ({
          rx: [...state.rx, rx_create],
        }))
      return rx_create?.id 
    },
      add_drug: (d, id) =>
        set((state) => {
          const rxIndex:number= state.rx.findIndex(
            (currentRx) => currentRx.id === id
          );
          if (rxIndex === -1) {
            return state;
          }
          const update = {
            ...state.rx[rxIndex],
            Drug: [...state.rx[rxIndex].Drug, d],
            no_of_drugs: state.rx[rxIndex].no_of_drug + 1,
          };
          return {
            rx: [
              ...state.rx.slice(0, rxIndex),
              update,
              ...state.rx.slice(rxIndex + 1),
            ],
          };
        }),
      active_change: (id) =>
        set((state) => {
         
          const rxIndex = state.rx.findIndex(
            (currentRx) => currentRx.id === id
          );
          if (rxIndex === -1) {
            return state;
          }
          const update = {
            ...state.rx[rxIndex],
            isactive: !state.rx[rxIndex].isactive,
          };
          console.log("timing",update,rxIndex);
          return {
            rx: [
              ...state.rx.slice(0, rxIndex),
              update,
              ...state.rx.slice(rxIndex + 1),
            ],
          };
        }),
        drug_list_selector: (id) => {
          console.log(id)
    
          return useBookStore.getState().rx[id];
        }       ,
      rename: (name, id) =>
        set((state) => {
          console.log("timing")
          const rxIndex = state.rx.findIndex(
            (currentRx) => currentRx.id === id
          );
          if (rxIndex === -1) {
            return state;
          }
          const update = {
            ...state.rx[rxIndex],
            name: name,
          };
          return {
            rx: [
              ...state.rx.slice(0, rxIndex),
              update,
              ...state.rx.slice(rxIndex + 1),
            ],
          };
        }),
    }),
    {
      name: "rx_list",

      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

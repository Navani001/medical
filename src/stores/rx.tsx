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
  nose: string;
}
interface drug_list {
  id: number;
  name: string;
  isactive: boolean;
  drug_type: "tablet" | "sirap";
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
  add_drug: (d: drug_list, id: number) => void;
  rename: (name: string, id: number) => void;
  active_change: (id: number) => void;
  drug_list_selector: (id: number) => any;
  dose_selector: (rx_id: number, dose_id: number) => any;
  dose_changer: (rx_id: number, dose_id: number, update: any) => void;
  time_changer: (rx_id: number, time_id: number, update: any) => void;
  duration_changer: (rx_id: number, time_id: number, update: any) => void;
  time_selector: (rx_id: number, dose_id: number) => any;
  duration_selector: (rx_id: number, dose_id: number) => any;
  delete: (rx_id: number, dose_id: number) => void;
}
export const useBookStore = create(
  persist<entire_Rx_data>(
    (set) => ({
      delete: (rx_id, dose_id) => {
        console.log(useBookStore.getState().rx);
        console.log(
          "dose ",
          useBookStore.getState().rx.map((rx, index) =>
            index === rx_id
              ? {
                  ...rx,
                  Drug: rx.Drug.filter((item) => item.id !== dose_id),
                }
              : rx
          )
        );
        set((state) => ({
          ...state,
          rx: state.rx.map((rx, index) =>
            index === rx_id
              ? {
                  ...rx,
                  
                  Drug: rx.Drug.filter((item) => item.id !== dose_id),
                }
              : rx
          ),
        }));
      },
      time_changer: (time_id, rx_id, update) => {
        console.log(rx_id, time_id);
        const drugIndex = useBookStore
          .getState()
          .rx[rx_id].Drug.findIndex(
            (currentDrug) => currentDrug.id === time_id
          );

        if (drugIndex === -1) {
          return;
        }
        console.log("changer");
        console.log(update);
        const drug = useBookStore.getState().rx[rx_id].Drug[drugIndex];
        set((state) => {
          const updatedRx = [...state.rx];
          updatedRx[rx_id].Drug[drugIndex] = {
            ...drug,
            Time: {
              ...drug.Time,
              time: update.time,
              take_type: update.take_type,
              time_type: update.time_type,
            },
          };
          return { rx: updatedRx };
        });
      },
      duration_changer: (time_id, rx_id, update) => {
        console.log(rx_id, time_id);
        const drugIndex = useBookStore
          .getState()
          .rx[rx_id].Drug.findIndex(
            (currentDrug) => currentDrug.id === time_id
          );

        if (drugIndex === -1) {
          return;
        }
        console.log("in rx changer");
        console.log(update);
        const drug = useBookStore.getState().rx[rx_id].Drug[drugIndex];
        set((state) => {
          const updatedRx = [...state.rx];
          updatedRx[rx_id].Drug[drugIndex] = {
            ...drug,
            Duration: {
              ...drug.Duration,
              days: update.days,
              nose: update.nose,
            },
          };
          return { rx: updatedRx };
        });
      },
      time_selector: (dose_id, rx_id) => {
        return useBookStore
          .getState()
          .rx[rx_id].Drug.filter((item) => item.id == dose_id)[0];
      },

      duration_selector: (dose_id, rx_id) => {
        return useBookStore
          .getState()
          .rx[rx_id].Drug.filter((item) => item.id == dose_id)[0];
      },
      dose_selector: (dose_id, rx_id) => {
        console.log(
          useBookStore
            .getState()
            .rx[rx_id].Drug.filter((item) => item.id == dose_id)[0]
        );
        return useBookStore
          .getState()
          .rx[rx_id].Drug.filter((item) => item.id == dose_id)[0];
      },
      dose_changer: (dose_id, rx_id, update) => {
        const drugIndex = useBookStore
          .getState()
          .rx[rx_id].Drug.findIndex(
            (currentDrug) => currentDrug.id === dose_id
          );
        if (drugIndex === -1) {
          return;
        }
        const drug = useBookStore.getState().rx[rx_id].Drug[drugIndex];
        set((state) => {
          const updatedRx = [...state.rx];
          updatedRx[rx_id].Drug[drugIndex] = {
            ...drug,
            Dose: {
              ...drug.Dose,
              morning_dose: update.morning_dose,
              evening_dose: update.evening_dose,
              afternoon_dose: update.afternoon_dose,
            },
          };
          return { rx: updatedRx };
        });
      },
      rx: [
        {
          id: 1,
          name: "group: 1",
          no_of_drug: 1,
          isactive: false,
          Drug: [
            {
              id: 1,
              drug_name: "taste",
              Duration: {
                id: 1,
                days: 2,
                nose: "Month",
              },
              Time: {
                id: 1,
                time: 1,
                time_type: "daily",
                take_type: 2,
              },
              Dose: {
                id: 1,
                is_morning: true,
                is_afternon: false,
                is_evening: false,
                morning_dose: 1,
                evening_dose: 0,
                afternoon_dose: 0,
              },
            },
          ],
        },
        {
          id: 2,
          name: "group: 2",
          no_of_drug: 0,
          isactive: false,
          Drug: [],
        },
        {
          id: 3,
          name: "group: 6",
          no_of_drug: 0,
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
      add_rx: (rx: string) => {
        const rx_create = {
          id: 4,
          name: rx,
          no_of_drug: 0,
          isactive: false,
          Drug: [],
        };

        set((state) => ({
          rx: [...state.rx, rx_create],
        }));
        return rx_create?.id;
      },
      add_drug: (d, id) => {
        set((state) => ({
          ...state,
          rx: state.rx.map((rx, index) =>
            index === id
              ? {
                  ...rx,
                  Drug: [
                    ...rx.Drug,
                    {
                      id: 8,
                      drug_name: d.name,
                      Duration: {
                        id: 1,
                        days: 2,
                        nose: "Month",
                      },
                      Time: {
                        id: 1,
                        time: 1,
                        time_type: "daily",
                        take_type: 2,
                      },
                      Dose: {
                        id: 1,
                        is_morning: true,
                        is_afternon: false,
                        is_evening: false,
                        morning_dose: 1,
                        evening_dose: 0,
                        afternoon_dose: 0,
                      },
                    },
                  ],
                  no_of_drug: rx.no_of_drug + 1,
                }
              : rx
          ),
        }));
      },
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
          return {
            rx: [
              ...state.rx.slice(0, rxIndex),
              update,
              ...state.rx.slice(rxIndex + 1),
            ],
          };
        }),
      drug_list_selector: (id) => {
        return useBookStore.getState().rx[id];
      },
      rename: (name, id) =>
        set((state) => {
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

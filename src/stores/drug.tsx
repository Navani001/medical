import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
interface drug_list {
  id: number;
  name: string;
  isactive: boolean;
  drug_type: number;
}
interface entire_drug_data {
  drug_list: drug_list[];
  add_drug: () => void;
  drug_backend: () => void;
}
export const drug = create(
  persist<entire_drug_data>(
    (set) => ({
      drug_backend: () => {
        axios.get("http://localhost:5000/drugs/all_drugs")
         .then((res) => {
            console.log(res.data);
        
            set({ drug_list: res.data });
          })
         .catch((err) => console.log(err));
      },
      drug_list: [
        {
          id: 1,
          name: "test 1",
          isactive: true,
          drug_type: 2,
        },
        {
          id: 2,
          name: "test 2",
          isactive: true,
          drug_type: 1,
        },
      ],
      add_drug: () => {
        console.log("hi");
      },
    }),
    {
      name: "drug_list",

      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

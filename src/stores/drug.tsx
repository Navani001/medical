import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface drug_list{
  id: number;
  name: string;
  isactive: boolean;
  drug_type:"tablet" | "sirap"
}
interface entire_drug_data {
  drug_list: drug_list[];
  add_drug: () =>void;
  
}
export const drug = create(
  persist<entire_drug_data>(
    (set) => ({
      drug_list: [
        {
          id: 1,
          name: "test 1",
          isactive: true,
          drug_type:"tablet"
        },
        {
            id: 2,
            name: "test 2",
            isactive: true,
            drug_type:"sirap"
          },
   
      ],
      add_drug: () =>{
        console.log("hi")
    },
   
   
           
    
    }),
    {
      name: "drug_list",

      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

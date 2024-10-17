import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Rxheader from "../component/Rxheader";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BasicTable from "../drug_table/Drug_table";

import { drug } from "../../src/stores/drug.tsx";
import FreeSoloCreateOption from "../component/Autocomplte.tsx";
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
const button = () => {
  const [empty, setempty] = useState(true);
  return (
    <button className="p-2.5 bg-p_green rounded-lg text-white font-medium">
      SAVE
    </button>
  );
};
function Add_drugs() {
  const drug_data = drug((state) => state.drug_list);
  const [selected_search_type, set_selected_search_type] = useState(0);
  const Search = ["All", "Drugs", "Rx Group"];
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-between items-center ">
      {" "}
      <Rxheader heading="Rx Group" button={button} />
      <div className="w-full h-[90%]  flex items-center justify-center">
        <div className="w-[95%] h-[91%] ">
          <div className="w-full h-[7%]  border-2 border-gr rounded-lg flex justify-between">
            <div  className="w-[82%] h-full pl-4 font-[500] focus:outline-0">
              <FreeSoloCreateOption/>
            </div>
            {/* <input
              type="text"
              className="w-[82%] h-full pl-4 font-[500] focus:outline-0"
              placeholder="Search drugs"
            /> */}
            <div className="h-full w-[15%] flex justify-end items-center ">
              <div className="h-[70%] w-full justify-around items-center  flex font-medium">
                {Search.map((item, index) => (
                  <div
                    key={index}
                    onClick={()=>{
                      set_selected_search_type(index);
                    }}
                    className={
                      selected_search_type == index
                        ? "h-full p-1 pr-2 pl-2 text-[#888888] cursor-pointer border-2 rounded-lg flex justify-center bg-p_green text-white"
                        : "h-full p-1 pr-2 pl-2 text-[#888888] cursor-pointer border-2 rounded-lg flex justify-center "
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-full w-[4%] flex justify-center items-center border-l-2 border-gr">
              <SearchOutlinedIcon sx={{ fontSize: "30px" }} />
            </div>
          </div>
          <div className="w-full h-[6%] flex items-center text-[#888888] font-medium">
            Selected Drugs (3)
          </div>
          <div className="w-full h-[87%] "><BasicTable/></div>
        </div>
      </div>
    </div>
  );
}

export default Add_drugs;

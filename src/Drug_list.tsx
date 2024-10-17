import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { useBookStore } from "./stores/rx";
import { convertToTitleCase } from "../src/functions/Title.tsx";
import { useNavigate } from "react-router-dom";
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
function Drug_list({ id }: { id: number }) {
  const navi=useNavigate()
  const selectedDrug = useBookStore((state) => state.drug_list_selector);
  const [fetchedList, setfetchedList] = useState<rx_list | null>(null);
  useEffect(() => {
    setfetchedList(selectedDrug(id));
  
  }, [id]);
  const add_drug=()=>{
  
  navi("/add_drugs", { state: id });
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-[95%] w-[95%] flex flex-col justify-between items-start ">
        <div className="w-full h-[11%] flex justify-start items-center text-xl">
          {convertToTitleCase(fetchedList?.name || "")}
        </div>
        <div className="w-full h-[89%] flex flex-col ">
          <div className="w-full h-[6%] flex items-center text-[#808080] font-medium">
            ADDED DRUGS
          </div>
          <div className="w-full max-h-max flex flex-col items-start border-2 rounded-2xl bg-gr justify-start">
            <ul
              style={{ listStyleType: "disc" }}
              className="list-inside w-full flex flex-col"
            >
              {fetchedList?.Drug.map((drug,index) => (
                <li key={index} className="flex justify-center items-center">
                  <span className="w-[98%] h-28 flex justify-center items-center flex-col">
                    <div className="h-14 w-full flex flex-col justify-center text-[#4D4D4D] font-medium">
                      • {convertToTitleCase(drug.drug_name)}
                    </div>
                    <div className="h-12 w-full flex justify-start ">
                      <div className="w-5/6 h-1/2 flex">
                        <div className="w-full h-full flex">
                          <div className="h-full w-[6%] border-r-1 border-[#888888] flex  text-[#888888] font-medium">
                            {drug.Dose.is_morning ? 1 : 0}-
                            {drug.Dose.is_afternon ? 1 : 0}-
                            {drug.Dose.is_evening ? 1 : 0}
                          </div>
                          <div className="h-full w-[20%]  border-r-1 border-[#888888]  flex justify-center text-[#888888] font-medium">
                            {drug.Time.time} mins -{" "}
                            {drug.Time.take_type == 1
                              ? "After Food"
                              : "Before Food"}
                          </div>
                          <div className="h-full w-[20%]  border-r-1 border-[#888888] flex justify-center text-[#888888] font-medium">
                            {drug.Time.time_type} for {drug.Duration.days}{" "}
                            Day(s)
                          </div>
                          <div className="h-full w-[10%]  border-r-1 border-[#888888] flex justify-center text-[#888888] font-medium">
                            {drug.Duration.nose} Qty
                          </div>
                        </div>
                      </div>
                      <div className="w-1/6 h-full  flex justify-end items-start">
                        <div className="h-full w-[5%] flex justify-end">
                          <DeleteOutlinedIcon sx={{ color: "#F44F5A" }} />
                        </div>
                        <div className="h-full w-[20%] flex justify-end">
                          <ModeOutlinedIcon sx={{ color: "#007965" }} />
                        </div>
                      </div>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
            {fetchedList && fetchedList.Drug.length > 0 && (
              <div className="h-1 w-full border-b border-black border-dashed"></div>
            )}

            <div className="w-full h-14 flex items-center justify-start">
              <div className="h-full w-[5%] flex justify-center items-center" onClick={()=>{
                add_drug()
              }}>
                <AddCircleIcon sx={{ fontsize: "10px", color: "#007965" }} />
              </div>
              <div className="h-full w-[10%] flex justify-start items-center">
                Add Drugs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drug_list;

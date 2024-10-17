import React, { useEffect, useState } from "react";
import Rxheader from "./component/Rxheader";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Switch } from "@mui/material";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import UnstyledSwitchIntroduction from "./switch/switch";
import Rename from "./dialog/rename";
import { useBookStore } from "../src/stores/rx.tsx";
import Drug_list from "./Drug_list.tsx";
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
interface rx_list_element {
  id: number;
  name: string;
  no_of_drug: number;
  isactive: boolean;
  Drug: drug[];
}

const button = () => {
  const [empty, setempty] = useState(true);
  return (
    <div
      className="text-[#F58634] underline text-lg "
      onClick={() => {
        setempty(!empty);
      }}
    >
      {empty ? <div>empty state</div> : <div>filled state</div>}
    </div>
  );
};

function Rxtable() {
  const Navigate = useNavigate();

  const [selected_rx, set_selected_rx] = useState<number>(0);
  const rx_list = useBookStore((state) => state.rx);
  const rename = useBookStore((state) => state.rename);
  const add_r = useBookStore((state) => state.add_rx);

  const active_change = useBookStore((state) => state.active_change);
  const [rename_id, setrename_id] = useState<number>(-1);
  const [show_noti, set_show_notu] = useState<boolean>(false);
  const [show_cre_noti, set_show_cre_notu] = useState<boolean>(false);
  // const [rx_list, set_rx_list] = useState<rx_list_element[]>([]);
  console.log(rx_list);
  const [filteredrx, setfilteredrx] = useState<rx_list_element[]>(rx_list);
  const [filter, setfilter] = useState<string>("");
  const add_rx = (name: string) => {
    const id = add_r(name);
    Navigate("/add_drugs", { state: id });
  };
  const add_drug=()=>{
    Navigate("/add_drugs", { state: selected_rx });
  }
  const handlefilter = async () => {
    console.log(filter);
    const filtered_rx_list: rx_list_element[] = await rx_list.filter((rx) =>
      rx.name.toLowerCase().includes(filter.toLowerCase())
    );
    console.log(filtered_rx_list);

    console.log(filtered_rx_list);
    setfilteredrx(filtered_rx_list);
  };
  const handleSearchFilter = async (e: any) => {
    setfilter(e.target.value);
  };
  // const handleactivechange = (id: number) => {
  //   set_rx_list(
  //     rx_list.map((rx: rx_list_element) => {
  //       if (rx.id === id) {
  //         console.log("hi", id);
  //         return { ...rx, isactive: !rx.isactive };
  //       }
  //       return rx;
  //     })
  //   );
  // };
  useEffect(() => {
    setfilteredrx(rx_list);
  }, [rx_list]);
  useEffect(() => {
    if (filter) {
      handlefilter();
    } else {
      setfilteredrx(rx_list);
    }
  }, [filter, setfilter]);

  return (
    <div className="h-full w-full ">
      <Rxheader heading="Rx Group" button={button} />
      <div className="w-full h-[88%] flex justify-between">
        <div className="h-full w-1/3 border-r-2 border-r-gr flex justify-center items-center">
          <div className="w-11/12 h-[97%]  flex flex-col justify-between">
            <div className="w-full h-[7%] flex justify-between items-center">
              <div className="text-xl">Rx Group</div>
              <div
                onClick={() => {
                  set_show_cre_notu(true);
                }}
              >
                
                <AddCircleOutlineIcon
                  style={{ fontSize: "28px" }}
                  className="text-[#007965]"
                
                ></AddCircleOutlineIcon>
              </div>
            </div>
            <div className="w-full h-[6%] flex justify-center items-center">
              <div className="h-[87%] w-full rounded-md border border-gr flex">
                <div className="h-full w-[9%] flex justify-center items-center">
                  <SearchIcon sx={{ fontSize: "26px" }}></SearchIcon>
                </div>
                <div className="h-full w-[91%] bg-slate-800 flex justify-center items-center">
                  <input
                    type="text"
                    value={filter}
                    onChange={(e) => {
                      handleSearchFilter(e);
                    }}
                    className="h-full w-full text-base font-[500] focus:outline-0 placeholder-[#C5C5C5]"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[86%] overflow-y-scroll scrollbar-width-none">
              {filteredrx.map((rx, index) => (
                <div
                  key={index}
                  className={
                    selected_rx == index
                      ? "w-full h-[12%]  flex justify-between items-center border-b-2 border-gr border-dotted "
                      : "w-full h-[12%]  flex justify-between items-center border-b-2 border-gr border-dotted "
                  }
                  onClick={() => {
                    set_selected_rx(index);
                  }}
                >
                  <div
                    className={
                      selected_rx == index
                        ? "w-full h-5/6 flex justify-between items-center bg-[#E1EDEB] rounded-lg"
                        : "w-full h-5/6 flex justify-between items-center "
                    }
                  >
                    <div className="w-[75%] h-full p-2">
                      <div
                        className={
                          selected_rx == index
                            ? "w-full h-1/2 flex  items-end text-[#007965]"
                            : "w-full h-1/2 flex  items-end text-[#5C6266] font-medium"
                        }
                      >
                        {convertToTitleCase(rx.name)}
                      </div>
                      <div className="w-full h-1/2 flex items-center text-[#808080] font-medium">
                        {rx.no_of_drug} Drugs
                      </div>
                    </div>
                    <div
                      className="h-full w-[10%] flex justify-center items-center"
                      onClick={() => {
                        setrename_id(rx.id);
                        set_show_notu(true);
                      }}
                    >
                      <CalendarViewWeekIcon></CalendarViewWeekIcon>
                    </div>
                    <div className="h-full w-[10%] flex justify-center items-center">
                      <UnstyledSwitchIntroduction
                        checked={rx.isactive}
                        onChange={() => active_change(rx.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-full w-[80%] ">
          <Drug_list id={selected_rx} />
        </div>
      </div>
      {show_noti && (
        <Rename
          header={"Rename RX Group"}
          set_show_notu={set_show_notu}
          rename_id={rename_id}
          func_tobe_exe={rename}
        ></Rename>
      )}
      {show_cre_noti && (
        <Rename
          header={"Create RX Group"}
          set_show_notu={set_show_cre_notu}
          rename_id={rename_id}
          func_tobe_exe={add_rx}
        ></Rename>
      )}
    </div>
  );
}

export default Rxtable;

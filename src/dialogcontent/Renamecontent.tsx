import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
function Renamecontent({
  header,
  set_show_notu,
  rename_id,
  func_tobe_exe,
}: {
  header: string;
  set_show_notu: (value: boolean) => void;
  rename_id: number;
  func_tobe_exe: (name: string, id: number) => void;
}) {
  const [name, setname] = useState<string>("");
  return (
    <div className="h-full w-full flex flex-col items-center justify-between">
      <div className="w-full h-[22%] border-b-2 border-gr flex flex-col justify-center items-center ">
        <div className="h-full w-[90%] flex justify-between items-center">
          <div className="h-full w-5/5 flex justify-start items-center font-[600] text-lg">
            {header}
          </div>
          <div
            className="h-full w-1/5 flex justify-end items-center"
            onClick={() => {
              set_show_notu(false);
            }}
          >
            <ClearIcon />
          </div>
        </div>
      </div>
      <div className="w-full h-[50%] flex justify-center items-center border-b-2 border-gr ">
        <div className="w-[90%] h-5/6 flex flex-col justify-between">
          <div className="w-full h-1/2 flex items-center font-[600] text-lg ">
            Rx Group
          </div>
          <div className="w-full h-1/2 flex items-start ">
            <input
              type="text"
              className="w-full h-5/6 p-2 border-2 rounded-md"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[28%] w-[90%] flex justify-end items-center">
        <button
          className="border-0 bg-[#007965] p-3 text-white rounded-md"
          onClick={() => {
            func_tobe_exe(name, rename_id);
            set_show_notu(false);
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}

export default Renamecontent;

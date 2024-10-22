import React from "react";
import Button from "./Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useBookStore } from "../stores/rx";
function Duration({
  SelectedDrug,
  id,
  trigger,
  setshow_dose
}: {
  SelectedDrug: number;
  id: number;
  trigger: number;
  setshow_dose:(show:boolean)=>void
}) {
  console.log(id);
  const date = [1, 2, 3, 4, 5, 6];

  const [iscustom, setiscustom] = React.useState(false);
  const data_type = ["Day", "Week", "Month"];
  const [quantity, setquantity] = React.useState(8);
  const duration_selector = useBookStore((state) => state.duration_selector);
  const duration_changer = useBookStore((state) => state.duration_changer);

  const duration = duration_selector(SelectedDrug, id).Duration;
  console.log("duration", duration);
  const [initial_state, setTime] = React.useState(duration);
  const handleInputChange = (field: string, value: number | string) => {
    setTime((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  React.useEffect(() => {
    if (trigger == 1) {
      console.log("changed");
      console.log(initial_state);
      duration_changer(SelectedDrug, id, initial_state);
   
      
    }
    console.log("trigger");
  }, [trigger]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-[90%] w-[90%]  flex flex-col">
        <div className="w-full h-4/6 flex flex-col justify-center items-center">
          <div className="w-full h-[30%]  font-bold text-xl">Durations</div>
          <div className="w-full h-[30%] flex ">
            <div className="h-[90%] w-[55%] flex gap-3 border-r-2 border-gr ">
              {date.map((item) => {
                return (
                  <div
                    onClick={() => {
                      handleInputChange("days", item);
                    }}
                  >
                    <Button
                      select={initial_state.days == item ? 0 : 1}
                      text={item.toString()}
                      style=" w-9 flex justify-center items-center "
                    />
                  </div>
                );
              })}
            </div>
            <div className="h-[90%] w-[45%] flex gap-3 justify-center ">
              {data_type.map((item) => {
                return (
                  <div
                    onClick={() => {
                      handleInputChange("nose", item);
                    }}
                  >
                    <Button
                      select={initial_state.nose == item ? 0 : 1}
                      text={item}
                      style=" flex justify-center items-center "
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full h-[30%] ">
            <div className="h-full w-full flex justify-start items-center gap-2">
              <div
                onClick={() => {
                  setiscustom(!iscustom);
                }}
              >
                <Button
                  select={iscustom ? 0 : 1}
                  text={"Custom"}
                  style="  text-sm "
                />
              </div>
              <div className="h-10 w-[25%] border-2 border-gr rounded-lg flex">
                <div
                  className="h-full w-[25%] border-r-2 border-gr flex justify-center items-center text-[#666666]"
                  onClick={() => {
                    setquantity(quantity - 1);
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </div>
                <div className="h-full w-[50%] border-gr flex justify-center items-center text-[#666666]">
                  {quantity}
                </div>
                <div
                  className="h-full w-[25%] border-l-2 border-gr flex justify-center items-center text-[#666666]"
                  onClick={() => {
                    setquantity(quantity + 1);
                  }}
                >
                  <ControlPointIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-2/6 flex flex-col justify-center items-center ">
          <div className="w-full h-1/2 flex justify-start items-center font-bold text-xl">
            Qty
          </div>
          <div className="w-full h-1/2 flex justify-start items-center">
            <div className="h-full w-1/6 border-2 flex border-gr rounded-xl bg-gr">
              <div className="h-full w-1/2 flex justify-center items-center">
                {iscustom
                  ? quantity
                  : initial_state.days *
                    (initial_state.nose == "Week"
                      ? 7
                      : initial_state.nose == "Month"
                      ? 30
                      : 1)}
              </div>
              <div className="h-full w-1/2 flex justify-center items-center text-[#666666]">
                nos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Duration;

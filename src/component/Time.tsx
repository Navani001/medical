import React from "react";
import Button from "./Button";
import { useBookStore } from "../stores/rx";

function Time({
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
  console.log(SelectedDrug, id);
  const time_selector = useBookStore((state) => state.time_selector);
  const time_changer = useBookStore((state) => state.time_changer);


  const time = time_selector(SelectedDrug, id).Time;
  
  const [initial_state, setTime] = React.useState(time);
  // console.log(time);
  const handleInputChange = (field: string, value: number |string) => {
    setTime((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  React.useEffect(()=>{
    console.log(initial_state)
  
  },[handleInputChange])
  React.useEffect(() => {
    if (trigger == 1) {
      console.log("changed");
      time_changer(SelectedDrug,id,initial_state)
    

    }
    console.log("trigger")
  }, [trigger]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-[90%] w-[90%]  flex flex-col">
        <div className="w-full h-[33%] flex flex-col justify-center items-center">
          <div className="w-full h-1/6 flex justify-start items-center font-bold">
            Time
          </div>
          <div className="w-full h-5/6 flex justify-start items-center gap-2 overflow-auto scrollbar-width-none">
            <div
              onClick={() => {
                handleInputChange("time", -1);
              }}
            >
              <Button
                select={initial_state?.time != -1 ? 1 : 0}
                text={"Immediately"}
                style=""
              />
            </div>
            <div
              onClick={() => {
                handleInputChange("time", 5);
              }}
            >
              <Button
                select={initial_state?.time != 5 ? 1 : 0}
                text={"5mins"}
                style=""
              />
            </div>
            <div
              onClick={() => {
                handleInputChange("time", 10);
              }}
            >
              <Button
                select={initial_state?.time != 10 ? 1 : 0}
                text={"10mins"}
                style=""
              />
            </div>

            <div
              onClick={() => {
                handleInputChange("time", 15);
              }}
            >
              <Button
                select={initial_state?.time != 15 ? 1 : 0}
                text={"15mins"}
                style=""
              />
            </div>
            <div
              onClick={() => {
                handleInputChange("time", 20);
              }}
            >
              <Button
                select={initial_state?.time != 20 ? 1 : 0}
                text={"20mins"}
                style=""
              />
            </div>
            <div
              onClick={() => {
                handleInputChange("time", 25);
              }}
            >
              <Button
                select={initial_state?.time != 25 ? 1 : 0}
                text={"25mins"}
                style=""
              />
            </div>
            <div
              onClick={() => {
                handleInputChange("time", 30);
              }}
            >
              <Button
                select={initial_state?.time != 30 ? 1 : 0}
                text={"30mins"}
                style=""
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[33%] flex flex-col justify-center items-center ">
          <div className="w-full h-1/6 flex justify-start items-center font-bold">
            When
          </div>
          <div className="w-full h-5/6 flex justify-start items-center gap-2">
            <div
              onClick={() => {
                handleInputChange("take_type", 1);
              }}
            >
              <Button
                select={initial_state?.take_type != 1 ? 1 : 0}
                text={"BeforeFood"}
                style=""
              />
            </div>
            <div
              onClick={() => {
                handleInputChange("take_type", 2);
              }}
            >
              <Button
                select={initial_state?.take_type != 2 ? 1 : 0}
                text={"AfterFood"}
                style=""
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[33%] flex flex-col justify-center items-center">
          <div className="w-full h-1/6 flex justify-start items-center font-bold">
            Frequency
          </div>
          <div className="w-full h-5/6 flex justify-start items-center gap-2">
            <div  onClick={()=>{
              handleInputChange("time_type","daily")
            }}>
              {" "}
              <Button
                select={initial_state?.time_type != "daily" ? 1 : 0}
                text={"Daily"}
                style=""
              />
            </div>
            <div  onClick={()=>{
              handleInputChange("time_type","alter")
            }}>
              {" "}
              <Button
                select={initial_state?.time_type != "alter" ? 1 : 0}
                text={"AlternateDay"}
                style=""
              />
            </div>

            <div  onClick={()=>{
              handleInputChange("time_type","week")
            }}>
              <Button
                select={initial_state?.time_type != "week" ? 1 : 0}
                text={"Weekly"}
                style=""
              />
            </div>
            <div  onClick={()=>{
              handleInputChange("time_type","month")
            }}>
              <Button
                select={initial_state?.time_type != "month" ? 1 : 0}
                text={"Monthly"}
                style=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Time;

import React, { useEffect } from "react";
import { useBookStore } from "../stores/rx";

function Dose({
  SelectedDrug,
  id,
  trigger,
  setshow_dose,
}: {
  SelectedDrug: number;
  id: number;
  trigger: number;
  setshow_dose: (show: boolean) => void;
}) {
  const header = ["Morning", "Evening", "Afternoon"];
  const Dose = {
    id: 1,
    is_morning: true,
    is_afternon: false,
    is_evening: false,
    morning_dose: 1,
    evening_dose: 0,
    afternoon_dose: 0,
  };

  const dose_selector = useBookStore((state) => state.dose_selector);
  const dose_changer = useBookStore((state) => state.dose_changer);

  const dose = dose_selector(SelectedDrug, id);

  const [initial_dose, setDose] = React.useState({
    morning_dose: dose?.Dose?.morning_dose || 0,
    afternoon_dose: dose?.Dose?.afternoon_dose || 0,
    evening_dose: dose?.Dose?.evening_dose || 0,
  });
  const handleInputChange = (field: string, value: number) => {
    setDose((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (trigger == 0) {
      dose_changer(SelectedDrug, id, initial_dose);
      console.log("changed");
   
    }
  }, [trigger]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-3/6 flex justify-start items-center ">
        <div className="h-full w-2/6 flex flex-col items-center justify-start border-r-2">
          <div className="w-full h-2/6 flex items-center justify-center font-bold">
            Morning
          </div>
          <div className="w-full h-4/6 flex items-center justify-evenly">
            <div className="w-1/2 h-4/6 flex items-center justify-between ">
              <input
                type="text"
                className="h-full w-8 flex justify-center items-center text-center pl-1 border-2 border-gr rounded-lg font-medium"
                value={0}
              />
              <input
                type="text"
                className="h-full w-8 flex justify-center items-center text-center pl-1 border-2 border-gr rounded-lg font-medium "
                value={initial_dose.morning_dose}
                onChange={(e) => {
                  handleInputChange("morning_dose", Number(e.target.value));
                }}
              />
            </div>{" "}
          </div>
        </div>
        <div className="h-full w-2/6 flex flex-col items-center justify-start border-r-2">
          <div className="w-full h-2/6 flex items-center justify-center font-bold">
            AfterNoon
          </div>
          <div className="w-full h-4/6 flex items-center justify-evenly">
            <div className="w-1/2 h-4/6 flex items-center justify-between ">
              <input
                type="text"
                className="h-full w-8 flex justify-center items-center text-center pl-1 border-2 border-gr rounded-lg font-medium"
                value={0}
              />
              <input
                type="text"
                className="h-full w-8 flex justify-center items-center text-center pl-1 border-2 border-gr rounded-lg font-medium "
                value={initial_dose.afternoon_dose}
                onChange={(e) => {
                  handleInputChange("afternoon_dose", Number(e.target.value));
                }}
              />
            </div>{" "}
          </div>
        </div>
        <div className="h-full w-2/6 flex flex-col items-center justify-start border-r-2">
          <div className="w-full h-2/6 flex items-center justify-center font-bold">
            Evening
          </div>
          <div className="w-full h-4/6 flex items-center justify-evenly">
            <div className="w-1/2 h-4/6 flex items-center justify-between ">
              <input
                type="text"
                className="h-full w-8 flex justify-center items-center text-center pl-1 border-2 border-gr rounded-lg font-medium"
                value={0}
              />
              <input
                type="text"
                className="h-full w-8 flex justify-center items-center text-center pl-1 border-2 border-gr rounded-lg font-medium "
                value={initial_dose.evening_dose}
                onChange={(e) => {
                  console.log(e.target.value);
                  handleInputChange("evening_dose", Number(e.target.value));
                }}
              />
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dose;

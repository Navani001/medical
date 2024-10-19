import * as React from "react";
import "./drug_table.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useBookStore } from "../stores/rx.tsx"; // Assuming the correct path
import { convertToTitleCase } from "../functions/Title.tsx";
import no_data from "../assets/Group 5623.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import Update from "../dialog/update.tsx";
// Define interfaces for the data structure
interface Dose {
  id: number;
  is_morning: boolean;
  is_afternon: boolean;
  is_evening: boolean;
  morning_dose: number;
  evening_dose: number;
  afternoon_dose: number;
}

interface Time {
  id: number;
  time: number;
  time_type: "daily" | "one day off";
  take_type: number;
}

interface Duration {
  id: number;
  days: number;
  nose: number;
}

interface Drug {
  id: number;
  drug_name: string;
  Duration: Duration;
  Time: Time;
  Dose: Dose;
}


// Column helper for table configuration
const columnHelper = createColumnHelper<Drug>();



export default function BasicTable({ id }: { id: number }) {
  const rx_selector = useBookStore((state) => state.drug_list_selector);
  const rerender = useBookStore((state) => state.rx);
  const [show_dose,setshow_dose]=React.useState<Boolean>(false)
  const [show_t,setshow_t]=React.useState<Boolean>(false)

  const [show_duration,setshow_duration]=React.useState<Boolean>(false)

  const [data, _setData] = React.useState<Drug[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const drugList = await rx_selector(id); // Replace with actual Rx ID

        if (drugList?.Drug) {
          _setData(drugList.Drug);
        }
      } catch (error) {
        console.error("Error fetching drug list:", error);
      }
    };

    fetchData();
  }, [rx_selector, rerender]);
  const columns = [
    columnHelper.accessor("drug_name", {
      id: "drug_name",
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
      header: () => <span className="w-20 font-bold text-sm">Drug Name</span>,
    }),
    columnHelper.accessor("Dose", {
      header: () => <span className="w-28 font-medium text-sm">Dose</span>,
      cell: (info) => {
        const dose = info.getValue() as Dose;
        return (
          <div className="text-[#4D4D4D] flex font-medium text-base">
            {dose.is_morning ? <span>1</span> : <span>0</span>}-
            {dose.is_afternon ? <span>1</span> : <span>0</span>}-
            {dose.is_evening ? <span>1</span> : <span>0</span>}{" "}
            <span className="flex justify-center w-8 items-center pr-3 text-p_green" onClick={()=>{
              setshow_dose(true)
            }}>
              <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("Time", {
      header: () => (
        <span className="w-20 font-bold text-sm">Time, Frequency & When</span>
      ),
      cell: (info) => {
        const time = info.getValue() as Time;
        return (
          <div className="text-base">
            <span className="text-[#4D4D4D] flex font-medium">
              {time.time} min, {convertToTitleCase(time.time_type)},
              {convertToTitleCase(time.take_type ? "before" : "after")} Food{" "}
              <span className="flex justify-center w-8 items-center pr-3 text-p_green"  onClick={()=>{
              setshow_t(true)
            }}>
                <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
              </span>
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("Duration", {
      header: () => <span className="w-28 font-bold text-sm">Duration & Quantity</span>,
      cell: (info) => {
        const duration = info.getValue() as Duration;
        return (
          <div className="flex text-base">
            <span className="text-[#4D4D4D] font-medium">
              {duration.days} days, {duration.nose} nos
            </span>{" "}
            <span className="flex justify-center w-8 items-center pr-3 text-p_green"  onClick={()=>{
              setshow_duration(true)
            }}> 
              <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("id", {
      header: () => <span></span>,
      cell: () => {
        return (
          <div className="flex text-lg">
            <span className="flex justify-center items-center p-2  rounded-full text-[#F44F5A] bg-[#FEEDEE] ">
              <DeleteIcon sx={{ fontSize: "20px" }} />
            </span>
          </div>
        );
      },
    }),
  ];
  // Table instance using useReactTable
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full w-full">
      {data.length === 0 ? (
        <div className="h-[40%] w-full flex flex-col justify-center items-center ">
          <img src={no_data}></img>
          <div className="p-4">NO Drug Data Found</div>
        </div>
      ) : (
        <table className="my-auto w-full">
          <thead className="bg-gr">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-gray-800 uppercase">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 pr-2 py-3 font-medium text-left"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="table-row">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 pr-2 py-5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {
        show_dose && <Update set_show_notu={setshow_dose} header="Dose" h={"320px"}/>
      }
      {
        show_t && <Update set_show_notu={setshow_t} header="Time, Frequency & When" h={"500px"}/>
      }
      {
        show_duration && <Update set_show_notu={setshow_duration} header="Duration & Qty" h={"270px"}/>
      }
    </div>
  );
}

import * as React from 'react';
import './drug_table.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useBookStore } from '../stores/rx.tsx'; // Assuming the correct path
import { convertToTitleCase } from '../functions/Title.tsx';

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
  time_type: 'daily' | 'one day off';
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

interface RxList {
  id: number;
  name: string;
  isactive: boolean;
  no_of_drug: number;
  Drug: Drug[];
}

// Column helper for table configuration
const columnHelper = createColumnHelper<Drug>();

const columns = [
  columnHelper.accessor('drug_name', {
    id: 'drug_name',
    cell: info => <span className="font-bold">{info.getValue()}</span>,
    header: () => <span className="w-20">Drug Name</span>,
  }),
  columnHelper.accessor('Dose', {
    header: () => 'Dose',
    cell: info => {
      const dose = info.getValue() as Dose;
      return (
        <div className='text-[#4D4D4D]'>
          {dose.is_morning ? <span>1</span>:<span>0</span>}-
          {dose.is_afternon? <span>1</span>:<span>0</span>}-
          {dose.is_evening ? <span>1</span>:<span>0</span>}
        </div>
      );
    },
  }),
  columnHelper.accessor('Time', {
    header: () => <span className="w-20">Time, Frequency & When</span>,
    cell: info => {
      const time = info.getValue() as Time;
      return (
        <div>
          <span className='text-[#4D4D4D]'>{time.time} min, {convertToTitleCase(time.time_type)},{time.take_type?"before":"after"}</span>
        
          
        </div>
      );
    },
  }),
  columnHelper.accessor('Duration', {
    header: () => <span className="w-28">Duration & Quantity</span>,
    cell: info => {
      const duration = info.getValue() as Duration;
      return (
        <div>
          <span className='text-[#4D4D4D]'>{duration.days} days, {duration.nose} nos</span>
       
        </div>
      );
    },
  }),
];

export default function BasicTable({id}:{id:number}) {
  const rx_selector = useBookStore((state) => state.drug_list_selector);
  const rerender=useBookStore((state)=>state.rx)

  const [data, _setData] = React.useState<Drug[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const drugList = await rx_selector(id); // Replace with actual Rx ID
    
        if (drugList?.Drug) {
          _setData(drugList.Drug);
        }
      } catch (error) {
        console.error('Error fetching drug list:', error);
      }
    };

    fetchData();
  }, [rx_selector,rerender]);

  // Table instance using useReactTable
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {data.length === 0 ? (
        <p>No data available</p>
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
    </div>
  );
}

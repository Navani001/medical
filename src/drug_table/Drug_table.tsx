import * as React from 'react'
import ReactDOM from 'react-dom/client'
import "./drug_table.css"


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
Drug_name: string
Dose: string
  Time: number
  Duration: number
 
}

const defaultData: Person[] = [
  {
    Drug_name: 'tanner',
    Dose: 'linsley',
    Time: 24,
    Duration: 100,
   
  },
  {
    Drug_name: 'tandy',
    Dose: 'miller',
    Time: 40,
    Duration: 40,
   
  },

]

const columnHelper = createColumnHelper<Person>()

const columns = [

  columnHelper.accessor(row => row.Drug_name, {
    id: 'Drug_name',
    cell: info => <span className='font-bold'>{info.getValue()}</span>,
    header: () => <span className='w-20'>Drug name</span>,
    
  }),
  columnHelper.accessor('Dose', {
    header: () => 'Dose',
    cell: info => info.renderValue(),
  
  }),
  columnHelper.accessor('Time', {
    header: () => <span className='w-20'>Time, Frequency & When</span>,
  }),
  columnHelper.accessor('Duration', {
    header: () => <span className='w-28'>Duration & Quantity</span>,
  }),

]

export default function BasicTable() {
 
  const [data, _setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (

      <table className="my-auto w-full">
      
        <thead className='bg-gr'>
       
          {table.getHeaderGroups().map(headerGroup => (
           
            <tr
              key={headerGroup.id}
              className="  text-gray-800 uppercase">
        
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 pr-2 py-3 font-medium text-left ">
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
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="table-row bg-gr border-2 border-spacing-5 border-black">
              
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='px-4 pr-2 py-5 font-medium text-left '>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    
  )
}


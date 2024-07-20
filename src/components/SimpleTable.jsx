import React, { useState } from "react";
import data from "../data/data.json";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";

export const SimpleTable = () => {
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    /* esat de aqui abajo es para convertir 2 columnas en 1  */
    {
      header: "Nombres y Apellidos",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    },
    /*  {
      header: "Nombre",
      accessorKey: "first_name",
    },
    {
      header: "Apellido",
      accessorKey: "last_name",
    }, */
    {
      header: "Correo",
      accessorKey: "email",
    },
    {
      header: "Imagen",
      accessorKey: "image",
    },
    {
      header: "Direccion Ip",
      accessorKey: "ip_address",
    },
  ];
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    /*aqui abajo para la paginacion importar y arriba tambien */
    getPaginationRowModel: getPaginationRowModel(),
    /*aqui abajo para ordenar importar y arriba tambien */
    getSortedRowModel: getSortedRowModel(),
    /*aqui abajo para buscar importar y arriba tambien */
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      globalFilter:filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <div className="flex justify-end ">  
        <input type="text" className="px-3 py-2 bg-blue-50 rounded-md outline-none" value={filtering} onChange={(e)=> setFiltering(e.target.value)} placeholder="Search..." />
      </div>
      <table className="w-[1280px] mt-3">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="bg-slate-800 text-gray-300 py-4 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "⬆️", desc: "⬇️" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-blue-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center p-4 border ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext()) ||
                    "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-4 mt-2">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-letra px-4 py-2 rounded-md transition-colors duration-300"
          onClick={() => table.setPageIndex(0)}
        >
          Primera Pagina
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-letra px-4 py-2 rounded-md transition-colors duration-300"
          onClick={() => table.previousPage()}
        >
          Pagina Anterior
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-letra px-4 py-2 rounded-md transition-colors duration-300"
          onClick={() => table.nextPage()}
        >
          Pagina Siguiente
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-letra px-4 py-2 rounded-md transition-colors duration-300"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Ultima Pagina
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BiTrash } from 'react-icons/bi';
import { useTheme } from 'next-themes';


interface SimpleTableProps {
  data: Record<string, any>[];
  height?: string;
  width?: string;
  editableColumns?: string[];
  onCellEdit?: (rowIndex: number, column: string, value: any) => void;
  onDelete?: (rowIndex: number) => void;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ data, editableColumns = [], onCellEdit, onDelete, height, width }) => {
  const columnsSet = new Set<string>();
  data.forEach(row => {
    Object.keys(row).forEach(key => columnsSet.add(key));
  });
  const columns = Array.from(columnsSet);

  const [editingCell, setEditingCell] = useState<{ row: number; column: string } | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const theme = useTheme();

  const handleEditClick = (rowIndex: number, column: string) => {
    if (editableColumns.includes(column)) {
      setInputValue(data[rowIndex][column]);
      setEditingCell({ row: rowIndex, column });
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, column: string) => {
    const updatedValue = e.target.value;
    setInputValue(updatedValue);

    if (onCellEdit) {
      onCellEdit(rowIndex, column, updatedValue);
    }
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditingCell(null);
    }
  };

  return (
    <div className="text-sm rounded-md" >
      <ScrollArea style={{ height: height ? height : '42vh', width: width ? width : '100%' }} className="will-change-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead className="w-auto min-w-30" key={column}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    className="h-0 capitalize text-left w-max"
                    key={column}
                    onClick={() => handleEditClick(rowIndex, column)}
                  >
                    {editingCell?.row === rowIndex && editingCell.column === column ? (
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleValueChange(e, rowIndex, column)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="w-full bg-transparent border-b border-gray-400 focus:outline-none"
                      />
                    ) : (
                      typeof row[column] === 'string' && row[column].startsWith('http') ? (
                        <img style={{ borderRadius: '3px' }} src={row[column]} alt={column} width={70} />
                      ) : (
                        row[column] !== null ? row[column] : '-'
                      )
                    )}
                  </TableCell>
                ))}
                {onDelete && (
                  <TableCell>
                    <button
                      type='button'
                      style={{ background: '#7f1d1d', borderRadius: '4px' }}
                      className='h-8 w-8 items-center flex justify-center hover:opacity-75'
                      onClick={() => onDelete(rowIndex)}
                    >
                      <BiTrash size={18} />
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          {data.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell className="text-zinc-400" colSpan={columns.length}>
                  Total de Itens: {data.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

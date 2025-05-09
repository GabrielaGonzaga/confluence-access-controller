"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  // {
  //   accessorKey: "account_id",
  //   header: "Id",
  // },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "last_active",
    header: "Ùltima ",
  },
  {
    accessorKey: "account_status",
    header: "Status Conta",
  },
]

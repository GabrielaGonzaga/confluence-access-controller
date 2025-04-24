"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "accountId",
    header: "Id",
  },
  {
    accessorKey: "publicName",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isGuest",
    header: "Convidado",
  },
  {
    accessorKey: "accountStatus",
    header: "Status Conta",
  },
]

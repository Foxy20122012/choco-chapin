import { CuentasBancarias as CuentasBancariasPrisma } from "@prisma/client";

export type CuentasBancarias = CuentasBancariasPrisma; // Exporta el tipo CuentasBancarias

export type Row = {
  id: number;
  nombre: string;
  numero_cuenta: string;
  banco: string;
  saldo_actual: number;
  retiros: string;
  depositos: string;
};

export const transformCuentasBancariasToRows = (cuentasBancarias: CuentasBancarias[]): Row[] => {
    // @ts-ignore
  return cuentasBancarias.map((cuenta) => ({
    id: cuenta.id,
    nombre: cuenta.nombre || "", // Proporciona un valor predeterminado en caso de ser null
    numero_cuenta: cuenta.numero_cuenta || "",
    banco: cuenta.banco || "",
    saldo_actual: cuenta.saldo_actual || 0, // Valor predeterminado en caso de ser null
    retiros: cuenta.retiros || "",
    depositos: cuenta.depositos || "",
  }));
};

export type CuentasBancariasModel = keyof Row;

export const cuentasBancariasColumns: Record<CuentasBancariasModel, string> = {
  id: "ID",
  nombre: "Nombre",
  numero_cuenta: "Número de Cuenta",
  banco: "Banco",
  saldo_actual: "Saldo Actual",
  retiros: "Retiros",
  depositos: "Depósitos",
};

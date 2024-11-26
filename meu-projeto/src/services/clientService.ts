import { fetchClientes, cadastrarCliente, atualizarCliente, deletarCliente } from "./api";

export const ClientService = {
  fetchAll: fetchClientes,
  create: cadastrarCliente,
  update: atualizarCliente,
  delete: deletarCliente,
};

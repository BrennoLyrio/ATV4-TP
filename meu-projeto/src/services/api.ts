const API_BASE_URL = "http://localhost:32831/cliente";

export const fetchClientes = async () => {
  const response = await fetch(`${API_BASE_URL}/clientes`);
  return response.json();
};

export const cadastrarCliente = async (cliente: any) => {
  const response = await fetch(`${API_BASE_URL}/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  return response;
};

export const atualizarCliente = async (id: number, cliente: any) => {
  const response = await fetch(`${API_BASE_URL}/atualizar`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...cliente }),
  });
  return response;
};

export const deletarCliente = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/excluir`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return response;
};

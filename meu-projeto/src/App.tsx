import React, { useState, useEffect } from "react";
import { ClientService } from "./services/clientService";

import CadastrarCliente from "./componentes/CadastrarCliente";
import EditarCliente from "./componentes/EditarCliente";
import ListaClientes from "./componentes/ListaClientes";
import { Cliente } from "./componentes/ListaClientes";

const App: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editingClienteId, setEditingClienteId] = useState<number | null>(null);

  const fetchClientes = async () => {
    try {
      const data = await ClientService.fetchAll();
      setClientes(data || []); // Inicializa como uma lista vazia se não houver dados
    } catch (error) {
      alert("Erro ao buscar clientes.");
      setClientes([]); // Define lista vazia no caso de erro
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEdit = (id: number) => {
    setEditingClienteId(id); // Define o cliente em edição
  };

  const handleCancelEdit = () => {
    setEditingClienteId(null); // Cancela a edição
  };

  return (
    <div>
      <h1>Gerenciamento de Clientes</h1>
      {editingClienteId !== null ? (
        <EditarCliente
          clienteId={editingClienteId}
          onClose={handleCancelEdit}
          fetchClientes={fetchClientes}
        />
      ) : (
        <>
          <ListaClientes
            tema="#f5f5f5"
            clientes={clientes}
            fetchClientes={fetchClientes}
            onEdit={handleEdit}
          />
          <CadastrarCliente tema="#f5f5f5" fetchClientes={fetchClientes} />
        </>
      )}
    </div>
  );
};

export default App;

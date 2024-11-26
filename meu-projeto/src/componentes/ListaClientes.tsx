import React, { Component } from "react";
import { ClientService } from "../services/clientService";

export type Cliente = {
  id: number;
  nome: string;
  nomeSocial: string;
  email: string;
  endereco: {
    rua: string;
    numero: string;
    cidade: string;
    estado: string;
  };
  telefones: { ddd: string; numero: string }[];
};

type ListaClientesProps = {
  tema: string;
  clientes: Cliente[];
  fetchClientes: () => void;
  onEdit: (id: number) => void;
};

type ListaClientesState = {
  clienteSelecionado: number | null;
};

export default class ListaClientes extends Component<ListaClientesProps, ListaClientesState> {
  constructor(props: ListaClientesProps) {
    super(props);
    this.state = {
      clienteSelecionado: null,
    };
  }

  toggleDropdown = (index: number) => {
    this.setState((prevState) => ({
      clienteSelecionado: prevState.clienteSelecionado === index ? null : index,
    }));
  };

  handleDeleteCliente = async (id: number) => {
    if (window.confirm("Deseja realmente excluir este cliente?")) {
      try {
        await ClientService.delete(id);
        this.props.fetchClientes(); // Atualiza a lista após exclusão
      } catch (error) {
        alert("Erro ao excluir cliente.");
        console.error(error);
      }
    }
  };

  render() {
    const { tema, clientes, onEdit } = this.props;
    const { clienteSelecionado } = this.state;

    if (!clientes || clientes.length === 0) {
      return <div className="alert alert-info">Nenhum cliente encontrado.</div>;
    }

    return (
      <div className="container mt-3">
        <h1 className="mb-4" style={{ backgroundColor: tema, padding: "10px", borderRadius: "5px" }}>
          Lista de Clientes
        </h1>
        {clientes.length === 0 ? (
          <div className="alert alert-info">Nenhum cliente encontrado.</div>
        ) : (
          <div className="accordion" id="listaClientes">
            {clientes.map((cliente, index) => (
              <div className="accordion-item" key={cliente.id}>
                <h2 className="accordion-header">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <button
                      className={`accordion-button ${clienteSelecionado === index ? "" : "collapsed"}`}
                      type="button"
                      onClick={() => this.toggleDropdown(index)}
                      style={{ background: tema }}
                    >
                      {cliente.nome}
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton-${index}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Ações
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => onEdit(cliente.id)} // Chama a função de edição
                          >
                            Editar
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => this.handleDeleteCliente(cliente.id)}
                          >
                            Excluir
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </h2>
                <div
                  className={`accordion-collapse collapse ${clienteSelecionado === index ? "show" : ""}`}
                  data-bs-parent="#listaClientes"
                >
                  <div className="accordion-body">
                    <p>
                      <strong>Nome:</strong> {cliente.nome}
                    </p>
                    {cliente.nomeSocial && (
                      <p>
                        <strong>Nome Social:</strong> {cliente.nomeSocial}
                      </p>
                    )}
                    <p>
                      <strong>E-mail:</strong> {cliente.email || "Não informado"}
                    </p>
                    <p>
                      <strong>Endereço:</strong> {cliente.endereco.rua}, {cliente.endereco.numero} -{" "}
                      {cliente.endereco.cidade}/{cliente.endereco.estado}
                    </p>
                    <p>
                      <strong>Telefones:</strong>{" "}
                      {cliente.telefones
                        .map((tel: { ddd: string; numero: string }) => `(${tel.ddd}) ${tel.numero}`)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}



import React, { Component } from "react";
import { ClientService } from "../services/clientService";

type Props = {
  clienteId: number;
  onClose: () => void;
  fetchClientes: () => void; // Atualiza a lista após edição
};

type State = {
  cliente: any | null;
  error: string | null;
  isSubmitting: boolean;
};

export default class EditarCliente extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cliente: null,
      error: null,
      isSubmitting: false,
    };
  }

  componentDidMount() {
    this.fetchCliente();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.clienteId !== this.props.clienteId) {
      this.fetchCliente();
    }
  }

  fetchCliente = async () => {
    const { clienteId } = this.props;
    try {
      const allClientes = await ClientService.fetchAll();
      const clienteData = allClientes.find((c: any) => c.id === clienteId);
      this.setState({ cliente: clienteData || null });
    } catch (error) {
      this.setState({ error: "Erro ao carregar cliente." });
    }
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { clienteId, fetchClientes, onClose } = this.props;
    const { cliente } = this.state;

    // Validação dos campos obrigatórios
    if (!cliente || !cliente.nome || !cliente.endereco.rua || !cliente.endereco.numero) {
      this.setState({ error: "Por favor, preencha os campos obrigatórios: Nome, Rua e Número." });
      return;
    }

    this.setState({ isSubmitting: true, error: null }); // Limpa erros anteriores

    try {
      // Loga o payload enviado ao servidor
      console.log("Payload enviado ao servidor:", cliente);

      await ClientService.update(clienteId, cliente); // Faz a requisição de atualização
      alert("Cliente atualizado com sucesso!");
      fetchClientes(); // Atualiza a lista
      onClose(); // Fecha o formulário de edição e redireciona para a lista
    } catch (error) {
      console.error("Erro na atualização do cliente:", error);
      this.setState({ error: "Erro ao atualizar cliente. Por favor, tente novamente." });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  handleTelefoneChange = (index: number, field: string, value: string) => {
    const { cliente } = this.state;
    const telefones = [...cliente.telefones];
    telefones[index] = { ...telefones[index], [field]: value };
    this.setState({ cliente: { ...cliente, telefones } });
  };

  render() {
    const { onClose } = this.props;
    const { cliente, error, isSubmitting } = this.state;

    if (!cliente) {
      return <p>Carregando cliente...</p>;
    }

    return (
      <div className="editar-cliente-container">
        <h2 className="editar-cliente-titulo">Editar Cliente</h2>
        <form className="editar-cliente-form" onSubmit={this.handleSubmit}>
          {/* Exibe erro, se existir */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Nome */}
          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              value={cliente.nome}
              onChange={(e) => this.setState({ cliente: { ...cliente, nome: e.target.value } })}
            />
          </div>

          {/* Nome Social */}
          <div className="form-group">
            <label>Nome Social</label>
            <input
              type="text"
              value={cliente.nomeSocial || ""}
              onChange={(e) => this.setState({ cliente: { ...cliente, nomeSocial: e.target.value } })}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={cliente.email || ""}
              onChange={(e) => this.setState({ cliente: { ...cliente, email: e.target.value } })}
            />
          </div>

          {/* Endereço */}
          <h3>Endereço</h3>
          <div className="form-group">
            <label>Estado</label>
            <input
              type="text"
              value={cliente.endereco.estado || ""}
              onChange={(e) =>
                this.setState({
                  cliente: { ...cliente, endereco: { ...cliente.endereco, estado: e.target.value } },
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Cidade</label>
            <input
              type="text"
              value={cliente.endereco.cidade || ""}
              onChange={(e) =>
                this.setState({
                  cliente: { ...cliente, endereco: { ...cliente.endereco, cidade: e.target.value } },
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Bairro</label>
            <input
              type="text"
              value={cliente.endereco.bairro || ""}
              onChange={(e) =>
                this.setState({
                  cliente: { ...cliente, endereco: { ...cliente.endereco, bairro: e.target.value } },
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Rua *</label>
            <input
              type="text"
              value={cliente.endereco.rua || ""}
              onChange={(e) =>
                this.setState({
                  cliente: { ...cliente, endereco: { ...cliente.endereco, rua: e.target.value } },
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Número *</label>
            <input
              type="text"
              value={cliente.endereco.numero || ""}
              onChange={(e) =>
                this.setState({
                  cliente: { ...cliente, endereco: { ...cliente.endereco, numero: e.target.value } },
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Código Postal</label>
            <input
              type="text"
              value={cliente.endereco.codigoPostal || ""}
              onChange={(e) =>
                this.setState({
                  cliente: { ...cliente, endereco: { ...cliente.endereco, codigoPostal: e.target.value } },
                })
              }
            />
          </div>

          {/* Telefones */}
          <h3>Telefones</h3>
          {cliente.telefones.map((telefone: any, index: number) => (
            <div key={index} className="form-group-telefones">
              <label>DDD</label>
              <input
                type="text"
                value={telefone.ddd}
                onChange={(e) => this.handleTelefoneChange(index, "ddd", e.target.value)}
              />
              <label>Número</label>
              <input
                type="text"
                value={telefone.numero}
                onChange={(e) => this.handleTelefoneChange(index, "numero", e.target.value)}
              />
            </div>
          ))}

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

import { Component } from "react";
import { cadastrarCliente } from "../services/api"; // Importando a função do api.ts

type Props = {
  tema: string;
  fetchClientes: () => void; // Prop para atualizar a lista de clientes
};

type State = {
  nome: string;
  nomeSocial: string;
  email: string;
  endereco: {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
  };
  telefones: {
    ddd: string;
    numero: string;
  }[];
};

export default class CadastrarCliente extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: "",
      nomeSocial: "",
      email: "",
      endereco: {
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        codigoPostal: "",
        informacoesAdicionais: "",
      },
      telefones: [
        {
          ddd: "",
          numero: "",
        },
      ],
    };
  }

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar página)

    const { nome, nomeSocial, email, endereco, telefones } = this.state;
    const clienteData = { nome, nomeSocial, email, endereco, telefones };

    try {
      const response = await cadastrarCliente(clienteData); // Usando a função de cadastro do api.ts
      if (response.ok) {
        alert("Cliente cadastrado com sucesso!");
        this.props.fetchClientes(); // Atualiza a lista de clientes
        // Redefine o estado para limpar o formulário
        this.setState({
          nome: "",
          nomeSocial: "",
          email: "",
          endereco: {
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            numero: "",
            codigoPostal: "",
            informacoesAdicionais: "",
          },
          telefones: [{ ddd: "", numero: "" }],
        });
      } else {
        alert("Erro ao cadastrar cliente!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente!");
    }
  };

  handleTelefoneChange = (index: number, field: string, value: string) => {
    const telefones = [...this.state.telefones];
    telefones[index] = { ...telefones[index], [field]: value };
    this.setState({ telefones });
  };

  render() {
    const { tema } = this.props;
    const { nome, nomeSocial, email, endereco, telefones } = this.state;

    return (
      <div className="container mt-3">
        <h1 className="mb-4" style={{ backgroundColor: tema, padding: "10px", borderRadius: "5px" }}>
          Cadastro de Clientes
        </h1>
        <form
          onSubmit={this.handleSubmit}
        >
          {/* Dados Básicos */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              value={nome}
              onChange={(e) => this.setState({ nome: e.target.value })}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome social"
              value={nomeSocial}
              onChange={(e) => this.setState({ nomeSocial: e.target.value })}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          {/* Endereço */}
          <h5>Endereço</h5>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Estado"
              value={endereco.estado}
              onChange={(e) => this.setState({ endereco: { ...endereco, estado: e.target.value } })}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Cidade"
              value={endereco.cidade}
              onChange={(e) => this.setState({ endereco: { ...endereco, cidade: e.target.value } })}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Bairro"
              value={endereco.bairro}
              onChange={(e) => this.setState({ endereco: { ...endereco, bairro: e.target.value } })}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rua"
              value={endereco.rua}
              onChange={(e) => this.setState({ endereco: { ...endereco, rua: e.target.value } })}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Número"
              value={endereco.numero}
              onChange={(e) => this.setState({ endereco: { ...endereco, numero: e.target.value } })}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Código Postal"
              value={endereco.codigoPostal}
              onChange={(e) => this.setState({ endereco: { ...endereco, codigoPostal: e.target.value } })}
            />
          </div>
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              placeholder="Informações Adicionais"
              value={endereco.informacoesAdicionais}
              onChange={(e) =>
                this.setState({ endereco: { ...endereco, informacoesAdicionais: e.target.value } })
              }
            />
          </div>

          {/* Telefones */}
          <h5>Telefones</h5>
          {telefones.map((telefone, index) => (
            <div key={index} className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="DDD"
                value={telefone.ddd}
                onChange={(e) => this.handleTelefoneChange(index, "ddd", e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Número"
                value={telefone.numero}
                onChange={(e) => this.handleTelefoneChange(index, "numero", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-secondary mb-3"
            onClick={() =>
              this.setState({ telefones: [...telefones, { ddd: "", numero: "" }] })
            }
          >
            Adicionar Telefone
          </button>

          {/* Botão de Envio */}
          <div className="input-group mb-3">
            <button className="btn btn-outline-secondary" type="submit" style={{ background: tema }}>
              Cadastrar
            </button>
          </div>
        </form>

        <div className="footer">
          <p> Direitos de PETLOVERS</p>
        </div>
      </div>
    );
  }
}

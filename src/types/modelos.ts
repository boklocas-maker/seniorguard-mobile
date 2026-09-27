export interface UsuarioAplicativo {
  uid: string
  email: string | null
  nome: string | null
  papel: 'idoso' | 'cuidador'
  seniorId?: string
}

export interface PerfilIdoso {
  nome: string
  idade: number
  condicao: string
  endereco: string
  cuidador: string
}

export interface LembreteMedicamento {
  id: string
  nome: string
  dosagem: string
  horario: string
  tomado: boolean
}

export interface ContatoEmergencia {
  id: string
  nome: string
  telefone: string
}

export interface EventoSeguranca {
  id: string
  titulo: string
  descricao: string
  resolvido: boolean
  horario: string
}

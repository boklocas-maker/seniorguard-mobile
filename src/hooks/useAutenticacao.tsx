import { useContext } from 'react'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { AutenticacaoContexto } from '../context/AutenticacaoContexto'
import { autenticacao } from '../services/firebase'

export function useAutenticacao() {
  const autenticacaoContexto = useContext(AutenticacaoContexto)

  if (autenticacaoContexto === undefined) {
    throw new Error('Falta o <AutenticacaoProvider> na aplicação!')
  }

  const { usuarioContexto, carregando, logarContexto, deslogarContexto } = autenticacaoContexto

  const criarAutenticacaoUsuario = async (email: string, senha: string): Promise<string> => {
    try {
      await createUserWithEmailAndPassword(autenticacao, email.trim(), senha)
      return 'sucesso'
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        return `E-mail já utilizado por outra conta. ${error.code}`
      }
      return error instanceof FirebaseError
        ? `Erro na criação da autenticação do usuário! (${error.code}: ${error.message})`
        : `Erro imprevisto! (${String(error)})`
    }
  }

  const validarUsuario = async (email: string, senha: string): Promise<string> => {
    try {
      await signInWithEmailAndPassword(autenticacao, email.trim(), senha)
      return 'sucesso'
    } catch (error) {
      return error instanceof FirebaseError
        ? `Erro na autenticação do usuário! (${error.code}: ${error.message})`
        : `Erro imprevisto! (${String(error)})`
    }
  }

  const deslogar = async (): Promise<string> => {
    try {
      await signOut(autenticacao)
      await deslogarContexto()
      return 'sucesso'
    } catch (error) {
      return error instanceof FirebaseError
        ? `Erro ao deslogar o usuário! (${error.code}: ${error.message})`
        : `Erro imprevisto! (${String(error)})`
    }
  }

  return { criarAutenticacaoUsuario, validarUsuario, deslogar, logarContexto, deslogarContexto, usuarioContexto, carregando }
}

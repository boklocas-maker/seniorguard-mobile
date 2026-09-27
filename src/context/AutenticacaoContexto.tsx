import AsyncStorage from '@react-native-async-storage/async-storage'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { createContext, useEffect, useState, type PropsWithChildren } from 'react'
import type { UsuarioAplicativo } from '../types'
import { autenticacao } from '../services/firebase'

export interface AutenticacaoContextoObjeto {
  usuarioContexto: UsuarioAplicativo | null
  carregando: boolean
  logarContexto: (dadosUsuario: UsuarioAplicativo) => Promise<void>
  deslogarContexto: () => Promise<void>
}

export const AutenticacaoContexto = createContext<AutenticacaoContextoObjeto | undefined>(undefined)

function converterUsuario(user: User, papel: UsuarioAplicativo['papel'] = 'cuidador'): UsuarioAplicativo {
  return {
    uid: user.uid,
    email: user.email,
    nome: user.displayName || user.email?.split('@')[0] || 'Usuário',
    papel,
  }
}

export function AutenticacaoProvider({ children }: PropsWithChildren) {
  const [usuarioContexto, setUsuarioContexto] = useState<UsuarioAplicativo | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => onAuthStateChanged(autenticacao, async (user) => {
    if (!user) {
      setUsuarioContexto(null)
      setCarregando(false)
      return
    }

    const salvo = await AsyncStorage.getItem(`sg_profile_${user.uid}`)
    const dados: { papel?: UsuarioAplicativo['papel']; nome?: string } = salvo ? JSON.parse(salvo) : {}
    setUsuarioContexto({ ...converterUsuario(user, dados.papel), nome: dados.nome || converterUsuario(user, dados.papel).nome })
    setCarregando(false)
  }), [])

  const logarContexto = async (dadosUsuario: UsuarioAplicativo) => {
    setUsuarioContexto(dadosUsuario)
    await AsyncStorage.setItem(`sg_profile_${dadosUsuario.uid}`, JSON.stringify(dadosUsuario))
  }

  const deslogarContexto = async () => {
    await signOut(autenticacao)
    setUsuarioContexto(null)
  }

  return <AutenticacaoContexto.Provider value={{ usuarioContexto, carregando, logarContexto, deslogarContexto }}>{children}</AutenticacaoContexto.Provider>
}

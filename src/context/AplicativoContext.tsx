import AsyncStorage from '@react-native-async-storage/async-storage'
import { onAuthStateChanged, updateProfile, type User } from 'firebase/auth'
import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react'
import type { ContatoEmergencia, EventoSeguranca, LembreteMedicamento, PerfilIdoso, UsuarioAplicativo } from '../types'
import { autenticacao, bancoDados } from '../services/firebase'
import { useAutenticacao } from '../hooks/useAutenticacao'

interface EstadoAplicativo {
  usuario: UsuarioAplicativo | null; perfil: PerfilIdoso; lembretes: LembreteMedicamento[]; contatos: ContatoEmergencia[]; eventos: EventoSeguranca[]; carregando: boolean
  entrar: (email: string, senha: string) => Promise<string | null>; registrar: (email: string, senha: string, nome: string, papel: UsuarioAplicativo['papel']) => Promise<string | null>; sair: () => Promise<void>
  acionarEmergencia: () => void; alternarLembrete: (id: string) => void; resolverEvento: (id: string) => void; ligarParaContato: (telefone: string) => void
}

const perfilInicial: PerfilIdoso = { nome: '', idade: 0, condicao: '', endereco: '', cuidador: '' }
const ContextoAplicativo = createContext<EstadoAplicativo | null>(null)
const mapearUsuario = (user: User, nome?: string, papel: UsuarioAplicativo['papel'] = 'cuidador'): UsuarioAplicativo => ({ uid: user.uid, email: user.email, nome: nome || user.displayName || user.email?.split('@')[0] || 'Usuário', papel })

export function AplicativoProvider({ children }: PropsWithChildren) {
  const { criarAutenticacaoUsuario, validarUsuario, deslogar: deslogarFirebase, logarContexto } = useAutenticacao()
  const [usuario, setUsuario] = useState<UsuarioAplicativo | null>(null), [perfil, setPerfil] = useState(perfilInicial)
  const [lembretes, setLembretes] = useState<LembreteMedicamento[]>([]), [contatos, setContatos] = useState<ContatoEmergencia[]>([]), [eventos, setEventos] = useState<EventoSeguranca[]>([]), [carregando, setCarregando] = useState(true)
  useEffect(() => onAuthStateChanged(autenticacao, async (user) => {
    if (!user) { setUsuario(null); setCarregando(false); return }
    const raw = await AsyncStorage.getItem(`sg_profile_${user.uid}`), dados = raw ? JSON.parse(raw) : {}
    const conta = await getDoc(doc(bancoDados, 'usuarios', user.uid)).catch(() => null)
    const firestore = conta?.exists() ? conta.data() : {}
    const papel = firestore?.role === 'senior' ? 'idoso' : firestore?.role === 'caregiver' ? 'cuidador' : dados.papel
    setUsuario({ ...mapearUsuario(user, firestore?.displayName || dados.nome, papel || 'cuidador'), seniorId: firestore?.seniorId })
    setPerfil(dados.perfil || perfilInicial); setLembretes(dados.lembretes || []); setContatos(dados.contatos || []); setEventos(dados.eventos || []); setCarregando(false)
  }), [])
  useEffect(() => {
    if (!usuario) return
    const cancelarRemedios = onSnapshot(collection(bancoDados, 'remedios'), (snap) => setLembretes(snap.docs.map((item) => { const data = item.data(); return { id: item.id, nome: String(data.name || data.nome || ''), dosagem: String(data.dosage || data.dosagem || ''), horario: String(data.time || data.horario || ''), tomado: Boolean(data.taken) } })), () => {})
    const cancelarPerfil = usuario.papel === 'idoso' && usuario.seniorId ? onSnapshot(doc(bancoDados, 'idosos', usuario.seniorId), (snap) => { if (snap.exists()) { const data = snap.data(); setPerfil({ nome: String(data.name || ''), idade: Number(data.age || 0), condicao: String(data.condition || ''), endereco: String(data.homeAddress || ''), cuidador: String(data.caregiverName || '') }) } }, () => {}) : usuario.papel === 'cuidador' ? onSnapshot(query(collection(bancoDados, 'idosos'), where('caregiverUid', '==', usuario.uid)), (snap) => { const item = snap.docs[0]; if (item) { const data = item.data(); setUsuario((atual) => atual ? { ...atual, seniorId: item.id } : atual); setPerfil({ nome: String(data.name || ''), idade: Number(data.age || 0), condicao: String(data.condition || ''), endereco: String(data.homeAddress || ''), cuidador: String(data.caregiverName || usuario.nome || '') }) } }, () => {}) : () => {}
    const seniorId = usuario.seniorId
    const cancelarContatos = seniorId ? onSnapshot(collection(bancoDados, 'idosos', seniorId, 'contatos'), (snap) => setContatos(snap.docs.map((item) => ({ id: item.id, nome: String(item.data().name || item.data().nome || ''), telefone: String(item.data().phone || item.data().telefone || '') }))), () => {}) : () => {}
    return () => { cancelarRemedios(); cancelarPerfil(); cancelarContatos() }
  }, [usuario])
  useEffect(() => {
    if (!usuario || carregando) return
    void AsyncStorage.setItem(`sg_profile_${usuario.uid}`, JSON.stringify({ nome: usuario.nome, papel: usuario.papel, perfil, lembretes, contatos, eventos }))
  }, [usuario, perfil, lembretes, contatos, eventos, carregando])
  const entrar = async (email: string, senha: string) => { const retorno = await validarUsuario(email, senha); return retorno === 'sucesso' ? null : retorno }
  const registrar = async (email: string, senha: string, nome: string, papel: UsuarioAplicativo['papel']) => { const retorno = await criarAutenticacaoUsuario(email, senha); if (retorno !== 'sucesso') return retorno; const user = autenticacao.currentUser; if (!user) return 'Usuário não encontrado após o cadastro.'; await updateProfile(user, { displayName: nome }); const dadosUsuario: UsuarioAplicativo = { uid: user.uid, email: user.email, nome, papel }; await setDoc(doc(bancoDados, 'usuarios', user.uid), { uid: user.uid, email: user.email, displayName: nome, role: papel === 'idoso' ? 'senior' : 'caregiver' }, { merge: true }); await logarContexto(dadosUsuario); return null }
  const sair = async () => { await deslogarFirebase(); setUsuario(null) }
  const alternarLembrete = (id: string) => { setLembretes((xs) => xs.map((x) => x.id === id ? { ...x, tomado: !x.tomado } : x)); void updateDoc(doc(bancoDados, 'remedios', id), { taken: !(lembretes.find((x) => x.id === id)?.tomado ?? false) }).catch(() => {}) }
  const resolverEvento = (id: string) => setEventos((xs) => xs.map((x) => x.id === id ? { ...x, resolvido: true } : x))
  const acionarEmergencia = () => setEventos((xs) => [{ id: String(Date.now()), titulo: 'Alerta nos óculos', descricao: 'Pedido de ajuda enviado à rede de apoio.', resolvido: false, horario: 'Agora' }, ...xs])
  const valor = { usuario, perfil, lembretes, contatos, eventos, carregando, entrar, registrar, sair, acionarEmergencia, alternarLembrete, resolverEvento, ligarParaContato: (_telefone: string) => {} }
  return <ContextoAplicativo.Provider value={valor}>{children}</ContextoAplicativo.Provider>
}
export function useAplicativo() { const contexto = useContext(ContextoAplicativo); if (!contexto) throw new Error('AplicativoProvider ausente'); return contexto }

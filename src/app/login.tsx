import { Redirect, router } from 'expo-router'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAplicativo } from '../context/AplicativoContext'
import { CORES, FONTES } from '../constants'
import type { UsuarioAplicativo } from '../types'

export default function RotaLogin() {
  const { usuario, carregando, entrar, registrar } = useAplicativo()

  if (carregando) return null
  if (usuario) return <Redirect href={usuario.papel === 'idoso' ? '/idoso' : '/(auth)/inicio'} />

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.tela}>
      <LoginForm aoEntrar={entrar} aoRegistrar={registrar} />
    </SafeAreaView>
  )
}

function LoginForm({
  aoEntrar,
  aoRegistrar,
}: {
  aoEntrar: (email: string, senha: string) => Promise<string | null>
  aoRegistrar: (email: string, senha: string, nome: string, papel: UsuarioAplicativo['papel']) => Promise<string | null>
}) {
  const [registro, setRegistro] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [papel, setPapel] = useState<UsuarioAplicativo['papel']>('cuidador')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  const enviar = async () => {
    if (!email || !senha || (registro && !nome)) {
      setErro('Preencha todos os campos.')
      return
    }

    setEnviando(true)
    const mensagem = registro
      ? await aoRegistrar(email, senha, nome, papel)
      : await aoEntrar(email, senha)
    setErro(mensagem || '')
    setEnviando(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.marca}>SeniorGuard</Text>
        <Text style={styles.tagline}>Segurança e cuidado, todos os dias.</Text>

        <View style={styles.card}>
          <View style={styles.abas}>
            <Pressable
              onPress={() => setRegistro(false)}
              style={[styles.aba, !registro && styles.abaAtiva]}
            >
              <Text>Login</Text>
            </Pressable>
            <Pressable
              onPress={() => setRegistro(true)}
              style={[styles.aba, registro && styles.abaAtiva]}
            >
              <Text>Registro</Text>
            </Pressable>
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          {registro ? (
            <>
              <Text style={styles.rotulo}>Eu sou</Text>
              <View style={styles.papeis}>
                <Pressable
                  onPress={() => setPapel('cuidador')}
                  style={[styles.papel, papel === 'cuidador' && styles.papelAtivo]}
                >
                  <Text>Cuidador</Text>
                </Pressable>
                <Pressable
                  onPress={() => setPapel('idoso')}
                  style={[styles.papel, papel === 'idoso' && styles.papelAtivo]}
                >
                  <Text>Idoso</Text>
                </Pressable>
              </View>
              <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder='Nome completo'
                placeholderTextColor={CORES.textoInativo}
                style={styles.input}
              />
            </>
          ) : null}

          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder='E-mail'
            placeholderTextColor={CORES.textoInativo}
            style={styles.input}
          />
          <TextInput
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder='Senha'
            placeholderTextColor={CORES.textoInativo}
            style={styles.input}
          />
          <Pressable
            disabled={enviando}
            onPress={() => void enviar()}
            style={styles.botao}
          >
            <Text style={styles.botaoTexto}>
              {enviando ? 'Aguarde...' : registro ? 'Criar conta' : 'Entrar'}
            </Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={() => router.push('/sobre')} style={styles.sobre}>
        <Text style={styles.sobreTexto}>Sobre o projeto</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  container: {
    flex: 1,
    backgroundColor: CORES.fundo,
    padding: 24,
    justifyContent: 'space-between',
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
  },
  marca: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: 32,
    fontWeight: '800',
  },
  tagline: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    marginTop: 6,
    marginBottom: 28,
  },
  card: {
    backgroundColor: CORES.branco,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  abas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
    marginBottom: 22,
  },
  aba: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  abaAtiva: {
    borderBottomWidth: 2,
    borderBottomColor: CORES.primaria,
  },
  rotulo: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontWeight: '700',
    marginBottom: 8,
  },
  papeis: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  papel: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: CORES.fundo,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  papelAtivo: {
    backgroundColor: CORES.fundoVerdeClaro,
    borderColor: CORES.primaria,
  },
  input: {
    backgroundColor: CORES.fundo,
    color: CORES.texto,
    fontFamily: FONTES.principal,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: CORES.primaria,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 4,
  },
  botaoTexto: {
    color: CORES.branco,
    fontFamily: FONTES.principal,
    fontWeight: '700',
    fontSize: 16,
  },
  erro: {
    backgroundColor: CORES.fundoErro,
    color: CORES.erroEscuro,
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
    fontFamily: FONTES.principal,
  },
  sobre: {
    alignItems: 'center',
    padding: 18,
  },
  sobreTexto: {
    color: CORES.primaria,
    fontFamily: FONTES.principal,
    textDecorationLine: 'underline',
  },
})

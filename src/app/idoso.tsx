import { Redirect } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAplicativo } from '../context/AplicativoContext'
import { CORES, FONTES, TAMANHOS_TEXTO } from '../constants'

export default function RotaIdoso() {
  const { usuario, carregando, perfil, lembretes, acionarEmergencia, alternarLembrete, sair } = useAplicativo()
  if (carregando) return null
  if (!usuario) return <Redirect href='/login' />
  if (usuario.papel !== 'idoso') return <Redirect href='/(auth)/inicio' />

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.tela}>
      <StatusBar style='light' />
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Olá, {perfil.nome || 'Idoso'}</Text>
        <View style={styles.card}><Text style={styles.rotulo}>Cuidador</Text><Text style={styles.valor}>{perfil.cuidador || 'Sem cuidador cadastrado'}</Text></View>
        {lembretes.map((item) => <Pressable key={item.id} onPress={() => alternarLembrete(item.id)} style={styles.lembrete}><Text style={styles.lembreteNome}>{item.nome}</Text><Text style={styles.lembreteTexto}>{item.horario} · {item.dosagem}</Text><Text style={styles.lembreteTexto}>{item.tomado ? 'Marcado como tomado' : 'Ainda não foi tomado'}</Text></Pressable>)}
        <Pressable style={styles.sos} onPress={acionarEmergencia}><Text style={styles.sosTexto}>Solicitar ajuda</Text></Pressable>
        <Pressable style={styles.sair} onPress={() => { void sair() }}><Text style={styles.sairTexto}>Sair</Text></Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.texto,
  },
  conteudo: {
    flex: 1,
    padding: 24,
  },
  titulo: {
    color: CORES.branco,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.titulo,
    fontWeight: '800',
    marginBottom: 18,
  },
  card: {
    backgroundColor: CORES.superficie,
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },
  rotulo: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.pequeno,
  },
  valor: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpoAmplo,
    fontWeight: '700',
    marginTop: 6,
  },
  lembrete: {
    backgroundColor: CORES.superficie,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  lembreteNome: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpoAmplo,
    fontWeight: '700',
  },
  lembreteTexto: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpo,
    marginTop: 4,
  },
  sos: {
    backgroundColor: CORES.perigo,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  sosTexto: {
    color: CORES.branco,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpoAmplo,
    fontWeight: '700',
  },
  sair: {
    backgroundColor: CORES.superficie,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  sairTexto: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontWeight: '700',
  },
})

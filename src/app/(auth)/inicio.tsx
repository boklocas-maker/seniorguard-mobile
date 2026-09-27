import { router } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAplicativo } from '../../context/AplicativoContext'
import { CORES, FONTES } from '../../constants'

export default function RotaInicio() {
  const { perfil, lembretes, eventos, acionarEmergencia, alternarLembrete } = useAplicativo()
  const pendentes = lembretes.filter((item) => !item.tomado).length

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.saudo}>Bom dia,</Text>
      <Text style={styles.nome}>{perfil.nome || 'Cuidador'}</Text>
      <View style={styles.destaque}><View><Text style={styles.rotulo}>Monitoramento</Text><Text style={styles.tituloCard}>Seguro e estável</Text><Text style={styles.meta}>Atualizado há poucos minutos</Text></View><Text style={styles.ativo}>● Ativo</Text></View>
      <View style={styles.grid}><View style={styles.mini}><Text style={styles.numero}>{pendentes}</Text><Text style={styles.miniTexto}>Remédios de hoje</Text></View><View style={styles.mini}><Text style={styles.numero}>{eventos.filter((item) => !item.resolvido).length}</Text><Text style={styles.miniTexto}>Alertas pendentes</Text></View></View>
      <View style={styles.linha}><Text style={styles.secao}>Próxima medicação</Text><Pressable onPress={() => router.navigate('/(auth)/lembretes')}><Text style={styles.link}>Gerenciar</Text></Pressable></View>
      {lembretes.slice(0, 3).map((item) => <Pressable key={item.id} onPress={() => alternarLembrete(item.id)} style={styles.remedio}><View><Text style={styles.horario}>{item.horario}</Text><Text style={[styles.remedioNome, item.tomado && styles.tomado]}>{item.nome}</Text><Text style={styles.dosagem}>{item.dosagem}</Text></View><Text style={[styles.pill, item.tomado && styles.pillAtivo]}>{item.tomado ? 'Confirmado' : 'Pendente'}</Text></Pressable>)}
      {!lembretes.length && <Text style={styles.vazio}>Nenhuma medicação cadastrada.</Text>}
      <View style={styles.acoes}><Pressable style={styles.sos} onPress={acionarEmergencia}><Text style={styles.sosTexto}>Pedir ajuda</Text></Pressable><Pressable style={styles.historico} onPress={() => router.navigate('/(auth)/historico')}><Text style={styles.historicoTexto}>Ver histórico</Text></Pressable></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.branco,
  },
  conteudo: {
    padding: 24,
    paddingBottom: 110,
  },
  saudo: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: 14,
  },
  nome: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 22,
  },
  destaque: {
    backgroundColor: CORES.texto,
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rotulo: {
    color: CORES.verdeClaro,
    fontFamily: FONTES.principal,
    fontSize: 12,
  },
  tituloCard: {
    color: CORES.branco,
    fontFamily: FONTES.principal,
    fontSize: 19,
    fontWeight: '700',
    marginTop: 5,
  },
  meta: {
    color: CORES.verdeNeutro,
    fontFamily: FONTES.principal,
    fontSize: 12,
    marginTop: 8,
  },
  ativo: {
    color: CORES.branco,
    backgroundColor: CORES.sucesso,
    borderRadius: 18,
    padding: 7,
    fontFamily: FONTES.principal,
    fontSize: 11,
    height: 30,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 18,
  },
  mini: {
    flex: 1,
    backgroundColor: CORES.fundo,
    borderRadius: 14,
    padding: 16,
  },
  numero: {
    color: CORES.primaria,
    fontFamily: FONTES.principal,
    fontSize: 26,
    fontWeight: '800',
  },
  miniTexto: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: 12,
    marginTop: 4,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  secao: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: 18,
    fontWeight: '800',
  },
  link: {
    color: CORES.primaria,
    fontFamily: FONTES.principal,
    fontWeight: '700',
    fontSize: 12,
  },
  remedio: {
    backgroundColor: CORES.fundo,
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horario: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: 12,
  },
  remedioNome: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontWeight: '700',
    fontSize: 16,
    marginTop: 3,
  },
  dosagem: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: 12,
    marginTop: 3,
  },
  tomado: {
    textDecorationLine: 'line-through',
    color: CORES.textoInativo,
  },
  pill: {
    color: CORES.alerta,
    backgroundColor: CORES.fundoAlerta,
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 5,
    fontFamily: FONTES.principal,
    fontSize: 11,
  },
  pillAtivo: {
    color: CORES.sucesso,
    backgroundColor: CORES.fundoVerdeClaro,
  },
  vazio: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    marginVertical: 12,
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  sos: {
    flex: 1,
    backgroundColor: CORES.perigo,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sosTexto: {
    color: CORES.branco,
    fontFamily: FONTES.principal,
    fontWeight: '700',
  },
  historico: {
    flex: 1,
    backgroundColor: CORES.fundoVerdeClaro,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  historicoTexto: {
    color: CORES.primaria,
    fontFamily: FONTES.principal,
    fontWeight: '700',
  },
})

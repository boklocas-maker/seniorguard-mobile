import { router } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CORES, FONTES, TAMANHOS_TEXTO } from '../constants'

export default function RotaSobre() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.tela}>
      <Pressable onPress={() => router.back()} style={styles.voltar}>
        <Text style={styles.voltarTexto}>Voltar</Text>
      </Pressable>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>SeniorGuard</Text>
        <Text style={styles.texto}>Sistema vestível inteligente em formato de óculos para monitoramento e prevenção de acidentes com idosos.</Text>
        <Text style={styles.secao}>Como funciona</Text>
        <Text style={styles.texto}>O óculos utiliza sensores de movimento para identificar possíveis situações de risco. O aplicativo recebe os alertas para o uso diário do idoso e do cuidador, enquanto o site organiza os cadastros e configurações.</Text>
        <Text style={styles.secao}>Proposta</Text>
        <Text style={styles.texto}>O projeto busca unir hardware e software em uma solução acessível, simples de usar e voltada à segurança e autonomia da pessoa idosa.</Text>
        <Text style={styles.secao}>Tecnologias</Text>
        <Text style={styles.texto}>React, TypeScript, Firebase, Arduino, acelerômetro e giroscópio.</Text>
        <Text style={styles.integrante}><Text style={styles.nome}>Arthur Conteiro</Text> Pesquisa e documentação</Text>
        <Text style={styles.integrante}><Text style={styles.nome}>Daniel Santos</Text> Banco de dados e hardware</Text>
        <Text style={styles.integrante}><Text style={styles.nome}>Davi Tomaz</Text> Desenvolvimento de telas</Text>
        <Text style={styles.integrante}><Text style={styles.nome}>Cauã Palatin</Text> Desenvolvimento do projeto</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  voltar: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  voltarTexto: {
    color: CORES.primaria,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpo,
    fontWeight: '700',
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  titulo: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.titulo,
    fontWeight: '800',
    marginBottom: 12,
  },
  secao: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpoAmplo,
    fontWeight: '700',
    marginTop: 26,
    marginBottom: 8,
  },
  texto: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpo,
    lineHeight: 23,
  },
  integrante: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpo,
    lineHeight: 24,
    marginTop: 12,
  },
  nome: {
    color: CORES.texto,
    fontWeight: '700',
  },
})

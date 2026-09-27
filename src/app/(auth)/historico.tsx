import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useAplicativo } from '../../context/AplicativoContext'
import { CORES, FONTES, TAMANHOS_TEXTO } from '../../constants'

export default function RotaHistorico() {
  const { eventos, resolverEvento } = useAplicativo()

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico</Text>
      {eventos.length === 0 ? (
        <Text style={styles.vazio}>Nenhum evento registrado.</Text>
      ) : (
        eventos.map((evento) => (
          <View key={evento.id} style={styles.card}>
            <Text style={styles.nome}>{evento.titulo}</Text>
            <Text style={styles.descricao}>{evento.descricao}</Text>
            <Text style={styles.meta}>{evento.horario}</Text>
            {!evento.resolvido ? (
              <Pressable onPress={() => resolverEvento(evento.id)}>
                <Text style={styles.botao}>Marcar como atendido</Text>
              </Pressable>
            ) : null}
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: CORES.branco,
  },
  titulo: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.titulo,
    fontWeight: '800',
    marginBottom: 18,
  },
  vazio: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
  },
  card: {
    backgroundColor: CORES.fundo,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  nome: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: 16,
    fontWeight: '700',
  },
  descricao: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    marginTop: 6,
  },
  meta: {
    color: CORES.textoInativo,
    fontFamily: FONTES.principal,
    fontSize: 12,
    marginTop: 8,
  },
  botao: {
    color: CORES.primaria,
    fontFamily: FONTES.principal,
    fontWeight: '700',
    marginTop: 10,
  },
})

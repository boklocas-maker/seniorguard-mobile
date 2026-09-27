import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useAplicativo } from '../../context/AplicativoContext'
import { CORES, FONTES, TAMANHOS_TEXTO } from '../../constants'

export default function RotaLembretes() {
  const { lembretes, alternarLembrete } = useAplicativo()

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lembretes</Text>
      {lembretes.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma medicação cadastrada.</Text>
      ) : (
        lembretes.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => alternarLembrete(item.id)}
            style={styles.item}
          >
            <View>
              <Text style={styles.horario}>{item.horario}</Text>
              <Text style={[styles.nome, item.tomado && styles.tomado]}>{item.nome}</Text>
              <Text style={styles.dosagem}>{item.dosagem}</Text>
            </View>
            <Text style={[styles.status, item.tomado && styles.confirmado]}>
              {item.tomado ? 'Tomado' : 'Pendente'}
            </Text>
          </Pressable>
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
  item: {
    backgroundColor: CORES.fundo,
    borderRadius: 14,
    padding: 16,
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
  nome: {
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
  status: {
    color: CORES.alerta,
    backgroundColor: CORES.fundoAlerta,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 14,
    fontFamily: FONTES.principal,
    fontSize: 11,
  },
  confirmado: {
    color: CORES.sucesso,
    backgroundColor: CORES.fundoVerdeClaro,
  },
})

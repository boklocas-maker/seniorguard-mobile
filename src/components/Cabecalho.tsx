import { Lucide } from '@react-native-vector-icons/lucide'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { CORES, FONTES, TAMANHOS_TEXTO } from '../constants'

export interface CabecalhoProps {
  titulo: string
  aoSair: () => void
}

export function Cabecalho({ titulo, aoSair }: CabecalhoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Pressable
        accessibilityRole='button'
        accessibilityLabel='Sair da conta'
        onPress={aoSair}
        style={styles.botao}
      >
        <Lucide name='log-out' color={CORES.cinzaVerde} size={19} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 54,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titulo: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontSize: TAMANHOS_TEXTO.corpoAmplo,
    fontWeight: '800',
  },
  botao: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

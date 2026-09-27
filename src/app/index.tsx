import { Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useAplicativo } from '../context/AplicativoContext'
import { CORES } from '../constants'

export default function RotaInicial() {
  const { usuario, carregando } = useAplicativo()

  if (carregando) {
    return (
      <View style={estilos.carregando}>
        <ActivityIndicator color={CORES.primaria} size='large' />
      </View>
    )
  }

  if (!usuario) return <Redirect href='/login' />
  return <Redirect href={usuario.papel === 'idoso' ? '/idoso' : '/(auth)/inicio'} />
}

const estilos = StyleSheet.create({
  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.fundo,
  },
})
import { Tabs, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Lucide } from '@react-native-vector-icons/lucide'
import { useAplicativo } from '../../context/AplicativoContext'
import { CORES, FONTES, TAMANHOS_TEXTO } from '../../constants'
import { Cabecalho } from '../../components/Cabecalho'

export default function LayoutAbas() {
  const { usuario, carregando, sair } = useAplicativo()

  if (carregando) return null
  if (!usuario) return <Redirect href='/login' />
  if (usuario.papel === 'idoso') return <Redirect href='/idoso' />

  return (
    <SafeAreaView edges={['top', 'bottom']} style={estilos.tela}>
      <StatusBar style='dark' />
      <Cabecalho titulo='SeniorGuard' aoSair={() => void sair()} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: CORES.primaria,
          tabBarInactiveTintColor: CORES.textoInativo,
          tabBarLabelStyle: {
            fontFamily: FONTES.principal,
            fontSize: TAMANHOS_TEXTO.micro,
          },
          tabBarStyle: {
            height: 62,
            paddingTop: 7,
            backgroundColor: CORES.branco,
            borderTopColor: CORES.borda,
          },
        }}
      >
        <Tabs.Screen
          name='inicio'
          options={{
            title: 'Início',
            tabBarIcon: ({ color }) => <Lucide name='house' color={color} size={20} />,
          }}
        />
        <Tabs.Screen
          name='historico'
          options={{
            title: 'Histórico',
            tabBarIcon: ({ color }) => <Lucide name='clock-3' color={color} size={20} />,
          }}
        />
        <Tabs.Screen
          name='lembretes'
          options={{
            title: 'Remédios',
            tabBarIcon: ({ color }) => <Lucide name='pill' color={color} size={20} />,
          }}
        />
        <Tabs.Screen
          name='contatos'
          options={{
            title: 'Contatos',
            tabBarIcon: ({ color }) => <Lucide name='phone' color={color} size={20} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
})

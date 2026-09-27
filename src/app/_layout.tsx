import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AplicativoProvider } from '../context/AplicativoContext'
import { AutenticacaoProvider } from '../context/AutenticacaoContexto'
import { CORES, FONTES } from '../constants'

void SplashScreen.preventAutoHideAsync()

export default function LayoutRaiz() {
  const [fontesCarregadas, erroFontes] = useFonts({
    [FONTES.principal]: require('../../assets/PlusJakartaSans.ttf'),
  })

  useEffect(() => {
    if (fontesCarregadas || erroFontes) {
      void SplashScreen.hideAsync()
    }
  }, [erroFontes, fontesCarregadas])

  if (!fontesCarregadas && !erroFontes) return null

  return (
    <SafeAreaProvider>
      <AutenticacaoProvider>
        <AplicativoProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: CORES.fundo },
            }}
          />
        </AplicativoProvider>
      </AutenticacaoProvider>
    </SafeAreaProvider>
  )
}

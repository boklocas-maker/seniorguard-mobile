import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import { useAplicativo } from '../../context/AplicativoContext'
import { CORES, FONTES, TAMANHOS_TEXTO } from '../../constants'

export default function RotaContatos() {
  const { contatos, perfil } = useAplicativo()
  const ligar = (telefone: string) => { void Linking.openURL(`tel:${telefone}`) }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contatos</Text>
      <Text style={styles.subtitulo}>Rede de apoio e emergência</Text>
      <View style={styles.destaque}>
        <Text style={styles.rotulo}>Cuidador principal</Text>
        <Text style={styles.valor}>{perfil.cuidador || 'Não informado'}</Text>
      </View>
      {contatos.length === 0 ? (
        <Text style={styles.vazio}>Nenhum contato cadastrado.</Text>
      ) : contatos.map((contato) => (
        <Pressable key={contato.id} onPress={() => ligar(contato.telefone)} style={styles.item}>
          <View>
            <Text style={styles.nome}>{contato.nome}</Text>
            <Text style={styles.telefone}>{contato.telefone}</Text>
          </View>
          <Text style={styles.ligar}>LIGAR</Text>
        </Pressable>
      ))}
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
  },
  subtitulo: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    marginTop: 6,
    marginBottom: 18,
  },
  destaque: {
    backgroundColor: CORES.fundoVerdeClaro,
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
  },
  rotulo: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    fontSize: 12,
  },
  valor: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontWeight: '700',
    marginTop: 5,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nome: {
    color: CORES.texto,
    fontFamily: FONTES.principal,
    fontWeight: '700',
    fontSize: 16,
  },
  telefone: {
    color: CORES.textoSecundario,
    fontFamily: FONTES.principal,
    marginTop: 4,
  },
  ligar: {
    color: CORES.primaria,
    fontFamily: FONTES.principal,
    fontWeight: '800',
    fontSize: 12,
  },
})

O SeniorGuard é uma solução criada para aumentar a segurança e facilitar o cuidado de pessoas idosas. O projeto combina um aplicativo, um dispositivo em formato de óculos, Arduino e sensores de movimento.

O Arduino é responsável por controlar os sensores presentes no dispositivo e coletar informações sobre os movimentos do idoso. O acelerômetro e o giroscópio ajudam a identificar mudanças bruscas de movimento, inclinações e possíveis quedas. Esses sensores permitem acompanhar a movimentação do usuário e identificar situações que possam representar algum risco.

Quando uma situação de emergência é identificada, o sistema gera um alerta para informar o cuidador.

O aplicativo complementa o dispositivo, permitindo acompanhar medicamentos, visualizar o cuidador, consultar alertas e contatos de emergência. O cuidador pode acompanhar essas informações e verificar possíveis ocorrências.

O objetivo do SeniorGuard é unir sensores e tecnologia para aumentar a segurança do idoso, facilitar o acompanhamento pelo cuidador e possibilitar uma resposta mais rápida em situações de emergência.

O aplicativo possui duas áreas principais:

Aplicativo do idoso: permite acompanhar medicamentos, visualizar o cuidador e solicitar ajuda.

Aplicativo do cuidador: permite acompanhar medicamentos, alertas, histórico e contatos do idoso.

O aplicativo foi desenvolvido em React Native com Expo e utiliza o Firebase como back-end.

Projeto do idoso

A área do idoso possui uma interface simples com o nome do usuário, nome do cuidador, lembretes de medicamentos, horários, dosagens e um botão para solicitar ajuda.

O usuário pode marcar os medicamentos como tomados, e essas informações podem ser atualizadas no Firebase.

O botão Solicitar ajuda registra um alerta no aplicativo. A integração com os óculos e o envio do alerta para o cuidador ainda estão em desenvolvimento.

Projeto do cuidador

A área do cuidador é dividida em quatro partes:

Início: mostra um resumo dos medicamentos e alertas.

Histórico: apresenta os eventos registrados e permite marcar alertas como resolvidos.

Remédios: mostra os medicamentos e permite atualizar seu status.

Contatos: apresenta o cuidador e outros contatos de emergência.

O cadastro permite escolher entre os perfis idoso e cuidador. O login é feito usando e-mail e senha.

Tecnologias utilizadas

O aplicativo utiliza React Native, Expo, TypeScript, Expo Router, Firebase, AsyncStorage, Lucide Icons e Plus Jakarta Sans.

Organização do projeto

O projeto está dentro da pasta `mobile/`:

```text
mobile/
├── src/
│   ├── app/          # telas e navegação
│   ├── components/   # componentes reutilizáveis
│   ├── constants/    # configurações visuais
│   ├── context/      # autenticação e estado
│   ├── hooks/        # funções reutilizáveis
│   ├── services/     # Firebase
│   └── types/        # tipos do projeto
├── assets/           # imagens, ícones e fontes
├── app.json          # configuração do Expo
├── package.json      # dependências
└── .env              # configurações do Firebase
```

Navegação

O aplicativo verifica o perfil do usuário para direcioná-lo à área correta.

Usuário não logado: tela de login.

Perfil idoso: tela do idoso.

Perfil cuidador: área do cuidador.

Firebase

O Firebase é utilizado para o login e armazenamento dos dados.

O Firebase Authentication controla o cadastro e login dos usuários.

O Cloud Firestore armazena informações dos usuários, idosos, medicamentos e contatos.

O aplicativo também utiliza o AsyncStorage para manter alguns dados salvos localmente.
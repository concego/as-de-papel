# Ás de papel — GDD vivo

> Documento de brainstorming e Game Design Document. As decisões entram aqui somente quando forem confirmadas; ideias ainda abertas ficam marcadas como hipótese ou pergunta.

## 1. Identidade inicial

- **Título de trabalho:** Ás de papel
- **Referência do título:** a carta do baralho.
- **Formato:** jogo digital 3D.
- **Gênero-base:** puzzle estratégico.
- **Fantasia central:** controlar um aviãozinho de papel.
- **Mapa inicial:** uma casa.
- **Estrutura das fases:** cada fase será um cômodo da casa.
- **Conteúdo de lançamento:** aproximadamente cinco mapas completos estarão disponíveis no lançamento.
- **Progressão temática:** a casa apresentará primeiro as mecânicas de forma lógica e familiar; depois, os mapas avançarão para situações mais surreais e, por fim, para cenários fantásticos.
- **Progressão:** novas fases serão desbloqueadas por pontos, permitindo uma progressão não linear pelo mapa.
- **Conteúdo pós-lançamento:** mapas extras serão vendidos, com alguns mapas disponibilizados gratuitamente ocasionalmente para manter o jogo ativo.
- **Menu entre fases:** terá uma loja para desbloquear fases e novos modelos de avião.
- **Aviões:** os modelos poderão ter aparências e durabilidades diferentes, além de outras diferenças a definir.
- **Mapa:** estruturado em um grid tridimensional com coordenadas X, Y e Z.
- **Regra do eixo Z:** representa camadas de altura; o que estiver imediatamente sobre o chão terá Z=1, uma caixa terá Z=2, um banquinho ou mesa de centro terá Z=3, uma cadeira terá Z=4, uma mesa terá Z=5 e assim por diante.
- **Direção gráfica:** gráficos em SVG.
- **Idiomas:** bilíngue, com Português e Inglês.
- **Tecnologia planejada:** desenvolvimento para web, com possibilidade de empacotamento posterior como aplicativo usando Capacitor.

## 2. Visão provisória

Um jogo de puzzle e estratégia em que o jogador planeja a orientação e o lançamento de um aviãozinho de papel sobre um tabuleiro em grid. O avião sobe, percorre algumas casas para a frente e depois desce. O objetivo geral é conduzi-lo do ponto A ao ponto B usando planejamento e leitura do tabuleiro.

O jogador poderá usar uma câmera/visão para observar o tabuleiro antes de executar o lançamento. A câmera serve à análise do espaço e não altera, por si só, a trajetória do avião.

Ainda estão em aberto as regras de cada fase, os obstáculos, os efeitos do terreno, o sistema de tentativas e a condição detalhada de vitória.

## 3. Pilares provisórios

1. **Puzzle:** cada situação deve apresentar um problema compreensível e uma solução baseada em raciocínio.
2. **Estratégia:** antecipação e planejamento devem importar mais do que velocidade ou reflexo puro.
3. **Avião de papel:** o material, o formato e as limitações do avião devem influenciar a jogabilidade.
4. **Web primeiro:** a primeira arquitetura deve funcionar no navegador e permitir evolução para app via Capacitor.

## 4. Fluxo básico de jogo

1. O jogador observa o tabuleiro usando a câmera/visão disponível.
2. O jogador posiciona a orientação do aviãozinho, definindo para onde ele ficará apontado.
3. O jogador pressiona o botão de lançamento para iniciar a seleção de intensidade.
4. Uma barra alterna entre as três intensidades: fraco, médio e forte.
5. O jogador pressiona o botão de lançamento novamente para confirmar o nível atual e efetuar o lançamento.
6. Como o jogo é por turnos, o avião executa o deslocamento completo do lançamento dentro do turno: sobe verticalmente, avança horizontalmente na direção escolhida e por fim desce.
7. A altura da subida e a distância do avanço horizontal dependem da intensidade selecionada: fraco, médio ou forte.
8. O resultado do voo é avaliado: avanço, colisão, pouso, chegada ao destino ou outra consequência definida pela fase.
9. O jogador inicia o turno seguinte e repete o planejamento até conduzir o avião do ponto A ao ponto B.

## 5. Layout inicial da tela no celular

A interface será planejada pela perspectiva de uma pessoa que usa TalkBack, sem perder o conforto visual para pessoas que enxergam.

### Hierarquia superior

A parte superior da tela será organizada em headings e apresentará:

- Fase atual.
- Durabilidade atual e durabilidade máxima do avião.
- Coordenadas atuais do avião.
- Pontuação.

### Controles da câmera

Logo abaixo das informações superiores, os controles da câmera serão organizados em uma grade de duas linhas por três colunas:

| Posição | Controle |
|---|---|
| Superior esquerdo | Elevar câmera / aumentar Z |
| Superior central | Norte |
| Superior direito | Abaixar câmera / diminuir Z |
| Inferior esquerdo | Esquerda |
| Inferior central | Sul |
| Inferior direito | Direita |

### Controles do avião

Logo abaixo dos controles da câmera:

| Esquerda | Centro | Direita |
|---|---|---|
| Rotação esquerda | Lançamento | Rotação direita |

### Mapeamento de teclado

| Tecla | Função |
|---|---|
| A | Rotacionar o avião 45° para a esquerda |
| D | Rotacionar o avião 45° para a direita |
| Barra de espaço | Lançar o avião; o comportamento segue as duas etapas da barra de intensidade |
| S | Consultar/anunciar a pontuação |
| H | Consultar/anunciar a durabilidade |
| R | Acionar o Radar |
| W | Consultar/anunciar a direção atual do avião |
| Seta para cima | Mover a câmera para o norte |
| Seta para baixo | Mover a câmera para o sul |
| Seta para a direita | Mover a câmera para o leste |
| Seta para a esquerda | Mover a câmera para o oeste |
| Page Up | Aumentar o eixo Z da câmera |
| Page Down | Diminuir o eixo Z da câmera |
| Enter | Confirmar ações e ativar opções de menu |
| Esc | Cancelar ações ou voltar |

Enter e Esc também deverão respeitar o contexto atual do jogo, da barra de intensidade e dos menus.

### Rodapé

O rodapé exibirá um log com as quatro últimas ações realizadas no jogo.

### Requisitos de implementação e conforto visual

- A ordem semântica dos headings e dos controles deve ser coerente com a ordem visual e com a navegação do TalkBack.
- Os grupos de informações e controles devem ser visualmente separados.
- Os botões devem ter área de toque confortável, espaçamento suficiente e foco visual evidente.
- Textos, valores e estados importantes devem manter contraste e tamanho confortáveis no celular.
- O log deve ser legível visualmente e anunciado de forma compreensível quando uma nova ação for registrada, sem depender exclusivamente de cor ou som.

## 6. Caixa de entrada do brainstorming

- [x] Definir a lógica inicial do eixo Z por camadas de altura dos objetos.
- [x] Simular o alcance dos lançamentos com valores de altura e avanço horizontal.
- [x] Definir a quantidade de casas percorridas por cada intensidade na simulação inicial: 2, 3 e 5.
- [x] Definir três intensidades de lançamento: fraco, médio e forte.
- [x] Fazer cada intensidade alcançar uma altura e uma distância diferentes.
- [x] Definir seleção de intensidade por barra que alterna entre os três níveis.
- [x] Confirmar a intensidade com um segundo pressionamento do botão de lançamento.
- [x] Criar representação sonora para o nível atual da barra.
- [ ] Definir se o jogador escolhe apenas a direção e a intensidade ou se haverá outros parâmetros.
- [ ] Definir o comportamento exato da barra: velocidade, ciclo, indicação visual e momento em que começa a alternância.
- [ ] Definir como a câmera funciona: rotação, zoom, ângulo livre, visão por cima ou combinação.
- [x] Definir dois controles de rotação do avião: 45° para a direita e 45° para a esquerda.
- [x] Definir o jogo como baseado em turnos.
- [x] Definir a sequência do deslocamento em cada lançamento: subida vertical, avanço horizontal e descida.
- [ ] Definir o que acontece quando o avião colide ou não alcança o destino.
- [ ] Definir obstáculos e regras do mundo.
- [x] Definir o primeiro mapa como uma casa.
- [x] Definir cada cômodo como uma fase.
- [x] Definir a casa como introdução lógica e familiar às mecânicas.
- [x] Definir progressão temática de cenários familiares para surreais e fantásticos.
- [ ] Definir a sequência exata dos mapas e o momento de introdução de cada mecânica.
- [x] Definir uma fase inicial no quarto para validar as mecânicas básicas.
- [x] Planejar a presença do gato na fase da sala e do cachorro na fase do quintal.
- [x] Planejar o lançamento com aproximadamente cinco mapas completos.
- [x] Definir mapas extras pagos no pós-lançamento.
- [x] Prever a publicação ocasional de mapas gratuitos no pós-lançamento.
- [x] Definir progressão não linear por desbloqueio com pontos.
- [x] Adicionar uma loja ao menu entre as fases.
- [x] Definir que a loja poderá desbloquear fases e novos aviões.
- [x] Definir que os aviões podem ter aparência e durabilidade diferentes.
- [ ] Definir como os pontos são obtidos e os requisitos de cada desbloqueio.
- [x] Definir os pontos como moeda do jogo e da loja.
- [x] Definir que a compra libera o mapa, mas não pula a progressão das fases.
- [x] Estabelecer aproximadamente US$1 como preço de referência por pacote de mapas.
- [ ] Definir preços finais, categorias e apresentação da loja.
- [ ] Definir a ordem e as ramificações possíveis de desbloqueio dos cômodos.
- [ ] Definir se fases já concluídas podem ser revisitadas para obter mais pontos.
- [x] Considerar peso, sensibilidade ao vento e resistência à colisão como atributos de aviões.
- [ ] Definir itens coletáveis ao pousar e seus efeitos.
- [x] Definir o layout inicial da tela do celular em grupos de headings.
- [x] Definir a ordem visual dos grupos: informações, câmera, avião e log.
- [x] Definir a grade de seis controles da câmera.
- [x] Definir o log das quatro últimas ações no rodapé.
- [x] Definir um botão Radar para leitura semântica do tabuleiro.
- [x] Definir o Radar com base na posição atual do avião.
- [x] Definir raio inicial de 6 casas para o Radar.
- [ ] Detalhar o conteúdo, a área e o formato da leitura do Radar, incluindo a forma de organizar as camadas Z.
- [x] Mapear o Radar para a tecla R.
- [x] Mapear a consulta da direção atual para a tecla W.
- [x] Anunciar mudanças de direção pelo TalkBack/NVDA.
- [x] Definir o mapeamento inicial de teclas para teclado.
- [x] Definir A como rotação de 45° para a esquerda e D como rotação de 45° para a direita.
- [x] Definir Enter para confirmar/ativar opções e Esc para cancelar/voltar.
- [ ] Definir controles para toque e demais requisitos de acessibilidade.
- [ ] Definir direção visual e sonora.
- [x] Definir suporte a Português e Inglês.
- [x] Definir tela de seleção de idioma na primeira execução.
- [x] Definir alteração de idioma pelo menu de opções.
- [ ] Definir se existe narrativa, personagens ou apenas desafios abstratos.
- [x] Definir escopo inicial e publicar o primeiro protótipo web do quarto.

## 7. Decisões confirmadas

- O projeto está começando pela fase de brainstorming e pelo GDD.
- O título confirmado é **Ás de papel**, em referência à carta do baralho.
- O jogo será apresentado em 3D.
- O primeiro mapa será uma casa, usada para apresentar as mecânicas em situações familiares e logicamente esperadas ao lançar um avião dentro de casa.
- A primeira fase de desenvolvimento será no quarto, para validar o básico.
- O ponto A da fase do quarto será o sofá/sofázinho.
- O ponto B será a porta do quarto, representando a saída.
- A fase do quarto terá cadeira, escrivaninha, cama, par de chinelos, guarda-roupas, janela aberta com corrente de vento, caixa de brinquedos e sofázinho, espalhados pelo cenário.
- O guarda-roupas terá Z=10 e funcionará somente como obstáculo, sem permitir pouso.
- O gato ficará na fase da sala e o cachorro na fase do quintal.
- O jogo será lançado com aproximadamente cinco mapas completos.
- Cada cômodo da casa corresponderá a uma fase.
- A progressão temática seguirá de cenários familiares para mapas mais surreais e depois para cenários fantásticos.
- Exemplos de mapas posteriores incluem fazenda, shopping, terra das fadas, espaço e vilarejo medieval.
- Mapas extras serão vendidos após o lançamento, com mapas gratuitos ocasionais para manter o jogo ativo.
- Um sistema de pontos será usado para desbloquear novas fases.
- A progressão pelo mapa será não linear, permitindo diferentes caminhos entre os cômodos.
- Haverá uma loja no menu entre as fases para desbloquear fases e novos aviões.
- A compra de um pacote liberará o mapa, mas as fases continuarão exigindo progressão por jogo.
- O preço de referência de cada pacote de mapas será aproximadamente US$1, sujeito à precificação regional.
- Os pontos serão a moeda usada no jogo e na loja.
- Os aviões poderão ter aparências e durabilidades diferentes, além de outras diferenças a definir.
- O mapa usará uma estrutura visual e lógica baseada em grid tridimensional.
- As posições do mapa serão organizadas pelas coordenadas X, Y e Z.
- Os gráficos serão produzidos em SVG.
- O jogo será bilíngue, com suporte a Português e Inglês.
- Na primeira execução, o jogador escolherá o idioma em uma tela própria.
- Depois, o idioma poderá ser alterado no menu de opções.
- O núcleo será um puzzle com estratégia.
- O jogo será baseado em turnos.
- O jogador controlará um aviãozinho de papel.
- O fluxo central envolverá orientar, escolher a intensidade, lançar, fazer o avião subir, avançar algumas casas e descer.
- Em cada turno, a sequência do lançamento será: deslocamento vertical para cima, avanço horizontal e deslocamento vertical para baixo.
- Ao descer, o jogo verificará se o avião pousará sobre algum objeto ou superfície.
- Durante todo o trajeto, cada casa será verificada para identificar obstáculos e possíveis colisões.
- O avião ocupará cada casa atravessada durante o lançamento e processará os efeitos dos eventos encontrados.
- A posição e a orientação dos obstáculos/eventos serão relevantes para o planejamento do turno.
- Obstáculos móveis também se deslocarão a cada turno, com movimentos adaptados ao seu contexto.
- O deslocamento de cada obstáculo móvel será equivalente à lógica de um lançamento, mas sem exigir que todos voem; por exemplo, um cachorro poderá andar um certo número de casas.
- Os turnos de todos os elementos do mapa acontecerão simultaneamente.
- A orientação do obstáculo antes do lançamento indicará seu deslocamento durante o turno; por exemplo, um cachorro olhando para a direita andará para a direita enquanto o avião estiver sendo lançado.
- Quando o avião e um obstáculo ocuparem a mesma casa, ocorrerá uma colisão.
- O cachorro será um obstáculo fatal: se enxergar o avião, tentará pegá-lo e o rasgará por causa da fragilidade do papel, gerando game over.
- O jogador deverá calcular o deslocamento do avião em cada casa do trajeto e o deslocamento dos obstáculos vivos durante o mesmo turno.
- Os obstáculos vivos terão padrões de deslocamento determinísticos e previsíveis, sem intensidades variáveis para o mesmo comportamento.
- O cachorro olhará para uma direção, seguirá nessa direção durante o turno e mudará a direção do olhar no turno seguinte.
- Se o avião parar à frente do cachorro e for percebido por ele, o cachorro tentará persegui-lo, obrigando o jogador a mudar a direção para distraí-lo.
- Exemplo: se um gato anda duas casas na horizontal, salta, avança mais uma casa na horizontal e desce, repetirá sempre esse mesmo padrão.
- Correntes de vento terão uma direção que poderá ser evitada ou aproveitada.
- A corrente da janela do quarto será uma brisa que desloca o avião duas casas para o sul, no sentido do vento.
- Se o avião for pego pelo vento, seu curso mudará antes da descida e ele seguirá o novo trajeto até pousar.
- Eventos direcionais, como a patada de um gato, dependerão da direção para a qual o elemento estiver voltado.
- Colisões causarão dano ao avião.
- Se a durabilidade chegar a 0, ocorrerá game over.
- Ao cair sobre um objeto, a altura desse objeto passará a ser a nova altura inicial do avião; por exemplo, uma mesa ou cadeira poderá se tornar a nova base de lançamento.
- Poças d’água terão Z=1 e, ao cair sobre uma, o avião perderá toda a durabilidade, gerando game over.
- Alguns obstáculos e eventos poderão gerar game over.
- Correntes de vento poderão alterar o sentido do lançamento e terão diferentes intensidades.
- Alguns eventos poderão arremessar o avião de volta ao chão; um exemplo é a patada de um gato.
- Existirão três intensidades de lançamento: fraco, médio e forte.
- Cada intensidade alcançará uma altura e uma distância diferentes.
- Na simulação inicial, o lançamento fraco terá altura 2Z e avanço horizontal 2; o médio, altura 3Z e avanço 3; o forte, altura 5Z e avanço 5.
- Os atributos do avião poderão modificar esses valores-base; os valores e fórmulas ainda serão balanceados.
- O objetivo geral será conduzir o avião do ponto A ao ponto B.
- O jogador poderá observar o tabuleiro usando uma câmera/visão antes do lançamento.
- Haverá dois botões para rotacionar o avião em 45° para a direita ou para a esquerda.
- O primeiro pressionamento do botão de lançamento iniciará uma barra que alterna entre as três intensidades.
- O segundo pressionamento do botão de lançamento confirmará a intensidade atual e efetuará o lançamento.
- O nível atual da barra terá uma representação sonora.
- A câmera usará botões direcionais como método principal de deslocamento pelo grid.
- Os botões direcionais movimentarão a câmera pelo plano X/Y em passos de uma casa.
- Haverá controles separados para aumentar ou diminuir a coordenada Z em 1.
- Navegação livre poderá ser avaliada futuramente como recurso secundário.
- A interface mobile será organizada em headings, com informações da fase no topo, controles da câmera em seguida, controles do avião depois e log no rodapé.
- O topo exibirá fase atual, durabilidade atual/máxima, coordenadas atuais do avião e pontuação.
- Os controles da câmera seguirão uma grade de seis botões: elevar/Z+, norte, abaixar/Z− na primeira linha; esquerda, sul e direita na segunda.
- Os controles do avião seguirão a ordem rotação esquerda, lançamento e rotação direita.
- O rodapé exibirá as quatro últimas ações.
- A implementação deverá preservar conforto visual e navegação coerente para usuários de TalkBack.
- O jogo terá foco estratégico no planejamento dos turnos; a visibilidade do mapa não será tratada como o principal elemento de dificuldade.
- Haverá um botão Radar para apoiar a leitura e compreensão do tabuleiro.
- O Radar será centrado na posição atual do avião, evitando uma leitura baseada na câmera e reduzindo anúncios excessivos.
- O Radar terá alcance inicial de 6 casas ao redor da posição atual do avião.
- A tecla R acionará o Radar.
- A tecla W informará a direção atual para a qual o avião está apontado.
- O TalkBack/NVDA anunciará quando a direção do avião for alterada.
- O volume maior de texto causado pelas camadas do eixo Z será aceito como necessário para representar o tabuleiro tridimensional.
- Durante a exploração da câmera, haverá avisos sonoros indicando a presença de algo acima ou abaixo da coordenada observada, inclusive em Z=0.
- O aviso de algo acima será mais agudo; o aviso de algo abaixo será mais grave.
- Quando houver mais de um aviso vertical, os sons serão reproduzidos em sequência, e não simultaneamente.
- O teclado terá mapeamento inicial para rotação, lançamento, consulta de pontuação, consulta de durabilidade, navegação cardinal da câmera e ajuste do eixo Z.
- A tecla A girará o avião 45° para a esquerda e D girará 45° para a direita.
- A tecla R acionará o Radar e W consultará a direção atual do avião.
- TalkBack/NVDA anunciarão quando a direção do avião for alterada.
- Enter confirmará ações e ativará opções; Esc cancelará ações ou voltará.
- A tecnologia inicial será web.
- O primeiro protótipo de experiência será a fase do quarto em uma página estática, com tabuleiro SVG pseudo-3D, fluxo de lançamento em duas etapas, Radar, controles acessíveis, log de ações, regras provisórias de vento/colisão e o som aprovado de voo.
- Capacitor é a rota planejada para transformar o projeto em aplicativo posteriormente.

## 8. Decisões em aberto

### Mecânica de voo e regras
- Fórmula exata da trajetória nos eixos X, Y e Z, incluindo a interpolação dos deslocamentos; os valores-base de alcance já foram propostos.
- Valores numéricos e fórmulas de como peso e aerodinâmica alteram os valores-base de cada intensidade.
- Sistema de dano e quantidade de durabilidade perdida em cada colisão.
- Regra exata para determinar sobre qual objeto ou superfície o avião pousará ao final da descida.
- Efeitos específicos dos eventos: poças, vento, gatos e futuros obstáculos.
- Deslocamento, alcance e padrão fixo de movimento de cada obstáculo móvel a cada turno.
- Regras de detecção: quando um obstáculo vivo consegue ver o avião e em que alcance.
- Testar durante o desenvolvimento se o deslocamento padrão do cachorro deve ser de 3 casas por turno.
- Campo de ação e regras de orientação de eventos direcionais, como a patada do gato.
- Como calcular a nova trajetória depois de uma corrente de vento alterar o curso.
- Como apresentar ao jogador a previsão de deslocamento de obstáculos vivos sem substituir o planejamento.
- O que acontece quando o avião não alcança o destino.
- Orientação inicial do avião.
- Sistema de tentativas, reinício de fase e comportamento após game over.
- Condição detalhada de vitória e critérios para considerar uma fase concluída.

### Barra, câmera e Radar
- Velocidade, ciclo, indicação visual e momento de início da barra de intensidade.
- Comportamento da barra nos limites e possibilidade de cancelar a seleção.
- Características dos sons de cada intensidade.
- Tipo de câmera: rotação, zoom, ângulo livre, visão superior ou combinação.
- Ordem e repetição dos avisos sonoros quando houver elementos acima e abaixo.
- Métrica exata do raio de 6 casas do Radar e formato da área lida.
- Elementos incluídos no Radar, ordem do texto e organização das camadas Z.
- Se o Radar será ilimitado e sem custo, conforme a recomendação atual, ou terá alguma limitação.

### Fases, mapas e progressão
- Lista e sequência exatas dos aproximadamente cinco mapas de lançamento.
- Quantidade e tipos de cômodos da casa, conexões e pontos A/B de cada fase.
- Ordem e ramificações de desbloqueio dos cômodos e mapas.
- Pontuação recebida por fase, custos e requisitos de desbloqueio.
- Possibilidade de revisitar fases para obter mais pontos.
- Obstáculos, regras e elementos próprios de cada ambiente.
- Existência de narrativa e personagens ou estrutura totalmente abstrata.
- Quais mapas gratuitos serão lançados no pós-lançamento e com que frequência aproximada.

### Aviões e itens
- Como o peso altera vertical e horizontalmente o voo.
- Como a aerodinâmica complementa o peso sem duplicar sua função.
- Valores de sensibilidade ao vento e resistência à colisão.
- Outros atributos possíveis e equilíbrio entre os modelos.
- Modelo inicial, nomes, aparências e função estratégica dos aviões.
- Itens coletáveis ao pousar e seus efeitos.
- Possibilidade de amassar, dobrar ou modificar o avião.

### Interface, acessibilidade, arte e tecnologia
- Controles para toque e refinamentos dos requisitos de acessibilidade.
- Rótulos finais, ordem exata de foco e comportamento semântico de headings, botões e log.
- Direção visual e sonora além do uso de SVG.
- Forma de uso dos SVGs no espaço 3D: texturas, sprites, geometria vetorial, interface ou combinação.
- Engine/framework web e estratégia para preservar desempenho e nitidez.
- Escopo do primeiro protótipo web.
- Idioma padrão inicial, persistência da preferência e momento de aplicação da troca de idioma.

### Monetização e distribuição
- Escolha final entre jogo gratuito com anúncios, premium ou combinação.
- Recompensas de anúncios e frequência dos anúncios sem prejudicar o planejamento.
- Pacotes de aviões, cosméticos, remoção de anúncios e edição de apoiador.
- Preços finais regionais e apresentação da loja.
- Política para pacotes de pontos; sem backend, consumíveis continuam sendo mais frágeis.
- Integração nativa do AdMob e do Google Play Billing no Capacitor.
- Consentimento, privacidade e classificação etária para anúncios.
- Estratégia para progresso local, restauração de compras e ausência de sincronização própria entre aparelhos.

## 9. Registro de ideias

### IDEIA-003 — Fluxo de lançamento do avião
- **Origem:** definição inicial do fluxo de jogo.
- **Estado:** confirmada como núcleo provisório da jogabilidade.
- **Turnos:** cada lançamento constitui a execução do deslocamento do avião dentro de um turno.
- **Sequência:** o avião sobe verticalmente de acordo com a intensidade escolhida, avança horizontalmente na direção escolhida e por fim desce.
- **Verificação do trajeto:** durante todo o voo, cada casa atravessada é checada em busca de obstáculos e colisões.
- **Verificação do pouso:** ao final da descida, o jogo verifica se o avião pousará sobre algum objeto ou superfície.
- **Descrição:** o jogador observa o tabuleiro com uma câmera/visão, orienta o aviãozinho, escolhe uma intensidade, faz o lançamento e acompanha o voo. O objetivo é levá-lo do ponto A ao ponto B.
- **Intensidades:** fraco, médio e forte.
- **Efeito das intensidades:** cada uma produz uma altura e uma distância de voo diferentes.
- **Rotação:** dois botões permitem girar o avião em incrementos de 45° para a direita ou para a esquerda.
- **Alcance simulado:** lançamento fraco = altura 2Z e avanço horizontal 2; lançamento médio = altura 3Z e avanço horizontal 3; lançamento forte = altura 5Z e avanço horizontal 5.
- **Ocupação das casas:** durante o lançamento, o avião ocupa cada casa atravessada e sofre os efeitos dos eventos existentes nela.
- **Colisões:** uma colisão causa dano ao avião; a quantidade de dano ainda será definida.
- **Game over:** durabilidade igual a 0 encerra a fase.
- **Pouso sobre objetos:** se o avião cair sobre um objeto, a altura desse objeto passa a ser a nova altura inicial do avião no turno seguinte.
- **Questões em aberto:** fórmula/interpolação exata entre os pontos, sistema de dano, regra para escolher a superfície de pouso, efeitos específicos dos eventos e consequências de um lançamento malsucedido.

### IDEIA-004 — Barra de intensidade com confirmação por segundo pressionamento
- **Origem:** definição do controle de lançamento.
- **Estado:** confirmada como mecânica de seleção.
- **Descrição:** ao pressionar o botão de lançamento, uma barra alterna entre fraco, médio e forte. Um segundo pressionamento do mesmo botão confirma o nível atual e executa o lançamento.
- **Tabela de alcance inicial:**

  | Intensidade | Altura | Avanço horizontal |
  |---|---:|---:|
  | Fraco | 2Z | 2 casas |
  | Médio | 3Z | 3 casas |
  | Forte | 5Z | 5 casas |

- **Acessibilidade:** o nível selecionado terá representação sonora, além da indicação visual da barra.
- **Questões em aberto:** trajetória entre os pontos, velocidade da alternância, comportamento ao chegar ao limite, possibilidade de cancelar e características do som de cada nível.

### IDEIA-002 — Mundo 3D em grid com gráficos SVG
- **Origem:** definição inicial de direção visual e estrutural.
- **Estado:** confirmada como direção do projeto.
- **Descrição:** o jogo terá apresentação 3D, um mapa organizado em grid tridimensional e gráficos baseados em SVG.
- **Coordenadas:** o mapa será dividido nos eixos X, Y e Z.
- **Camadas de altura:** o eixo Z usará níveis inteiros associados à altura dos elementos do cenário. Referência inicial: chão/objeto imediatamente sobre o chão = Z=1; caixa = Z=2; banquinho ou mesa de centro = Z=3; cadeira = Z=4; mesa = Z=5; demais elementos seguem a mesma lógica.
- **Questões técnicas a validar:** como os SVGs serão usados no espaço 3D (texturas, sprites, elementos de interface, geometria vetorial ou combinação); qual engine/framework web atenderá melhor ao projeto; como preservar desempenho e nitidez em diferentes telas.

### IDEIA-005 — Casa como primeiro mapa
- **Origem:** definição da estrutura inicial de fases.
- **Estado:** confirmada.
- **Descrição:** o primeiro mapa do jogo será uma casa; cada cômodo funcionará como uma fase.
- **Questões em aberto:** quantidade e tipos de cômodos, ordem de progressão, conexões entre eles, pontos A e B de cada fase e elementos próprios de cada ambiente.

### IDEIA-006 — Eventos ambientais e reações do avião
- **Origem:** definição de eventos do cenário.
- **Estado:** confirmada como categoria de eventos; efeitos específicos ainda em expansão.
- **Poças d’água:** terão Z=1; cair sobre uma zera a durabilidade do avião e gera game over.
- **Game over:** alguns obstáculos e eventos poderão encerrar a fase imediatamente.
- **Correntes de vento:** alterarão o sentido do lançamento e possuirão diferentes intensidades.
- **Brisa da janela do quarto:** deslocará o avião duas casas para o sul, no sentido do vento.
- **Área proposta para a brisa:** uma faixa horizontal de 3 casas, abrangendo as camadas Z=4 até Z=6.
- **Alteração de curso:** se o avião for pego pela brisa, o curso mudará antes da descida e o avião seguirá o novo trajeto até pousar.
- **Eventos de arremesso:** alguns eventos poderão jogar o avião de volta ao chão, como a patada de um gato.
- **Questões em aberto:** validar a faixa horizontal de 3 casas entre Z=4 e Z=6, momento preciso da interceptação, cálculo da nova trajetória e como o avião é reposicionado após outros eventos de arremesso.

### IDEIA-007 — Navegação da câmera por coordenadas
- **Origem:** discussão sobre a forma de explorar o mapa.
- **Estado:** confirmada como navegação principal da câmera.
- **Requisito confirmado:** haverá um botão para aumentar Z em 1 e outro para diminuir Z em 1.
- **Controle principal:** botões direcionais farão o deslocamento discreto da câmera pelo grid, especialmente no plano X/Y, em passos de uma casa.
- **Alternativa futura:** navegação livre pelas coordenadas ou movimento livre da câmera poderá ser considerada como recurso secundário, se não prejudicar a leitura do grid.

### IDEIA-008 — Layout mobile orientado ao TalkBack
- **Origem:** definição do layout pela perspectiva de quem usa TalkBack.
- **Estado:** estrutura inicial confirmada; refinamento visual e implementação ainda pendentes.
- **Ordem da tela:** informações em headings no topo; controles da câmera; controles do avião; log das quatro últimas ações no rodapé.
- **Informações superiores:** fase atual, durabilidade atual e máxima, coordenadas atuais do avião e pontuação.
- **Grade da câmera:** primeira linha com elevar/Z+, norte e abaixar/Z−; segunda linha com esquerda, sul e direita.
- **Grade do avião:** rotação esquerda, lançamento e rotação direita.
- **Requisito de qualidade:** a ordem semântica, o foco do TalkBack e a disposição visual devem funcionar juntos, com conforto de leitura, contraste, espaçamento e áreas de toque adequados.
- **Questões em aberto:** rótulos finais, ordem exata de foco, dimensões, estilo visual, comportamento do log e testes em diferentes tamanhos de tela.

### IDEIA-009 — Botão Radar para leitura semântica do tabuleiro
- **Origem:** proposta baseada no Scan utilizado no Dino Crawler; o nome do recurso no Ás de papel será Radar.
- **Estado:** confirmada como elemento da interface e suporte à leitura do tabuleiro.
- **Motivo:** como o foco da dificuldade está no planejamento estratégico de cada turno, a visibilidade das informações do mapa não precisa ser uma barreira. O Radar ajudará a pessoa a consultar e compreender o espaço sem depender exclusivamente da visão.
- **Função recomendada:** anunciar a posição do avião e os elementos relevantes próximos à posição atual, com nome, coordenadas/altura, relação espacial e orientação, incluindo obstáculos, poças, vento, objetos e eventos.
- **Centro da leitura:** o Radar será baseado na posição atual do avião, e não na posição da câmera.
- **Orientação dos elementos:** o Radar deverá informar para que direção um obstáculo ou evento está voltado quando essa direção afetar seu comportamento.
- **Raio de leitura:** o alcance inicial será de 6 casas a partir da posição atual do avião.
- **Volume de informação:** a leitura poderá gerar mais texto por causa das camadas do eixo Z; esse volume é considerado necessário para compreender o tabuleiro tridimensional.
- **Aviso vertical durante a exploração:** ao mover a câmera por uma coordenada, haverá aviso sonoro se existir algo acima ou abaixo daquela posição, inclusive quando a câmera estiver em Z=0.
- **Organização necessária:** o texto deverá ser estruturado por posição/camada para continuar compreensível mesmo com muitos elementos.
- **Posicionamento recomendado:** depois dos controles da câmera e antes dos controles do avião, mantendo a ordem semântica “observar → consultar o Radar → agir”.
- **Acessibilidade:** o resultado completo deve ser anunciado pelo TalkBack/NVDA e também aparecer no log de forma resumida. O Radar não deve depender apenas de cor, animação ou som.
- **Custo recomendado:** não consumir turno nem durabilidade. Diferentemente do Dino Crawler, a recomendação inicial é não limitar o Radar por munição, pois aqui ele também funciona como suporte de compreensão do tabuleiro.
- **Área de leitura:** ainda será definida; como a visibilidade do mapa não é o principal elemento de dificuldade, o Radar não precisa esconder informações para preservar o desafio estratégico.
- **Questões em aberto:** raio ou área coberta pelo Radar a partir do avião, elementos incluídos, formato da leitura e se haverá alguma limitação opcional.

### IDEIA-010 — Avisos sonoros de presença vertical
- **Origem:** definição da exploração do mapa com a câmera.
- **Estado:** confirmada como recurso de orientação espacial.
- **Descrição:** ao explorar uma coordenada com a câmera, o jogo emitirá um aviso sonoro se houver algo acima ou abaixo dela. A regra também vale quando a câmera estiver em Z=0.
- **Objetivo:** indicar que existe conteúdo em outra camada vertical sem exigir que a pessoa esteja visualmente posicionada naquela altura.
- **Código sonoro:** algo acima será representado por um som mais agudo; algo abaixo, por um som mais grave.
- **Sequência:** avisos múltiplos serão reproduzidos em sequência, evitando sobreposição sonora.
- **Questões em aberto:** ordem dos avisos, repetição do aviso, indicação de distância/quantidade e relação com o Radar.

### IDEIA-011 — Progressão não linear por pontos
- **Origem:** definição da progressão entre os cômodos da casa.
- **Estado:** confirmada como estrutura de progressão.
- **Descrição:** o jogador acumulará pontos e usará esse total para desbloquear novas fases. O mapa não terá uma única sequência linear; haverá diferentes caminhos possíveis entre os cômodos.
- **Questões em aberto:** como os pontos são obtidos, requisitos de cada fase, quantidade de pontos por desbloqueio, ramificações, possibilidade de revisitar fases e função da pontuação exibida na interface.

### IDEIA-012 — Loja entre as fases e aviões desbloqueáveis
- **Origem:** definição da progressão e personalização do avião.
- **Estado:** confirmada como sistema do jogo; economia e atributos ainda em definição.
- **Descrição:** haverá uma loja acessível pelo menu entre as fases. Nela, o jogador poderá usar pontos para desbloquear novas fases e novos modelos de avião.
- **Moeda:** os pontos serão a moeda do jogo e da loja.
- **Aviões:** cada modelo poderá ter aparência e durabilidade diferentes, além de outras diferenças estratégicas que serão consideradas.
- **Itens de pouso:** poderá haver um item coletável na casa onde o avião pousar, substituindo a ideia de recuperação automática como possível fonte de recursos/efeitos.

#### Tabela inicial de atributos — proposta

| Atributo | Função no jogo | Estado |
|---|---|---|
| Aparência | Diferencia visualmente o modelo | Confirmado |
| Durabilidade máxima | Define quanto dano o avião suporta | Confirmado |
| Peso | Afeta o deslocamento vertical e horizontal | Aprovado para consideração |
| Aerodinâmica | Pode afetar a eficiência do voo e a relação entre subida, avanço e descida | Candidato forte |
| Alcance horizontal | Pode alterar a distância percorrida em cada intensidade, caso não seja totalmente determinado pelo peso e pela aerodinâmica | Candidato |
| Resistência a colisões | Pode reduzir o dano sofrido em impactos | Aprovado para consideração |
| Resistência a eventos | Pode reduzir efeitos de gatos, poças ou outros eventos | Candidato |
| Sensibilidade ao vento | Pode aumentar ou reduzir o desvio causado pelo vento | Aprovado para consideração |
| Controle direcional | Pode alterar a precisão da direção escolhida | Candidato |

#### Matriz inicial dos modelos

| Modelo | Aparência | Durabilidade | Outros atributos | Estado |
|---|---|---|---|---|
| Avião inicial | A definir | Referência básica | Referência básica | Necessário |
| Modelo 2 | A definir | Diferente do inicial | A definir | Em proposta |
| Modelo 3 | A definir | Diferente do inicial | A definir | Em proposta |

- **Questões em aberto:** preços, categorias e apresentação da loja; valores concretos de como o peso afetará o voo; valores de sensibilidade ao vento e resistência à colisão; se o alcance horizontal será totalmente derivado do peso; outros atributos que serão usados; equilíbrio entre os modelos; itens coletáveis ao pousar; modelo inicial; e se novos aviões são permanentes ou selecionáveis por fase.

### IDEIA-013 — Orientação dos obstáculos e eventos
- **Origem:** definição do planejamento direcional dos turnos.
- **Estado:** confirmada como princípio de design.
- **Descrição:** a posição e a direção para a qual um obstáculo ou evento está voltado influenciam seu efeito e devem ser consideradas antes do lançamento.
- **Correntes de vento:** terão direção própria; o jogador poderá evitar ou aproveitar seu sentido.
- **Gato:** a direção para a qual o gato está olhando determinará a área relevante para sua patada.
- **Radar:** deverá informar a orientação de elementos quando ela for relevante para o comportamento do evento.
- **Questões em aberto:** alcance direcional de cada evento, campo de ação, comportamento quando o avião atravessa a área pela lateral/trás e forma visual/sonora de comunicar a orientação.

### IDEIA-018 — Deslocamento de obstáculos móveis por turno
- **Origem:** definição do comportamento de obstáculos móveis.
- **Estado:** confirmada como regra de movimento simultâneo e determinístico; regras de detecção ainda abertas.
- **Descrição:** obstáculos móveis também terão deslocamento por turno. A lógica será equivalente à de um lançamento, mas adaptada ao contexto de cada elemento, e ocorrerá simultaneamente ao lançamento do jogador.
- **Padrão fixo:** obstáculos vivos não terão intensidades diferentes para o mesmo comportamento. Cada obstáculo terá um padrão de deslocamento previsível e repetível.
- **Exemplo de gato:** andar duas casas na horizontal, saltar, avançar mais uma casa na horizontal e descer; esse padrão será sempre igual.
- **Exemplo de cachorro:** não voará; olhará para uma direção, andará nessa direção durante o turno e mudará o olhar no turno seguinte. O deslocamento padrão provisório considerado é 3 casas, sujeito a teste e balanceamento durante o desenvolvimento.
- **Perseguição:** se o avião parar à frente do cachorro e for percebido, o cachorro tentará persegui-lo; o jogador poderá precisar mudar a direção para distraí-lo.
- **Colisão:** se o avião e um obstáculo ocuparem a mesma casa, ocorrerá colisão.
- **Cachorro:** é um obstáculo fatal; ao ver o avião, tentará pegá-lo e rasgá-lo, gerando game over.
- **Planejamento:** o jogador deverá calcular todas as casas do trajeto do avião e compará-las com as casas que os obstáculos vivos percorrerão no mesmo turno.
- **Questões em aberto:** confirmar o deslocamento de 3 casas, regras de visão do cachorro, duração da perseguição, obstáculos bloqueados por objetos e forma de comunicar/prever o deslocamento sem substituir o raciocínio do jogador.

### IDEIA-019 — Primeira fase de validação: quarto
- **Origem:** definição do primeiro protótipo jogável.
- **Estado:** planejamento confirmado para iniciar o desenvolvimento.
- **Descrição:** a primeira fase será ambientada no quarto e servirá para validar as mecânicas básicas do avião, do grid, da câmera, dos turnos, do lançamento e do pouso.
- **Distribuição inicial de obstáculos:** o gato será reservado para a fase da sala; o cachorro, para a fase do quintal.
- **Ponto A:** o sofá/sofázinho do quarto.
- **Ponto B:** a porta do quarto, representando a saída da fase.
- **Elementos do cenário:** cadeira, escrivaninha, cama, par de chinelos, guarda-roupas, janela aberta com corrente de vento, caixa de brinquedos e um sofázinho.
- **Distribuição provisória:** foi criada uma simulação de grid 12x10 em `simulacao-quarto-v0.1.md`, com os elementos espalhados para criar diferentes rotas e decisões de pouso.
- **Alturas provisórias:** sofázinho Z=3, cadeira Z=3, cama Z=4, caixa de brinquedos Z=2, escrivaninha Z=5 e guarda-roupas Z=10; chinelos e chão Z=1.
- **Guarda-roupas:** será apenas obstáculo; não permitirá pouso, pois mesmo partindo da escrivaninha o avião não alcançará sua altura.
- **Objetos que permitem pouso:** sofá, caixa de brinquedos, chinelos, cama, escrivaninha e cadeira.
- **Questões em aberto:** coordenadas finais, Z da janela, intensidade/direção do vento, quantidade de lançamentos esperada e critério de sucesso do protótipo.

### IDEIA-021 — Rejeição da direção sonora Cartoon
- **Origem:** avaliação da nova leva de candidatos de áudio.
- **Estado:** direção rejeitada para o projeto.
- **Conclusão:** a vibe Cartoon, os sons de avião antigo e a abordagem de efeitos sintetizados ainda soaram como beeps cartoon, mesmo quando receberam mais camadas e corpo.
- **Candidatos afetados:** os 19 sons da nova leva foram descartados; nenhum será integrado.
- **Aprendizado:** alterar o timbre de um beep não basta; a linguagem sonora inteira precisa deixar de ser sintética e tonal.
- **Próximo passo:** testar uma direção baseada em gravações/foley reais antes de qualquer nova integração.

### IDEIA-022 — Possíveis novas direções sonoras
- **Estado:** opções de brainstorming; nenhuma escolhida.

1. **Foley de papel e casa:** sons táteis de papel, ar, madeira, tecido, piso e objetos do quarto. Identidade forte, natural e aplicável aos mapas futuros.
2. **Realismo estilizado:** ambiente doméstico reconhecível, com sons um pouco exagerados para manter clareza sem cair no Cartoon.
3. **Minimalismo musical:** sons curtos baseados em intervalos e acordes, sem beeps secos e sem melodias longas.
4. **Retro analógico sóbrio:** sintetizadores quentes e texturizados, evitando timbres digitais de beep.
5. **Híbrido recomendado:** foley de papel e ambiente realista para ações/eventos, com feedback musical minimalista para Radar, intensidade, direção e estados.

- **Recomendação inicial:** testar primeiro um conjunto de gravações/foley reais, usando sons físicos de papel, ar, tecido, madeira, borracha e ambiente doméstico.
- **Rodada avaliada:** foram enviados ao Sound Testing 23 novos candidatos de áudio sintetizados; todos foram rejeitados porque ainda soavam como beeps cartoon.
- **Sons aprovados no Sound Testing:** os três candidatos reais de vento do OpenGameArt foram aprovados: `04-oga-short-wind-sound-cc0.wav`, `05-oga-mild-wind-background-cc0.wav` e `06-oga-wind-whoosh-loop-cc0.ogg`. O segundo mantém o crédito recomendado na página de origem; os créditos estão registrados no `sound-testing/OGA-CREDITS.md`.
- **Rodada do OpenGameArt aprovada:** sete efeitos gravados foram aprovados: dois de virar papel, um de puxar papel, dois de tecido, um impacto e um de abrir papel. Quatro candidatos foram rejeitados e removidos. Os créditos e as fontes estão em `sound-testing/OGA-FOLEY-CREDITS.md`.
- **Faixa aprovada:** `03-morning-kevin-macleod-cc-by4.mp3`, “Morning”, de Kevin MacLeod, licenciada sob Creative Commons Attribution 4.0; a atribuição deverá ser preservada.
- **Rodada complementar do OpenGameArt:** seis candidatos foram aprovados: um rasgo de papel, uma variação de porta aberta, um fechamento de madeira, uma batida de madeira e um rangido de madeira. Os 11 candidatos restantes foram rejeitados e removidos. Os créditos e as fontes estão em `sound-testing/OGA-FOLEY-CREDITS.md`.
- **Rodada de interface/Radar do OpenGameArt:** dois candidatos foram aprovados: um sino acústico curto e um clique simples. Os três sinos restantes foram rejeitados e removidos. Os créditos e as fontes estão em `sound-testing/OGA-FOLEY-CREDITS.md`.
- **Direção proposta para o voo:** buscar um som breve de motor a pistão antigo, lembrando aviões de hélice da Segunda Guerra Mundial. Sons longos de motores de carros antigos também podem servir como matéria-prima, desde que tenham caráter mecânico realista; o trecho poderá ser cortado, ajustado e posto em loop. Evitar motor a jato, motor moderno dominante e qualquer beep sintetizado.
- **Som aprovado para o voo:** `37-spitfire-mkix-1943-takeoff-by-sonniss-candidate.wav`, trecho de gravação real de um Supermarine Spitfire Mk IX de 1943, com licença Sonniss compatível com uso comercial. A aprovação é para futura integração no voo; o uso exato em lançamento, deslocamento e/ou passagem ainda será definido no protótipo.
- **Total atual aprovado:** 20 arquivos de áudio.
- **Nova regra:** não usar efeitos sintetizados com estrutura de beep, nem tentar resolver isso apenas adicionando camadas, graves ou reverberação.
- **Princípios:** sons curtos, distintos, sem competir com TalkBack/NVDA, sem depender apenas de cor e sem usar fala sintetizada do jogo.

### IDEIA-023 — Música aprovada para a fase do quarto
- **Origem:** seleção do Anderson no Sound Testing.
- **Estado:** aprovada para futura integração.
- **Arquivo:** `03-morning-kevin-macleod-cc-by4.mp3`, na pasta Música e outros.
- **Faixa:** “Morning”, de Kevin MacLeod.
- **Licença:** Creative Commons Attribution 4.0; a atribuição deverá ser mantida no projeto e nos créditos apropriados.
- **Observação:** essa aprovação vale para a música. Os três efeitos de vento, os seis efeitos complementares e os dois sons de interface/Radar do OpenGameArt também foram aprovados separadamente. O trecho de decolagem/sobrevoo do Supermarine Spitfire Mk IX foi aprovado posteriormente para a camada de voo, totalizando 20 arquivos aprovados. Os demais candidatos de motor foram removidos do Sound Testing. Os 23 efeitos e esboços sintéticos da rodada anterior foram rejeitados.

### IDEIA-020 — Sons da fase do quarto: rodada descartada
- **Origem:** primeira seleção do Anderson no Sound Testing.
- **Estado:** todos descartados posteriormente; nenhum som desta rodada será integrado.
- **Observação:** a aprovação anterior foi revogada quando a direção Cartoon foi abandonada.
- **Próximo passo:** gerar uma nova rodada somente depois de escolher outra direção sonora.

### IDEIA-001 — Aviãozinho de papel como unidade jogável
- **Origem:** conceito inicial do projeto.
- **Estado:** confirmada como fantasia central; mecânicas ainda abertas.
- **Perguntas associadas:** o papel pode amassar? Há modelos diferentes? O vento e a gravidade são regras centrais? O avião pode ser redesenhado ou dobrado?

### IDEIA-014 — Suporte bilíngue
- **Origem:** definição de idiomas do projeto.
- **Estado:** confirmado.
- **Idiomas:** Português e Inglês.
- **Abrangência:** interface, mensagens, log, instruções, nomes de elementos e textos de acessibilidade deverão acompanhar o idioma selecionado.
- **Seleção inicial:** na primeira execução, o jogo exibirá uma tela para escolha entre Português e Inglês.
- **Alteração posterior:** o idioma poderá ser alterado posteriormente no menu de opções.
- **Questões em aberto:** persistência da preferência, momento de aplicação da troca e revisão das traduções.

### IDEIA-015 — Monetização sem backend próprio
- **Origem:** análise de publicação como app na Google Play usando web/Capacitor.
- **Estado:** proposta, sem decisão final.
- **Anúncios possíveis:** banner somente em menus; intersticial apenas em transições naturais, como entre fases; anúncio recompensado opcional após uma fase para conceder um bônus controlado de pontos ou outra recompensa que não revele a solução.
- **Compras possíveis:** remoção de anúncios; pacotes de aviões; cosméticos; pacote de apoiador; pacotes ocasionais de mapas/fases; combinação de itens em um pacote. Priorizar produtos não consumíveis para facilitar restauração sem backend.
- **Pacotes de mapas:** são viáveis como produtos não consumíveis de compra única. A opção mais simples é incluir os mapas no aplicativo por meio de uma atualização e usar a compra apenas para liberar o conteúdo.
- **Modelo validado:** a compra libera o mapa/pacote, mas as fases ainda precisam ser jogadas para serem liberadas. A compra não pula a progressão interna.
- **Lançamento:** aproximadamente cinco mapas completos serão incluídos no lançamento.
- **Pós-lançamento:** novos mapas serão majoritariamente pagos, intercalados com mapas gratuitos ocasionais para manter o interesse e evitar que o jogo desapareça após o lançamento.
- **Preço de referência:** aproximadamente US$1 por pacote, sujeito à conversão e precificação regional da loja.
- **Progressão:** os mapas dentro do pacote seguirão a progressão por pontos e pela conclusão das fases, preservando o planejamento e evitando que a compra substitua o jogo.
- **Escala bruta:** vinte pacotes vendidos a US$1 para a mesma pessoa representam US$20 brutos antes de taxas, impostos, reembolsos e ajustes regionais.
- **Alternativa mais complexa:** entregar mapas depois da compra sem atualização exigiria hospedagem/entrega de conteúdo e uma estratégia de validação mais robusta, aproximando o projeto de uma dependência externa.
- **Pontos:** como são a moeda do jogo, vender pontos diretamente pode enfraquecer a progressão e é mais frágil sem backend. Deve ser avaliado separadamente.
- **Assinaturas:** não parecem necessárias para o primeiro jogo, pois não há serviço contínuo previsto.
- **Limitações sem backend:** não haverá sincronização própria de progresso/saldo entre aparelhos; consumíveis dependem de inventário local e são mais difíceis de restaurar com segurança.
- **Questões em aberto:** modelo final, tipos de pacote, recompensas de anúncios e equilíbrio entre monetização, acessibilidade e estratégia.

### IDEIA-017 — Mapeamento de teclado
- **Origem:** definição dos controles para teclado.
- **Estado:** mapeamento inicial confirmado.
- **Comandos:** A rotaciona o avião 45° para a esquerda; D rotaciona 45° para a direita; barra de espaço executa o lançamento em duas etapas; S consulta a pontuação; H consulta a durabilidade; R aciona o Radar; W consulta a direção atual; setas movem a câmera para norte, sul, leste e oeste; Page Up aumenta Z; Page Down diminui Z; Enter confirma/ativa opções; Esc cancela/volta.
- **Feedback de direção:** TalkBack/NVDA anunciarão quando a direção do avião for alterada.
- **Questões em aberto:** comportamento do foco/teclado durante a barra de intensidade, formato do anúncio de direção e eventuais atalhos adicionais.

### IDEIA-016 — Progressão de mapas: familiar, surreal e fantástico
- **Origem:** definição da evolução temática dos mapas.
- **Estado:** confirmada como direção de conteúdo.
- **Mapa inicial:** a casa será o mapa de introdução, ensinando as mecânicas por meio de situações familiares e logicamente esperadas ao lançar um avião dentro de casa.
- **Segunda camada:** os mapas avançarão para situações mais surreais, com exemplos como fazenda e shopping.
- **Camada fantástica:** depois, o jogo poderá explorar a terra das fadas, o espaço, um vilarejo medieval e outros cenários ainda mais imaginativos.
- **Questões em aberto:** sequência exata dos mapas, quantidade de mapas por camada, mecânicas introduzidas em cada mapa e relação entre a progressão temática e o desbloqueio não linear por pontos.

## 10. Próximo passo recomendado

Capturar livremente as próximas ideias, sem exigir ordem. Depois, organizar cada uma em: núcleo do jogo, mecânicas, fases, progressão, narrativa, interface, acessibilidade, tecnologia ou escopo.

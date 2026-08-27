# Ás de papel — Simulação de distribuição do quarto v0.1

> Proposta de distribuição para o primeiro protótipo. As coordenadas são provisórias e servem para testar o fluxo básico; não são decisões finais de level design.

## Convenções

- Grid horizontal de teste: X=0..11 e Y=0..9.
- Norte: Y=0. Sul: Y=9. Oeste: X=0. Leste: X=11.
- O chão usa Z=1.
- `#` representa parede/limite do cômodo.
- As alturas provisórias definidas para o quarto são: sofázinho Z=3, cadeira Z=3, cama Z=4, caixa de brinquedos Z=2, escrivaninha Z=5 e guarda-roupas Z=10. A altura da janela ainda está **a definir**.
- A direção do avião começa como **a definir**; a orientação inicial do mapa será escolhida durante o protótipo.
- A brisa da janela desloca o avião 2 casas para o sul quando ele é pego pelo vento, alterando o curso antes da descida.
- Área proposta da brisa: faixa horizontal de 3 casas, nas camadas Z=4, Z=5 e Z=6.

## Distribuição proposta

| Elemento | Coordenada/área X,Y | Z/superfície | Função no teste | Permite pouso? |
|---|---|---|---|---|
| Sofázinho / ponto A | (1,8) | Z=3 | Ponto inicial do avião | Sim |
| Porta / ponto B | (11,5) | Z=1 | Saída da fase | Não se aplica |
| Janela aberta | (5,0) na parede norte | A definir | Origem de uma brisa que desloca 2 casas para o sul | Não se aplica |
| Cama | X=2..5, Y=1..2 | Z=4 | Obstáculo grande e plataforma | Sim |
| Guarda-roupas | X=8..9, Y=1..2 | Z=10 | Obstáculo vertical | Não |
| Cadeira | (6,3) | Z=3 | Plataforma/obstáculo | Sim |
| Escrivaninha | X=7..8, Y=3..4 | Z=5 | Plataforma e obstáculo | Sim |
| Par de chinelos | (2,7) e (3,7) | Z=1 | Obstáculos baixos no caminho inicial | Sim |
| Caixa de brinquedos | (8,7) | Z=2 | Obstáculo/plataforma baixa | Sim |

## Grade horizontal proposta

```text
Norte / Y=0
      X=0 1 2 3 4 5 6 7 8 9 10 11
Y=0   #  #  #  #  #  J  #  #  #  #  #  #
Y=1   #  #  B  B  B  B  .  .  G  G  #  #
Y=2   #  #  B  B  B  B  .  .  G  G  #  #
Y=3   #  .  .  .  .  .  C  E  E  .  .  #
Y=4   #  .  .  .  .  .  .  E  E  .  .  #
Y=5   #  .  .  .  .  .  .  .  .  .  .  D
Y=6   #  .  .  .  .  .  .  .  .  .  .  #
Y=7   #  .  S  S  .  .  .  .  T  .  .  #
Y=8   #  A  .  .  .  .  .  .  .  .  .  #
Y=9   #  #  #  #  #  #  #  #  #  #  #  #

Sul / Y=9
```

### Legenda

- `A`: sofázinho / ponto A.
- `D`: porta / ponto B.
- `J`: janela aberta com corrente de vento.
- `B`: cama, em X=2..5/Y=1..2.
- `C`: cadeira, em X=6/Y=3.
- `E`: escrivaninha.
- `G`: guarda-roupas.
- `S`: chinelos.
- `T`: caixa de brinquedos.
- `.`: casa livre.
- `#`: parede ou limite do cômodo.

## Rotas de teste sugeridas

1. **Teste básico:** A → corredor central → D, sem considerar vento ou colisões complexas.
2. **Teste de plataforma:** A → área da cadeira/escrivaninha → rota intermediária → D.
3. **Teste de obstáculo baixo:** A → proximidade dos chinelos → verificar ocupação de casas e colisão.
4. **Teste de vento:** lançar a partir de uma posição em que a corrente da janela altere o sentido do voo.
5. **Teste de planejamento:** comparar a trajetória do avião com o deslocamento de um obstáculo móvel quando ele for introduzido em uma versão posterior.

## Questões para validar no protótipo

- Se os demais objetos permitem pouso ou se alguns apenas bloqueiam/causam colisão.
- Qual será o Z da janela e qual ponto da janela representa a origem da corrente de vento.
- Validar a faixa horizontal de 3 casas entre Z=4 e Z=6, o momento em que captura o avião e o cálculo do novo trajeto.
- Se os chinelos são obstáculos, eventos ou apenas elementos decorativos.
- Se a porta ocupa uma casa ou uma área de saída.
- Se a proposta de 12x10 casas oferece espaço suficiente para o alcance 2/3/5.
- Se `2Z/3Z/5Z` representa deslocamento vertical relativo ou altura absoluta; essa definição é necessária quando o ponto A estiver sobre um objeto.

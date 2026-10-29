# Análise de Discovery — Aplicação de Previsão do Tempo

## Contexto

A empresa solicitou uma aplicação de previsão do tempo para que usuários consultem informações meteorológicas de cidades. A experiência deve permitir busca por cidade, consulta do clima atual e da previsão para os próximos cinco dias, escolha entre Celsius e Fahrenheit e uso em dispositivos móveis.

O briefing ainda não define público-alvo específico, origem dos dados meteorológicos, critérios de busca, detalhes das informações exibidas nem metas de desempenho.

## Requisitos Funcionais

- **RF-01 — Buscar cidades:** permitir que o usuário pesquise uma cidade.
- **RF-02 — Consultar clima atual:** exibir as condições meteorológicas atuais da cidade selecionada.
- **RF-03 — Consultar previsão:** exibir a previsão para cinco dias da cidade selecionada.
- **RF-04 — Alternar unidade:** permitir alternar entre Celsius e Fahrenheit para os valores de temperatura.
- **RF-05 — Usar em dispositivos móveis:** disponibilizar uma interface utilizável em dispositivos móveis.

## Requisitos Não-Funcionais

- **RNF-01 — Responsividade:** a interface deve se adaptar a dispositivos móveis. Os tamanhos de tela e navegadores suportados precisam ser definidos.
- **RNF-02 — Usabilidade móvel:** busca, consulta da previsão e alternância de unidade devem poder ser realizadas em dispositivos móveis.
- **RNF-03 — Atualidade dos dados:** as informações meteorológicas devem representar dados atuais e previsões recentes. A frequência de atualização aceitável precisa ser definida.
- **RNF-04 — Desempenho:** o tempo máximo aceitável para buscar uma cidade e exibir os dados precisa ser definido.
- **RNF-05 — Disponibilidade:** a aplicação depende da disponibilidade da fonte de dados meteorológicos; o comportamento durante indisponibilidade precisa ser definido.

## Riscos

- A fonte externa de dados pode estar indisponível, apresentar latência ou impor limites de uso.
- Resultados de busca podem ser ambíguos quando cidades têm nomes iguais ou semelhantes.
- Os dados e a cobertura geográfica disponíveis podem variar conforme a fonte escolhida.
- Diferenças de fuso horário podem tornar ambígua a apresentação dos cinco dias de previsão.
- Sem metas de desempenho, atualização e compatibilidade móvel, pode ser difícil verificar se a experiência atende às expectativas.
- A conversão entre Celsius e Fahrenheit pode gerar diferenças de arredondamento ou apresentação se as regras não forem definidas.

## Perguntas em Aberto

1. A busca deve aceitar apenas nomes de cidades ou também países, estados, códigos postais e localização atual?
2. Como o usuário deve escolher entre cidades com nomes iguais ou semelhantes?
3. Qual fonte de dados meteorológicos deve ser usada? Há requisitos de licença, custo, cobertura ou limites de uso?
4. Quais informações devem aparecer no clima atual e em cada dia da previsão?
5. “Previsão de cinco dias” significa cinco dias corridos a partir de hoje ou os próximos cinco dias completos no fuso local da cidade?
6. A unidade escolhida deve persistir entre visitas ou sessões?
7. Devem ser exibidos apenas Celsius e Fahrenheit, ou outras unidades, como velocidade do vento, também precisam ser configuráveis?
8. Quais navegadores, tamanhos de tela e sistemas operacionais móveis devem ser suportados?
9. Quais são os tempos máximos aceitáveis de resposta e a frequência mínima de atualização dos dados?
10. Qual deve ser o comportamento quando a cidade não for encontrada, a conexão falhar ou a fonte de dados estiver indisponível?
11. Há requisitos de acessibilidade, idioma, localização ou suporte a múltiplos idiomas?
12. O produto precisa oferecer recursos adicionais, como salvar cidades favoritas ou consultar mais de uma cidade?

## Suposições

- A busca selecionará uma cidade antes da exibição dos dados meteorológicos.
- Clima atual e previsão de cinco dias serão apresentados para a cidade selecionada.
- A alternância entre Celsius e Fahrenheit afetará os valores de temperatura exibidos.
- A experiência móvel faz parte do produto desde o início, e não será tratada como uma extensão posterior.
- Uma fonte externa de dados meteorológicos será necessária; sua escolha permanece em aberto.
- Recursos não citados no briefing, como contas, favoritos, alertas e histórico, não são considerados parte do escopo confirmado.
# Análise de Discovery — Weather App

## Contexto

O produto é um site responsivo de consulta meteorológica para o público geral, com lançamento inicial no Brasil e busca de cidades em cobertura global. O usuário poderá consultar o clima atual, a previsão diária dos próximos cinco dias e o histórico diário dos sete dias anteriores. O app não exigirá conta.

A experiência será em pt-BR no lançamento, mas a estrutura deve permitir inclusão de outros idiomas. A fonte de dados precisa cobrir geocodificação global, clima atual, previsão e histórico. A escolha do provedor depende da validação de cobertura, preço e confiabilidade.

## Requisitos Funcionais

- **RF-01 — Buscar cidades:** aceitar nome da cidade, estado/região, país e código postal. Exibir sugestões após dois caracteres, até cinco resultados, distinguindo cidades por cidade, estado/região e país. A busca deve tolerar acentos e variações de grafia quando suportado pelo provedor.
- **RF-02 — Consultar clima atual:** para uma cidade encontrada, exibir temperatura, condição, sensação térmica, máxima e mínima do dia, vento, umidade e probabilidade de chuva para o restante do dia. Exibir o horário da observação no fuso local da cidade.
- **RF-03 — Consultar previsão:** exibir um resumo diário para hoje e os quatro dias seguintes, no fuso local da cidade, com condição, máxima, mínima e probabilidade de chuva.
- **RF-04 — Consultar histórico:** oferecer, em aba separada, histórico diário dos sete dias anteriores, com condição, máxima, mínima e precipitação observada. Carregar os dados somente quando a aba for aberta.
- **RF-05 — Alternar unidade de temperatura:** permitir Celsius e Fahrenheit, com Celsius como padrão. Aplicar a seleção a clima atual, previsão e histórico, exibir uma casa decimal e persistir a preferência no navegador.
- **RF-06 — Usar localização atual:** oferecer a ação explícita “Usar minha localização”. Solicitar permissão somente após essa ação; transmitir coordenadas precisas apenas durante a consulta, sem armazená-las. Com consentimento, salvar somente a cidade resolvida no navegador por até 30 dias. Permitir apagar a localização salva. Se a permissão for negada ou falhar, manter a busca manual disponível.
- **RF-07 — Gerenciar cidades favoritas:** permitir salvar até cinco cidades localmente, sem conta, e apagá-las independentemente da localização salva.
- **RF-08 — Atualizar dados:** atualizar automaticamente a cada 30 minutos enquanto a página estiver visível e oferecer atualização manual. Pausar a atualização automática quando a aba estiver oculta.
- **RF-09 — Tratar busca sem resultados:** informar que nenhuma cidade foi encontrada e oferecer sugestões para corrigir a pesquisa ou encontrar cidades próximas.
- **RF-10 — Tratar indisponibilidade:** usar cache de até 24 horas, indicando que os dados estão antigos e quando foram obtidos. Sem cache válido, exibir erro e oferecer nova tentativa. Se a cota do provedor for atingida, aplicar o mesmo comportamento.
- **RF-11 — Gerenciar privacidade:** solicitar consentimento explícito para analytics, permitir revogá-lo nas configurações de privacidade e manter todas as funções disponíveis quando o consentimento for recusado.

## Requisitos Não-Funcionais

- **RNF-01 — Responsividade:** suportar celulares a partir de 375 px de largura, tablets e desktops, sem rolagem horizontal na largura mínima definida.
- **RNF-02 — Compatibilidade:** suportar as duas versões principais mais recentes de Chrome, Edge, Safari e Firefox.
- **RNF-03 — Acessibilidade:** atender à WCAG 2.2 nível AA.
- **RNF-04 — Desempenho:** exibir o clima após uma busca em até três segundos, medidos como tempo médio em condições normais de rede. A atualização manual também deve respeitar essa meta quando o provedor responder dentro das condições esperadas.
- **RNF-05 — Disponibilidade:** manter o site acessível em pelo menos 99% do tempo por mês. Essa meta mede a disponibilidade do app, não a disponibilidade do provedor.
- **RNF-06 — Sucesso dos dados:** medir separadamente o carregamento de clima atual, previsão e histórico. A meta inicial é de pelo menos 90% de sucesso para cada bloco, considerando apenas consultas válidas para cidades encontradas. Para o indicador principal, a consulta conta como sucesso quando o clima atual carrega.
- **RNF-07 — Atualidade:** atualizar dados a cada 30 minutos durante uso ativo; dados de cache com até 24 horas podem ser apresentados somente com aviso e horário da última atualização.
- **RNF-08 — Privacidade e conformidade:** atender à LGPD. Coordenadas precisas podem ser transmitidas temporariamente ao provedor para resolver a localização, mas não armazenadas. Analytics deve ser agregado, não incluir nomes de cidades nem localização precisa e ser retido por até 90 dias. Publicar política de privacidade no lançamento.
- **RNF-09 — Idioma e formatos:** oferecer interface em pt-BR no lançamento, datas e horários em formato local brasileiro, relógio de 24 horas e unidades métricas para vento e precipitação. A arquitetura deve permitir outros idiomas futuramente.
- **RNF-10 — Uso comercial e atribuição:** o provedor deve permitir uso comercial. Exibir atribuição quando exigida pelos termos do serviço.
- **RNF-11 — Orçamento de dados:** buscar opções de provedor dentro do teto inicial de R$ 100 por mês. Se não houver opção que cubra o histórico obrigatório nesse teto, solicitar aprovação para aumento de orçamento antes da contratação.
- **RNF-12 — Escala inicial:** considerar até mil consultas por dia no lançamento.

## Riscos

- Pode não haver provedor dentro do teto inicial que ofereça cobertura global, clima atual, previsão e histórico diário, com termos comerciais aceitáveis.
- A meta de disponibilidade do site não garante disponibilidade dos dados externos; cache limitado a 24 horas reduz, mas não elimina, esse impacto.
- A cobertura de códigos postais, nomes alternativos, cidades pequenas e histórico pode variar por região e provedor.
- A probabilidade de chuva até o fim do dia e os dados históricos podem não estar disponíveis de forma uniforme em todas as localidades.
- Metas de sucesso de 90% por bloco podem ser difíceis de atingir globalmente e precisam ser acompanhadas por região e provedor.
- O envio de cidade ou coordenadas a um serviço externo, mesmo com divulgação e finalidade específica, exige transparência e avaliação dos termos de privacidade do provedor.
- A persistência local de cidade e favoritos pode desaparecer se o usuário limpar os dados do navegador ou trocar de dispositivo.
- As metas de desempenho dependem da rede do usuário e do tempo de resposta do provedor; “condições normais de rede” deve ser operacionalizado nos testes.

## Perguntas em Aberto

1. Qual provedor atende aos requisitos de cobertura global, busca por cidade/código postal, clima atual, previsão e histórico de sete dias, com uso comercial permitido e custo aprovado?
2. O orçamento inicial é limitado a R$ 100 por mês; qualquer aumento exige aprovação. Qual valor poderá ser aprovado caso não exista opção adequada nesse teto?
3. Como o provedor define e fornece os dados históricos diários e a probabilidade de chuva para o restante do dia em diferentes regiões?
4. Quais condições compõem “rede normal” para validar o tempo médio de resposta de até três segundos?
5. Quais textos e canais de contato devem constar na política de privacidade e na interface de consentimento, conforme revisão jurídica da LGPD?

## Suposições

- “Hoje” e os dias seguintes são determinados pelo calendário e fuso horário da cidade consultada.
- Uma consulta válida é uma busca que resolve uma cidade; o sucesso principal exige que o bloco de clima atual carregue. Previsão e histórico têm indicadores separados.
- A meta de 99% refere-se ao site acessível; indisponibilidade de dados externos é acompanhada pelas métricas de sucesso dos blocos.
- A preferência de Celsius/Fahrenheit, favoritos e cidade resolvida a partir da localização são armazenados somente no navegador; não há sincronização entre dispositivos.
- O provedor poderá ser pago caso necessário para manter o histórico obrigatório, condicionado à aprovação de orçamento.
- Alertas de clima severo, notificações, contas e histórico além dos sete dias anteriores estão fora do MVP.
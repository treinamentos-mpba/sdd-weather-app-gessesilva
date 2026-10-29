# Análise de Discovery — Weather App

## Contexto

O produto é um site responsivo de consulta meteorológica para o público geral, com lançamento inicial no Brasil e busca de cidades em cobertura global. O usuário poderá consultar o clima atual, a previsão diária dos próximos cinco dias e o histórico diário dos sete dias anteriores. O app não exigirá conta.

A experiência será em pt-BR no lançamento, mas a estrutura deve permitir inclusão de outros idiomas. Open-Meteo foi escolhido como fonte de dados, sem uso de API key. Ainda é necessário validar a cobertura dos requisitos, os termos comerciais e a disponibilidade dos dados históricos.

## Decisões

| Decisão | Justificativa | Pergunta em aberto que resolve |
|---|---|---|
| **Fonte de dados: Open-Meteo, sem API key.** | Evita configurar e gerenciar uma chave de API para a integração inicial. | Define o provedor inicialmente escolhido. Ainda é necessário validar cobertura global, histórico de sete dias, termos de uso comercial, atribuição e limites do serviço. |
| **“Cinco dias” significa hoje mais os quatro dias seguintes.** | Torna explícito o período mostrado na consulta diária. | Resolve a ambiguidade sobre a contagem dos cinco dias e mantém o critério usado em RF-03. |
| **Celsius será a unidade padrão.** | Define uma apresentação inicial consistente com o lançamento no Brasil, mantendo a opção Fahrenheit. | Resolve a unidade inicial; a preferência do usuário continua persistida no navegador. |
| **Não haverá autenticação nem persistência de dados do app no servidor.** | Mantém a arquitetura sem contas e evita armazenar no servidor dados de usuário do produto. | Resolve a necessidade de conta e armazenamento/sincronização de dados do app no servidor. Favoritos, preferência de unidade e cidade resolvida permanecem locais no navegador. A compatibilidade com analytics retidos por 90 dias precisa ser esclarecida. |
| **O idioma da interface no lançamento será pt-BR.** | Atende ao mercado inicial definido para o Brasil. | Resolve o idioma inicial; a estrutura continuará preparada para outros idiomas no futuro. |

## Personas

As personas abaixo são hipóteses iniciais, a validar com usuários reais.

- **Marina — usuária cotidiana**
	- **Objetivo principal:** saber como está o tempo e se precisa ajustar os planos do dia.
	- **Contexto de uso:** principalmente no celular, antes de sair de casa ou durante deslocamentos; consulta o clima atual e a previsão diária.
	- **Métrica de sucesso pessoal:** encontrar sua cidade e entender as condições do dia em menos de um minuto.
- **Rafael — viajante**
	- **Objetivo principal:** verificar o clima de cidades que pretende visitar e comparar os próximos dias.
	- **Contexto de uso:** no desktop ao planejar uma viagem e no celular durante o deslocamento; pesquisa cidades globais e salva favoritas.
	- **Métrica de sucesso pessoal:** consultar as cidades da viagem e a previsão de cinco dias sem confundir localidades ou fusos.
- **Lúcia — planejadora de atividades ao ar livre**
	- **Objetivo principal:** escolher dias adequados para atividades considerando chuva e temperaturas.
	- **Contexto de uso:** principalmente no celular, com consultas recorrentes à previsão e ao histórico diário.
	- **Métrica de sucesso pessoal:** encontrar rapidamente os dados de chuva e temperatura necessários para decidir quando realizar a atividade.

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

| Tipo | Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|
| Técnico | Não encontrar um provedor com cobertura global, clima atual, previsão e histórico de sete dias dentro do orçamento inicial de R$ 100/mês. | Alta | Alto: pode atrasar o lançamento ou exigir aumento de orçamento. | Comparar provedores antes da implementação, validar cobertura e termos comerciais e obter aprovação de orçamento para alternativas pagas. |
| Técnico | Indisponibilidade, latência ou limite de chamadas do provedor externo. | Média | Alto: consultas podem falhar ou exceder a meta de desempenho. | Usar cache de até 24 horas com indicação de horário, controlar chamadas, oferecer atualização manual e exibir erro com opção de nova tentativa. |
| Técnico | Dados incompletos ou inconsistentes por região, especialmente histórico, códigos postais e probabilidade de chuva. | Alta | Alto: funcionalidades podem não estar disponíveis para parte das cidades globais. | Testar cobertura em regiões representativas antes de contratar; monitorar sucesso por bloco e comunicar indisponibilidades sem apresentar ausência de dados como previsão. |
| Técnico | Dados em cache podem estar desatualizados para representar o clima atual. | Média | Alto: usuários podem tomar decisões com informação antiga. | Limitar cache a 24 horas, identificar claramente dados antigos e mostrar o horário da última atualização. |
| Técnico | Busca ambígua ou de baixa qualidade em nomes globais, grafias alternativas e códigos postais. | Média | Médio/alto: o usuário pode consultar a cidade errada ou não encontrar sua localidade. | Exibir até cinco sugestões com cidade, região e país; testar nomes homônimos e variações de grafia; oferecer correção quando não houver resultados. |
| Técnico | Tratamento incorreto de fusos horários pode deslocar datas da previsão ou horários de observação. | Média | Alto: informações podem ser atribuídas ao dia errado. | Usar o fuso local da cidade para agrupar a previsão e exibir o horário da observação; validar casos de cidades em diferentes fusos. |
| Técnico | Metas de responsividade, acessibilidade e desempenho podem não ser atendidas em celulares ou redes lentas. | Média | Alto: prejudica o uso do produto e pode excluir pessoas com deficiência. | Testar desde 375 px em navegadores suportados, validar WCAG 2.2 AA e medir o tempo médio de carregamento em condições de rede documentadas. |
| Produto | A métrica de sucesso pode ocultar falhas em previsão ou histórico se o clima atual carregar. | Média | Alto: o produto pode parecer saudável enquanto partes importantes falham. | Acompanhar indicadores separados para clima atual, previsão e histórico, além da disponibilidade mensal do site. |
| Produto | O teto de orçamento pode conflitar com o histórico obrigatório e a meta de disponibilidade. | Alta | Alto: risco de custo não aprovado ou de atraso no MVP. | Validar preço, cobertura, limites e termos antes da contratação; solicitar aprovação antes de ultrapassar R$ 100/mês. |
| Produto | Usuários podem recusar localização ou analytics por preocupações de privacidade. | Média | Médio: reduz conveniência e dados de medição, mas não deve impedir consultas. | Solicitar permissões apenas após ação explícita, permitir revogação, limitar retenção e manter busca manual e funcionalidades disponíveis sem analytics. |
| Produto | O escopo pode crescer com histórico, favoritos, geolocalização e expansão internacional. | Média | Alto: pode elevar custo e atrasar o lançamento. | Tratar como MVP apenas os recursos confirmados, controlar alterações de escopo e exigir avaliação de custo e impacto antes de adicionar funcionalidades. |

## Perguntas em Aberto

1. O Open-Meteo atende aos requisitos de cobertura global, busca por cidade/código postal, clima atual, previsão e histórico de sete dias, respeitando os termos de uso comercial e atribuição?
2. O orçamento inicial é limitado a R$ 100 por mês; qualquer aumento exige aprovação. Qual valor poderá ser aprovado caso o Open-Meteo ou uma alternativa adequada ultrapasse esse teto?
3. Como o Open-Meteo fornece os dados históricos diários e a probabilidade de chuva para o restante do dia em diferentes regiões?
4. Quais condições compõem “rede normal” para validar o tempo médio de resposta de até três segundos?
5. Quais textos e canais de contato devem constar na política de privacidade e na interface de consentimento, conforme revisão jurídica da LGPD?
6. A decisão de não persistir dados no servidor exclui também os eventos agregados de analytics, ou eles poderão continuar retidos por até 90 dias conforme consentimento explícito?

## Suposições

- “Hoje” e os dias seguintes são determinados pelo calendário e fuso horário da cidade consultada.
- Uma consulta válida é uma busca que resolve uma cidade; o sucesso principal exige que o bloco de clima atual carregue. Previsão e histórico têm indicadores separados.
- A meta de 99% refere-se ao site acessível; indisponibilidade de dados externos é acompanhada pelas métricas de sucesso dos blocos.
- A preferência de Celsius/Fahrenheit, favoritos e cidade resolvida a partir da localização são armazenados somente no navegador; não há sincronização entre dispositivos.
- Open-Meteo é o provedor escolhido inicialmente; uma alternativa paga para manter o histórico obrigatório depende de aprovação de orçamento.
- Alertas de clima severo, notificações, contas e histórico além dos sete dias anteriores estão fora do MVP.
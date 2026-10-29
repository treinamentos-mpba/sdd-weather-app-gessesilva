# Especificação de Produto — Weather App

## 1. Overview

O Weather App é um site responsivo para consulta meteorológica, com lançamento inicial no Brasil e busca de cidades em cobertura global. Seu público principal é o público geral. O produto permite consultar clima atual, previsão diária para hoje e os quatro dias seguintes, histórico diário dos sete dias anteriores, alternar unidades de temperatura, salvar cidades favoritas e, mediante ação explícita e consentimento, localizar a cidade atual.

A interface do lançamento será em pt-BR. Não haverá autenticação nem persistência de dados do produto no servidor. Open-Meteo foi escolhido como fonte de dados, sem API key; sua adequação a todos os requisitos, seus termos comerciais e a cobertura histórica ainda precisam ser validados.

O objetivo é permitir que usuários encontrem rapidamente informações meteorológicas compreensíveis para sua cidade ou para localidades que pretendem visitar, inclusive em dispositivos móveis.

## 2. Functional Requirements

- **FR-01 — Buscar cidades:** aceitar nome de cidade, estado/região, país e código postal. Mostrar até cinco sugestões após a digitação de dois caracteres. Diferenciar localidades homônimas por cidade, estado/região e país. Tolerar acentos e variações de grafia quando suportado pela fonte.
- **FR-02 — Consultar clima atual:** para uma cidade selecionada, apresentar temperatura, condição, sensação térmica, máxima e mínima do dia, velocidade do vento, umidade, probabilidade de chuva para o restante do dia e horário da observação no fuso local da cidade.
- **FR-03 — Consultar previsão:** apresentar uma previsão diária para hoje e os quatro dias seguintes, no fuso local da cidade, com condição, máxima, mínima e probabilidade de chuva.
- **FR-04 — Consultar histórico:** apresentar em uma aba separada o histórico diário dos sete dias anteriores, com condição, máxima, mínima e precipitação observada. Carregar o histórico somente quando a aba for aberta.
- **FR-05 — Alternar unidade de temperatura:** oferecer Celsius e Fahrenheit, usando Celsius como padrão. Aplicar a escolha ao clima atual, à previsão e ao histórico; exibir uma casa decimal e guardar a preferência localmente no navegador.
- **FR-06 — Consultar localização atual:** oferecer a ação “Usar minha localização” e só solicitar a permissão após essa ação. Transmitir coordenadas precisas ao serviço de geolocalização somente durante a consulta, sem armazená-las. Com consentimento para lembrar a localização, salvar apenas a cidade resolvida no navegador por até 30 dias. Permitir apagar a cidade salva. Se a permissão for negada ou a localização falhar, manter a busca manual disponível.
- **FR-07 — Gerenciar cidades favoritas:** permitir salvar até cinco cidades no navegador, sem conta, e remover cada favorita independentemente da cidade salva por localização.
- **FR-08 — Atualizar dados meteorológicos:** atualizar os dados a cada 30 minutos enquanto a página estiver visível, pausar a atualização automática quando a aba estiver oculta e oferecer atualização manual.
- **FR-09 — Tratar busca sem resultados:** informar quando nenhuma cidade corresponder à consulta e oferecer sugestões para corrigir o termo ou procurar localidades próximas.
- **FR-10 — Tratar indisponibilidade e cota:** usar dados em cache por no máximo 24 horas. Ao exibir cache, informar que os dados podem estar desatualizados e mostrar a data/hora de obtenção. Sem cache válido, informar o erro e permitir nova tentativa. Aplicar o mesmo comportamento quando o serviço atingir sua cota.
- **FR-11 — Gerenciar consentimento de analytics:** solicitar consentimento explícito antes de coletar analytics; permitir revogar a autorização nas configurações de privacidade. Recusar ou revogar analytics não pode limitar as funcionalidades do produto. Os eventos previstos são agregados e não incluem nomes de cidades nem localização precisa; a persistência e retenção estão sujeitas à decisão em aberto sobre armazenamento no servidor.
- **FR-12 — Usar sem conta:** permitir consultar clima, previsão e histórico sem autenticação ou criação de conta.

## 3. User Stories

- **US-01 — Consulta cotidiana:** Como Marina, usuária cotidiana, quero buscar minha cidade e consultar o clima atual para decidir como me preparar para o dia. **Requisitos relacionados:** FR-01, FR-02.
- **US-02 — Planejamento de viagem:** Como Rafael, viajante, quero pesquisar cidades globais, distinguir localidades com nomes semelhantes e salvar favoritas para planejar os próximos dias. **Requisitos relacionados:** FR-01, FR-03, FR-07.
- **US-03 — Planejamento de atividades:** Como Lúcia, planejadora de atividades ao ar livre, quero consultar a previsão e o histórico de temperatura e chuva para escolher quando realizar uma atividade. **Requisitos relacionados:** FR-03, FR-04.
- **US-04 — Preferência de temperatura:** Como Marina, usuária cotidiana, quero alternar entre Celsius e Fahrenheit para entender as temperaturas na unidade que prefiro. **Requisito relacionado:** FR-05.
- **US-05 — Consulta por localização:** Como Marina, usuária cotidiana, quero consultar o clima da minha localização quando eu solicitar e continuar podendo pesquisar manualmente para encontrar informações sem perder o controle da minha localização. **Requisito relacionado:** FR-06.
- **US-06 — Consulta resiliente:** Como Lúcia, planejadora de atividades ao ar livre, quero atualizar os dados e receber uma indicação clara quando houver cache ou falha para não confundir informação antiga com a condição atual. **Requisitos relacionados:** FR-08, FR-09, FR-10.
- **US-07 — Privacidade e acesso:** Como Rafael, viajante, quero usar o app sem criar uma conta e controlar minha autorização para analytics para consultar cidades com praticidade e decidir sobre o uso dos meus dados. **Requisitos relacionados:** FR-11, FR-12.

## 4. Acceptance Criteria

### US-01 — Consulta cotidiana

- **AC-01.1 (FR-01):** Given que o campo de busca contém menos de dois caracteres, When o usuário digita, Then nenhuma solicitação de sugestões é enviada.
- **AC-01.2 (FR-01):** Given que a busca contém pelo menos dois caracteres e a resposta de teste contém mais de cinco correspondências, When as sugestões são exibidas, Then a lista contém no máximo cinco resultados.
- **AC-01.3 (FR-01):** Given resultados de teste para cidades homônimas, When a lista de sugestões é exibida, Then cada resultado mostra cidade, estado/região e país quando esses dados estiverem presentes na resposta.
- **AC-01.4 (FR-01):** Given respostas de teste que associam nome, região, país e código postal à mesma cidade, When cada forma de busca é enviada, Then a cidade correspondente aparece nos resultados. Given uma resposta de teste com alias acentuado e não acentuado, When qualquer alias é pesquisado, Then a mesma cidade aparece.
- **AC-01.5 (FR-02):** Given uma cidade selecionada e uma resposta de clima atual com todos os campos requeridos, When os dados são carregados, Then a tela mostra temperatura, condição, sensação térmica, máxima, mínima, vento, umidade, probabilidade de chuva e horário da observação no fuso da cidade.
- **AC-01.6 (FR-02):** Given uma cidade com fuso horário conhecido e horário de teste fixo, When o clima atual é exibido, Then o período de probabilidade de chuva termina no fim do dia local da cidade.
- **AC-01.7 (FR-12):** Given um navegador sem sessão autenticada, When o usuário pesquisa uma cidade e abre o clima atual, Then a consulta é concluída sem solicitar login ou criação de conta.

### US-02 — Planejamento de viagem

- **AC-02.1 (FR-03):** Given uma cidade selecionada, data de teste fixa e uma resposta com dados para hoje e os dias seguintes, When a previsão carrega, Then são exibidos exatamente cinco dias locais — hoje e os quatro seguintes — cada um com condição, máxima, mínima e probabilidade de chuva.
- **AC-02.2 (FR-01):** Given dois resultados com o mesmo nome e regiões diferentes, When o usuário seleciona um deles, Then o clima carregado corresponde ao identificador da localidade selecionada.
- **AC-02.3 (FR-07):** Given zero a quatro favoritas salvas, When o usuário adiciona uma cidade, Then ela é salva; Given cinco favoritas salvas, When o usuário tenta adicionar outra, Then a lista permanece com cinco e o limite é informado.
- **AC-02.4 (FR-07):** Given uma cidade favorita salva, When a página é recarregada no mesmo navegador, Then a cidade continua na lista; When o usuário a remove, Then ela deixa de aparecer sem remover outras favoritas ou a cidade salva por localização.

### US-03 — Planejamento de atividades

- **AC-03.1 (FR-04):** Given a aba de histórico ainda não aberta, When a cidade é selecionada, Then nenhuma solicitação de histórico é enviada.
- **AC-03.2 (FR-04):** Given uma cidade selecionada e uma resposta de teste com dados históricos disponíveis, When o usuário abre a aba de histórico, Then são solicitados e exibidos os sete dias locais anteriores com condição, máxima, mínima e precipitação observada.
- **AC-03.3 (FR-03, FR-04):** Given uma cidade cujo fuso difere do fuso do navegador e uma data de teste fixa, When previsão e histórico são exibidos, Then todas as datas seguem o calendário local da cidade.

### US-04 — Preferência de temperatura

- **AC-04.1 (FR-05):** Given que não há preferência de unidade no armazenamento local, When o clima é exibido, Then todos os valores de temperatura usam Celsius.
- **AC-04.2 (FR-05):** Given clima atual, previsão e histórico carregados em Celsius, When o usuário seleciona Fahrenheit, Then todos os valores de temperatura desses três blocos são atualizados para Fahrenheit e vento e precipitação permanecem em unidades métricas.
- **AC-04.3 (FR-05):** Given qualquer valor de temperatura exibido, When o valor é renderizado, Then possui exatamente uma casa decimal; Given uma preferência de unidade salva, When a página é recarregada no mesmo navegador, Then essa unidade continua selecionada.

### US-05 — Consulta por localização

- **AC-05.1 (FR-06):** Given que o usuário ainda não acionou “Usar minha localização”, When a página é aberta, Then o navegador não recebe solicitação de permissão de geolocalização.
- **AC-05.2 (FR-06):** Given que o usuário aciona “Usar minha localização”, When a ação começa, Then o navegador solicita permissão e as coordenadas são transmitidas somente para resolver a cidade, sem gravá-las no armazenamento local ou persistência do app.
- **AC-05.3 (FR-06):** Given que a permissão é negada ou a geolocalização falha, When o fluxo termina, Then a busca manual continua habilitada e nenhuma consulta fica bloqueada.
- **AC-05.4 (FR-06):** Given consentimento para lembrar a localização, When a cidade é resolvida, Then somente a cidade é salva localmente; Given que passaram 30 dias da gravação, When o app é aberto, Then a cidade salva não é reutilizada como localização lembrada.
- **AC-05.5 (FR-06):** Given cidade salva e favoritas no navegador, When o usuário apaga a cidade salva, Then favoritas permanecem; When remove uma favorita, Then a cidade salva permanece.

### US-06 — Consulta resiliente

- **AC-06.1 (FR-08):** Given uma página visível e dados carregados, When passam 30 minutos, Then uma atualização automática é iniciada; Given a aba oculta, When passam 30 minutos, Then nenhuma atualização automática é iniciada; When o usuário solicita atualização manual, Then uma nova atualização é iniciada.
- **AC-06.2 (FR-09):** Given uma busca sem correspondências na resposta de teste, When a busca termina, Then a interface exibe mensagem de ausência de resultados e sugestões de correção ou localidades próximas.
- **AC-06.3 (FR-10):** Given falha ou cota atingida e cache com até 24 horas, When a resposta do provedor falha, Then o cache é exibido com aviso de desatualização e seu horário de obtenção.
- **AC-06.4 (FR-10):** Given cache com mais de 24 horas ou cache inexistente, When o provedor falha, Then os dados não são apresentados como atuais e a interface exibe erro com ação de nova tentativa.
- **AC-06.5 (FR-10):** Given respostas de teste em que apenas alguns blocos estão disponíveis, When a tela é exibida, Then cada bloco indisponível é identificado sem ocultar os blocos carregados com sucesso.

### US-07 — Privacidade e acesso

- **AC-07.1 (FR-11):** Given que o consentimento de analytics ainda não foi concedido, When o usuário navega ou consulta dados meteorológicos, Then nenhum evento de analytics é enviado.
- **AC-07.2 (FR-11):** Given consentimento negado ou revogado, When o usuário pesquisa uma cidade e consulta os dados, Then nenhuma funcionalidade meteorológica é bloqueada e nenhum evento posterior é enviado.
- **AC-07.3 (FR-11):** Given consentimento concedido e uma ação instrumentada, When o evento é preparado para envio, Then o payload não contém nome de cidade nem coordenadas precisas.
- **AC-07.4 (FR-12):** Given um navegador sem conta, When o usuário consulta clima atual, previsão e histórico, Then todas as consultas disponíveis podem ser concluídas sem autenticação.
- **AC-07.5 (FR-11):** Given a política de persistência e retenção de analytics ainda não foi decidida, When a coleta é implementada, Then eventos não são persistidos ou enviados a um serviço de analytics até a decisão ser registrada.

## 5. Non-Functional Requirements

- **NFR-01 — Responsividade:** suportar celular a partir de 375 px de largura, tablets e desktops sem rolagem horizontal na largura mínima definida.
- **NFR-02 — Compatibilidade:** suportar as duas versões principais mais recentes de Chrome, Edge, Safari e Firefox.
- **NFR-03 — Acessibilidade:** atender à WCAG 2.2 nível AA.
- **NFR-04 — Desempenho:** o tempo médio entre selecionar uma cidade e exibir o clima deve ser de até três segundos em condições normais de rede. A definição operacional de “rede normal” permanece em aberto.
- **NFR-05 — Disponibilidade:** o site deve estar acessível pelo menos 99% do tempo em cada mês. A métrica é interna e mede o app, não exige SLA contratual do provedor.
- **NFR-06 — Sucesso dos dados:** medir separadamente clima atual, previsão e histórico, com sucesso mínimo inicial de 90% por bloco sobre consultas válidas para cidades encontradas. A métrica principal considera sucesso quando o clima atual carrega.
- **NFR-07 — Atualidade:** durante uso ativo, os dados são atualizados a cada 30 minutos. Cache de até 24 horas só pode ser apresentado com aviso e horário da última obtenção.
- **NFR-08 — Privacidade e conformidade:** atender à LGPD. Coordenadas precisas podem ser transmitidas temporariamente ao provedor para resolver a localização, mas não armazenadas pelo app. Analytics deve ser agregado, não incluir nome de cidade nem localização precisa e ter retenção máxima de 90 dias, condicionado à resolução da questão de persistência no servidor. A política de privacidade deve estar publicada no lançamento.
- **NFR-09 — Idioma e formatos:** interface em pt-BR no lançamento, datas e horários em formatos brasileiros, relógio de 24 horas e unidades métricas para vento e precipitação. A estrutura deve permitir inclusão futura de idiomas.
- **NFR-10 — Uso comercial e atribuição:** o provedor precisa permitir o uso comercial pretendido; atribuição deve ser exibida quando exigida pelos termos do serviço.
- **NFR-11 — Orçamento:** considerar inicialmente até R$ 100 por mês para dados. Qualquer contratação acima desse teto exige aprovação prévia. O histórico de sete dias é requisito; se não for viável dentro do teto, deve-se solicitar aumento de orçamento, não retirar o histórico sem nova decisão.
- **NFR-12 — Escala inicial:** considerar até mil consultas por dia no lançamento.
- **NFR-13 — Persistência e autenticação:** não exigir conta e não persistir dados do app no servidor. Preferência de unidade, favoritos e cidade resolvida podem ser armazenados localmente no navegador. A retenção de analytics precisa de decisão própria antes de implementação.

## 6. Edge Cases

- Campo vazio ou contendo somente espaços: não enviar solicitação de geocoding; manter o campo disponível e pedir que o usuário informe uma cidade. Com menos de dois caracteres, não solicitar sugestões.
- Cidade inexistente ou geocoding sem resultados: informar que nenhuma cidade foi encontrada, manter a busca editável, oferecer sugestões e não solicitar dados meteorológicos nem substituir a cidade silenciosamente.
- Cidades homônimas: exigir seleção inequívoca por região e país, quando disponíveis.
- Caracteres especiais: remover espaços excedentes, aceitar caracteres Unicode e pontuação legítima em nomes de localidades (como acentos, hífens e apóstrofos) e codificar o texto ao enviá-lo ao provedor. Rejeitar ou tratar com segurança caracteres de controle sem quebrar a interface.
- Código postal ou grafia não suportados pelo provedor: informar ausência de resultados sem falhar a interface.
- Falha, negação ou timeout de geolocalização: preservar a busca manual; coordenadas não são guardadas.
- Cidade salva com mais de 30 dias: não reutilizar automaticamente como localização lembrada; solicitar nova localização ou permitir busca manual.
- Usuário tenta adicionar mais de cinco favoritas: manter as existentes e informar o limite.
- Armazenamento local indisponível ou apagado: permitir consulta sem persistência e informar que preferências/favoritas podem não ser mantidas.
- Falha de rede, erro HTTP, resposta inválida do provedor ou cota atingida: preservar a cidade selecionada e distinguir falha do serviço de cidade inexistente; mostrar cache válido com data/hora ou, sem cache válido, erro e nova tentativa.
- Timeout da requisição: ao atingir o limite configurado, encerrar a espera, preservar a cidade selecionada e aplicar o fluxo de cache válido ou erro com nova tentativa. A duração do limite ainda precisa ser definida.
- Cache com mais de 24 horas: não apresentar como dado atual.
- Resposta parcial: apresentar os blocos e campos recebidos; marcar campos ausentes como indisponíveis, nunca como zero nem com valores inferidos. Se faltar um campo essencial a um bloco, marcar esse bloco como indisponível sem ocultar outros blocos completos.
- Histórico ou métricas ausentes para uma cidade/região: comunicar indisponibilidade; não inferir nem fabricar valores.
- Virada de dia, horário de verão ou cidades em fusos diferentes: calcular datas e horários no fuso da cidade selecionada.
- Conversão de temperatura: aplicar unidade escolhida a todos os blocos e arredondar a uma casa decimal.
- Consentimento de analytics negado ou revogado: não coletar eventos e manter todas as funções meteorológicas disponíveis.
- Dados de provedor incompatíveis com termos comerciais ou requisitos de privacidade: impedir a contratação até validação.

## 7. Assumptions

- Open-Meteo é a fonte inicial escolhida e não requer API key para a integração planejada; cobertura, histórico, termos de uso comercial, atribuição e limites ainda serão verificados.
- “Hoje” e os dias seguintes são definidos pelo calendário local da cidade consultada.
- “Consulta válida” significa pesquisa que resolve uma cidade; o sucesso principal exige que o bloco de clima atual carregue.
- Indicadores de previsão e histórico são separados do indicador principal de clima atual.
- A meta de 99% mede disponibilidade do site, enquanto falhas do provedor são refletidas nas métricas de sucesso dos blocos.
- Dados persistidos localmente podem ser apagados quando o usuário limpa o armazenamento do navegador e não são sincronizados entre dispositivos.
- Se Open-Meteo não atender aos requisitos obrigatórios, uma alternativa paga depende de aprovação de orçamento.
- Analytics com retenção de 90 dias só será implementado após esclarecer se essa persistência é compatível com a decisão de não armazenar dados no servidor.

## 8. Risks

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Open-Meteo não fornecer histórico de sete dias, cobertura global suficiente ou os termos comerciais necessários. | Alta | Alto: pode bloquear um requisito obrigatório e atrasar o lançamento. | Validar endpoints, cobertura por região, disponibilidade temporal, limites e termos antes de implementar; manter alternativa sujeita à aprovação de orçamento. |
| Provedor externo ficar indisponível, lento ou atingir cota. | Média | Alto: consultas podem falhar ou exceder a meta de desempenho. | Usar cache máximo de 24 horas com indicação de horário, controlar chamadas e oferecer erro e nova tentativa quando não houver cache válido. |
| Dados incompletos ou inconsistentes por região, especialmente histórico, códigos postais e probabilidade de chuva. | Alta | Alto: recursos podem não estar disponíveis em algumas cidades. | Testar localidades representativas antes da contratação; monitorar sucesso por bloco e comunicar indisponibilidade sem inventar dados. |
| Cache ser interpretado como condição atual. | Média | Alto: usuários podem tomar decisões com informação antiga. | Identificar claramente cache, mostrar horário de obtenção e não exibir dados com mais de 24 horas como atuais. |
| Busca global retornar cidade errada ou não localizar variações de grafia. | Média | Médio/alto: consulta imprecisa ou abandonada. | Mostrar até cinco resultados desambiguados por região e país; testar homônimos, grafias e códigos postais. |
| Fuso horário incorreto deslocar data da previsão ou horário de observação. | Média | Alto: informações podem ser atribuídas ao dia errado. | Usar fuso local da cidade e validar viradas de dia e cidades em fusos distintos. |
| Desempenho ou acessibilidade não atender usuários móveis. | Média | Alto: degrada uso e pode excluir pessoas com deficiência. | Testar a partir de 375 px, validar WCAG 2.2 AA e medir desempenho em condições de rede documentadas. |
| Meta de sucesso ocultar falha em blocos secundários. | Média | Alto: clima atual pode carregar enquanto previsão ou histórico falha. | Acompanhar métricas separadas para cada bloco, além da disponibilidade mensal do site. |
| Custo do histórico ultrapassar R$ 100/mês. | Alta | Alto: pode exigir aprovação e atrasar a contratação. | Comparar provedores antes da implementação e solicitar aprovação antes de ultrapassar o teto. |
| Recusa de localização ou analytics reduzir conveniência ou telemetria. | Média | Médio: menor personalização e menos dados de produto. | Permitir busca manual, consentimento granular e revogação sem bloquear funções meteorológicas. |
| “Sem persistência no servidor” conflitar com retenção de analytics. | Média | Alto: decisão arquitetural e requisito de privacidade incompatíveis. | Resolver a política de armazenamento antes de implementar analytics; manter coleta desabilitada até a decisão. |

## 9. Out of Scope

- Alertas de clima severo e notificações push.
- Contas, autenticação e sincronização de favoritos entre dispositivos.
- Persistência no servidor de cidades, preferências ou dados do app.
- Histórico meteorológico anterior aos sete dias definidos.
- Interface em idiomas além de pt-BR no lançamento, embora a arquitetura deva permitir internacionalização futura.
- Unidades alternativas para vento e precipitação; o app usa unidades métricas para esses valores.
- Mapas meteorológicos, widgets, compartilhamento social e histórico de pesquisas.

## 10. Open Questions

1. O Open-Meteo atende busca global por cidade/código postal, clima atual, previsão e histórico diário dos sete dias anteriores? Quais são a disponibilidade temporal e a cobertura por região?
2. Os termos vigentes do Open-Meteo permitem o uso comercial pretendido? Quais exigências de atribuição, limites de chamada e condições de uso se aplicam?
3. Se o provedor escolhido ou uma alternativa ultrapassar R$ 100 por mês, qual valor poderá ser aprovado? A contratação acima do teto requer aprovação prévia.
4. Como o provedor define os dados históricos diários e a probabilidade de chuva para o restante do dia, especialmente em localidades com cobertura parcial?
5. Quais condições mensuráveis definem “rede normal” para testar o tempo médio de resposta de até três segundos?
6. A decisão de não persistir dados no servidor também proíbe analytics agregados retidos por até 90 dias? Se permitidos, onde e sob qual operador os eventos serão retidos?
7. Quais textos, canal de contato e responsável legal devem constar na política de privacidade e na interface de consentimento, conforme revisão jurídica da LGPD?
8. Qual é a duração máxima de espera de cada requisição antes de ser tratada como timeout?

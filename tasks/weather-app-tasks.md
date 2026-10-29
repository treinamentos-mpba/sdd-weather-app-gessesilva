# Backlog de Tarefas — Weather App

Fonte: `plans/weather-app-plan.md`. Localização do dispositivo foi removida do escopo; não há tarefas para reverse geocoding. Busca por código postal e histórico são condicionais à PoC: se não passarem, T-03 retira-os do MVP e as tarefas correspondentes ficam não aplicáveis.

## Cobertura por requisito funcional

| Requisito | Tarefas de implementação | Tarefas de teste | Cobertura/observação |
|---|---|---|---|
| FR-01 — Buscar cidades | T-10, T-14, T-19 | T-31, T-34, T-39, T-46 | Coberto; se a PoC aprovar busca postal, incluir esse cenário em T-31. |
| FR-02 — Consultar clima atual | T-11, T-15, T-22 | T-32, T-35, T-41, T-46 | Coberto. |
| FR-03 — Consultar previsão | T-11, T-15, T-23 | T-32, T-35, T-42, T-46 | Coberto. |
| FR-04 — Consultar histórico | T-13, T-18, T-26 (condicionais) | T-38, T-45, T-47 (condicionais) | Implementação condicional; falta teste unitário explícito do request e mapeamento do Archive. |
| FR-05 — Alternar unidade | T-08, T-24 | T-29, T-43, T-47 | Coberto; alternância sem nova chamada. |
| FR-06 — Localização do dispositivo | Nenhuma | Nenhuma | Aposentado e fora do escopo; não é lacuna. |
| FR-07 — Gerenciar favoritos | T-12, T-17, T-25 | T-33, T-37, T-44, T-47 | Coberto. |
| FR-08 — Atualizar dados | T-16 | T-36, T-47 | Coberto. |
| FR-09 — Busca sem resultados | T-10, T-14, T-19, T-20 | T-31, T-34, T-39, T-46 | Coberto. |
| FR-10 — Indisponibilidade e cota | T-11, T-12, T-16 | T-32, T-33, T-36, T-47 | Coberto. |
| FR-11 — Analytics desativado | Nenhuma tarefa dedicada | Nenhuma tarefa dedicada | Lacuna: adicionar verificação de que os fluxos não enviam nem armazenam eventos/payloads de analytics. |
| FR-12 — Usar sem conta | T-27 | T-46 | Coberto. |
| FR-13 — Indicar carregamento | T-15, T-19, T-20, T-21 | T-35, T-39, T-40, T-46 | Coberto. |

FR-06, US-05 e AC-05 foram aposentados; não são lacunas de implementação. As lacunas de teste de FR-01 e FR-04 são condicionais ao resultado da PoC.

## Entrega 0 — Gates e decisões

### T-01 — Validar capacidades funcionais do Open-Meteo

- **Descrição:** executar a PoC de busca por cidade, clima atual, previsão e recursos condicionais.
- **Critérios de aceite:** registrar requisição/resposta e presença de cada campo exigido em pelo menos uma cidade brasileira e uma internacional; testar um par de homônimos e um alias com/sem acento; verificar timezone e cinco datas diárias; marcar busca postal e Archive como aprovado/reprovado com evidência.
- **Dependências:** nenhuma.
- **Arquivos prováveis:** `docs/open-meteo-poc.md`.
- **Tipo:** Data.

### T-02 — Validar termos, CORS, limites e custo do provedor

- **Descrição:** confirmar condições operacionais e comerciais antes de integrar os endpoints.
- **Critérios de aceite:** matriz registra CORS por endpoint, limite publicado de forecast/geocoding, uso comercial permitido/não permitido, atribuição requerida/não requerida e custo mensal estimado para mil consultas meteorológicas por dia; custo acima de R$ 100 fica bloqueado até aprovação.
- **Dependências:** T-01.
- **Arquivos prováveis:** `docs/open-meteo-poc.md`.
- **Tipo:** Infra.

### T-03 — Registrar resultado da PoC e congelar escopo do MVP

- **Descrição:** refletir na spec e no plano quais capacidades condicionais entram no MVP.
- **Critérios de aceite:** spec e plano marcam busca postal e histórico como incluídos ou fora do MVP conforme T-01; se reprovados, não restam FR/AC/modelos/tarefas ativos para esses recursos, exceto a declaração em Out of Scope; nenhuma troca de provedor ocorre automaticamente.
- **Dependências:** T-01, T-02.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Infra.

### T-04 — Fechar semântica de dados e requisições

- **Descrição:** definir os parâmetros operacionais que afetam a integração e estados de erro.
- **Critérios de aceite:** spec e plano registram fórmula/fonte da probabilidade restante do dia, timeout numérico, retry automático ligado/desligado e quantidade/intervalo se ligado, e debounce em milissegundos; cada decisão tem aprovação registrada e a implementação não usa valores diferentes.
- **Dependências:** T-01, T-03.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Data.

### T-05 — Definir protocolo de validação dos NFRs

- **Descrição:** tornar repetíveis as medições de desempenho, sucesso dos dados, disponibilidade e escala.
- **Critérios de aceite:** protocolo fixa RTT/banda para a média de 3 s, lista cidades e número de execuções por bloco para a taxa de 90%, volume/pico de autocomplete, frequência/endpoint/resultado esperado das sondas sintéticas e plataforma de produção.
- **Dependências:** T-02, T-03.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Test.

## Entrega 1 — Tipos

### T-06 — Definir contratos de domínio

- **Descrição:** declarar os modelos compartilhados do app sem lógica de acesso a dados.
- **Critérios de aceite:** `City`, `CurrentWeather`, `ForecastDay`, `WeatherData`, `AsyncBlock`, erros e favoritos compilam em TypeScript strict; `HistoricalDay` só existe se T-03 aprovou histórico; ausência numérica é representada por `null`, não zero.
- **Dependências:** T-03, T-04.
- **Arquivos prováveis:** `src/types/weather.ts`.
- **Tipo:** Data.

## Entrega 2 — Funções puras

### T-07 — Implementar mapeadores Open-Meteo

- **Descrição:** normalizar respostas de Geocoding e Forecast para os contratos de domínio.
- **Critérios de aceite:** resultados geocoding mapeiam ID/nome/região/país/latitude/longitude/timezone; arrays diários são unidos por índice de `daily.time`; campos ausentes viram `null`; histórico só é mapeado se T-03 o aprovou.
- **Dependências:** T-06.
- **Arquivos prováveis:** `src/lib/openMeteoMappers.ts`.
- **Tipo:** Data.

### T-08 — Implementar conversão e formatação

- **Descrição:** criar funções puras de temperatura e data/hora local.
- **Critérios de aceite:** conversão usa Celsius como base; datas usam timezone da cidade e não reinterpretam data local como UTC; formatadores não mutam entrada.
- **Dependências:** T-04, T-06.
- **Arquivos prováveis:** `src/lib/temperature.ts`, `src/lib/format.ts`.
- **Tipo:** Data.

### T-09 — Implementar mapeamento de códigos WMO

- **Descrição:** mapear códigos conhecidos para descrições de condição.
- **Critérios de aceite:** toda chave exportada retorna descrição não vazia; código não mapeado retorna fallback definido sem lançar exceção.
- **Dependências:** T-06.
- **Arquivos prováveis:** `src/lib/weatherCodes.ts`.
- **Tipo:** Data.

## Entrega 3 — Services

### T-10 — Implementar serviço de geocoding

- **Descrição:** consultar Open-Meteo Geocoding e converter sugestões para `City`.
- **Critérios de aceite:** request usa `name`, `count=5`, `language=pt` e `format=json`; saída tem no máximo cinco cidades e preserva região/país disponíveis; lista vazia e falha HTTP/rede são distinguíveis; postal só funciona se aprovada em T-01.
- **Dependências:** T-01, T-06, T-07.
- **Arquivos prováveis:** `src/services/geocodingService.ts`.
- **Tipo:** Data.

### T-11 — Implementar serviço de forecast

- **Descrição:** consultar clima atual e cinco dias para a cidade selecionada.
- **Critérios de aceite:** request usa latitude/longitude da `City`, `timezone=auto`, `forecast_days=5`, unidades aprovadas e variáveis de T-01/T-04; resposta normalizada mantém até cinco datas locais; erros são convertidos em códigos de domínio.
- **Dependências:** T-04, T-06, T-07, T-08.
- **Arquivos prováveis:** `src/services/weatherService.ts`.
- **Tipo:** Data.

### T-12 — Implementar adaptador de armazenamento local

- **Descrição:** persistir preferências, favoritos e cache versionado no navegador.
- **Critérios de aceite:** favoritos limitam-se a cinco; cache é chaveado por cidade/bloco, inclui timestamp/schemaVersion e expira após 24 horas; `SecurityError`/quota ativam memória sem lançar erro para o chamador.
- **Dependências:** T-06.
- **Arquivos prováveis:** `src/services/browserStorageService.ts`.
- **Tipo:** Data.

### T-13 — Implementar serviço Archive (condicional)

- **Descrição:** consultar histórico somente se T-03 aprovou FR-04.
- **Critérios de aceite:** se aprovado, request Archive usa datas dos sete dias locais anteriores e `timezone=auto`, retornando campos normalizados; se reprovado, tarefa é N/A e nenhum endpoint Archive é incluído.
- **Dependências:** T-03, T-06, T-07, T-11.
- **Arquivos prováveis:** `src/services/weatherService.ts`.
- **Tipo:** Data.

## Entrega 4 — Hooks e estado

### T-14 — Implementar busca e seleção de cidade no hook

- **Descrição:** orquestrar query, sugestões, seleção e estado de busca em `useWeather`.
- **Critérios de aceite:** estado inicial é `idle`; query vazia ou menor que dois caracteres gera zero chamadas; query válida termina em `success`, `empty` ou `error`; seleção nova invalida resposta de busca anterior.
- **Dependências:** T-10, T-12.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-15 — Integrar clima atual e previsão ao hook

- **Descrição:** orquestrar carregamento independente de clima atual e previsão após seleção.
- **Critérios de aceite:** blocos têm estados independentes; falha de forecast não altera current em success; campo ausente fica indisponível e dado prévio permanece visível durante loading.
- **Dependências:** T-11, T-14.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-16 — Implementar refresh e fallback de cache

- **Descrição:** coordenar atualização manual/automática, visibilidade e cache por bloco.
- **Critérios de aceite:** refresh ocorre aos 30 minutos visível, pausa oculto e roda ao retornar quando dados têm 30 minutos ou mais; cache até 24h é stale com `fetchedAt`; cache vencido não é mostrado; timeout segue T-04.
- **Dependências:** T-12, T-15.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-17 — Integrar favoritos ao estado local

- **Descrição:** conectar reducer/hook ao adaptador de favoritos.
- **Critérios de aceite:** adicionar até cinco favoritos; sexta tentativa não altera estado e produz aviso de limite; remover exclui somente o ID solicitado; estado hidratado permanece após reload no mesmo navegador.
- **Dependências:** T-12, T-14.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-18 — Integrar histórico sob demanda (condicional)

- **Descrição:** carregar o bloco de histórico somente ao abrir sua aba, se FR-04 permaneceu no MVP.
- **Critérios de aceite:** com histórico aprovado, montar a tela produz zero chamadas Archive e abrir a aba produz uma; sucesso/vazio/erro altera somente `history`; caso contrário, tarefa é N/A.
- **Dependências:** T-13, T-15.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

## Entrega 5 — Componentes

### T-19 — Implementar busca e sugestões

- **Descrição:** construir campo de busca e lista de resultados com acessibilidade.
- **Critérios de aceite:** campo tem nome acessível; após dois caracteres exibe no máximo cinco opções; homônimos mostram dados de desambiguação disponíveis; Enter seleciona opção focada; componente não chama `fetch`.
- **Dependências:** T-14.
- **Arquivos prováveis:** `src/components/SearchBar.tsx`.
- **Tipo:** UI.

### T-20 — Implementar estado vazio

- **Descrição:** apresentar mensagem e orientação quando a busca termina sem cidades.
- **Critérios de aceite:** mensagem aparece somente no estado `empty`, input permanece habilitado e nenhuma cidade é selecionada automaticamente.
- **Dependências:** T-14.
- **Arquivos prováveis:** `src/components/states/EmptyState.tsx`.
- **Tipo:** UI.

### T-21 — Implementar loading e erro por bloco

- **Descrição:** criar indicadores acessíveis reutilizáveis de loading e erro.
- **Critérios de aceite:** loading tem status acessível; erro tem alerta e botão de retry quando callback presente; o estado de um bloco não desmonta outro bloco em sucesso.
- **Dependências:** T-15, T-16.
- **Arquivos prováveis:** `src/components/states/LoadingState.tsx`, `src/components/states/ErrorState.tsx`.
- **Tipo:** UI.

### T-22 — Implementar clima atual

- **Descrição:** renderizar valores disponíveis, condição e horário local da observação.
- **Critérios de aceite:** cada campo disponível é exibido; campos `null` aparecem indisponíveis e nunca como zero; alternar unidade não muta os dados em Celsius.
- **Dependências:** T-08, T-09, T-15, T-21.
- **Arquivos prováveis:** `src/components/CurrentWeather.tsx`.
- **Tipo:** UI.

### T-23 — Implementar cartões e lista da previsão

- **Descrição:** renderizar os cinco dias locais com os dados diários.
- **Critérios de aceite:** lista mostra hoje e os quatro dias seguintes; cada dia exibe condição, máxima/mínima e probabilidade quando disponível; valores `null` não aparecem como zero.
- **Dependências:** T-08, T-09, T-15, T-21.
- **Arquivos prováveis:** `src/components/ForecastCard.tsx`, `src/components/ForecastList.tsx`.
- **Tipo:** UI.

### T-24 — Implementar alternância de unidade

- **Descrição:** criar controle Celsius/Fahrenheit que altera somente a apresentação.
- **Critérios de aceite:** sem preferência salva, controle indica Celsius; selecionar Fahrenheit atualiza temperaturas visíveis e não chama nenhum serviço.
- **Dependências:** T-08, T-15.
- **Arquivos prováveis:** `src/components/UnitToggle.tsx`.
- **Tipo:** UI.

### T-25 — Implementar lista de favoritos

- **Descrição:** exibir cidades favoritas e ações de selecionar/remover.
- **Critérios de aceite:** lista vazia mostra estado empty; cada item identifica cidade/região/país disponíveis; seleção envia o ID correto; remover um item preserva os demais.
- **Dependências:** T-17.
- **Arquivos prováveis:** `src/components/FavoriteCities.tsx`.
- **Tipo:** UI.

### T-26 — Implementar painel de histórico (condicional)

- **Descrição:** exibir o histórico aprovado em aba própria.
- **Critérios de aceite:** com FR-04 aprovado, mostra sete datas locais anteriores, condição, máximas/mínimas e precipitação; campos ausentes são indisponíveis; sem aprovação, o componente não é montado.
- **Dependências:** T-18.
- **Arquivos prováveis:** `src/components/HistoryPanel.tsx`.
- **Tipo:** UI.

## Entrega 6 — Integração da aplicação

### T-27 — Compor a tela principal

- **Descrição:** conectar busca, blocos meteorológicos, unidade e favoritos em `App`.
- **Critérios de aceite:** `App` renderiza SearchBar, CurrentWeather, ForecastList, UnitToggle e Favorites; selecionar cidade propaga a mesma `City`; sem login; falha de um bloco não desmonta os demais; HistoryPanel só entra se T-03 aprovou.
- **Dependências:** T-19 a T-25; T-26 se histórico aprovado.
- **Arquivos prováveis:** `src/App.tsx`.
- **Tipo:** UI.

## Entrega 7 — Testes unitários e de componentes

### T-28 — Testar contratos e mapeadores

- **Descrição:** validar normalização de respostas externas com fixtures determinísticas.
- **Critérios de aceite:** `pnpm test -- openMeteoMappers` passa para geocoding, cinco dias, campos `null`, arrays desalinhados, resposta parcial e schema inválido; nenhuma fixture usa rede.
- **Dependências:** T-07, T-27.
- **Arquivos prováveis:** `tests/unit/openMeteoMappers.test.ts`.
- **Tipo:** Test.

### T-29 — Testar conversão de unidade e formatação local

- **Descrição:** executar testes unitários Vitest para conversão Celsius/Fahrenheit, arredondamento e formatação local.
- **Critérios de aceite:** `pnpm test -- temperature format` valida `0 °C → 32 °F`, `100 °C → 212 °F`, `-40 °C → -40 °F`, conversão inversa, uma casa decimal, timezone distinto do browser e virada de dia.
- **Dependências:** T-08, T-27.
- **Arquivos prováveis:** `tests/unit/temperature.test.ts`, `tests/unit/format.test.ts`.
- **Tipo:** Test.

### T-30 — Testar mapeamento WMO

- **Descrição:** verificar códigos exportados e fallback desconhecido.
- **Critérios de aceite:** `pnpm test -- weatherCodes` valida cada chave exportada e um código desconhecido sem exceção.
- **Dependências:** T-09, T-27.
- **Arquivos prováveis:** `tests/unit/weatherCodes.test.ts`.
- **Tipo:** Test.

### T-31 — Testar serviço de geocoding

- **Descrição:** verificar parâmetros HTTP, normalização e respostas vazias/falhas.
- **Critérios de aceite:** `pnpm test -- geocodingService` usa `fetch` mockado e verifica `name`, `count=5`, `language=pt`, `format=json`, homônimos, lista vazia, HTTP não-success, erro de rede e alias acentuado.
- **Dependências:** T-10, T-27.
- **Arquivos prováveis:** `tests/unit/geocodingService.test.ts`.
- **Tipo:** Test.

### T-32 — Testar serviço de forecast

- **Descrição:** cobrir transporte, payload e erros do serviço meteorológico.
- **Critérios de aceite:** `pnpm test -- weatherService` mocka `fetch` e cobre sucesso, 429, 5xx, rede, timeout/abort, JSON inválido, campo ausente e resposta parcial; não chama API real.
- **Dependências:** T-11, T-27.
- **Arquivos prováveis:** `tests/unit/weatherService.test.ts`.
- **Tipo:** Test.

### T-33 — Testar armazenamento e TTL

- **Descrição:** verificar persistência local e degradação de storage.
- **Critérios de aceite:** `pnpm test -- browserStorageService` cobre unidade/favoritos, limite 5/6, TTL 24h, JSON inválido, schema incompatível, `SecurityError` e quota excedida.
- **Dependências:** T-12, T-27.
- **Arquivos prováveis:** `tests/unit/browserStorageService.test.ts`.
- **Tipo:** Test.

### T-34 — Testar busca e seleção no hook

- **Descrição:** validar estados e concorrência do fluxo de busca.
- **Critérios de aceite:** `pnpm test -- useWeather` cobre query vazia/curta, sucesso, empty, erro e duas respostas fora de ordem; a resposta final corresponde à busca mais recente.
- **Dependências:** T-14, T-27.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-35 — Testar estados dos blocos meteorológicos

- **Descrição:** verificar respostas completas, parciais e falhas independentes no hook.
- **Critérios de aceite:** teste comprova current success + forecast error, forecast success + current error, campo ausente e resposta completa; cada bloco mantém estado independente.
- **Dependências:** T-15, T-27.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-36 — Testar refresh e cache no hook

- **Descrição:** validar timers, visibilidade e fallback.
- **Critérios de aceite:** fake timers verificam refresh nos limites 29:59/30:00, pausa/retorno de visibilidade, cache 24h/24h+1ms, ausência de cache e timeout configurado em T-04.
- **Dependências:** T-16, T-27.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-37 — Testar favoritos no hook

- **Descrição:** verificar ações e hidratação da lista.
- **Critérios de aceite:** teste cobre add/remove, cinco/seis itens, reload via storage mockado e fallback em falha de storage.
- **Dependências:** T-17, T-27.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-38 — Testar histórico lazy no hook (condicional)

- **Descrição:** verificar chamada Archive sob demanda e estados isolados.
- **Critérios de aceite:** com histórico aprovado, zero chamadas antes de abrir e uma após abrir; success/empty/error não alteram current/forecast; sem histórico, tarefa N/A.
- **Dependências:** T-18, T-27.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-39 — Testar busca e estado vazio

- **Descrição:** validar controles de busca e apresentação de resultados vazios.
- **Critérios de aceite:** Testing Library verifica zero chamadas abaixo de dois caracteres, no máximo cinco opções, label acessível, seleção por Enter, desambiguação e estado empty com `getByRole`/`getByLabelText`.
- **Dependências:** T-19, T-20, T-27.
- **Arquivos prováveis:** `tests/unit/SearchBar.test.tsx`, `tests/unit/EmptyState.test.tsx`.
- **Tipo:** Test.

### T-40 — Testar estados de loading e erro

- **Descrição:** validar indicadores por bloco e ação de retry.
- **Critérios de aceite:** testes verificam status acessível, alerta de erro, retry quando callback presente e permanência dos demais blocos em sucesso.
- **Dependências:** T-21, T-27.
- **Arquivos prováveis:** `tests/unit/LoadingState.test.tsx`, `tests/unit/ErrorState.test.tsx`.
- **Tipo:** Test.

### T-41 — Testar apresentação do clima atual

- **Descrição:** validar conteúdo, campos ausentes e estados do bloco.
- **Critérios de aceite:** testes cobrem campos recebidos/nulos, timestamp local e loading/error; `null` nunca aparece como zero.
- **Dependências:** T-22, T-27.
- **Arquivos prováveis:** `tests/unit/CurrentWeather.test.tsx`.
- **Tipo:** Test.

### T-42 — Testar apresentação da previsão

- **Descrição:** validar lista e cartões dos cinco dias.
- **Critérios de aceite:** testes verificam cinco datas no fuso da cidade, condição, máximas/mínimas, probabilidade opcional e ausência como indisponível.
- **Dependências:** T-23, T-27.
- **Arquivos prováveis:** `tests/unit/ForecastList.test.tsx`.
- **Tipo:** Test.

### T-43 — Testar alternância de unidade

- **Descrição:** verificar controle e conversão derivada na interface.
- **Critérios de aceite:** teste comprova Celsius inicial, Fahrenheit após seleção, uma casa decimal e zero chamadas de serviço ao alternar.
- **Dependências:** T-24, T-27.
- **Arquivos prováveis:** `tests/unit/UnitToggle.test.tsx`.
- **Tipo:** Test.

### T-44 — Testar lista de favoritos

- **Descrição:** validar lista vazia e ações por cidade.
- **Critérios de aceite:** testes cobrem seleção de ID, remoção individual, limite cinco/seis e queries acessíveis.
- **Dependências:** T-25, T-27.
- **Arquivos prováveis:** `tests/unit/FavoriteCities.test.tsx`.
- **Tipo:** Test.

### T-45 — Testar painel de histórico (condicional)

- **Descrição:** verificar estados e dados históricos exibidos.
- **Critérios de aceite:** com histórico aprovado, fixtures validam sete datas, fuso, loading/empty/error e campos nulos; se removido do MVP, tarefa N/A.
- **Dependências:** T-26, T-27.
- **Arquivos prováveis:** `tests/unit/HistoryPanel.test.tsx`.
- **Tipo:** Test.

## Entrega 8 — Integração e E2E

### T-46 — Cobrir fluxo principal com Playwright

- **Descrição:** testar busca manual, seleção e consulta meteorológica completa com APIs interceptadas.
- **Critérios de aceite:** E2E cobre cidade encontrada, homônimos, clima/previsão, cidade inexistente e uso sem login em viewports de 375 px e desktop; todas as APIs são interceptadas, sem chamada Open-Meteo real.
- **Dependências:** T-27, T-39, T-41, T-42.
- **Arquivos prováveis:** `tests/e2e/weather.spec.ts`.
- **Tipo:** Test.

### T-47 — Cobrir resiliência e viewport mobile com Playwright

- **Descrição:** testar falhas, cache, unidade, favoritos e responsividade.
- **Critérios de aceite:** E2E cobre 429/5xx/offline, cache válido/expirado, retry, unidade sem nova requisição, favoritos após reload, viewport de 375 px e desktop; histórico é executado somente se T-03 o aprovou.
- **Dependências:** T-27, T-36, T-43, T-44; T-45 se histórico aprovado.
- **Arquivos prováveis:** `tests/e2e/weather-resilience.spec.ts`.
- **Tipo:** Test.

## Entrega 9 — Hardening

### T-48 — Validar acessibilidade e compatibilidade de navegadores

- **Descrição:** executar checagens automatizadas e manuais para navegadores e critérios de acessibilidade.
- **Critérios de aceite:** relatório automatizado não contém violações críticas/serious nos fluxos definidos; checklist manual cobre teclado/foco/labels; matriz registra versão testada e resultado de Chrome, Edge, Safari e Firefox segundo a spec.
- **Dependências:** T-46, T-47.
- **Arquivos prováveis:** `tests/e2e/accessibility.spec.ts`, `playwright.config.ts`.
- **Tipo:** Test.

### T-49 — Validar metas de desempenho e sucesso dos dados

- **Descrição:** executar medições controladas conforme protocolo T-05, sem telemetria de usuários.
- **Critérios de aceite:** relatório lista perfil de rede, cidades, número de execuções e resultado por bloco; média observada é ≤3.0 s; cada bloco habilitado tem respostas completas/execuções válidas ≥0.90; amostra insuficiente é reportada como inconclusiva.
- **Dependências:** T-05, T-46, T-47; T-45 se histórico aprovado.
- **Arquivos prováveis:** `tests/e2e/nfr.spec.ts`, `docs/nfr-validation.md`.
- **Tipo:** Test.

### T-50 — Configurar verificação sintética de disponibilidade

- **Descrição:** monitorar carregamento do shell publicado para a meta mensal de 99%.
- **Critérios de aceite:** configuração documenta URL, intervalo e condição HTTP de sucesso de T-05; sondas distinguem falha do shell de falha do provedor; nenhum evento de comportamento é registrado.
- **Dependências:** T-05, T-27.
- **Arquivos prováveis:** configuração de monitoramento do host de T-05, `docs/availability-check.md`.
- **Tipo:** Infra.

### T-51 — Executar gates de qualidade do projeto

- **Descrição:** executar comandos obrigatórios após concluir implementação, testes e hardening.
- **Critérios de aceite:** `pnpm lint`, `pnpm build`, `pnpm test` e `pnpm test:e2e` terminam com exit code 0; qualquer falha bloqueia a conclusão até correção ou exceção formalmente aceita.
- **Dependências:** T-46 a T-50; T-45 se histórico aprovado.
- **Arquivos prováveis:** nenhum por padrão; ajustar apenas arquivos ligados a falhas reproduzíveis.
- **Tipo:** Test.

# Backlog de Tarefas — Weather App

Fonte: `plans/weather-app-plan.md`. IDs de localização automática aposentados (FR-06, US-05 e AC-05) não geram tarefas. Busca postal e histórico são condicionais à PoC; se algum deles não passar, T-03 deve removê-lo do escopo e as tarefas condicionais correspondentes ficam não aplicáveis.

## Entrega 0 — Gates e decisões

### T-01 — Validar capacidades funcionais do Open-Meteo

- **Descrição:** executar a PoC de busca por cidade, clima atual, previsão e recursos condicionais.
- **Critérios de aceite:** registrar, para cidades brasileiras e internacionais, suporte a nomes, homônimos, aliases, campos atuais, cinco dias e fusos; registrar busca postal e histórico como aprovado/reprovado; nenhum endpoint/campo essencial fica sem resultado documentado.
- **Dependências:** nenhuma.
- **Arquivos prováveis:** `docs/open-meteo-poc.md`.
- **Tipo:** Data.

### T-02 — Validar termos, CORS, limites e custo do provedor

- **Descrição:** confirmar condições operacionais e comerciais antes de integrar o serviço.
- **Critérios de aceite:** documentar CORS, limites de forecast e geocoding, uso comercial, atribuição e custo mensal estimado para até mil consultas meteorológicas por dia; custo acima de R$ 100/mês fica marcado para aprovação explícita.
- **Dependências:** T-01.
- **Arquivos prováveis:** `docs/open-meteo-poc.md`.
- **Tipo:** Infra.

### T-03 — Registrar resultado da PoC e congelar escopo do MVP

- **Descrição:** refletir na spec e no plano quais capacidades do Open-Meteo entram no MVP.
- **Critérios de aceite:** busca postal e histórico são mantidos somente se aprovados em T-01; se reprovados, remover seus FRs/ACs, modelos, estrutura, testes e riscos; não selecionar automaticamente outro provedor pago.
- **Dependências:** T-01, T-02.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Infra.

### T-04 — Fechar semântica de dados e requisições

- **Descrição:** definir os parâmetros operacionais que afetam a integração e os estados de erro.
- **Critérios de aceite:** spec e plano registram a regra aprovada para probabilidade de chuva no restante do dia, timeout máximo, retry manual/automático e debounce; nenhum valor é presumido pelo código.
- **Dependências:** T-01, T-03.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Data.

### T-05 — Definir protocolo de validação dos NFRs

- **Descrição:** tornar repetíveis as medições de desempenho, sucesso dos dados, disponibilidade e escala.
- **Critérios de aceite:** protocolo documenta perfil de rede para a média de 3 s, conjunto e quantidade de cidades para as taxas de 90%, volume/pico de autocomplete e frequência das sondas sintéticas de 99%; plataforma de produção para as sondas é definida.
- **Dependências:** T-02, T-03.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Test.

## Entrega 1 — Contratos e funções de domínio

### T-06 — Definir contratos e mapeadores de payload

- **Descrição:** criar os tipos compartilhados e normalizar respostas de geocoding/forecast para o modelo de domínio.
- **Critérios de aceite:** `City`, `CurrentWeather`, `ForecastDay`, `WeatherData` e erros refletem o plano; `HistoricalDay` só é incluído se T-03 aprovou histórico; arrays diários são unidos por data; campos ausentes permanecem `null`, nunca zero.
- **Dependências:** T-03, T-04.
- **Arquivos prováveis:** `src/types/weather.ts`, `src/lib/openMeteoMappers.ts`.
- **Tipo:** Data.

### T-07 — Testar contratos e mapeadores

- **Descrição:** cobrir normalização de respostas externas com fixtures determinísticas.
- **Critérios de aceite:** testes Vitest cobrem geocoding, forecast de cinco dias, campos nulos, arrays diários desalinhados, resposta parcial e schema inválido; não acessam rede real.
- **Dependências:** T-06.
- **Arquivos prováveis:** `tests/unit/openMeteoMappers.test.ts`.
- **Tipo:** Test.

### T-08 — Implementar conversão e formatação de temperatura/data

- **Descrição:** criar funções puras para unidades e formatação local.
- **Critérios de aceite:** C/F conversões e uma casa decimal seguem a spec; datas e horas usam o fuso da cidade e não reinterpretam datas locais como UTC; funções não alteram dados de entrada.
- **Dependências:** T-04, T-06.
- **Arquivos prováveis:** `src/lib/temperature.ts`, `src/lib/format.ts`.
- **Tipo:** Data.

### T-09 — Testar conversão e formatação

- **Descrição:** validar conversões, arredondamento e formatos de data/hora.
- **Critérios de aceite:** Vitest cobre valores positivos/negativos e limites, uma casa decimal, timezone diferente do browser e virada de dia; sem mocks de rede ou navegador.
- **Dependências:** T-08.
- **Arquivos prováveis:** `tests/unit/temperature.test.ts`, `tests/unit/format.test.ts`.
- **Tipo:** Test.

### T-10 — Implementar mapeamento de códigos WMO

- **Descrição:** mapear códigos conhecidos para descrições de condição meteorológica.
- **Critérios de aceite:** cada código usado pelo produto tem descrição; códigos desconhecidos retornam fallback estável sem lançar exceção.
- **Dependências:** T-06.
- **Arquivos prováveis:** `src/lib/weatherCodes.ts`.
- **Tipo:** Data.

### T-11 — Testar mapeamento WMO

- **Descrição:** verificar códigos suportados e valores desconhecidos.
- **Critérios de aceite:** Vitest cobre cada código mapeado e pelo menos um código desconhecido.
- **Dependências:** T-10.
- **Arquivos prováveis:** `tests/unit/weatherCodes.test.ts`.
- **Tipo:** Test.

## Entrega 2 — Serviços e persistência local

### T-12 — Implementar serviço de geocoding

- **Descrição:** consultar Open-Meteo Geocoding e normalizar sugestões para `City`.
- **Critérios de aceite:** query validada é codificada corretamente; no máximo cinco resultados em pt são retornados; cidades homônimas preservam região/país; lista vazia e falha do serviço são erros/estados distintos; postal só funciona se aprovada em T-01.
- **Dependências:** T-01, T-06.
- **Arquivos prováveis:** `src/services/geocodingService.ts`.
- **Tipo:** Data.

### T-13 — Testar serviço de geocoding

- **Descrição:** verificar parâmetros HTTP, normalização e respostas vazias/falhas.
- **Critérios de aceite:** `fetch` mockado cobre sucesso, homônimos, lista vazia, HTTP não-success, erro de rede e query com acentos; sem chamada real ao Open-Meteo.
- **Dependências:** T-12.
- **Arquivos prováveis:** `tests/unit/geocodingService.test.ts`.
- **Tipo:** Test.

### T-14 — Implementar serviço de forecast

- **Descrição:** consultar clima atual e cinco dias usando coordenadas da cidade selecionada.
- **Critérios de aceite:** URL/parâmetros correspondem à PoC; inclui `current`, `daily`, timezone e variáveis aprovadas; resposta retorna blocos normalizados; API nunca recebe localização do dispositivo.
- **Dependências:** T-04, T-06, T-08.
- **Arquivos prováveis:** `src/services/weatherService.ts`.
- **Tipo:** Data.

### T-15 — Testar serviço de forecast

- **Descrição:** testar transporte, payload e erros do serviço meteorológico.
- **Critérios de aceite:** mocks de `fetch` cobrem sucesso, 429, 5xx, erro de rede, timeout/abort, JSON inválido, campos ausentes e resposta parcial; não chamar Open-Meteo real.
- **Dependências:** T-14.
- **Arquivos prováveis:** `tests/unit/weatherService.test.ts`.
- **Tipo:** Test.

### T-16 — Implementar adaptador de armazenamento local

- **Descrição:** persistir preferências, favoritas e cache versionado no navegador.
- **Critérios de aceite:** favoritos limitam-se a cinco; cache é separado por cidade/bloco e expira após 24 horas; dados persistidos usam versão de schema e timestamp; falha de storage degrada para memória.
- **Dependências:** T-06.
- **Arquivos prováveis:** `src/services/browserStorageService.ts`.
- **Tipo:** Data.

### T-17 — Testar armazenamento, TTL e degradação

- **Descrição:** verificar operações de storage com implementação de storage controlada.
- **Critérios de aceite:** Vitest cobre salvar/ler/remover unidade e favoritos, limite cinco, cache válido/expirado, JSON inválido, schema antigo, `SecurityError` e quota excedida.
- **Dependências:** T-16.
- **Arquivos prováveis:** `tests/unit/browserStorageService.test.ts`.
- **Tipo:** Test.

## Entrega 3 — Orquestração do estado

### T-18 — Implementar busca e seleção de cidade no hook

- **Descrição:** orquestrar query, sugestões, seleção e estado de busca em `useWeather`.
- **Critérios de aceite:** estados `idle/loading/success/error/empty` funcionam; query vazia/curta não chama geocoding; nova seleção invalida resultados de uma cidade anterior.
- **Dependências:** T-12, T-16.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-19 — Testar busca e seleção no hook

- **Descrição:** testar estados e concorrência do fluxo de busca.
- **Critérios de aceite:** testes cobrem query curta, sucesso, vazio, falha e descarte de resposta obsoleta; serviços são mockados.
- **Dependências:** T-18.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-20 — Integrar clima atual e previsão ao hook

- **Descrição:** orquestrar carregamento independente de clima atual e previsão após seleção.
- **Critérios de aceite:** cada bloco mantém estado independente; respostas parciais não apagam dados válidos; campos ausentes ficam indisponíveis; loading não oculta blocos existentes.
- **Dependências:** T-14, T-18.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-21 — Testar estados dos blocos meteorológicos

- **Descrição:** verificar o hook com respostas completas, parciais e falhas independentes.
- **Critérios de aceite:** Vitest cobre sucesso, partial, erro atual, erro de forecast e concorrência; falha de um bloco não altera o estado bem-sucedido do outro.
- **Dependências:** T-20.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-22 — Implementar refresh e fallback de cache no hook

- **Descrição:** coordenar atualização manual/automática, visibilidade e uso de cache por bloco.
- **Critérios de aceite:** refresh ocorre aos 30 minutos, pausa com aba oculta e atualiza ao retornar se os dados venceram; cache até 24 horas é identificado como stale; sem cache válido, estado é error com retry manual; timeout usa T-04.
- **Dependências:** T-16, T-20.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-23 — Testar refresh e fallback

- **Descrição:** validar timers, visibilidade e fallback sem chamadas reais.
- **Critérios de aceite:** Vitest usa relógio falso para refresh, testa aba oculta/visível, cache fresh/stale/expirado, falha sem cache e timeout; retry automático segue apenas decisão aprovada.
- **Dependências:** T-22.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-24 — Integrar favoritos ao estado local

- **Descrição:** conectar reducer/hook ao adaptador de favoritos.
- **Critérios de aceite:** é possível adicionar/remover cidade; a quinta favorita é aceita, a sexta é recusada sem alterar a lista; favoritos são restaurados após reload no mesmo navegador.
- **Dependências:** T-16, T-18.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-25 — Testar gerenciamento de favoritos no hook

- **Descrição:** verificar limite e persistência lógica dos favoritos.
- **Critérios de aceite:** testes cobrem add/remove, limite cinco, reload via storage mockado e falha de storage com fallback em memória.
- **Dependências:** T-24.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

## Entrega 4 — Interface do MVP

### T-26 — Implementar busca e sugestões

- **Descrição:** construir campo de busca e lista de resultados com acessibilidade.
- **Critérios de aceite:** teclado e foco são operáveis; sugestões aparecem a partir de dois caracteres e limitadas a cinco; homônimos mostram cidade/região/país; seleção emite a cidade escolhida sem fazer fetch no componente.
- **Dependências:** T-18.
- **Arquivos prováveis:** `src/components/SearchBar.tsx`.
- **Tipo:** UI.

### T-27 — Implementar estado vazio da busca

- **Descrição:** exibir mensagem de cidade não encontrada e orientação para corrigir a busca.
- **Critérios de aceite:** renderiza somente no estado `empty`, mantém campo editável e não sugere dados meteorológicos de outra cidade.
- **Dependências:** T-26.
- **Arquivos prováveis:** `src/components/states/EmptyState.tsx`.
- **Tipo:** UI.

### T-28 — Implementar indicadores de loading e erro

- **Descrição:** criar componentes reutilizáveis de loading e erro por bloco.
- **Critérios de aceite:** loading e erro têm roles/labels acessíveis; retry é comunicado como ação quando aplicável; indicadores de um bloco não ocultam outros.
- **Dependências:** T-20.
- **Arquivos prováveis:** `src/components/states/LoadingState.tsx`, `src/components/states/ErrorState.tsx`.
- **Tipo:** UI.

### T-29 — Testar busca e estados vazios

- **Descrição:** cobrir campo, sugestões, seleção e resposta vazia em componentes.
- **Critérios de aceite:** Testing Library verifica limite de caracteres, máximo cinco resultados, desambiguação, seleção por teclado e mensagem empty usando queries acessíveis.
- **Dependências:** T-26, T-27.
- **Arquivos prováveis:** `tests/unit/SearchBar.test.tsx`.
- **Tipo:** Test.

### T-30 — Implementar apresentação do clima atual

- **Descrição:** renderizar valores disponíveis, condition code e timestamp local.
- **Critérios de aceite:** unidade/formatagem derivadas não alteram dados do hook; campos nulos aparecem indisponíveis, nunca como zero; erros/loading do bloco usam estados próprios.
- **Dependências:** T-08, T-10, T-20, T-28.
- **Arquivos prováveis:** `src/components/CurrentWeather.tsx`.
- **Tipo:** UI.

### T-31 — Implementar apresentação da previsão

- **Descrição:** renderizar lista dos cinco dias e cartões com métricas diárias.
- **Critérios de aceite:** mostra hoje e os quatro dias seguintes no fuso local, condition, máxima/mínima e probabilidade quando disponível; resposta incompleta não inventa valores.
- **Dependências:** T-08, T-10, T-20, T-28.
- **Arquivos prováveis:** `src/components/ForecastCard.tsx`, `src/components/ForecastList.tsx`.
- **Tipo:** UI.

### T-32 — Testar componentes de clima e previsão

- **Descrição:** validar renderização dos blocos meteorológicos com fixtures.
- **Critérios de aceite:** testes cobrem sucesso, campo nulo, fuso/data e loading/error por bloco; seletores usam roles/labels ou texto acessível.
- **Dependências:** T-30, T-31.
- **Arquivos prováveis:** `tests/unit/CurrentWeather.test.tsx`, `tests/unit/ForecastList.test.tsx`.
- **Tipo:** Test.

### T-33 — Implementar alternância de unidade

- **Descrição:** criar controle Celsius/Fahrenheit que atualiza a unidade de apresentação.
- **Critérios de aceite:** Celsius é padrão; mudança atualiza valores visíveis de clima, previsão e histórico habilitado sem nova chamada a serviço.
- **Dependências:** T-08, T-20.
- **Arquivos prováveis:** `src/components/UnitToggle.tsx`.
- **Tipo:** UI.

### T-34 — Testar alternância de unidade

- **Descrição:** verificar controle e conversão derivada na interface.
- **Critérios de aceite:** teste comprova Celsius inicial, Fahrenheit após seleção, uma casa decimal e ausência de chamadas a serviços ao alternar.
- **Dependências:** T-33.
- **Arquivos prováveis:** `tests/unit/UnitToggle.test.tsx`.
- **Tipo:** Test.

### T-35 — Implementar apresentação de favoritos

- **Descrição:** exibir favoritos e permitir selecionar/remover cidade sem conta.
- **Critérios de aceite:** lista reflete estado do hook, limite de cinco é informado, seleção carrega a cidade escolhida e remoção é individual.
- **Dependências:** T-24.
- **Arquivos prováveis:** `src/components/FavoriteCities.tsx`.
- **Tipo:** UI.

### T-36 — Testar apresentação de favoritos

- **Descrição:** verificar ações acessíveis da lista de favoritos.
- **Critérios de aceite:** Testing Library cobre lista vazia, selecionar cidade, remover favorito e limite atingido sem remover outros itens.
- **Dependências:** T-35.
- **Arquivos prováveis:** `tests/unit/FavoriteCities.test.tsx`.
- **Tipo:** Test.

### T-37 — Compor a tela principal

- **Descrição:** conectar busca, clima, previsão, unidade e favoritos em `App`.
- **Critérios de aceite:** seleção de cidade alimenta blocos; layout funciona sem sessão/login; estados independentes permanecem visíveis; estrutura segue componentes pequenos e acessíveis.
- **Dependências:** T-26, T-30, T-31, T-33, T-35.
- **Arquivos prováveis:** `src/App.tsx`.
- **Tipo:** UI.

## Entrega 5 — Histórico condicional à PoC

### T-38 — Implementar serviço Archive

- **Descrição:** adicionar consulta do histórico somente se T-01/T-03 aprovarem o recurso.
- **Critérios de aceite:** se aprovado, solicita os sete dias locais anteriores e normaliza os campos do contrato; se reprovado, marcar tarefa não aplicável sem trocar de provedor.
- **Dependências:** T-03, T-06, T-14.
- **Arquivos prováveis:** `src/services/weatherService.ts`.
- **Tipo:** Data.

### T-39 — Testar serviço Archive

- **Descrição:** cobrir endpoint histórico mockado, caso o recurso permaneça no MVP.
- **Critérios de aceite:** teste valida datas/fuso/parâmetros, resposta completa, ausência de histórico, campos ausentes e erros HTTP; se T-03 remover histórico, tarefa não aplicável.
- **Dependências:** T-38.
- **Arquivos prováveis:** `tests/unit/weatherService.test.ts`.
- **Tipo:** Test.

### T-40 — Integrar histórico sob demanda no hook

- **Descrição:** carregar o bloco histórico somente ao abrir sua aba, se habilitado.
- **Critérios de aceite:** nenhuma chamada Archive ocorre antes da abertura; estados do histórico são independentes; falha/vazio não esconde clima atual ou previsão.
- **Dependências:** T-20, T-38.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-41 — Testar carregamento lazy do histórico

- **Descrição:** verificar momento da chamada, resultados e falhas do estado de histórico.
- **Critérios de aceite:** teste confirma zero chamadas antes da abertura, chamada ao abrir e isolamento do estado em sucesso/vazio/erro; se histórico for removido, tarefa não aplicável.
- **Dependências:** T-40.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-42 — Implementar painel de histórico

- **Descrição:** criar apresentação do histórico aprovado em aba própria.
- **Critérios de aceite:** exibe sete dias anteriores no fuso da cidade com condição, máximas/mínimas e precipitação observada; campos ausentes são indisponíveis; recurso só existe se T-03 aprovar FR-04.
- **Dependências:** T-40.
- **Arquivos prováveis:** `src/components/HistoryPanel.tsx`.
- **Tipo:** UI.

### T-43 — Testar painel de histórico

- **Descrição:** testar estados e dados históricos exibidos.
- **Critérios de aceite:** Testing Library cobre dias, fuso, loading, vazio, erro e campos indisponíveis; se histórico for removido, tarefa não aplicável.
- **Dependências:** T-42.
- **Arquivos prováveis:** `tests/unit/HistoryPanel.test.tsx`.
- **Tipo:** Test.

## Entrega 6 — E2E, NFRs e release

### T-44 — Cobrir fluxo principal com Playwright

- **Descrição:** testar busca manual, seleção e consulta meteorológica com APIs interceptadas.
- **Critérios de aceite:** E2E cobre cidade encontrada, homônimos, clima/previsão, cidade inexistente e uso sem login; nenhuma API real é chamada.
- **Dependências:** T-37.
- **Arquivos prováveis:** `tests/e2e/weather.spec.ts`.
- **Tipo:** Test.

### T-45 — Cobrir resiliência e viewport mobile com Playwright

- **Descrição:** testar falhas, cache, unidade, favoritos e layout mobile.
- **Critérios de aceite:** E2E cobre 429/5xx/offline, cache válido/expirado, retry, unidade sem nova requisição, favoritos após reload, viewport de 375 px e desktop; histórico é condicional.
- **Dependências:** T-37; T-42 se histórico aprovado.
- **Arquivos prováveis:** `tests/e2e/weather-resilience.spec.ts`.
- **Tipo:** Test.

### T-46 — Validar acessibilidade e compatibilidade de navegadores

- **Descrição:** adicionar checagens automatizadas e executar a matriz de navegadores da spec.
- **Critérios de aceite:** fluxos críticos têm teclado, foco, roles/labels acessíveis; checagem automatizada e revisão manual cobrem WCAG 2.2 AA; execução documentada cobre as versões de Chrome, Edge, Safari e Firefox definidas na spec.
- **Dependências:** T-44.
- **Arquivos prováveis:** `tests/e2e/accessibility.spec.ts`, `playwright.config.ts`.
- **Tipo:** Test.

### T-47 — Validar metas de desempenho e sucesso dos dados

- **Descrição:** executar medições controladas conforme protocolo T-05, sem telemetria de usuários.
- **Critérios de aceite:** tempo médio até exibir clima atual é ≤3 s no perfil de rede acordado; clima atual, previsão e histórico habilitado atingem ≥90% de respostas completas na amostra definida; resultados são registrados.
- **Dependências:** T-05, T-44; T-42 se histórico aprovado.
- **Arquivos prováveis:** `tests/e2e/nfr.spec.ts`, `docs/nfr-validation.md`.
- **Tipo:** Test.

### T-48 — Configurar verificação sintética de disponibilidade

- **Descrição:** monitorar o carregamento do shell publicado para a meta mensal de 99%.
- **Critérios de aceite:** sonda usa frequência, endereço e regra de sucesso definidos em T-05; mede shell da aplicação independentemente do provedor de clima; não coleta eventos de comportamento.
- **Dependências:** T-05, T-37.
- **Arquivos prováveis:** configuração de monitoramento do host escolhido em T-05, `docs/availability-check.md`.
- **Tipo:** Infra.

### T-49 — Executar gates de qualidade do projeto

- **Descrição:** executar os comandos obrigatórios após concluir as tarefas de código e testes.
- **Critérios de aceite:** `pnpm lint`, `pnpm build`, `pnpm test` e `pnpm test:e2e` passam; falhas são corrigidas ou registradas antes da entrega.
- **Dependências:** T-44, T-45, T-46, T-47; T-43 se histórico aprovado.
- **Arquivos prováveis:** nenhum arquivo por padrão; ajustar somente arquivos apontados por falhas reproduzíveis.
- **Tipo:** Test.

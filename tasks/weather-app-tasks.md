# Backlog de Tarefas — Weather App

Fonte: `plans/weather-app-plan.md`. IDs de localização automática aposentados (FR-06, US-05 e AC-05) não geram tarefas. Busca postal e histórico são condicionais à PoC; se algum deles não passar, T-03 deve removê-lo do escopo e as tarefas condicionais correspondentes ficam não aplicáveis.

## Rastreabilidade para a spec

| Tarefa | Referências da spec |
|---|---|
| T-01 | FR-01 a FR-04; AC-01.3 a AC-01.6, AC-02.1, AC-03.2; Perguntas em Aberto 1 e 4 |
| T-02 | NFR-10 a NFR-12; Perguntas em Aberto 2 e 3 |
| T-03 | FR-01 e FR-04; AC-01.4, AC-03.1 a AC-03.3; NFR-11; Out of Scope |
| T-04 | FR-02, FR-08 e FR-10; AC-01.6, AC-06.1, AC-06.3 e AC-06.4; Perguntas em Aberto 4, 8 e 9 |
| T-05 | NFR-04 a NFR-06 e NFR-12; Perguntas em Aberto 5 e 6 |
| T-06 a T-07 | FR-01 a FR-04; AC-01.4, AC-01.5, AC-02.1 e AC-03.2 |
| T-08 a T-09 | FR-05; AC-04.1 a AC-04.3; NFR-09 |
| T-10 a T-11 | FR-02 e FR-03; AC-01.5 e AC-02.1 |
| T-12 a T-13 | FR-01 e FR-09; AC-01.1 a AC-01.4, AC-02.2 e AC-06.2 |
| T-14 a T-15 | FR-02, FR-03 e FR-10; AC-01.5, AC-01.6, AC-02.1 e AC-06.5 a AC-06.6 |
| T-16 a T-17 | FR-05, FR-07 e FR-10; AC-02.3 a AC-02.4, AC-04.1 a AC-04.3, AC-06.3 a AC-06.4; NFR-13 |
| T-18 a T-19 | FR-01, FR-09 e FR-13; AC-01.1 a AC-01.4, AC-06.2 e AC-06.7 |
| T-20 a T-21 | FR-02, FR-03 e FR-13; AC-01.5, AC-02.1, AC-06.5 a AC-06.7 |
| T-22 a T-23 | FR-08 e FR-10; AC-06.1, AC-06.3 e AC-06.4; NFR-07 |
| T-24 a T-25 | FR-07; AC-02.3 a AC-02.4; NFR-13 |
| T-26 a T-29 | FR-01, FR-09 e FR-13; AC-01.1 a AC-01.4, AC-06.2 e AC-06.7; NFR-03 |
| T-30 a T-32 | FR-02 e FR-03; AC-01.5 a AC-01.6, AC-02.1 e AC-06.5 a AC-06.6; NFR-09 |
| T-33 a T-34 | FR-05; AC-04.1 a AC-04.3; NFR-09 e NFR-13 |
| T-35 a T-36 | FR-07; AC-02.3 a AC-02.4; NFR-13 |
| T-37 | FR-01 a FR-05, FR-07 a FR-13; AC-01 a AC-07; NFR-01 a NFR-03 |
| T-38 a T-43 | FR-04 (condicional); AC-03.1 a AC-03.3; NFR-06 e NFR-07; Perguntas em Aberto 1 e 4 |
| T-44 | FR-01 a FR-03, FR-09 e FR-12; AC-01, AC-02, AC-06.2 e AC-07.2 |
| T-45 | FR-05, FR-08 e FR-10; AC-04.2, AC-06.1, AC-06.3 a AC-06.4; NFR-01 e NFR-07 |
| T-46 | NFR-01 a NFR-03 |
| T-47 | NFR-04 e NFR-06; Perguntas em Aberto 5 e 6 |
| T-48 | NFR-05 e NFR-08 |
| T-49 | FR/AC implementados e NFR-01 a NFR-13; checklist de validação do projeto |

FR-06, US-05 e AC-05 foram aposentados; não são rastreabilidade pendente.

## Entrega 0 — Gates e decisões

### T-01 — Validar capacidades funcionais do Open-Meteo

- **Descrição:** executar a PoC de busca por cidade, clima atual, previsão e recursos condicionais.
- **Critérios de aceite:** registrar requisição/resposta e presença de cada campo exigido em pelo menos uma cidade brasileira e uma internacional; testar um par de homônimos e uma busca com alias/acentos; verificar as cinco datas diárias e timezone; marcar busca postal e Archive como aprovado/reprovado com evidência, sem deixar endpoint ou campo obrigatório sem resultado registrado.
- **Dependências:** nenhuma.
- **Arquivos prováveis:** `docs/open-meteo-poc.md`.
- **Tipo:** Data.

### T-02 — Validar termos, CORS, limites e custo do provedor

- **Descrição:** confirmar condições operacionais e comerciais antes de integrar o serviço.
- **Critérios de aceite:** preencher uma matriz com CORS (passa/falha por endpoint), limites publicados, uso comercial (permitido/não permitido), atribuição (requerida/não requerida) e custo mensal estimado para mil consultas meteorológicas/dia; qualquer custo acima de R$ 100 fica bloqueado até aprovação explícita.
- **Dependências:** T-01.
- **Arquivos prováveis:** `docs/open-meteo-poc.md`.
- **Tipo:** Infra.

### T-03 — Registrar resultado da PoC e congelar escopo do MVP

- **Descrição:** refletir na spec e no plano quais capacidades do Open-Meteo entram no MVP.
- **Critérios de aceite:** para cada capacidade condicional, spec e plano registram “incluída” ou “fora do MVP” conforme evidência de T-01; quando reprovada, não há FR/AC/modelo/tarefa ativo correspondente fora da seção Out of Scope; nenhuma troca de provedor ocorre sem decisão explícita.
- **Dependências:** T-01, T-02.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Infra.

### T-04 — Fechar semântica de dados e requisições

- **Descrição:** definir os parâmetros operacionais que afetam a integração e os estados de erro.
- **Critérios de aceite:** spec e plano registram: fórmula/fonte da probabilidade restante do dia; timeout numérico; retry automático ligado/desligado e quantidade/intervalo se ligado; debounce em milissegundos. Cada decisão tem aprovação registrada; nenhuma integração usa valor diferente do documentado.
- **Dependências:** T-01, T-03.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Data.

### T-05 — Definir protocolo de validação dos NFRs

- **Descrição:** tornar repetíveis as medições de desempenho, sucesso dos dados, disponibilidade e escala.
- **Critérios de aceite:** protocolo fixa RTT/banda e método de medição para a média de 3 s; lista cidades e número de execuções por bloco para a taxa de 90%; estima chamadas de autocomplete e pico de concorrência; define frequência, endpoint e resposta de sucesso das sondas de disponibilidade e a plataforma de hospedagem.
- **Dependências:** T-02, T-03.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Test.

## Entrega 1 — Contratos e funções de domínio

### T-06 — Definir contratos e mapeadores de payload

- **Descrição:** criar os tipos compartilhados e normalizar respostas de geocoding/forecast para o modelo de domínio.
- **Critérios de aceite:** `pnpm build` aceita os contratos `City`, `CurrentWeather`, `ForecastDay`, `WeatherData` e erros; `HistoricalDay` só existe se T-03 aprovou histórico; fixture diária com arrays alinhados produz objetos pela data correspondente; campo numérico ausente produz `null`, não `0`.
- **Dependências:** T-03, T-04.
- **Arquivos prováveis:** `src/types/weather.ts`, `src/lib/openMeteoMappers.ts`.
- **Tipo:** Data.

### T-07 — Testar contratos e mapeadores

- **Descrição:** cobrir normalização de respostas externas com fixtures determinísticas.
- **Critérios de aceite:** `pnpm test -- openMeteoMappers` passa com fixtures para geocoding, cinco dias, `null`, arrays desalinhados, resposta parcial e schema inválido; nenhuma fixture depende de rede real.
- **Dependências:** T-06.
- **Arquivos prováveis:** `tests/unit/openMeteoMappers.test.ts`.
- **Tipo:** Test.

### T-08 — Implementar conversão e formatação de temperatura/data

- **Descrição:** criar funções puras para unidades e formatação local.
- **Critérios de aceite:** testes usam valores de referência `0 °C → 32 °F`, `100 °C → 212 °F` e `-40 °C → -40 °F`; formatação produz uma casa decimal; uma data local em `America/Sao_Paulo` permanece no mesmo dia e nenhuma função muta o argumento.
- **Dependências:** T-04, T-06.
- **Arquivos prováveis:** `src/lib/temperature.ts`, `src/lib/format.ts`.
- **Tipo:** Data.

### T-09 — Testar conversão e formatação

- **Descrição:** validar conversões, arredondamento e formatos de data/hora.
- **Critérios de aceite:** `pnpm test -- temperature format` passa para os três valores de referência, conversão inversa, arredondamento a uma casa, fuso distinto do browser e virada de dia; testes usam timezone/relógio fixos e nenhum mock de rede.
- **Dependências:** T-08.
- **Arquivos prováveis:** `tests/unit/temperature.test.ts`, `tests/unit/format.test.ts`.
- **Tipo:** Test.

### T-10 — Implementar mapeamento de códigos WMO

- **Descrição:** mapear códigos conhecidos para descrições de condição meteorológica.
- **Critérios de aceite:** cada chave exportada do mapa tem descrição não vazia; código WMO não mapeado retorna a descrição fallback definida sem lançar exceção.
- **Dependências:** T-06.
- **Arquivos prováveis:** `src/lib/weatherCodes.ts`.
- **Tipo:** Data.

### T-11 — Testar mapeamento WMO

- **Descrição:** verificar códigos suportados e valores desconhecidos.
- **Critérios de aceite:** `pnpm test -- weatherCodes` valida todos os códigos exportados e um código desconhecido; a execução passa sem erro.
- **Dependências:** T-10.
- **Arquivos prováveis:** `tests/unit/weatherCodes.test.ts`.
- **Tipo:** Test.

## Entrega 2 — Serviços e persistência local

### T-12 — Implementar serviço de geocoding

- **Descrição:** consultar Open-Meteo Geocoding e normalizar sugestões para `City`.
- **Critérios de aceite:** para query fixture, a URL usa `name`, `count=5`, `language=pt` e `format=json`; saída contém no máximo cinco `City`; `admin1`/`country` são preservados; lista `results: []` retorna vazio e HTTP/rede retornam erro distinto; postal só é exposto se T-01 aprovou.
- **Dependências:** T-01, T-06.
- **Arquivos prováveis:** `src/services/geocodingService.ts`.
- **Tipo:** Data.

### T-13 — Testar serviço de geocoding

- **Descrição:** verificar parâmetros HTTP, normalização e respostas vazias/falhas.
- **Critérios de aceite:** `pnpm test -- geocodingService` verifica parâmetros e normalização de fixtures para sucesso/homônimos, `results: []`, HTTP não-success, rejeição de rede e alias acentuado; todas as chamadas usam `fetch` mockado.
- **Dependências:** T-12.
- **Arquivos prováveis:** `tests/unit/geocodingService.test.ts`.
- **Tipo:** Test.

### T-14 — Implementar serviço de forecast

- **Descrição:** consultar clima atual e cinco dias usando coordenadas da cidade selecionada.
- **Critérios de aceite:** a URL usa `latitude`/`longitude` da `City` selecionada, `timezone=auto`, `forecast_days=5`, unidades aprovadas e exatamente as variáveis registradas em T-01/T-04; resposta normalizada contém até cinco dias com datas locais; não há campo de localização do dispositivo no request.
- **Dependências:** T-04, T-06, T-08.
- **Arquivos prováveis:** `src/services/weatherService.ts`.
- **Tipo:** Data.

### T-15 — Testar serviço de forecast

- **Descrição:** testar transporte, payload e erros do serviço meteorológico.
- **Critérios de aceite:** `pnpm test -- weatherService` verifica request e resposta completa, HTTP 429, 5xx, rejeição de rede, timeout/abort, JSON inválido, campo ausente e resposta parcial; `fetch` é mockado em todos os casos.
- **Dependências:** T-14.
- **Arquivos prováveis:** `tests/unit/weatherService.test.ts`.
- **Tipo:** Test.

### T-16 — Implementar adaptador de armazenamento local

- **Descrição:** persistir preferências, favoritas e cache versionado no navegador.
- **Critérios de aceite:** a API de storage persiste no máximo cinco favoritos; chaves de cache incluem cidade/bloco, timestamp e schemaVersion; cache com idade >24h retorna miss; `SecurityError`/quota ativam memória sem lançar erro para o chamador.
- **Dependências:** T-06.
- **Arquivos prováveis:** `src/services/browserStorageService.ts`.
- **Tipo:** Data.

### T-17 — Testar armazenamento, TTL e degradação

- **Descrição:** verificar operações de storage com implementação de storage controlada.
- **Critérios de aceite:** `pnpm test -- browserStorageService` passa para leitura/gravação/remoção, 5/6 favoritos, TTL em 24h, JSON inválido, schema incompatível, `SecurityError` e quota excedida.
- **Dependências:** T-16.
- **Arquivos prováveis:** `tests/unit/browserStorageService.test.ts`.
- **Tipo:** Test.

## Entrega 3 — Orquestração do estado

### T-18 — Implementar busca e seleção de cidade no hook

- **Descrição:** orquestrar query, sugestões, seleção e estado de busca em `useWeather`.
- **Critérios de aceite:** estado inicial é `idle`; query vazia ou <2 caracteres gera zero chamadas; query válida transita `loading` para `success`, `empty` ou `error`; selecionar uma cidade invalida resposta de busca iniciada antes dessa seleção.
- **Dependências:** T-12, T-16.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-19 — Testar busca e seleção no hook

- **Descrição:** testar estados e concorrência do fluxo de busca.
- **Critérios de aceite:** `pnpm test -- useWeather` cobre query vazia/curta, sucesso, vazio, falha e duas respostas fora de ordem; a cidade/sugestões finais correspondem à ação mais recente e todos os services são mockados.
- **Dependências:** T-18.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-20 — Integrar clima atual e previsão ao hook

- **Descrição:** orquestrar carregamento independente de clima atual e previsão após seleção.
- **Critérios de aceite:** com fixtures atuais e diárias, `current` e `forecast` chegam a estados independentes; falha simulada de forecast mantém current em success; campos ausentes ficam `null`/indisponíveis e dados prévios permanecem visíveis durante loading.
- **Dependências:** T-14, T-18.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-21 — Testar estados dos blocos meteorológicos

- **Descrição:** verificar o hook com respostas completas, parciais e falhas independentes.
- **Critérios de aceite:** `pnpm test -- useWeather` verifica payload completo, campo ausente, current success + forecast error, forecast success + current error e respostas concorrentes; cada bloco mantém o estado esperado.
- **Dependências:** T-20.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-22 — Implementar refresh e fallback de cache no hook

- **Descrição:** coordenar atualização manual/automática, visibilidade e uso de cache por bloco.
- **Critérios de aceite:** relógio falso confirma refresh após 30 min visível, zero refresh enquanto oculto e refresh ao voltar com dados ≥30 min; cache com idade ≤24h é stale e exibe fetchedAt; cache >24h não é exibido; sem cache, `error` oferece retry manual; timeout segue o valor de T-04.
- **Dependências:** T-16, T-20.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-23 — Testar refresh e fallback

- **Descrição:** validar timers, visibilidade e fallback sem chamadas reais.
- **Critérios de aceite:** `pnpm test -- useWeather` com fake timers comprova refresh nos limites 29:59/30:00, pausa/retorno de visibilidade, cache 24h/24h+1ms, ausência de cache e timeout; retry observado coincide com T-04.
- **Dependências:** T-22.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-24 — Integrar favoritos ao estado local

- **Descrição:** conectar reducer/hook ao adaptador de favoritos.
- **Critérios de aceite:** `FAVORITE_ADDED` salva até cinco cidades; a sexta não altera o estado e emite resultado de limite; `FAVORITE_REMOVED` remove somente o ID informado; estado hidratado do storage mantém a lista após reload.
- **Dependências:** T-16, T-18.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-25 — Testar gerenciamento de favoritos no hook

- **Descrição:** verificar limite e persistência lógica dos favoritos.
- **Critérios de aceite:** `pnpm test -- useWeather` verifica adicionar, remover, cinco/seis favoritas, hidratação após reinicialização e fallback quando storage rejeita escrita.
- **Dependências:** T-24.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

## Entrega 4 — Interface do MVP

### T-26 — Implementar busca e sugestões

- **Descrição:** construir campo de busca e lista de resultados com acessibilidade.
- **Critérios de aceite:** campo tem nome acessível; após 2 caracteres exibe no máximo 5 opções com nome/região/país disponíveis; seleção por Enter escolhe a opção focada; SearchBar chama callback de seleção e não executa `fetch`.
- **Dependências:** T-18.
- **Arquivos prováveis:** `src/components/SearchBar.tsx`.
- **Tipo:** UI.

### T-27 — Implementar estado vazio da busca

- **Descrição:** exibir mensagem de cidade não encontrada e orientação para corrigir a busca.
- **Critérios de aceite:** com estado `empty`, renderiza mensagem de ausência e sugestão de correção; com qualquer outro estado, não renderiza a mensagem; input continua habilitado e nenhuma cidade é selecionada automaticamente.
- **Dependências:** T-26.
- **Arquivos prováveis:** `src/components/states/EmptyState.tsx`.
- **Tipo:** UI.

### T-28 — Implementar indicadores de loading e erro

- **Descrição:** criar componentes reutilizáveis de loading e erro por bloco.
- **Critérios de aceite:** loading usa status acessível e error usa alerta com ação de retry quando callback fornecido; renderizar estado de um bloco não desmonta o conteúdo de outro bloco em sucesso.
- **Dependências:** T-20.
- **Arquivos prováveis:** `src/components/states/LoadingState.tsx`, `src/components/states/ErrorState.tsx`.
- **Tipo:** UI.

### T-29 — Testar busca e estados vazios

- **Descrição:** cobrir campo, sugestões, seleção e resposta vazia em componentes.
- **Critérios de aceite:** `pnpm test -- SearchBar` verifica zero chamadas <2 caracteres, lista limitada a 5, label acessível, escolha por Enter, desambiguação e mensagem empty usando `getByRole`/`getByLabelText`.
- **Dependências:** T-26, T-27.
- **Arquivos prováveis:** `tests/unit/SearchBar.test.tsx`.
- **Tipo:** Test.

### T-30 — Implementar apresentação do clima atual

- **Descrição:** renderizar valores disponíveis, condition code e timestamp local.
- **Critérios de aceite:** fixture de clima atual renderiza cada campo disponível e timestamp; campo `null` mostra indicador indisponível e nunca `0`; mudar `Unit` altera apenas apresentação; loading/error são renderizados para esse bloco.
- **Dependências:** T-08, T-10, T-20, T-28.
- **Arquivos prováveis:** `src/components/CurrentWeather.tsx`.
- **Tipo:** UI.

### T-31 — Implementar apresentação da previsão

- **Descrição:** renderizar lista dos cinco dias e cartões com métricas diárias.
- **Critérios de aceite:** fixture de cinco datas renderiza exatamente cinco dias no fuso da cidade, com condição, máximas/mínimas e precipitação quando disponível; valores `null` não aparecem como zero; lista vazia usa estado empty.
- **Dependências:** T-08, T-10, T-20, T-28.
- **Arquivos prováveis:** `src/components/ForecastCard.tsx`, `src/components/ForecastList.tsx`.
- **Tipo:** UI.

### T-32 — Testar componentes de clima e previsão

- **Descrição:** validar renderização dos blocos meteorológicos com fixtures.
- **Critérios de aceite:** `pnpm test -- CurrentWeather ForecastList` verifica campos completos/nulos, datas locais, estados loading/error/empty e seletores acessíveis; ambos os testes passam.
- **Dependências:** T-30, T-31.
- **Arquivos prováveis:** `tests/unit/CurrentWeather.test.tsx`, `tests/unit/ForecastList.test.tsx`.
- **Tipo:** Test.

### T-33 — Implementar alternância de unidade

- **Descrição:** criar controle Celsius/Fahrenheit que atualiza a unidade de apresentação.
- **Critérios de aceite:** render inicial sem preferência mostra Celsius; selecionar Fahrenheit atualiza todos os valores de temperatura visíveis em CurrentWeather/Forecast e History se ativo, sem chamar serviço ou alterar valores C armazenados.
- **Dependências:** T-08, T-20.
- **Arquivos prováveis:** `src/components/UnitToggle.tsx`.
- **Tipo:** UI.

### T-34 — Testar alternância de unidade

- **Descrição:** verificar controle e conversão derivada na interface.
- **Critérios de aceite:** `pnpm test -- UnitToggle` comprova estado inicial Celsius, seleção Fahrenheit, uma casa decimal e contagem zero de novas chamadas de serviço ao alternar.
- **Dependências:** T-33.
- **Arquivos prováveis:** `tests/unit/UnitToggle.test.tsx`.
- **Tipo:** Test.

### T-35 — Implementar apresentação de favoritos

- **Descrição:** exibir favoritos e permitir selecionar/remover cidade sem conta.
- **Critérios de aceite:** lista vazia tem estado vazio; cada favorito renderiza cidade/região/país; selecionar invoca callback com o ID correspondente; remover um item não remove os demais; no sexto item, limite é informado.
- **Dependências:** T-24.
- **Arquivos prováveis:** `src/components/FavoriteCities.tsx`.
- **Tipo:** UI.

### T-36 — Testar apresentação de favoritos

- **Descrição:** verificar ações acessíveis da lista de favoritos.
- **Critérios de aceite:** `pnpm test -- FavoriteCities` cobre lista vazia, seleção de ID, remoção individual e limite cinco/seis usando queries acessíveis.
- **Dependências:** T-35.
- **Arquivos prováveis:** `tests/unit/FavoriteCities.test.tsx`.
- **Tipo:** Test.

### T-37 — Compor a tela principal

- **Descrição:** conectar busca, clima, previsão, unidade e favoritos em `App`.
- **Critérios de aceite:** `App` renderiza SearchBar, CurrentWeather, ForecastList, UnitToggle e Favorites; selecionar cidade propaga o mesmo `City` aos blocos; nenhuma rota/formulário de login é requerido; sucesso/erro de um bloco não desmonta os demais.
- **Dependências:** T-26, T-30, T-31, T-33, T-35.
- **Arquivos prováveis:** `src/App.tsx`.
- **Tipo:** UI.

## Entrega 5 — Histórico condicional à PoC

### T-38 — Implementar serviço Archive

- **Descrição:** adicionar consulta do histórico somente se T-01/T-03 aprovarem o recurso.
- **Critérios de aceite:** se T-03 aprovou histórico, request Archive usa `start_date`/`end_date` dos sete dias locais anteriores e `timezone=auto`; mapper produz 7 `HistoricalDay` com campos válidos ou `null`; se reprovado, tarefa é N/A e nenhum endpoint Archive é incluído.
- **Dependências:** T-03, T-06, T-14.
- **Arquivos prováveis:** `src/services/weatherService.ts`.
- **Tipo:** Data.

### T-39 — Testar serviço Archive

- **Descrição:** cobrir endpoint histórico mockado, caso o recurso permaneça no MVP.
- **Critérios de aceite:** `pnpm test -- weatherService` com Archive habilitado verifica intervalo de sete dias/fuso, resposta completa, lista vazia, campo ausente e HTTP não-success; se T-03 remover histórico, tarefa é N/A.
- **Dependências:** T-38.
- **Arquivos prováveis:** `tests/unit/weatherService.test.ts`.
- **Tipo:** Test.

### T-40 — Integrar histórico sob demanda no hook

- **Descrição:** carregar o bloco histórico somente ao abrir sua aba, se habilitado.
- **Critérios de aceite:** com histórico aprovado, montar a tela produz 0 chamadas Archive; abrir History gera 1 chamada; sucesso/vazio/erro altera somente `history`; sem aprovação, não há estado/view ativa de histórico.
- **Dependências:** T-20, T-38.
- **Arquivos prováveis:** `src/hooks/useWeather.ts`.
- **Tipo:** UI.

### T-41 — Testar carregamento lazy do histórico

- **Descrição:** verificar momento da chamada, resultados e falhas do estado de histórico.
- **Critérios de aceite:** `pnpm test -- useWeather` com histórico aprovado afirma 0 chamadas antes de abrir, 1 após abrir e estados success/empty/error isolados; se removido, tarefa é N/A.
- **Dependências:** T-40.
- **Arquivos prováveis:** `tests/unit/useWeather.test.tsx`.
- **Tipo:** Test.

### T-42 — Implementar painel de histórico

- **Descrição:** criar apresentação do histórico aprovado em aba própria.
- **Critérios de aceite:** com T-03 aprovado, renderiza as sete datas anteriores na timezone da cidade com condição, máxima/mínima e precipitação observada; campos nulos exibem indisponível; sem aprovação, o componente não é montado.
- **Dependências:** T-40.
- **Arquivos prováveis:** `src/components/HistoryPanel.tsx`.
- **Tipo:** UI.

### T-43 — Testar painel de histórico

- **Descrição:** testar estados e dados históricos exibidos.
- **Critérios de aceite:** `pnpm test -- HistoryPanel` com fixtures valida sete datas, fuso, loading/empty/error e campos `null`; se histórico for removido, tarefa é N/A.
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
- **Critérios de aceite:** relatório automatizado não contém violações críticas/serious nos fluxos definidos e checklist manual cobre teclado/foco/labels; matriz registra versão testada de Chrome, Edge, Safari e Firefox e resultado para cada navegador.
- **Dependências:** T-44.
- **Arquivos prováveis:** `tests/e2e/accessibility.spec.ts`, `playwright.config.ts`.
- **Tipo:** Test.

### T-47 — Validar metas de desempenho e sucesso dos dados

- **Descrição:** executar medições controladas conforme protocolo T-05, sem telemetria de usuários.
- **Critérios de aceite:** relatório lista perfil de rede, cidades, número de execuções e resultado por bloco; média observada é ≤3.0 s; cada bloco habilitado tem respostas completas/execuções válidas ≥0.90; amostra insuficiente é reportada como inconclusiva, não como aprovação.
- **Dependências:** T-05, T-44; T-42 se histórico aprovado.
- **Arquivos prováveis:** `tests/e2e/nfr.spec.ts`, `docs/nfr-validation.md`.
- **Tipo:** Test.

### T-48 — Configurar verificação sintética de disponibilidade

- **Descrição:** monitorar o carregamento do shell publicado para a meta mensal de 99%.
- **Critérios de aceite:** configuração documenta URL, intervalo e condição HTTP de sucesso definidos em T-05; 100% das execuções de teste HTTP 200 do shell contam como disponíveis e falha simulada do endpoint meteorológico não altera a sonda; não registra comportamento do usuário.
- **Dependências:** T-05, T-37.
- **Arquivos prováveis:** configuração de monitoramento do host escolhido em T-05, `docs/availability-check.md`.
- **Tipo:** Infra.

### T-49 — Executar gates de qualidade do projeto

- **Descrição:** executar os comandos obrigatórios após concluir as tarefas de código e testes.
- **Critérios de aceite:** `pnpm lint`, `pnpm build`, `pnpm test` e `pnpm test:e2e` terminam com exit code 0; qualquer falha bloqueia a conclusão até ser corrigida ou formalmente aceita como exceção.
- **Dependências:** T-44, T-45, T-46, T-47; T-43 se histórico aprovado.
- **Arquivos prováveis:** nenhum arquivo por padrão; ajustar somente arquivos apontados por falhas reproduzíveis.
- **Tipo:** Test.

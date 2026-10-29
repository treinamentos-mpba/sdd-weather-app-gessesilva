# PoC — Capacidades do Open-Meteo

- **Executada em:** 2026-10-29
- **Ambiente:** consultas HTTPS de baixo volume com `fetch` do Node.js no dev container.
- **Escopo:** geocoding por nome, homônimos/alias, um CEP brasileiro, forecast e Archive em São Paulo (Brasil) e Paris (França).
- **Fora desta PoC:** revisão jurídica completa, custo/limites contratuais e decisão formal de escopo. Esses pontos permanecem para T-02/T-03.

## Matriz de resultados

| Capacidade | Endpoint/parâmetros testados | Evidência | Resultado |
|---|---|---|---|
| Geocoding Brasil | `/v1/search?name=S%C3%A3o+Paulo&count=5&language=pt&format=json` | HTTP 200; cinco resultados; primeiro resultado: ID `3448439`, São Paulo, região São Paulo, país Brasil, latitude `-23.5475`, longitude `-46.63611`, timezone `America/Sao_Paulo`. Campos necessários para `City` presentes. | **APROVADO** na amostra brasileira. |
| Geocoding internacional | `/v1/search?name=Paris&count=5&language=pt&format=json` | HTTP 200; cinco resultados; Paris, França aparece com região Ilha de França, país França, coordenadas e timezone `Europe/Paris`. Outros resultados com o nome Paris são diferenciados por região/país. | **APROVADO** na amostra internacional. |
| Desambiguação de homônimos | `/v1/search?name=Springfield&count=5&language=pt&format=json` | HTTP 200; cinco resultados incluem Missouri, Illinois, Massachusetts, Ohio e Tennessee, todos nos EUA, com coordenadas/timezones distintos. | **APROVADO** para desambiguação por região e país. |
| Alias sem acento | `/v1/search?name=Sao+Paulo&count=5&language=pt&format=json` | HTTP 200; o primeiro resultado tem o mesmo ID `3448439` da busca “São Paulo”. | **APROVADO** para o alias testado. |
| Código postal | `/v1/search?name=01310-100&count=5&language=pt&format=json` | HTTP 200; `results` vazio para o CEP brasileiro consultado. | **REPROVADO** para o CEP testado; não há evidência de suporte adequado a códigos postais. Aplicar a regra de T-03 e remover busca postal do MVP, salvo nova evidência aprovada. |
| Forecast Brasil | `/v1/forecast`; latitude `-23.5505`, longitude `-46.6333`; variáveis `current`, `daily`, `hourly`; `timezone=auto`, `forecast_days=5`, Celsius/km/h/mm. | HTTP 200; timezone `America/Sao_Paulo`; campos atuais requeridos presentes (`temperature_2m`, `relative_humidity_2m`, `apparent_temperature`, `weather_code`, `wind_speed_10m`); cinco datas locais, de 2026-10-29 a 2026-11-02; arrays diários completos. | **APROVADO** na amostra brasileira. |
| Probabilidade horária restante do dia | Forecast de São Paulo; `hourly=precipitation_probability`. | Na consulta focada às 15:30 locais, foram retornadas oito horas restantes (16:00–23:00), sem valores nulos; primeiro e último valores observados: 94% e 94%. | **APROVADO** quanto à disponibilidade horária na amostra. A fórmula para resumir a série em uma probabilidade única continua pendente em T-04; não usar o máximo diário como substituto sem decisão. |
| Forecast internacional | `/v1/forecast` para Paris; mesma seleção de variáveis, `timezone=auto`, `forecast_days=5`, Celsius/km/h/mm. | HTTP 200; timezone `Europe/Paris`; os cinco dias locais (2026-10-29 a 2026-11-02) vieram com temperatura máxima/mínima e probabilidade diária sem valores nulos; os campos atuais solicitados estavam presentes. | **APROVADO** na amostra internacional. |
| Archive Brasil | `/v1/archive`; São Paulo; `start_date=2026-10-22`, `end_date=2026-10-28`, `timezone=auto`; variáveis diárias de condição, máxima, mínima e `precipitation_sum`. | HTTP 200; timezone `America/Sao_Paulo`; sete datas locais (2026-10-22 a 2026-10-28); todos os quatro arrays foram retornados sem valores nulos. | **APROVADO** na amostra brasileira. |
| Archive internacional | `/v1/archive`; Paris; mesmo intervalo de sete dias e variáveis diárias. | HTTP 200; timezone `Europe/Paris`; sete datas locais (2026-10-22 a 2026-10-28); `weather_code`, máximas, mínimas e `precipitation_sum` sem valores nulos. | **APROVADO** na amostra internacional. |

## Parâmetros Forecast

Variáveis solicitadas:

- `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
- `daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max`
- `hourly=precipitation_probability`
- `timezone=auto`, `forecast_days=5`, `temperature_unit=celsius`, `wind_speed_unit=kmh`, `precipitation_unit=mm`

As respostas observadas permitem mapear clima atual, cinco dias e fuso para os campos previstos em `City`, `CurrentWeather` e `ForecastDay`. A probabilidade horária está disponível, mas sua agregação para o restante do dia não foi decidida nesta PoC.

## Conclusão para T-03

- Geocoding por nome, desambiguação, alias sem acento, forecast e Archive passaram nas duas localidades amostradas.
- Busca pelo CEP `01310-100` não retornou resultado; remover busca por código postal do MVP conforme a regra de escopo, salvo nova evidência validada.
- O histórico retornou os sete dias e campos necessários em São Paulo e Paris. Isso aprova os pontos amostrados, mas não prova cobertura uniforme em todas as regiões globais; monitorar indisponibilidade regional conforme a spec.
- Não foram avaliados termos jurídicos completos, CORS em todos os navegadores, cotas contratuais ou preço. T-02 continua necessário.
- A fórmula de probabilidade para o restante do dia permanece em aberto e deve ser definida em T-04.

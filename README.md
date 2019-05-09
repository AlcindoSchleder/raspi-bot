---
description: 'Aplicação para Assistente Vitual (Bot).'
---

# Raspberry bot com suporte a voz.

Simples app usando node e a TJBot lib https://github.com/ibmtjbot/tjbot.

Esta aplicação é muito simples e dá pra se ter uma idéia de como usar sensores ativar microfone e outras funcionalidades.

A meta é transformar esta aplicação em uma classe básica para rodar o um Bot em qualquer boneco que possa interagir com as pessoas, como por exemplo um mascote de uma empresa que detecta a presença da pessoa e interaje em linguagem natural.

Um problema que detectei é que o sensor de presença precisa de um delay para que ele não detecte o movimento muitas vezes e gerando um rechamada da função que liga o microfone causando um erro na app.

Nos próximos dias vou gerar as classes e consertar o este problema.


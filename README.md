# Acesso para Todos — TDE de Programação Web

Site educativo sobre acessibilidade no cotidiano e na web, desenvolvido com **HTML5, CSS3 e JavaScript puro**, sem frameworks, bibliotecas externas ou dependências de instalação.

## Páginas incluídas

1. `index.html` — apresentação do projeto e princípios de acessibilidade.
2. `cotidiano.html` — acessibilidade em espaços públicos, transporte, educação, trabalho e comunicação.
3. `barreiras.html` — exemplos de barreiras e formas de reduzi-las.
4. `tecnologia-assistiva.html` — leitores de tela, linha Braille, ampliadores e dispositivos adaptados.
5. `web-acessivel.html` — práticas de desenvolvimento web acessível.
6. `boas-praticas.html` — checklist interativo, avaliação e referências.

## Como executar localmente

1. Extraia o arquivo ZIP.
2. Abra a pasta `TDE_Acessibilidade_Web`.
3. Dê duplo clique em `index.html` para abrir no navegador.
4. Navegue pelos links do menu. O projeto não depende de internet para funcionar; apenas os links externos da seção de referências precisam de conexão.

Para testar como um servidor local, abra o terminal dentro da pasta e execute:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Recursos de acessibilidade implementados

- Idioma principal declarado com `lang="pt-BR"` em todas as páginas.
- Estrutura semântica com cabeçalho, navegação, conteúdo principal, seções, artigos e rodapé.
- Um título principal (`h1`) por página e hierarquia de cabeçalhos.
- Atalhos para pular diretamente ao conteúdo ou à navegação.
- Links com nomes descritivos e navegação entre seis páginas.
- Indicador de foco visível e operação dos controles por teclado.
- Menu móvel com `aria-expanded`, `aria-controls` e fechamento pela tecla Escape.
- Ilustrações SVG com título/descrição acessíveis; ornamentos visuais ficam fora da árvore de acessibilidade.
- Ajuste de tamanho do texto e alternância de alto contraste. Preferências podem ser guardadas localmente no navegador.
- Leitura opcional do conteúdo principal por síntese de voz do navegador, sem reprodução automática.
- Checklist com campos identificados, agrupados em `fieldset` e `legend`, e resultado anunciado por região `aria-live`.
- Estilos responsivos e respeito à preferência de redução de movimento.
- Conteúdo sem informação transmitida somente por cor, posição ou formato.

## Limites conhecidos

- A leitura por voz usa a API de síntese de fala do navegador. Se ela não estiver disponível, o leitor de tela do sistema continua sendo uma alternativa.
- O checklist é uma ferramenta educativa de revisão inicial; não certifica conformidade WCAG/eMAG.
- A acessibilidade precisa ser revisada em diferentes navegadores, dispositivos, leitores de tela e com pessoas usuárias de tecnologias assistivas. O código, por si só, não garante a ausência de todas as barreiras.
- A publicação online não foi executada automaticamente. Consulte `PUBLICACAO_GITHUB_PAGES.md`.

## Arquivos de apoio

- `ROTEIRO_VIDEO_4_MIN.md` — roteiro para gravar a demonstração de 3 a 5 minutos exigida na atividade.
- `CHECKLIST_TESTES.md` — roteiro de testes manuais antes da entrega.
- `PUBLICACAO_GITHUB_PAGES.md` — passo a passo para hospedar gratuitamente.
- `FONTES.md` — referências utilizadas na elaboração do conteúdo.

## Tecnologias

HTML5, CSS3 e JavaScript (ES6+). O projeto foi estruturado para ser aberto diretamente no navegador e hospedado como site estático.

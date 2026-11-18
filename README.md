# Tarefa 3.1 b) — Back-office Animalec: Patrocinadores e Especialistas

**UC:** Programação Web Avançada · Mestrado em Engenharia Informática e Tecnologia Web (UAb/UTAD)
**Autora:** Milena Maganin
**Repositório:** <https://github.com/mimaganin/Tarefa_3.1b>

## Objetivo

Partir do projeto **Animalec** (Portela & Queirós, 2020), mais concretamente da **Página de Administração / back-office** (capítulo A.3), e planear e incluir duas entidades novas, usando os três conceitos de prototipagem: **wireframes, mockups e protótipo**.

- **Patrocinador (sponsor):** pessoas ou empresas que se identificam com os animais e os apoiam.
- **Especialista (expert):** especialistas científicos de uma espécie ou família de animais.

## Estrutura do repositório

```
Tarefa_3.1b/
├── README.md
├── docs/
│   ├── wireframes/   10 SVG (5 ecrãs × desktop/mobile) + wireframes.pdf
│   └── mockups/      10 SVG (5 ecrãs × desktop/mobile) + mockups.pdf
└── prototipo/        front-end Animalec (Vue 2) com as 2 entidades novas
```

## Entidades e campos

A informação escolhida é a **necessária e suficiente** para gerir cada entidade no back-office: identificar o registo, saber como contactar, ligar aos animais da aplicação e poder desativar sem apagar.

### Patrocinador

| Campo | Tipo no formulário | Obrigatório | Justificação |
|---|---|---|---|
| Nome | `text` | sim | Identifica o patrocinador na lista e nos detalhes. |
| Tipo (empresa / particular) | `radio` | sim | Distingue apoios institucionais de apoios individuais; aparece na tabela. |
| Logótipo | `url` | não | Imagem para mostrar o patrocinador (ex.: na página do animal). Um particular pode não ter. |
| Website | `url` | não | Ligação para quem quer conhecer o patrocinador. |
| Email | `email` | sim | Contacto para a gestão do patrocínio. |
| Animais patrocinados | checkboxes (escolha múltipla) | pelo menos 1 | É o que liga o patrocinador aos animais do Animalec; um patrocinador sem animais não faz sentido. |
| Ativo | checkbox | — | Permite suspender um patrocínio sem perder o histórico. |

### Especialista

| Campo | Tipo no formulário | Obrigatório | Justificação |
|---|---|---|---|
| Nome | `text` | sim | Identifica o especialista. |
| Foto | `url` | não | Dá rosto ao especialista e credibilidade ao conteúdo. |
| Especialidade (mamífero, ave, réptil, anfíbio, peixe) | `select` | sim | É a família de animais em que é especialista. Usa os mesmos grupos do formulário de animais do livro. |
| Instituição | `text` | sim | Mostra a afiliação científica (universidade, centro de investigação, hospital veterinário…). |
| Email | `email` | sim | Contacto para validar conteúdos. |
| Animais que acompanha | checkboxes (escolha múltipla) | pelo menos 1 | Liga o especialista aos animais concretos que revê. |
| Ativo | checkbox | — | Permite retirar um especialista sem apagar o registo. |

Nas listagens aparecem só as colunas principais: **NOME · TIPO · Nº DE ANIMAIS · AÇÕES** (patrocinadores) e **NOME · ESPECIALIDADE · INSTITUIÇÃO · AÇÕES** (especialistas). O resto vê-se no botão **VER**.

## Os três artefactos

| Artefacto | O que é | Onde está |
|---|---|---|
| **Wireframe** | Baixa fidelidade: só estrutura e hierarquia da página, em tons de cinzento (caixas, rótulos, placeholders, sem cores nem imagens reais). Serve para decidir *o que* aparece e *onde*. | [`docs/wireframes/`](docs/wireframes/) · [`wireframes.pdf`](docs/wireframes/wireframes.pdf) |
| **Mockup** | Alta fidelidade, mas estático: o mesmo layout com as cores, a tipografia (Montserrat / Lato) e os ícones Font Awesome do Animalec, e dados de exemplo realistas. Serve para validar o *aspeto*. | [`docs/mockups/`](docs/mockups/) · [`mockups.pdf`](docs/mockups/mockups.pdf) |
| **Protótipo** | Versão funcional e navegável: as duas entidades integradas no back-office em Vue, com listar, adicionar, editar, ver e remover. Serve para testar o *comportamento*. | [`prototipo/`](prototipo/) |

Ecrãs representados nos wireframes e mockups, cada um em **desktop (1366 px)** e **mobile (375 px)**:

1. Menu de gestão (Admin) com os 6 cards
2. Lista de patrocinadores
3. Formulário de patrocinador (adicionar / editar)
4. Lista de especialistas
5. Formulário de especialista (adicionar / editar)

## Como correr o protótipo

Requisitos: Node.js (testado com a versão 24) e npm.

```bash
cd prototipo
npm install
NODE_OPTIONS=--openssl-legacy-provider npm run serve
```

No Windows (PowerShell):

```powershell
cd prototipo
npm install
$env:NODE_OPTIONS="--openssl-legacy-provider"; npm run serve
```

Depois, abrir <http://localhost:8080/admin>.

> A opção `--openssl-legacy-provider` é necessária porque o Vue CLI 4 (webpack 4) usa um algoritmo de hash que as versões recentes do Node já não ativam por defeito.

## Decisões técnicas

- **Dados locais, porque a API está offline.** O código do livro usa uma API alojada no Heroku (`src/api/config.js`), que já não existe. Por isso, as entidades antigas (utilizadores, animais, quizzes, questões) não carregam dados. As **entidades novas usam dados de exemplo locais**: cada uma tem o seu módulo Vuex (`src/store/sponsors/`, `src/store/experts/`) com 4 registos iniciais, e adicionar, editar e remover funcionam **em memória**. Ao recarregar a página, os dados voltam ao estado inicial. As actions devolvem uma `Promise`, como nos módulos do livro, para que as vistas usem `.then()` da mesma forma e, mais tarde, seja simples trocar por chamadas à API.
- **Lista de animais local.** As checkboxes de animais usam os nomes de `db/db.json` (cão, gato, pardal, cavalo), definidos em `src/store/animalOptions.js`, junto com os grupos de animais.
- **Padrão List / Add / Edit do livro.** Cada entidade tem 3 componentes em `src/views/[entidade]/` (`List…`, `Add…`, `Edit…`), rotas `/admin/[entidade]`, `/admin/[entidade]/add` e `/admin/[entidade]/:id` em `src/router/index.js` (com `add` **antes** de `:id`, para não ser apanhado como id), e um card `AdminOptionBox` no `Admin.vue`, que passou a ter 3 linhas de 2 cards. Ícones: `handshake` (Patrocinadores) e `user-graduate` (Especialistas).
- **Edição sobre uma cópia.** O formulário de edição trabalha numa cópia do registo; se o utilizador cancelar, a lista não muda.
- **HTML5 semântico.** As vistas novas usam `header`, `nav` (botões de topo e cards do menu), `section` e `main` (em `App.vue`, à volta das vistas); a tabela tem `caption` e `th scope="col"`; os formulários usam `form`, `fieldset`/`legend`, `label for` e os tipos de input certos (`email`, `url`, `radio`, `checkbox`, `select`) com `required`. A página passou a declarar `lang="pt-PT"`.
- **Validação.** Os campos obrigatórios, o email e os URL são validados pelo próprio browser (HTML5). A regra de "pelo menos um animal" é verificada no método de submissão, com um aviso.
- **Responsivo.** As colunas usam a grelha do Bootstrap (largura total em mobile, centradas em desktop). Em ecrãs com menos de 576 px, as listas escondem uma coluna secundária (Nº de animais / Instituição), os botões de ação mostram só o ícone (com `title` e `aria-label`) e o título da página fica mais pequeno, para não haver scroll horizontal.
- **Pequenas correções ao código de base.** A rota `/admin/animals/add` estava declarada depois de `/admin/animals/:animalId` e por isso abria o formulário de edição. Foi trocada a ordem.
- **Acesso ao back-office.** No código de base, o acesso por password depende da API (login). Como a API está offline, o protótipo abre-se diretamente em `/admin`, porque a rota não tem proteção no router.

## Testes realizados

Testes feitos com `npm run serve`, em **desktop (1366 × 900)** e **mobile (375 × 812)**:

| # | Teste | Desktop | Mobile |
|---|---|---|---|
| 1 | `/admin` mostra os 6 cards e os dois novos levam às listas | ✔ | ✔ |
| 2 | Patrocinadores e especialistas: listar, ordenar por nome, adicionar, editar (e cancelar edição), ver, remover (e cancelar remoção), voltar ao menu principal | ✔ | ✔ |
| 3 | Validação: nome e restantes obrigatórios, email inválido, URL inválido, pelo menos um animal, id inexistente | ✔ | ✔ |
| 4 | Sem scroll horizontal da página nem botões cortados na tabela | ✔ | ✔ |

## Créditos

- Código de base: projeto Animalec do livro *Desenvolvimento avançado para a Web* (Portela & Queirós, 2020), a partir do repositório partilhado por um colega: <https://github.com/josthelvish/Animalec> (pasta `Front-end_Animalec-master`).
- Ícones: Font Awesome 5 (Free).

## Referências

Bootstrap-Vue. (s.d.). *BootstrapVue documentation*. Recuperado em 18 de novembro de 2026, de <https://bootstrap-vue.org/docs>

josthelvish. (s.d.). *Animalec* [Repositório de código]. GitHub. <https://github.com/josthelvish/Animalec>

MDN Web Docs. (s.d.). *HTML elements reference*. Mozilla. Recuperado em 18 de novembro de 2026, de <https://developer.mozilla.org/en-US/docs/Web/HTML/Element>

Portela, F., & Queirós, R. (2020). *Desenvolvimento avançado para a Web: Do front-end ao back-end*. FCA.

Vue.js. (s.d.). *Vue.js 2 guide*. Recuperado em 18 de novembro de 2026, de <https://v2.vuejs.org/v2/guide/>

Vuex. (s.d.). *Vuex 3 guide*. Recuperado em 18 de novembro de 2026, de <https://v3.vuex.vuejs.org/>

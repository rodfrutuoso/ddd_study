# Casos de uso
eu tenho que abrir um turno para minha equipe
eu tenho que que lançar o serviço de uma obra
eu tenho que conseguir filtrar projectShift por data, contrato e por obra
eu tenho que conseguir filtrar e launch por data, contrato e por serviço
eu tenho que conseguir filtrar e programacao por data, contrato e por equipe


# Comandos utilizados
- > npm init -y
- > npm i typescript @types/node -D
- > npx tsc --init
- > npm i vitest -D
- > npx vitest run
- > npm i vite-tsconfig-paths - D `configurar caminhos para os testes`

## 2ª parte
- > npm i eslint @rocketseat/eslint-config -D
- > npm i eslint-plugin-vitest-globals -D
- `Clean Architecture é baseada em desacoplamento`
- > npm i @faker-js/faker -D
- > npm i --save-dev prettier `utilizei para tirar o alerta pra colocar vírgula no final de cada frase`
- > npm i -D @vitest/ui `para ativar descomente reporters: ["html"] em vite.config.ts`
- > vitest --ui `para ativar descomente reporters: ["html"] em vite.config.ts`
- > npx vite preview --outDir ./html `para ativar descomente reporters: ["html"] em vite.config.ts`

### Clean Architecture
Há 4 acamadas Infraestrutura, Adaptadores de Interface, Casos de Uso e Entidades.
1. Infraestrutura: forma da aplicação se comunicar com o mundo externo
2. Adaptadores de Interface: adapta o conteúdo que chega pela estrutura para a camada mais interna. Além disso, é responsável pela proteção dessa camadas mais internas.
3. Casos de Uso: Eventos da minha aplicação e regras de negócio.
4. Entidades: Regras de negócio.

# TODO
[X] Criar caso de uso para encontrar shift por supervisor e contrato utilizando repositórios de equipes
[X] No index da equipe enviar objeto para coor, sup e enc com nome e id
[X] Falta criar as entidades de casos de uso dos colaborador por turno
[X] Falta criar as entidades de casos de uso das fotos
[X] Falta criar as entidades de casos de uso da programação
[X] Falta criar as entidades de casos do supervisor
[X] Falta criar as entidades de casos do tecnico de segurança
[X] Falta criar as entidades de casos das solicitações de cadastro
[ ] Refatorar os casos de uso que precisam de programmerType e enviar o authorId no lugar // fica pra dps

# Subdomínios
- Core: o que dá dinheiro, não pode parar `compra, catalogo, pagamento`
- Supporting: dá suporte para o core funcionar `estoque, listas`
- Generic: necessários, mas não são tão importantes `notificações, promoções, chat`
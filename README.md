# Casos de uso
eu tenho que abrir um turno para minha equipe
eu tenho que que lançar o serviço de uma obra


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

### Clean Architecture
Há 4 acamadas Infraestrutura, Adaptadores de Interface, Casos de Uso e Entidades.
1. Infraestrutura: forma da aplicação se comunicar com o mundo externo
2. Adaptadores de Interface: adapta o conteúdo que chega pela estrutura para a camada mais interna. Além disso, é responsável pela proteção dessa camadas mais internas.
3. Casos de Uso: Eventos da minha aplicação e regras de negócio.
4. Entidades: Regras de negócio.
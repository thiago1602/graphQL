const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1,
    nome: 'Joao silva',
    email: 'jsilva@gmail.com',
    idade: 29
}, {
    id: 2,
    nome: 'Rafael silva',
    email: 'rafael@gmail.com',
    idade: 28
}, {
    id: 3,
    nome: 'Daniela silva',
    email: 'dani@gmail.com',
    idade: 27
}]
const typeDefs = gql `
scalar Date

type Produto{
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
}

type Usuario{
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
}
# Pontos de entrada da API!
type Query {
    ola: String
    horaAtual: Date
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
    usuarios: [Usuario]
}
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Query: {
        ola() {
            return 'Boa tarde'
        },
        horaAtual() {
            return new Date
        },
        usuarioLogado(obj) {
            console.log(obj)
            return {
                id: 1,
                nome: 'Ana',
                email: 'ana@gmail.com',
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Notebook Gamer',
                preco: 4890.89,
                desconto: 0.15
            }
        },
        numerosMegaSena() {
            //return [4, 8, 13, 27, 33, 54]
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
        },
        usuarios() {
            return usuarios
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers

})

server.listen().then(({ url }) => {
    console.log(`
                Executando em $ { url }
                `)
})
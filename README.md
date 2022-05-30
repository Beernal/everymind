# everymind

Teste pratico Everymind

\*Dicas

Baixe o "Postman" para testar as requisições.

\*Explicação do código por módulos comentados

// Conexão com o MongodbAtlas //
Conexão ao banco de dados na nuvem para validação das funcionalidades.

//Registrar Usuário//
Criação do app.post que contém a lógica SIGN UP para criação de ocorrências no BD.

// Validação de registro //
Código para validação de campos não aceitarem vazios.

// Validar se já possui cadastro //
Verificar se já possui ocorrência de cadastro no BD.

//Criar senha//
Aciona o bcrypt para gerar uma criptografia para a senha informada.

// Criar usuário //
Cria o usuário com os campos preenchidos e possui um tratamento para o status da requisição.

// Pagina de login//
Criação do app.post que contém a lógica do SIGN IN para logar.

//Validar e-mail != null//
Código que valida o campo preenchido antes do submit

//Checar se existe tal usuario//
Código que valida se já possui o e-mail na base de dados.

//Checar se a password confere//
Código que busca a password do BD e descriptografa para comparar com a senha inserida. Possui um tratamento para o status da requisição.

\*Funcionalidades

# /auth/login - Funcionalidade que recebe na forma de POST dois valores para os campos de 'email' e 'password' e retorna uma mensagem. Executa de maneira assíncrona.

# /auth/register - Funcionalidade que recebe na forma de POST quatro valores para os campos de 'name','email','password' e 'confirmPassword' para a criação de uma nova ocorrência no BD. Retorna uma mensagem ao final da execução. Executa de maneira assíncrona.

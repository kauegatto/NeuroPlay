### 🎮 NeuroPlay 🕹

## Some examples of the system screens. / Alguns exemplos das telas do sistema
<img src="https://github.com/kauegatto/NeuroPlay/blob/main/frontend/img/Exemplo_telas.png" alt="picture of Douglas Reis" width="500"/>

# PT-BR
🧒🏿🧒🧒🏻 Projeto que foca em ajudar crianças neurodivergentes através de jogos 🧒🏾🧒🏼🧒🏽

## ⚙ 1. Setup:

### 🎲 1.1 Rode o banco de dados DB:
1. Rode o script base (scriptTDAH.sql)
2. Rode as procedures (proceduresTDAH.sql)
3. Rode as seeds (seedTDAH.sql)
### 💻 1.2 Rodando o backend:
#### 1.2.1 - Backend em C# (Obtido na main)
##### A WebAPI em C# ainda está incompleta :)
#### 1.2.2 - Backend em NodeJS+Express (Obtido na branch isolada)
##### 1.2.2.1 Crie um dotenv: 
O arquivo dotenv é um arquivo que guarda informações importantes e sensíveis do seu código, como senha do JWT e dados do seu banco de dados.
Para criar seu arquivo dotenv, entre na pasta de backend e coloque lá dentro um arquivo chamado exatamente ".env", você pode configurar o seu nesse formato:
```
TOKEN_SECRET=SENHASECRETA123 
TOKEN_EXPIRATION=7d
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_DEFAULTDATABASE=neuroplay-db
```
#### 1.2.2 Executando o servidor:
1. Entre na pasta do backend
2. Rode ```npm i``` para obter todos os pacotes que o sistema precisa
3. Run ```npm run dev``` para que o arquivo atualize sempre que você mudar algo no backend ou ```npm run start``` para que ele só rode de novo quando você rodar esse comando novamente.
Obs : Esse projeto foi testado com o node 14.x na azure e 17.x localmente (usando sucrase). A versão 14.x é recomendada pois foi a última que testamos as implementações desse backend, contudo, a portabilidade não deve ser difícil tendo em vista que o funcionamento das bibliotecas não parece afetado.

#### 1.2.3 Saiba o que você pode fazer:
A documentação das rotas pode ser encontrada na [página da wiki deste projeto](https://github.com/kauegatto/NeuroPlay/wiki) aqui no github.
## 2. Obs:
O backend do projeto foi publicado na azure como um appservice, por isso dividimos as branches de tal forma, a fim de evitar _triggers_ desnecessários no github actions. A implementação pode não funcionar corretamente na AWS, cheque se eles usam variáveis de ambiente de maneira diferente ou afins, sempre confirme também o estado do banco de dados remoto. 

_Updates na azure também podem fazer com que o deploy não funcionem. Além disso, testamos o deploy apenas com o necessário, onde a pasta backend era a única que existia e era também a raiz lá, nem a necessidade de um cd/backend, se for tentar dar deploy usando a main inteira talvez não funcione como esperado_ 
Obrigado 😄

# EN
🧒🏿🧒🧒🏻 Project that focuses on games to help neurodivergent kids 🧒🏾🧒🏼🧒🏽

## ⚙ 1. Setup:

### 🎲 1.1 Run the DB:
1. Run base script (scriptTDAH.sql)
2. Run procedures (proceduresTDAH.sql)
3. Run seeds (seedTDAH.sql)
### 💻 1.2 Run the backend:
#### 1.2.1 Create a dotenv: 
First of all you should put a .env file in order to make the tokens router work, you may setup yours as it follows:
```
TOKEN_SECRET=SENHASECRETA123 
TOKEN_EXPIRATION=7d
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_DEFAULTDATABASE=neuroplay-db
```
#### 1.2.2 Execute the server:
1. Enter the backend folder
2. Run ```npm i``` in order to get dependencies
3. Run ```npm run dev```.
P.S: We've tested node 17.x locally( we were also using sucrase ) and node 14.x on azure, which was the version we've made most tests on and we reccomend. 

#### 1.2.3 Know what you can do:
The documentation for the routes can be found in the [project's wiki page](https://github.com/kauegatto/NeuroPlay/wiki) here on github.
### 2.0 P.S :
The backend for this project was deployed on microsoft azure as an appservice, which is why we divided the branches in the way it is, therefore avoiding unnecessary triggers on the github actions. That being said, a future implementation on AWS might not work as intented, I'd recommend you checking for the environment variables there and for the remote-db state.

_Updates on azure might also make the deploy unreliable, yet probably easy to repair. Besides that, we only tested the deploy with the necessary content, where the backend folder was the root and package.json was on it, therefore removing the needs of a cd/backend, which may stop the application from deploying correctly if you set-up the deploy differently_

Thank you 😄

# Acknowledgements:
1. First of all I'd like to thank my friend [Vinicius Vassao](https://github.com/vassourita/) which helped us a lot in this project
2. We'd also like to thank [Luiz Otavio Miranda](https://www.youtube.com/otaviomiranda/videos), which provides many node classes for free in youtube, We sure learned a lot from him.

# Authors: 
<div>
Douglas Reis - Kaue Gatto<br/>
<img src="https://avatars.githubusercontent.com/u/59988180?v=4" alt="picture of Douglas Reis" width="100"/>
<img src="https://avatars.githubusercontent.com/u/13698473?v=4" alt="picture of Kaue Gatto" width="100"/>
</div>

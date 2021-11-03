# NeuroPlay
Project that focuses on games to help neurodivergent kids 

## Setup:

### Run the DB:
1. Run base script (scriptTDAH.sql)
2. Run procedures (proceduresTDAH.sql)
3. Run seeds (seedTDAH.sql)
### Run the backend:
#### 1. Create a dotenv
First of all you should put a .env file in order to make the tokens router work, you may setup yours as it follows:
```
TOKEN_SECRET=SENHASECRETA123 
TOKEN_EXPIRATION=7d
```
#### 2. Run:
1. Enter the backend folder
2. Run npm i in order to get dependencies
3. Run npm run dev.

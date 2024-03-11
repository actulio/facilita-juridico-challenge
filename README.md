# facilita-juridico-challenge

First, you need to have install node version at least 18. To run the frontend, as well the backend, go to their respective folders and do: `npm install` then `npm run dev`. To run tests do `npm test` in the respective projects directory.

Make sure to have the required environment variables. You should create .env files in the `backend/` and `frontend/` folders following the structure in the .env.example files.

Conversely, you can just run everything using docker. Go to the root directory and run `docker compose up`. It should run the backend on localhost:3333, the Postgres database on localhost:5432 and the frontend on [localhost:5173](http://localhost:5173/)

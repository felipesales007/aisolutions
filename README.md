# AI Solutions - Teste

![version](https://img.shields.io/badge/version-0.0.1-blue.svg)

Este projeto é desenvolvido com Laravel no **backend** e Vue.js no **frontend**.

## Para rodar o backend

Para navegar para a pasta de backend:

```sh
cd backend
```

Para fazer download das dependências do Laravel:

```sh
composer install
```

Para configurar o arquivo .env:

```sh
cp .env.example .env
```

Para gerar a chave do arquivo .env:

```sh
php artisan key:generate
```

Para criar o banco de dados com alguns dados já predefinidos:

```sh
php artisan migrate --seed
```

Para executar a api do backend:

```sh
php artisan serve
```

## Para rodar o frontend

Para navegar para a pasta de frontend:

```sh
cd frontend
```

Para fazer download das dependências do Vue.js:

```sh
npm install
```

Para executar o frontend:

```sh
npm run test
```

O frontend agora deve executar em http://localhost:5173
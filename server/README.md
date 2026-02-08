# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

## Routs
To start the development server run:
```bash
/products
```



## Auth local only my dev
```bash
curl -X POST http://localhost:3000/users/login   -H "Content-Type: application/json"   -d '{
"email": "ivan@example.com",
"password": "123456"
}'
```


Open http://localhost:3000/ with your browser to see the result.
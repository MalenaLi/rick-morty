# rick-morty
Rick and Morty Challenge for Chipax
# prerequisites
1. Tener instalado Node.js
Pueden seguir esta URL para su instalación: https://nodejs.dev/

2. Clonar repo:
```
git clone https://github.com/MalenaLi/rick-morty.git
```

3. Acceder al repo:
```
cd rick-morty
```

# backend

## Acceder al backend
Acceder al backend por el terminal
```
cd backend
```
## Instalar dependencias
```
npm install
```

### Ejecutar
```
npm start
```

### Ejecutar test
```
npm test
```

# frontend

## Acceder al frontend
Acceder al frontend por el terminal
```
cd frontend
```

## Instalar dependencias
```
npm install
```

## Crear archivo par las variables de entorno
1. 
```
touch .env.development
```
2. Abrir el archivo y ponerle la URL del backend
```
VUE_APP_BASEURL = 'http://localhost:3000/'
```

### Ejecutar
```
npm run serve
```

### Acceder
Acceder a la URL proporcionada :)

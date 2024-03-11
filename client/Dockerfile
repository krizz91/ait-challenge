# Usa una imagen base de Node.js
FROM node:14-slim

# Establece el directorio de trabajo en /app
WORKDIR /

# Copia el archivo de dependencias del cliente web al contenedor
COPY package.json .

# Instala las dependencias del cliente web
RUN npm install --silent

# Copia el código del cliente web al contenedor
COPY . .

# Exponer el puerto 3000 (este paso es opcional, dependiendo de cómo expongas el puerto en docker-compose.yml)
EXPOSE 3000

# Comando para ejecutar el cliente web
CMD ["npm", "start"]

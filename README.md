# Votación de Papas Católicos

Este proyecto es una aplicación web para votar por Papas Católicos. Cuenta con un backend en Node.js/Express y MongoDB, y un frontend en React con Vite.

---

## Resumen del proyecto

- **Backend:** API REST con Express y MongoDB. Permite listar candidatos, agregar nuevos y votar por ellos.

- **Seed:** Script para insertar 5 Papas Católicos famosos con nombre, descripción y votos iniciales en 0.

- **Frontend:** React + Vite, que muestra los candidatos, permite votar y agregar nuevos candidatos. Muestra el ganador cuando un candidato llega a 10 votos.

- **Comunicación:** El frontend consume el backend vía HTTP usando fetch.

- **Repositorio:** Código organizado para fácil despliegue y pruebas.

---

## Pasos para probar el proyecto

1. Clonar el repositorio:
   
   git clone https://github.com/elmersandi/votacion-papas.git

   cd votacion-papas

2. Instalar dependencias en backend y frontend:

cd backend

npm install

cd ../frontend

npm install


3. Configurar variables de entorno:

Crear un archivo .env en la carpeta backend con la variable:

MONGO_URI=mongodb://localhost:27017/votaciondb

(O usar tu conexión a MongoDB Atlas si prefieres)


4. Ejecutar el seed para insertar los candidatos iniciales:

cd ../backend/scripts

node SeedCandidates.js


5. Ejecutar el backend:

cd ..

npm start

El servidor quedará escuchando en http://localhost:5000.


6. Ejecutar el frontend:

cd ../frontend

npm run dev

El frontend estará disponible en http://localhost:5173.

Abrir el navegador y acceder a http://localhost:5173 para usar la aplicación.


7. Funcionalidades principales

Ver la lista de Papas Católicos con sus descripciones y votos.

Agregar nuevos candidatos (Papas).

Votar por un Papa. El candidato con más votos sube al top.

Mostrar ganador cuando un Papa llega a 10 votos.
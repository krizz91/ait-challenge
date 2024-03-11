# AIT Solutions - Challenge

## Requisitos
### Frontend
- Utilizar ReactJS para construir la interfaz de usuario.
- La interfaz debe incluir formularios para la creación y edición de artículos
- Proporcionar la posibilidad al usuario de importar artículos desde un archivo Excel, así como la opción de descargar la lista de artículos desde un archivo excel.
### Backend
- Crear una API REST utilizando Django y Django Rest Framework.
- Usar MySQL como sistema de gestión de base de datos.
- Incluir test unitarios.
- Dockerizar la aplicación Django y la base de datos MySQL.

## Recomendaciones
- ReactJS 17 o superior
- La aplicación debe utilizar Python 3.8 o superior.

## Instrucciones de Uso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/krizz91/ait-challenge.git
cd ait-challenge
```

### 2. Iniciar el Contenedor del Proyecto
Para iniciar el contenedor del proyecto, utiliza Docker Compose:

```bash
docker-compose up --build
```

Esto construirá las imágenes necesarias y ejecutará los contenedores del proyecto.

### 3. Inicializar la Base de Datos
Una vez que el contenedor esté en funcionamiento, puedes inicializar la base de datos ejecutando las migraciones de Django y populando los datos iniciales. Tambien, se recomienda correr los tests de unidad.

```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py test
docker-compose exec backend python populate.py
```

#### - Demo User
**Username:** admin

**Password:** adminadmin

### 4. Acceder al Proyecto
Una vez que la base de datos esté inicializada, puedes acceder al backend del proyecto en tu navegador web visitando la URL:

> http://localhost:8000

Para acceder al cliente, accede a la siguiente URL

> http://localhost:3000

## TODO Checklist
- [X] Kickstart Django Project
- [X] Modelado de Articulo
- [X] API Calls (DRF)
- [X] Importar y exportar excel (import-export)
- [X] Manejo de errores
- [X] Tests
- [X] Manejo de Sesion ~(JWT)~ (Token)
- [X] Front
- [X] Dockerfile basico
- [X] Populate
- [X] Migracion a MySQL (actualizar dockerfile)
- [X] Pulir documentacion

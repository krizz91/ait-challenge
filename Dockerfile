# Usa una imagen base de Python
FROM python:3.10-slim
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y libmagic1

# Establece el directorio de trabajo en /app
WORKDIR /

# Copia el archivo de requerimientos del backend al contenedor
COPY requirements.txt .

# Instala las dependencias del backend
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código del backend al contenedor
COPY . .

RUN python3 manage.py migrate

RUN python3 manage.py test

RUN python3 populate.py

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar el servidor Django
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

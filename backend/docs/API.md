# Pruebas para Solicitudes
- Obtener todas las solicitudes
Método: GET
URL: http://localhost:4000/api/v0/solicitudes

- Obtener una solicitud por ID
Método: GET
URL: http://localhost:4000/api/v0/solicitudes/1

- Crear una nueva solicitud
Método: POST
URL: http://localhost:4000/api/v0/solicitudes

Body ➡️ selecciona la pestaña JSON y pega:

{
  "nombre_cliente": "Greivin",
  "correo": "greivin@gmail.com",
  "asunto": "Falla de red",
  "descripcion": "No carga ninguna página web."
}

- Actualizar una solicitud completa
Método: PUT
URL: http://localhost:4000/api/v0/solicitudes/1

Body ➡️ selecciona la pestaña JSON y pega:

{
  "nombre_cliente": "Juan Pérez",
  "correo": "juan.nuevo@gmail.com",
  "asunto": "Impresora atascada",
  "descripcion": "Se atascó papel en la bandeja 2.",
  "estado": "Asignada"
}

- Eliminar una solicitud
Método: DELETE
URL: http://localhost:4000/api/v0/solicitudes/5


# Pruebas para Mensajes
- Obtener mensajes de una solicitud
Método: GET
URL: http://localhost:4000/api/v0/mensajes/1

- Enviar un mensaje nuevo
Método: POST
URL: http://localhost:4000/api/v0/mensajes/1

Body ➡️ selecciona la pestaña JSON y pega:

{
  "emisor": "Cliente",
  "mensaje": "Ya reinicié el router y sigue sin dar señal."
}


# Pruebas para Evaluaciones
- Obtener la evaluación de una solicitud
Método: GET
URL: http://localhost:4000/api/v0/evaluaciones/4

- Crear evaluación de una solicitud
Método: POST
URL: http://localhost:4000/api/v0/evaluaciones/1

Body ➡️ selecciona la pestaña JSON y pega:

{
  "calificacion": 5,
  "comentario": "Excelente servicio, resolvieron muy rápido."
}
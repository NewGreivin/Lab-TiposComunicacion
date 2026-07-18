USE laboratorio_comunicacion;

-- SOLICITUDES

INSERT INTO solicitudes
(nombre_cliente,correo,asunto,descripcion,estado)
VALUES

(
'Juan Pérez',
'juan@gmail.com',
'Problema con impresora',
'La impresora no enciende.',
'Pendiente'
),

(
'Ana Rodríguez',
'ana@gmail.com',
'Error en sistema',
'No puedo ingresar al sistema.',
'Asignada'
),

(
'Carlos Gómez',
'carlos@gmail.com',
'Internet lento',
'La conexión es muy lenta.',
'En proceso'
),

(
'María López',
'maria@gmail.com',
'Pantalla azul',
'La computadora muestra pantalla azul.',
'Finalizada'
),

(
'Luis Vargas',
'luis@gmail.com',
'Cuenta bloqueada',
'No puedo ingresar porque mi cuenta fue bloqueada.',
'Cancelada'
);

-- MENSAJES

INSERT INTO mensajes
(solicitud_id,emisor,mensaje)
VALUES

(1,'Cliente','Buenos días.'),

(1,'Tecnico','Buenos días, revisaremos su caso.'),

(2,'Cliente','Necesito ayuda urgente.'),

(2,'Tecnico','Su solicitud fue asignada a un técnico.'),

(3,'Cliente','Sigue muy lento.'),

(3,'Tecnico','Estamos realizando pruebas.'),

(4,'Cliente','Muchas gracias por la ayuda.'),

(4,'Tecnico','Con gusto.');

-- EVALUACIONES

INSERT INTO evaluaciones
(solicitud_id,calificacion,comentario)
VALUES

(
4,
5,
'Excelente atención.'
),

(
5,
3,
'El problema no pudo resolverse.'
);
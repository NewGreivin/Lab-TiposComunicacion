DROP DATABASE IF EXISTS laboratorio_comunicacion;

CREATE DATABASE laboratorio_comunicacion
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE laboratorio_comunicacion;

-- SOLICITUDES

CREATE TABLE solicitudes(

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre_cliente VARCHAR(120) NOT NULL,

    correo VARCHAR(150) NOT NULL,

    asunto VARCHAR(150) NOT NULL,

    descripcion TEXT NOT NULL,

    estado ENUM(
        'Pendiente',
        'Asignada',
        'En proceso',
        'Finalizada',
        'Cancelada'
    ) NOT NULL DEFAULT 'Pendiente',

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

);

-- MENSAJES DEL CHAT

CREATE TABLE mensajes(

    id INT AUTO_INCREMENT PRIMARY KEY,

    solicitud_id INT NOT NULL,

    emisor ENUM(
        'Cliente',
        'Tecnico'
    ) NOT NULL,

    mensaje TEXT NOT NULL,

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_mensaje_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes(id)
        ON DELETE CASCADE

);

-- EVALUACIONES

CREATE TABLE evaluaciones(

    id INT AUTO_INCREMENT PRIMARY KEY,

    solicitud_id INT NOT NULL UNIQUE,

    calificacion INT NOT NULL,

    comentario TEXT,

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_calificacion
        CHECK(calificacion BETWEEN 1 AND 5),

    CONSTRAINT fk_evaluacion_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes(id)
        ON DELETE CASCADE

);

-- INDICES

CREATE INDEX idx_estado
ON solicitudes(estado);

CREATE INDEX idx_correo
ON solicitudes(correo);

CREATE INDEX idx_fecha
ON solicitudes(fecha_creacion);

CREATE INDEX idx_mensajes
ON mensajes(solicitud_id);

CREATE INDEX idx_evaluaciones
ON evaluaciones(solicitud_id);
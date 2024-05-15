create database LEARNMATCH;
use  LEARNMATCH2;

CREATE TABLE MATERIA (
    PK_MATERIA INT(6) PRIMARY KEY,
    NOMBRE_MATERIA VARCHAR(45) NOT NULL,
    AREA VARCHAR(45) NOT NULL,
    DESCRIPCION VARCHAR(45) NOT NULL
);

CREATE TABLE USUARIOELIMINADO (
    PK_USUARIO_ELIMINADO INT(10) PRIMARY KEY,
    CORREO_ELECTRONICO_E VARCHAR(45) NOT NULL,
    ESTATUS_REPORTADO VARCHAR(45) NOT NULL
);


CREATE TABLE COMUNICACIOZG (
PK_REUNION INT(10) PRIMARY KEY,
ESTADOREUNION INT(1) NOT NULL,
FK_EMPAREJAMIENTO INT(10) NOT NULL,
FK_USUARIO1 INT(10) NOT NULL,
FK_USUARIO2 INT(10) NOT NULL
);


CREATE TABLE EMPAREJAMIENTO (
PK_EMPAREJAMIENTO INT (10) PRIMARY KEY,
ESTADOEMPAREJAMIENTO INT (10) NOT NULL,
FK_USUARIO1 INT(10) NOT NULL,
FK_USUARIO2 INT(10) NOT NULL
);


CREATE TABLE INFORMACIONUSUARIO (
PK_USUARIO INT(6) PRIMARY KEY,
ESTATUSUSUARIO INT(1) NOT NULL,
NOMBRE VARCHAR(30) NOT NULL,
APELLIDO_PATERNO VARCHAR(30) NOT NULL,
APELLIDO_MATERNO VARCHAR(30) NOT NULL,
EMAIL VARCHAR(50) NOT NULL,
REPORTADO INT(1),
CALIFICACION DECIMAL(10, 2),
CALIFICACION_MENTOR DECIMAL(10, 2),
CALIFICACION_APRENDIZ DECIMAL(10, 2),
FK_DEFICIENCIA1 INT(6) NOT NULL,
FK_DEFICIENCIA2 INT(6) NOT NULL,
FK_DEFICIENCIA3 INT(6) NOT NULL,
FK_ENSEÑANZA1 INT(6) NOT NULL,
FK_ENSEÑANZA2 INT(6) NOT NULL,
FK_ENSEÑANZA3 INT(6) NOT NULL,
FECHA_CREACION DATE,
FECHA_BORRADO DATE,
RECHAZOS INT(1) NOT NULL
);

CREATE TABLE USUARIOCUENTA (
PK_CUENTA INT(6) PRIMARY KEY,
FK_INFOUSUARIO INT(6) NOT NULL,comunicaciozg
ROL_USUARIO INT (1) NOT NULL,
PSW VARCHAR(1) NOT NULL
);


CREATE USER "fredy"@"%" IDENTIFIED BY "fredy";
GRANT ALL PRIVILEGES ON learnmatch.* TO "fredy"@"%";
FLUSH PRIVILEGES;


CREATE USER "ulises"@"%" IDENTIFIED BY "ulises";
GRANT ALL PRIVILEGES ON learnmatch.* TO "ulises"@"%";
FLUSH PRIVILEGES;

CREATE USER "maik"@"%" IDENTIFIED BY "maik";
GRANT ALL PRIVILEGES ON learnmatch.* TO "maik"@"%";
FLUSH PRIVILEGES;


ALTER TABLE materia(
FOREIGN KEY (PK_AREA) REFERENCES materia(FK_AREA);
);

SHOW TABLES;
use learnmatch;
SELECT * FROM materia;
SELECT * FROM area;
SELECT * FROM estatus;
SELECT * FROM medallas;
SELECT * FROM  controlmedallas;
SELECT * FROM  informacionusuario;
SELECT * FROM estadosemparejamientos;
SELECT * FROM emparejamiento;
SELECT * FROM comunicacionzg;
SELECT * FROM reportesusuarios;
ALTER TABLE informacionusuario AUTO_INCREMENT = 1;
SELECT COUNT(*) FROM informacionusuario;
SELECT COUNT(*) FROM emparejamiento;
SELECT PK_CONTROLMEDALLAS,FK_MEDALLA, ESTADO FROM controlMedallas WHERE FK_USUARIOINFO = 8;
SELECT
                    SUM(CASE WHEN FK_ESTATUSUSUARIO IN (4, 5) THEN 1 ELSE 0 END) AS totalusuariosAyS,
                    SUM(CASE WHEN FK_ESTATUSUSUARIO = 6 THEN 1 ELSE 0 END) AS totalusuariosV
                 FROM informacionusuario;
-- CATALOGO MEDALLAS---
INSERT INTO medallas (PK_MEDALLAS,NOMBRE_MEDALLA) VALUES
('PRIMER EMPAREJAMIENTO'), 
('CINCO EMPAREJAMIENTOS COMPLETOS'),
('BUEN MENTOR'),
('BUENA ESCUCHA'),
('COMUNICADOR ESTELAR'),
('GRAN CONEXIÓN COMUNITARIA');

-- CATALOGO DE MATERIAS --
INSERT INTO materia (NOMBRE_MATERIA, FK_AREA, DESCRIPCION) VALUES 
('CÁLCULO', 1, NULL),
('ANÁLISIS VECTORIAL', 1, NULL),
('MATEMÁTICAS DISCRETAS', 1, NULL),
('COMUNICACIÓN ORAL Y ESCRITA', 3, NULL),
('FUNDAMENTOS DE PROGRAMACIÓN', 2, NULL),
('ÁLGEBRA LINEAL', 1, NULL),
('CÁLCULO APLICADO', 1, NULL),
('MECÁNICA Y ELECTRÓMAGNETISMO', 1, NULL),
('INGENIERÍA, ÉTICA Y SOCIEDAD', 3, NULL),
('FUNDAMENTOS ECONÓMICOS', 2, NULL),
('ALGORITMOS Y ESTRUCTURA DE DATOS', 2, NULL);

 -- CATALOGO DE ESTATUS --
 ALTER TABLE estatus AUTO_INCREMENT = 1;
INSERT INTO estatus (NOMBRE_ESTADO) VALUES 
('SOLICITUD'),
('VERIFICADO'),
('SELECCION MATERIAS'),
('APROBADO'),
('SANCIONADO'),
('VETADO'),
('ELIMINADO'),
('ADMINISTRADOR');

-- CATALOGO DE MEDALLAS --
INSERT INTO MEDALLAS (NOMBRE_MEDALLA) VALUES
('PRIMER EMPAREJAMIENTO'),
('CINCO EMPAREJAMIENTOS COMPLETOS'),
('BUEN MENTOR'),
('BUENA ESCUCHA'),
('COMUNICADOR ESTELAR'),
('GRAN CONEXIÓN COMUNITARIA');



-- Llaves foraneas para informacionusuario--
ALTER TABLE informacionusuario
ADD CONSTRAINT fk_def1
FOREIGN KEY (FK_DEFICIENCIA1) REFERENCES materia(PK_MATERIA);
ALTER TABLE informacionusuario
ADD CONSTRAINT fk_def2
FOREIGN KEY (FK_DEFICIENCIA2) REFERENCES materia(PK_MATERIA);
ALTER TABLE informacionusuario
ADD CONSTRAINT fk_def3
FOREIGN KEY (FK_DEFICIENCIA3) REFERENCES materia(PK_MATERIA);
ALTER TABLE informacionusuario
ADD CONSTRAINT fk_ment1
FOREIGN KEY (FK_ENSEÑANZA1) REFERENCES materia(PK_MATERIA);
ALTER TABLE informacionusuario
ADD CONSTRAINT fk_ment2
FOREIGN KEY (FK_ENSEÑANZA2) REFERENCES materia(PK_MATERIA);
ALTER TABLE informacionusuario
ADD CONSTRAINT fk_ment3
FOREIGN KEY (FK_ENSEÑANZA3) REFERENCES materia(PK_MATERIA);

-- Valores Default --
ALTER TABLE informacionusuario MODIFY COLUMN RECHAZOS INT DEFAULT 9;

ALTER TABLE informacionusuario
ADD CONSTRAINT fk_estatus
FOREIGN KEY (FK_ESTATUSUSUARIO) REFERENCES estatus(PK_ESTATUS);
-- Llaves foraneas para emparejamiento --
ALTER TABLE emparejamiento 
ADD CONSTRAINT fk_usuario1
FOREIGN KEY (FK_USUARIO1) REFERENCES informacionusuario(PK_USUARIO);
ALTER TABLE emparejamiento 
ADD CONSTRAINT fk_usuario2
FOREIGN KEY (FK_USUARIO2) REFERENCES informacionusuario(PK_USUARIO);
ALTER TABLE emparejamiento 
ADD CONSTRAINT fk_estadoempa
FOREIGN KEY (FK_ESTADOEMPAREJAMIENTO) REFERENCES estadosemparejamientos(PK_ESTADOEMP);

-- Llave foraneas para controlmedallas --
ALTER TABLE controlmedallas 
ADD CONSTRAINT fk_usuarioinfomedalla
FOREIGN KEY (FK_USUARIOINFO) REFERENCES informacionusuario(PK_USUARIO);
ALTER TABLE controlmedallas 
ADD CONSTRAINT fk_medalla
FOREIGN KEY (FK_MEDALLA) REFERENCES medallas(PK_MEDALLAS);

-- Llaves foraneas para comunicacionzg--
ALTER TABLE comunicaciozg
ADD CONSTRAINT fk_infousuarioC1
FOREIGN KEY (FK_USUARIO1) REFERENCES informacionusuario(PK_USUARIO);

ALTER TABLE comunicaciozg
ADD CONSTRAINT fk_infousuarioC2
FOREIGN KEY (FK_USUARIO2) REFERENCES informacionusuario(PK_USUARIO);


-- Llaves foraneas tabla materia --
ALTER TABLE materia
ADD CONSTRAINT fk_area
FOREIGN KEY (FK_AREA) REFERENCES area(PK_AREA);






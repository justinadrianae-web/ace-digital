-- ══════════════════════════════════════════════════════════════
--  ACE DIGITAL — Script SQL para Supabase
--  Ejecuta esto en: Supabase → SQL Editor → New Query → Run
-- ══════════════════════════════════════════════════════════════

-- ── 1. MIEMBROS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS miembros (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre       TEXT NOT NULL,
  cedula       TEXT UNIQUE,
  correo       TEXT UNIQUE NOT NULL,
  celular      TEXT,
  fecha_nac    DATE,
  facultad     TEXT,
  carrera      TEXT,
  semestre     TEXT,
  ciudad       TEXT,
  motivo       TEXT,
  habilidad    TEXT,
  como_conocio TEXT,
  estado       TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente','aprobado','rechazado')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. EVENTOS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS eventos (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre       TEXT NOT NULL,
  tipo         TEXT DEFAULT 'Académico',
  fecha        DATE NOT NULL,
  hora         TIME,
  lugar        TEXT,
  descripcion  TEXT,
  autor        TEXT,
  requiere_reg BOOLEAN DEFAULT FALSE,
  cupos        INTEGER,
  estado       TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente','aprobado','rechazado')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. INSCRIPCIONES A EVENTOS ───────────────────────────────
CREATE TABLE IF NOT EXISTS inscripciones_eventos (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  evento_id  UUID REFERENCES eventos(id) ON DELETE CASCADE,
  nombre     TEXT NOT NULL,
  correo     TEXT NOT NULL,
  carrera    TEXT,
  semestre   TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (evento_id, correo)
);

-- ── 4. DOCENTES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS docentes (
  id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre   TEXT NOT NULL,
  titulo   TEXT,
  materia  TEXT NOT NULL,
  horarios JSONB DEFAULT '[]',  -- [{"dia":"Lunes","hora":"08:00-10:00"}]
  correo   TEXT,
  orden    INTEGER DEFAULT 0
);

-- ── 5. SOLICITUDES EXTERNAS (REDMUN) ─────────────────────────
CREATE TABLE IF NOT EXISTS solicitudes_externas (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizacion  TEXT NOT NULL,
  tipo          TEXT,
  evento_ace    TEXT,
  evento_propio TEXT,
  fecha_pref    DATE,
  hora_pref     TIME,
  lugar         TEXT,
  representante TEXT NOT NULL,
  correo        TEXT NOT NULL,
  mensaje       TEXT,
  estado        TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente','aprobado','rechazado')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. CONSULTAS DE CONTACTO ─────────────────────────────────
CREATE TABLE IF NOT EXISTS consultas (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre     TEXT NOT NULL,
  correo     TEXT NOT NULL,
  asunto     TEXT,
  mensaje    TEXT NOT NULL,
  leido      BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 7. EQUIPO DIRECTIVO ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS equipo (
  id        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre    TEXT NOT NULL,
  cargo     TEXT NOT NULL,
  carrera   TEXT,
  semestre  TEXT,
  foto_url  TEXT,
  orden     INTEGER DEFAULT 0
);

-- ── 8. LÍDERES DE CONTACTO ───────────────────────────────────
CREATE TABLE IF NOT EXISTS lideres_contacto (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre     TEXT NOT NULL,
  cargo      TEXT NOT NULL,
  whatsapp   TEXT,
  correo     TEXT,
  instagram  TEXT,
  orden      INTEGER DEFAULT 0
);

-- ── 9. PUBLICACIONES / NOTICIAS ──────────────────────────────
CREATE TABLE IF NOT EXISTS publicaciones (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo      TEXT NOT NULL,
  contenido   TEXT,
  imagen_url  TEXT,
  publicado   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════
--  POLÍTICAS DE SEGURIDAD (Row Level Security)
--  Ejecuta cada bloque por separado si hay errores
-- ══════════════════════════════════════════════════════════════

-- Habilitar RLS en todas las tablas
ALTER TABLE miembros              ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos               ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscripciones_eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE docentes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitudes_externas  ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultas             ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipo                ENABLE ROW LEVEL SECURITY;
ALTER TABLE lideres_contacto      ENABLE ROW LEVEL SECURITY;
ALTER TABLE publicaciones         ENABLE ROW LEVEL SECURITY;

-- MIEMBROS: cualquiera puede registrarse (INSERT), solo admin puede leer/modificar
CREATE POLICY "miembros_insert_public"   ON miembros FOR INSERT WITH CHECK (true);
CREATE POLICY "miembros_select_admin"    ON miembros FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "miembros_update_admin"    ON miembros FOR UPDATE USING (auth.role() = 'authenticated');

-- EVENTOS: cualquiera puede proponer (INSERT), solo admin puede aprobar (UPDATE), todos ven aprobados (SELECT)
CREATE POLICY "eventos_insert_public"    ON eventos FOR INSERT WITH CHECK (true);
CREATE POLICY "eventos_select_public"    ON eventos FOR SELECT USING (estado = 'aprobado' OR auth.role() = 'authenticated');
CREATE POLICY "eventos_update_admin"     ON eventos FOR UPDATE USING (auth.role() = 'authenticated');

-- INSCRIPCIONES: cualquiera puede inscribirse, solo admin puede leer lista
CREATE POLICY "inscrip_insert_public"    ON inscripciones_eventos FOR INSERT WITH CHECK (true);
CREATE POLICY "inscrip_select_admin"     ON inscripciones_eventos FOR SELECT USING (auth.role() = 'authenticated');

-- DOCENTES: solo lectura pública, solo admin puede modificar
CREATE POLICY "docentes_select_public"   ON docentes FOR SELECT USING (true);
CREATE POLICY "docentes_insert_admin"    ON docentes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "docentes_update_admin"    ON docentes FOR UPDATE USING (auth.role() = 'authenticated');

-- SOLICITUDES EXTERNAS: cualquiera puede enviar, solo admin lee
CREATE POLICY "solext_insert_public"     ON solicitudes_externas FOR INSERT WITH CHECK (true);
CREATE POLICY "solext_select_admin"      ON solicitudes_externas FOR SELECT USING (auth.role() = 'authenticated');

-- CONSULTAS: cualquiera puede enviar, solo admin lee
CREATE POLICY "consultas_insert_public"  ON consultas FOR INSERT WITH CHECK (true);
CREATE POLICY "consultas_select_admin"   ON consultas FOR SELECT USING (auth.role() = 'authenticated');

-- EQUIPO: lectura pública, solo admin modifica
CREATE POLICY "equipo_select_public"     ON equipo FOR SELECT USING (true);
CREATE POLICY "equipo_write_admin"       ON equipo FOR ALL USING (auth.role() = 'authenticated');

-- LÍDERES: lectura pública
CREATE POLICY "lideres_select_public"    ON lideres_contacto FOR SELECT USING (true);
CREATE POLICY "lideres_write_admin"      ON lideres_contacto FOR ALL USING (auth.role() = 'authenticated');

-- PUBLICACIONES: lectura pública (solo publicadas), admin puede todo
CREATE POLICY "pub_select_public"        ON publicaciones FOR SELECT USING (publicado = true OR auth.role() = 'authenticated');
CREATE POLICY "pub_write_admin"          ON publicaciones FOR ALL USING (auth.role() = 'authenticated');

-- ══════════════════════════════════════════════════════════════
--  DATOS DE EJEMPLO (opcional — para probar que funciona)
-- ══════════════════════════════════════════════════════════════

INSERT INTO eventos (nombre, tipo, fecha, hora, lugar, descripcion, autor, requiere_reg, estado)
VALUES
  ('Charla: Derechos Constitucionales 2025', 'Académico', CURRENT_DATE + 14, '15:00', 'Aula Magna Jurisprudencia', 'Una charla sobre los derechos constitucionales vigentes y su aplicación práctica en Ecuador.', 'ACE Admin', true, 'aprobado'),
  ('Torneo de Debate Jurídico', 'Académico', CURRENT_DATE + 21, '09:00', 'Salón de Actos UG', 'Torneo interfacultades de debate jurídico. Modalidad individual y equipos de 3.', 'ACE Admin', true, 'aprobado');

INSERT INTO docentes (nombre, titulo, materia, horarios, correo)
VALUES
  ('Dr. Nombre Apellido', 'Dr.', 'Derecho Constitucional', '[{"dia":"Lunes","hora":"08:00-10:00"},{"dia":"Miércoles","hora":"08:00-10:00"}]', ''),
  ('Dra. Nombre Apellido', 'Dra.', 'Derecho Civil', '[{"dia":"Martes","hora":"10:00-12:00"},{"dia":"Jueves","hora":"10:00-12:00"}]', ''),
  ('Mgs. Nombre Apellido', 'Mgs.', 'Derecho Penal', '[{"dia":"Lunes","hora":"14:00-16:00"},{"dia":"Viernes","hora":"14:00-16:00"}]', '');

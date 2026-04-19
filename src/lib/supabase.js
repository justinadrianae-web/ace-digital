// ══════════════════════════════════════════
//  src/lib/supabase.js
//  Cliente de Supabase para ACE Digital
// ══════════════════════════════════════════
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('⚠️  Faltan las variables de entorno de Supabase. Revisa tu archivo .env')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Helpers de autenticación ──────────────────────

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

// ── Helpers de miembros ───────────────────────────

export async function registrarMiembro(datos) {
  const { data, error } = await supabase
    .from('miembros')
    .insert([{
      nombre:      datos.nombre,
      cedula:      datos.cedula,
      correo:      datos.correo,
      celular:     datos.celular,
      fecha_nac:   datos.fechaNac,
      facultad:    datos.facultad,
      carrera:     datos.carrera,
      semestre:    datos.semestre,
      ciudad:      datos.ciudad,
      motivo:      datos.motivo,
      habilidad:   datos.habilidad,
      como_conocio:datos.comoConocio,
      estado:      'pendiente',
      created_at:  new Date().toISOString(),
    }])
    .select()
  return { data, error }
}

export async function getMiembros() {
  const { data, error } = await supabase
    .from('miembros')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function actualizarEstadoMiembro(id, estado) {
  const { data, error } = await supabase
    .from('miembros')
    .update({ estado })
    .eq('id', id)
    .select()
  return { data, error }
}

// ── Helpers de eventos ────────────────────────────

export async function getEventos(soloAprobados = false) {
  let query = supabase.from('eventos').select('*').order('fecha', { ascending: true })
  if (soloAprobados) query = query.eq('estado', 'aprobado')
  const { data, error } = await query
  return { data, error }
}

export async function crearEvento(datos) {
  const { data, error } = await supabase
    .from('eventos')
    .insert([{
      nombre:        datos.nombre,
      tipo:          datos.tipo,
      fecha:         datos.fecha,
      hora:          datos.hora,
      lugar:         datos.lugar,
      descripcion:   datos.descripcion,
      autor:         datos.autor,
      requiere_reg:  datos.requiereReg || false,
      cupos:         datos.cupos || null,
      estado:        'pendiente',
      created_at:    new Date().toISOString(),
    }])
    .select()
  return { data, error }
}

export async function actualizarEstadoEvento(id, estado) {
  const { data, error } = await supabase
    .from('eventos')
    .update({ estado })
    .eq('id', id)
    .select()
  return { data, error }
}

// ── Helpers de inscripciones a eventos ───────────

export async function inscribirseEvento(datos) {
  const { data, error } = await supabase
    .from('inscripciones_eventos')
    .insert([{
      evento_id:  datos.eventoId,
      nombre:     datos.nombre,
      correo:     datos.correo,
      carrera:    datos.carrera,
      semestre:   datos.semestre,
      created_at: new Date().toISOString(),
    }])
    .select()
  return { data, error }
}

export async function getInscripcionesPorEvento(eventoId) {
  const { data, error } = await supabase
    .from('inscripciones_eventos')
    .select('*')
    .eq('evento_id', eventoId)
  return { data, error }
}

// ── Helpers de docentes ───────────────────────────

export async function getDocentes() {
  const { data, error } = await supabase
    .from('docentes')
    .select('*')
    .order('materia', { ascending: true })
  return { data, error }
}

export async function crearDocente(datos) {
  const { data, error } = await supabase
    .from('docentes')
    .insert([{
      nombre:   datos.nombre,
      titulo:   datos.titulo,
      materia:  datos.materia,
      horarios: datos.horarios, // array de { dia, hora }
      correo:   datos.correo,
    }])
    .select()
  return { data, error }
}

// ── Helpers de solicitudes externas (REDMUN) ─────

export async function crearSolicitudExterna(datos) {
  const { data, error } = await supabase
    .from('solicitudes_externas')
    .insert([{
      organizacion: datos.organizacion,
      tipo:         datos.tipo,
      evento_ace:   datos.eventoAce,
      evento_propio:datos.eventoPropio || null,
      fecha_pref:   datos.fechaPref || null,
      hora_pref:    datos.horaPref || null,
      lugar:        datos.lugar || null,
      representante:datos.representante,
      correo:       datos.correo,
      mensaje:      datos.mensaje,
      estado:       'pendiente',
      created_at:   new Date().toISOString(),
    }])
    .select()
  return { data, error }
}

export async function getSolicitudesExternas() {
  const { data, error } = await supabase
    .from('solicitudes_externas')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

// ── Helpers de contacto ───────────────────────────

export async function enviarConsulta(datos) {
  const { data, error } = await supabase
    .from('consultas')
    .insert([{
      nombre:   datos.nombre,
      correo:   datos.correo,
      asunto:   datos.asunto,
      mensaje:  datos.mensaje,
      leido:    false,
      created_at: new Date().toISOString(),
    }])
    .select()
  return { data, error }
}

// ── Helpers de equipo directivo ───────────────────

export async function getEquipo() {
  const { data, error } = await supabase
    .from('equipo')
    .select('*')
    .order('orden', { ascending: true })
  return { data, error }
}

// ── Helpers de contacto líderes ───────────────────

export async function getLideres() {
  const { data, error } = await supabase
    .from('lideres_contacto')
    .select('*')
    .order('orden', { ascending: true })
  return { data, error }
}

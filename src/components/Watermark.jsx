// src/components/Watermark.jsx
export default function Watermark() {
  return (
    <div style={{
      background:     '#0C1C15',
      borderTop:      '1px solid rgba(60,174,120,.07)',
      padding:        '13px 40px',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            8,
      flexWrap:       'wrap',
    }}>
      <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:12, color:'rgba(60,174,120,.45)', letterSpacing:'.04em' }}>
        <strong style={{ color:'rgba(60,174,120,.7)' }}>Jostin Alvarado</strong>
        <span style={{ color:'rgba(60,174,120,.25)', margin:'0 6px' }}>×</span>
        ACE Alianza Colectiva Estudiantil
      </span>
      <span style={{ color:'rgba(60,174,120,.2)', fontSize:12 }}>·</span>
      <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:12, color:'rgba(60,174,120,.45)' }}>
        Diseño &amp; Desarrollo · Facultad de Jurisprudencia · UG · 2025
      </span>
      <span style={{ color:'rgba(60,174,120,.2)', fontSize:12 }}>·</span>
      <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:10, color:'rgba(60,174,120,.3)' }}>
        Todos los derechos reservados
      </span>
    </div>
  )
}

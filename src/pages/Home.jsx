// src/pages/Home.jsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../lib/useReveal'

// Secciones reutilizables
import SectionHero    from '../components/sections/Hero'
import SectionHistoria from '../components/sections/Historia'
import SectionMision  from '../components/sections/Mision'
import SectionValores from '../components/sections/Valores'
import SectionFunciones from '../components/sections/Funciones'
import SectionLogros  from '../components/sections/Logros'
import SectionGaleria from '../components/sections/Galeria'
import SectionEquipo  from '../components/sections/Equipo'
import SectionRoadmap from '../components/sections/Roadmap'
import SectionStack   from '../components/sections/Stack'
import SectionFAQ     from '../components/sections/FAQ'
import SectionCTA     from '../components/sections/CTA'

export default function Home() {
  useReveal()
  useEffect(() => { document.title = 'ACE — Alianza Colectiva Estudiantil · UG' }, [])

  return (
    <>
      <SectionHero />
      <SectionHistoria />
      <SectionMision />
      <SectionValores />
      <SectionFunciones />
      <SectionLogros />
      <SectionGaleria />
      <SectionEquipo />
      <SectionRoadmap />
      <SectionStack />
      <SectionFAQ />
      <SectionCTA />
    </>
  )
}

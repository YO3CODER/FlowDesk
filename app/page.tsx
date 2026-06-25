import Link from 'next/link'
import Image from 'next/image'
import LandingNavbar from './components/LandingNavbar'
import { auth } from '@clerk/nextjs/server'
import { ArrowRight } from 'lucide-react'

const features = [
  {
    gif: '/1.gif',
    title: 'Créez vos projets',
    description: 'Organisez votre travail en projets clairs et structurés. Ajoutez un nom, une description et démarrez immédiatement.',
  },
  {
    gif: '/2.gif',
    title: 'Gérez vos tâches',
    description: 'Créez, assignez et suivez vos tâches en temps réel. Priorisez ce qui compte vraiment.',
  },
  {
    gif: '/3.gif',
    title: 'Collaborez en équipe',
    description: 'Invitez des membres, partagez des projets et avancez ensemble vers vos objectifs.',
  },
  {
    gif: '/4.gif',
    title: 'Suivez la progression',
    description: "Visualisez l'avancement de chaque projet et identifiez les blocages en un coup d'œil.",
  },
  {
    gif: '/5.gif',
    title: 'Restez organisé',
    description: "Filtrez, triez et retrouvez n'importe quelle tâche instantanément grâce à une interface intuitive.",
  },
]

const pillars = [
  {
    color: '#6366f1',
    label: 'Rapide',
    items: [
      { title: 'Démarrage en 30 secondes', desc: 'Créez votre premier projet immédiatement après connexion. Aucune configuration complexe.' },
      { title: 'Interface fluide', desc: 'Navigation instantanée, zéro temps de chargement. Conçu pour aller vite.' },
    ],
  },
  {
    color: '#f59e0b',
    label: 'Collaboratif',
    items: [
      { title: 'Travail en équipe', desc: 'Invitez vos collaborateurs, assignez des tâches et suivez les contributions de chacun.' },
      { title: 'Projets partagés', desc: 'Centralisez toutes les informations du projet en un seul endroit accessible à toute l\'équipe.' },
    ],
  },
  {
    color: '#10b981',
    label: 'Efficace',
    items: [
      { title: 'Suivi en temps réel', desc: 'Progression des tâches, statuts et priorités mis à jour instantanément.' },
      { title: 'Vue d\'ensemble claire', desc: 'Tableau de bord synthétique pour piloter plusieurs projets sans vous perdre.' },
    ],
  },
]

const steps = [
  { num: 1, color: '#6366f1', shadow: '#4338ca', title: 'Créez votre compte', desc: 'Inscription en moins de 30 secondes via Google ou email. Aucune carte bancaire requise.' },
  { num: 2, color: '#f59e0b', shadow: '#b45309', title: 'Lancez votre projet', desc: 'Donnez un nom et une description à votre projet. Il est prêt à accueillir vos tâches immédiatement.' },
  { num: 3, color: '#10b981', shadow: '#047857', title: 'Ajoutez vos tâches', desc: 'Créez, assignez et priorisez vos tâches. Suivez leur avancement en temps réel.' },
  { num: 4, color: '#8b5cf6', shadow: '#6d28d9', title: 'Collaborez et livrez', desc: 'Invitez votre équipe, partagez le projet et livrez dans les délais.' },
]

const featureCards = [
  { title: 'Gestion des tâches', desc: 'Créez, assignez et suivez vos tâches avec des statuts clairs et des priorités définies.', color: '#6366f1' },
  { title: 'Projets multiples', desc: 'Gérez plusieurs projets en parallèle depuis un tableau de bord unique et synthétique.', color: '#f59e0b' },
  { title: 'Collaboration', desc: 'Invitez des membres, partagez vos projets et avancez ensemble vers vos objectifs.', color: '#10b981' },
  { title: 'Suivi en temps réel', desc: 'Progression des tâches mise à jour instantanément pour toute l\'équipe.', color: '#8b5cf6' },
  { title: 'Interface intuitive', desc: 'Prise en main immédiate, sans formation. Conçu pour les équipes qui veulent aller vite.', color: '#ef4444' },
  { title: '100% gratuit', desc: 'Accès complet sans abonnement. Toutes les fonctionnalités disponibles dès l\'inscription.', color: '#06b6d4' },
]

const testimonials = [
  { name: 'Awa S.', role: 'Chef de projet, Dakar', color: '#6366f1', text: 'TaskFlow a transformé notre façon de travailler. On voit enfin qui fait quoi et les projets avancent vraiment.' },
  { name: 'Konan M.', role: 'Développeur freelance, Abidjan', color: '#10b981', text: 'Je gère mes projets clients et mes tâches perso au même endroit. Simple, rapide, efficace.' },
  { name: 'Fatou D.', role: 'Directrice marketing, Dakar', color: '#f59e0b', text: 'L\'interface est tellement claire. Mon équipe a adopté l\'outil en moins d\'une journée.' },
  { name: 'Yves T.', role: 'Entrepreneur, Abidjan', color: '#8b5cf6', text: 'Enfin un outil de gestion de projet qui ne nécessite pas une formation de 3 jours pour être utilisé.' },
]

const faqs = [
  { q: 'TaskFlow est-il vraiment gratuit ?', a: 'Oui, TaskFlow est 100% gratuit. Créez votre compte, créez vos projets et invitez votre équipe sans aucun abonnement.' },
  { q: 'Combien de projets puis-je créer ?', a: 'Il n\'y a pas de limite. Vous pouvez créer autant de projets que nécessaire et y inviter autant de collaborateurs que vous le souhaitez.' },
  { q: 'Puis-je utiliser TaskFlow seul ?', a: 'Absolument. TaskFlow fonctionne aussi bien en solo pour gérer vos tâches personnelles qu\'en équipe pour des projets collaboratifs.' },
  { q: 'Mes données sont-elles sécurisées ?', a: 'Oui. Vos données sont hébergées de façon sécurisée. Seuls vous et les membres que vous invitez avez accès à vos projets.' },
  { q: 'Peut-on accéder à TaskFlow depuis mobile ?', a: 'Oui, l\'interface est entièrement responsive et fonctionne parfaitement sur smartphone et tablette.' },
]

export default async function LandingPage() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <LandingNavbar />

      {/* HERO */}
      <section style={{ background: '#6366f1', minHeight: '88vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, background: 'rgba(255,255,255,0.06)', top: '-100px', right: '10%', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
        <div style={{ position: 'absolute', width: 250, height: 250, background: 'rgba(255,255,0,0.06)', bottom: '5%', left: '5%', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', width: '100%', position: 'relative', zIndex: 1 }} className="hero-grid">
          <div>
            <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1.08, margin: '0 0 24px', letterSpacing: -1 }}>
              Organisez,<br />
              collaborez,<br />
              <span style={{ color: '#fde68a', textShadow: '0 3px 0 rgba(0,0,0,0.12)' }}>livrez.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.88)', marginBottom: 40, lineHeight: 1.6, maxWidth: 480 }}>
              TaskFlow centralise vos projets, tâches et équipes dans un seul espace de travail fluide et puissant. Gratuit, sans carte bancaire.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {userId ? (
                <Link href="/dashboard" style={{ background: '#fff', color: '#6366f1', fontWeight: 900, fontSize: 15, padding: '15px 32px', borderRadius: 16, textDecoration: 'none', boxShadow: '0 6px 0 rgba(0,0,0,0.15)', letterSpacing: 0.5, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Mon espace <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link href="/sign-up" style={{ background: '#fff', color: '#6366f1', fontWeight: 900, fontSize: 15, padding: '15px 32px', borderRadius: 16, textDecoration: 'none', boxShadow: '0 6px 0 rgba(0,0,0,0.15)', letterSpacing: 0.5, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Commencer — c&apos;est gratuit
                  </Link>
                  <Link href="/sign-in" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 800, fontSize: 15, padding: '15px 28px', borderRadius: 16, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    Se connecter
                  </Link>
                </>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 36, flexWrap: 'wrap' }}>
              {[{ value: '100%', label: 'Gratuit' }, { value: '< 1min', label: 'Prise en main' }, { value: '∞', label: 'Projets' }].map(({ value, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: '#fde68a' }}>{value}</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 700 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }} className="hero-image">
            <Image
              src="/1.gif"
              alt="TaskFlow en action"
              width={500}
              height={320}
              unoptimized
              style={{ borderRadius: 20, boxShadow: '0 24px 48px rgba(0,0,0,0.25)', width: '100%', maxWidth: 500 }}
            />
          </div>
        </div>
      </section>

      {/* EN SAVOIR PLUS */}
      <div style={{ background: '#6366f1', textAlign: 'center', paddingBottom: 20 }}>
        <a href="#comment" style={{ color: '#fff', opacity: 0.6, fontSize: 13, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
          <div>En savoir plus</div>
          <div style={{ fontSize: 22 }}>&#8964;</div>
        </a>
      </div>

      {/* 3 PILIERS */}
      <section style={{ background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, color: '#1a1a1a', marginBottom: 14, letterSpacing: -0.5 }}>
            avec TaskFlow, vous allez adorer gérer vos projets
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 17, marginBottom: 56, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            La puissance des meilleurs outils. La simplicité en plus.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="grid-3">
            {pillars.map(({ color, label, items }) => (
              <div key={label} style={{ border: '2px solid #e5e7eb', borderRadius: 20, overflow: 'hidden', background: '#fff' }}>
                <div style={{ padding: '28px 28px 20px', borderBottom: '2px solid #f3f4f6' }}>
                  <div style={{ width: 48, height: 6, borderRadius: 4, background: color, marginBottom: 20 }} />
                  <p style={{ fontWeight: 900, fontSize: 24, color, margin: 0 }}>{label}</p>
                </div>
                <div style={{ padding: '22px 28px 30px' }}>
                  {items.map(({ title, desc }) => (
                    <div key={title} style={{ marginBottom: 18 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 4 }}>
                        <span style={{ color, fontWeight: 900, fontSize: 15, marginTop: 1, flexShrink: 0 }}>✓</span>
                        <p style={{ fontWeight: 800, fontSize: 14, color: '#1a1a1a', margin: 0 }}>{title}</p>
                      </div>
                      <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.6, margin: '0 0 0 25px' }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section id="comment" style={{ background: '#f9fafb', padding: '80px 20px', borderTop: '3px solid #e5e7eb', borderBottom: '3px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="two-col">
          <div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, color: '#1a1a1a', marginBottom: 16, letterSpacing: -0.5 }}>
              comment ça marche
            </h2>
            <p style={{ color: '#6b7280', fontSize: 17, marginBottom: 36, lineHeight: 1.6 }}>
              Créez votre compte en quelques secondes et commencez votre premier projet immédiatement — sans carte bancaire, sans engagement.
            </p>
            <Image src="/2.gif" alt="Demo TaskFlow" width={300} height={180} unoptimized style={{ borderRadius: 16, display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            {steps.map(({ num, color, shadow, title, desc }) => (
              <div key={num} style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div style={{ minWidth: 50, height: 50, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 22, boxShadow: `0 4px 0 ${shadow}`, flexShrink: 0 }}>
                  {num}
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 16, color, margin: '0 0 6px' }}>{title}</p>
                  <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES ALTERNÉES */}
      <section style={{ background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 900, letterSpacing: 4, color: '#6366f1', textTransform: 'uppercase', marginBottom: 12 }}>Fonctionnalités</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, color: '#1a1a1a', marginBottom: 16, letterSpacing: -0.5 }}>
            tout ce dont vous avez besoin
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 17, marginBottom: 72, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
            De la création de projet à la livraison finale, TaskFlow vous accompagne à chaque étape.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {features.map((feature, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', direction: index % 2 !== 0 ? 'rtl' : 'ltr' }} className="two-col">
                <div style={{ direction: 'ltr' }}>
                  <Image
                    src={feature.gif}
                    alt={feature.title}
                    width={520}
                    height={320}
                    unoptimized
                    style={{ width: '100%', borderRadius: 20, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
                  />
                </div>
                <div style={{ direction: 'ltr' }}>
                  <div style={{ display: 'inline-block', background: '#6366f110', color: '#6366f1', fontWeight: 800, fontSize: 12, padding: '6px 14px', borderRadius: 100, marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Étape {index + 1}
                  </div>
                  <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: '#1a1a1a', margin: '0 0 16px', letterSpacing: -0.5 }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: 17, lineHeight: 1.7, margin: '0 0 24px' }}>
                    {feature.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6366f1', fontSize: 14, fontWeight: 700 }}>
                    <span>✓</span> Inclus dans tous les plans
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{ background: '#f9fafb', padding: '80px 20px', borderTop: '3px solid #e5e7eb', borderBottom: '3px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 900, letterSpacing: 4, color: '#6366f1', textTransform: 'uppercase', marginBottom: 12 }}>Pourquoi TaskFlow</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, color: '#1a1a1a', marginBottom: 56, letterSpacing: -0.5 }}>
            conçu pour aller vite
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-3">
            {featureCards.map(({ title, desc, color }) => (
              <div key={title} style={{ background: '#fff', borderRadius: 20, padding: '28px 24px', border: '2px solid #e5e7eb', cursor: 'pointer' }}>
                <div style={{ width: 40, height: 5, borderRadius: 3, background: color, marginBottom: 18 }} />
                <h3 style={{ fontWeight: 900, fontSize: 16, color: '#1a1a1a', margin: '0 0 10px' }}>{title}</h3>
                <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{ background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 900, letterSpacing: 4, color: '#6366f1', textTransform: 'uppercase', marginBottom: 12 }}>Témoignages</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, color: '#1a1a1a', marginBottom: 56, letterSpacing: -0.5 }}>
            ils gèrent déjà leurs projets avec TaskFlow
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="grid-2">
            {testimonials.map(({ name, role, color, text }) => (
              <div key={name} style={{ background: '#f9fafb', borderRadius: 20, padding: '26px 24px', border: '2px solid #e5e7eb' }}>
                <div style={{ color: '#fbbf24', fontSize: 16, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.7, margin: '0 0 20px' }}>&ldquo;{text}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 16, flexShrink: 0 }}>
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 14, color: '#1a1a1a', margin: 0 }}>{name}</p>
                    <p style={{ color: '#9ca3af', fontSize: 12, margin: 0 }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#f9fafb', padding: '80px 20px', borderTop: '3px solid #e5e7eb', borderBottom: '3px solid #e5e7eb' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 900, letterSpacing: 4, color: '#6366f1', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, color: '#1a1a1a', marginBottom: 48, letterSpacing: -0.5 }}>
            questions fréquentes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map(({ q, a }) => (
              <details key={q} style={{ background: '#fff', borderRadius: 14, border: '2px solid #e5e7eb', padding: '18px 22px' }}>
                <summary style={{ fontWeight: 800, fontSize: 15, color: '#1a1a1a', cursor: 'pointer', listStyle: 'none' }}>{q}</summary>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7, margin: '12px 0 0' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: '#6366f1', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: 4, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: 18 }}>Commence aujourd&apos;hui</p>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900, color: '#fff', marginBottom: 20, lineHeight: 1.1, letterSpacing: -0.5 }}>
            prêt à transformer votre façon de travailler ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 18, marginBottom: 44, lineHeight: 1.6 }}>
            Rejoignez TaskFlow gratuitement et créez votre premier projet en moins de 2 minutes.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {userId ? (
              <Link href="/dashboard" style={{ background: '#fff', color: '#6366f1', fontWeight: 900, fontSize: 16, padding: '18px 40px', borderRadius: 16, textDecoration: 'none', boxShadow: '0 6px 0 rgba(0,0,0,0.15)', textTransform: 'uppercase', letterSpacing: 0.5, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Accéder à mon espace <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link href="/sign-up" style={{ background: '#fff', color: '#6366f1', fontWeight: 900, fontSize: 16, padding: '18px 40px', borderRadius: 16, textDecoration: 'none', boxShadow: '0 6px 0 rgba(0,0,0,0.15)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Commencer — c&apos;est gratuit
                </Link>
                <Link href="/sign-in" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 800, fontSize: 16, padding: '18px 32px', borderRadius: 16, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111827', padding: '52px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 40, marginBottom: 40 }} className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
                    <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
                    <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
                    <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.75" />
                  </svg>
                </div>
                <span style={{ fontWeight: 900, fontSize: 20, color: '#fff' }}>Task<span style={{ color: '#818cf8' }}>Flow</span></span>
              </div>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
                L&apos;outil de gestion de projet conçu pour les équipes qui veulent aller vite et rester organisées.
              </p>
            </div>
            {[
              { title: 'Produit', links: ['Fonctionnalités', 'Mes projets', 'Collaboration', 'Tableau de bord'] },
              { title: 'Support', links: ['FAQ', 'Contact', 'Confidentialité', 'CGU'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p style={{ fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#4b5563', marginBottom: 18 }}>{title}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {links.map(l => (
                    <li key={l} style={{ marginBottom: 12 }}>
                      <span style={{ color: '#6b7280', fontSize: 14, cursor: 'pointer' }}>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #1f2937', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: '#4b5563', fontSize: 13, margin: 0 }}>© {new Date().getFullYear()} TaskFlow. Tous droits réservés.</p>
            <p style={{ color: '#4b5563', fontSize: 13, margin: 0 }}>Fait avec ❤️ pour les équipes ambitieuses.</p>
          </div>
        </div>
      </footer>

      {/* RESPONSIVE */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-image { max-width: 400px; margin: 0 auto; }
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; direction: ltr !important; }
          .grid-3 { grid-template-columns: 1fr 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .hero-image { max-width: 100% !important; }
        }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary { color: #6366f1; }
      `}</style>
    </div>
  )
}
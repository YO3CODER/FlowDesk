import Link from 'next/link'
import Image from 'next/image'
import LandingNavbar from './components/LandingNavbar'
import { auth } from '@clerk/nextjs/server'
import { CheckCircle, Users, Zap, BarChart3, ArrowRight } from 'lucide-react'

const features = [
  {
    gif: '/1.gif',
    title: 'Créez vos projets',
    description: 'Organisez votre travail en projets clairs et structurés. Ajoutez un nom, une description et démarrez immédiatement. Chaque projet est un espace dédié où vous pouvez inviter des collaborateurs, définir des objectifs et suivre la progression en temps réel.',
  },
  {
    gif: '/2.gif',
    title: 'Gérez vos tâches',
    description: 'Créez, assignez et suivez vos tâches en temps réel. Priorisez ce qui compte vraiment. Avec notre système intelligent de priorités et de statuts, vous verrez toujours ce qui est urgent, ce qui est en cours et ce qui a été complété. Les notifications en temps réel gardent tout le monde synchronisé.',
  },
  {
    gif: '/3.gif',
    title: 'Collaborez en équipe',
    description: 'Invitez des membres, partagez des projets et avancez ensemble vers vos objectifs. Communiquez directement sur les tâches, assignez des rôles spécifiques et laissez les permissions granulaires vous donner le contrôle total sur qui peut faire quoi dans vos projets.',
  },
  {
    gif: '/4.gif',
    title: 'Suivez la progression',
    description: 'Visualisez l\'avancement de chaque projet et identifiez les blocages en un coup d\'œil. Nos tableaux de bord intuitifs vous montrent des graphiques détaillés, des métriques clés et des alertes pour les tâches en retard. Prenez des décisions meilleures grâce à des données visualisées clairement.',
  },
  {
    gif: '/5.gif',
    title: 'Restez organisé',
    description: 'Filtrez, triez et retrouvez n\'importe quelle tâche instantanément grâce à une interface intuitive. Utilisez des étiquettes personnalisées, des catégories et des recherches avancées pour garder le contrôle total de votre portefeuille de projets, peu importe sa taille.',
  },
]

const stats = [
  { value: '10x', label: 'Plus productif' },
  { value: '98%', label: 'Satisfaction' },
  { value: '< 2min', label: 'Prise en main' },
  { value: '0€', label: 'Pour commencer' },
]

const advantages = [
  { icon: <Zap className="w-5 h-5 text-primary" />, text: 'Interface rapide et intuitive' },
  { icon: <Users className="w-5 h-5 text-primary" />, text: 'Collaboration en temps réel' },
  { icon: <BarChart3 className="w-5 h-5 text-primary" />, text: 'Suivi visuel de la progression' },
  { icon: <CheckCircle className="w-5 h-5 text-primary" />, text: 'Gestion des priorités simplifiée' },
]

export default async function LandingPage() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-base-100">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative px-5 md:px-[10%] pt-24 pb-32 flex flex-col items-center text-center gap-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="badge badge-primary badge-outline text-xs font-semibold px-4 py-2 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
          Gestion de projet nouvelle génération
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-base-content leading-tight max-w-4xl">
          Organisez,{' '}
          <span className="text-primary">collaborez</span>
          ,{' '}
          <br className="hidden md:block" />
          livrez.
        </h1>

        <p className="text-base-content/60 text-xl max-w-xl leading-relaxed">
          TaskFlow centralise vos projets, tâches et équipes dans un seul espace de travail fluide et puissant. Gratuit, sans engagement et sans limite.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          {userId ? (
            <Link href="/dashboard" className="btn btn-primary btn-lg gap-2">
              Accéder à mon espace <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link href="/sign-up" className="btn btn-primary btn-lg gap-2">
                Commencer gratuitement <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/sign-in" className="btn btn-outline btn-lg">
                Se connecter
              </Link>
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
          {advantages.map((adv, i) => (
            <div key={i} className="flex items-center gap-1.5 text-sm text-base-content/60">
              {adv.icon}
              {adv.text}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 md:px-[10%] py-12 border-y border-base-300 bg-base-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <span className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</span>
              <span className="text-sm text-base-content/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-5 md:px-[10%] py-24">
        <div className="text-center mb-16">
          <div className="badge badge-primary badge-outline mb-4">Fonctionnalités</div>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-base-content/60 max-w-lg mx-auto text-lg">
            De la création de projet à la livraison finale, TaskFlow vous accompagne à chaque étape avec des outils puissants et simples.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
            >
              {/* GIF */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-48">
                  <Image
                    src={feature.gif}
                    alt={feature.title}
                    width={240}
                    height={150}
                    className="w-full rounded-2xl shadow-xl"
                    unoptimized
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="badge badge-primary badge-outline w-fit">
                  Étape {index + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-base-content">
                  {feature.title}
                </h3>
                <p className="text-base-content/60 text-lg leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium mt-2">
                  <CheckCircle className="w-4 h-4" />
                  Inclus dans tous les plans
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative px-5 md:px-[10%] py-28 flex flex-col items-center text-center gap-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="badge badge-primary badge-outline mb-2">Prêt à démarrer ?</div>
        <h2 className="text-3xl md:text-5xl font-bold text-base-content max-w-2xl leading-tight">
          Transformez la façon dont vous travaillez en équipe
        </h2>
        <p className="text-base-content/60 max-w-md text-lg">
          Rejoignez des centaines d'équipes qui utilisent TaskFlow pour gérer leurs projets plus efficacement. Gratuit, sans carte bancaire, sans engagement.
        </p>
        {userId ? (
          <Link href="/dashboard" className="btn btn-primary btn-lg gap-2">
            Accéder à mon espace <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/sign-up" className="btn btn-primary btn-lg gap-2">
              Démarrer maintenant <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/sign-in" className="btn btn-outline btn-lg">
              Se connecter
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-base-300 px-5 md:px-[10%] py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-base-content/40 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
              <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
              <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
              <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.75" />
            </svg>
          </div>
          <span className="font-medium">Task<span className="text-primary">Flow</span></span>
        </div>
        <span>© {new Date().getFullYear()} TaskFlow — Tous droits réservés</span>
      </footer>
    </div>
  )
}
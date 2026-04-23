import { TopNavBar, Footer, NeoCard, NeoButton } from '../components';

export function LandingPage() {
  const steps = [
    { icon: 'upload', title: 'Upload', desc: 'Drop your CV. We accept PDF, DOCX, and TXT formats.' },
    { icon: 'psychology', title: 'Analyze', desc: 'Claude AI scans your CV for strengths, gaps, and missed opportunities.' },
    { icon: 'rocket_launch', title: 'Rebel', desc: 'Get actionable feedback to make your CV stand out from the herd.' },
  ];

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CV_REBEL — Neo-Brutalist CV Analysis</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,700,1,0" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface min-h-screen">
        <TopNavBar currentPage="landing" />

        <main className="max-w-7xl mx-auto px-gutter">
          <section className="py-xl grid md:grid-cols-2 gap-lg items-center">
            <div>
              <h1 className="font-display font-bold text-6xl md:text-8xl leading-none mb-md">
                YOUR CV<br />
                <span className="text-primary-dark">IS BORING.</span>
              </h1>
              <p className="font-body text-lg text-gray-600 mb-lg">
                Most CVs read like corporate beige. Same buzzwords. Same bullet points.
                We use AI to find what makes you actually interesting—and tell you how to say it.
              </p>
              <NeoButton href="/upload" className="text-lg px-8 py-4">
                GET STARTED — FREE
              </NeoButton>
            </div>
            <div className="hidden md:block">
              <NeoCard shadow="neo">
                <div className="bg-surface-dim p-lg aspect-video flex items-center justify-center">
                  <span className="material-symbols-outlined text-8xl text-gray-300">description</span>
                </div>
              </NeoCard>
            </div>
          </section>

          <section className="py-xl">
            <h2 className="font-display font-bold text-4xl mb-lg">HOW IT WORKS</h2>
            <div className="grid md:grid-cols-3 gap-md">
              {steps.map((step, i) => (
                <NeoCard shadow="neo" key={i}>
                  <div className="flex items-center gap-sm mb-sm">
                    <span className="material-symbols-outlined text-4xl text-primary-dark">{step.icon}</span>
                    <span className="font-display font-bold text-2xl">{step.title}</span>
                  </div>
                  <p className="font-body text-base text-gray-600">{step.desc}</p>
                </NeoCard>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </body>
    </html>
  );
}
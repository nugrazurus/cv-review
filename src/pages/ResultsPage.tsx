import { TopNavBar, Footer, NeoCard, NeoButton } from '../components';

export function ResultsPage() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Results — CV_REBEL</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,700,1,0" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface min-h-screen">
        <TopNavBar currentPage="results" />

        <main className="max-w-7xl mx-auto px-gutter py-xl">
          <h1 className="font-display font-bold text-5xl mb-lg">ANALYSIS COMPLETE</h1>

          <section className="grid md:grid-cols-2 gap-md mb-xl">
            <NeoCard shadow="neo" className="transform rotate-1 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-md">
                <div id="score-ring" className="w-[120px] h-[120px] relative">
                  <svg width="120" height="120" className="transform -rotate-90">
                    <circle cx="60" cy="60" r="52" stroke="#dadada" strokeWidth="8" fill="none" />
                    <circle id="score-circle" cx="60" cy="60" r="52" stroke="#4c6700" strokeWidth="8" fill="none" strokeDasharray="326.73" strokeDashoffset="326.73" strokeLinecap="butt" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span id="score-value" className="font-display font-bold text-3xl">0</span>
                  </div>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl">CV SCORE</p>
                  <p id="verdict" className="font-body text-base text-gray-600 mt-xs">Loading analysis...</p>
                </div>
              </div>
            </NeoCard>

            <NeoCard shadow="neo" className="bg-primary">
              <h2 className="font-display font-bold text-2xl mb-sm">THE VERDICT</h2>
              <p id="verdict-detail" className="font-body text-lg">Analysis results will appear here after upload.</p>
            </NeoCard>
          </section>

          <section className="grid md:grid-cols-2 gap-md mb-xl">
            <NeoCard shadow="neo">
              <div className="border-b-2 border-black pb-sm mb-sm">
                <h2 className="font-display font-bold text-2xl flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary-dark">thumb_up</span>
                  STRENGTHS
                </h2>
              </div>
              <ul id="strengths" className="space-y-sm">
                <li className="text-gray-400">Loading...</li>
              </ul>
            </NeoCard>

            <NeoCard shadow="neo" className="border-alert-orange">
              <div className="border-b-2 border-black pb-sm mb-sm">
                <h2 className="font-display font-bold text-2xl flex items-center gap-sm">
                  <span className="material-symbols-outlined text-alert-orange">warning</span>
                  WEAKNESSES
                </h2>
              </div>
              <ul id="weaknesses" className="space-y-sm">
                <li className="text-gray-400">Loading...</li>
              </ul>
            </NeoCard>
          </section>

          <section className="mb-xl">
            <h2 className="font-display font-bold text-3xl mb-md">DEEP DIVE</h2>
            <div id="deep-dive" className="space-y-md">
              <NeoCard shadow="neo-sm" className="text-gray-400">Loading detailed analysis...</NeoCard>
            </div>
          </section>

          <section className="mb-xl">
            <h2 className="font-display font-bold text-3xl mb-md">REBEL MOVES</h2>
            <div id="recommendations" className="grid md:grid-cols-3 gap-md">
              <NeoCard shadow="neo" className="text-gray-400">Loading recommendations...</NeoCard>
            </div>
          </section>

          <section className="text-center py-xl">
            <NeoButton href="/upload" className="text-lg px-8 py-4">ANALYZE ANOTHER CV</NeoButton>
          </section>
        </main>

        <Footer />

        <script dangerouslySetInnerHTML={{__html: `
          const analysis = JSON.parse(sessionStorage.getItem('cvAnalysis') || '{}');
          if (analysis.score) {
            const scoreCircle = document.getElementById('score-circle');
            const circumference = 326.73;
            const offset = circumference - (analysis.score / 100) * circumference;
            scoreCircle.style.strokeDashoffset = offset;
            scoreCircle.style.stroke = analysis.score >= 70 ? '#C1FF00' : analysis.score >= 50 ? '#4c6700' : '#FF5733';
            document.getElementById('score-value').textContent = analysis.score;
            document.getElementById('verdict').textContent = analysis.verdict;
            document.getElementById('verdict-detail').textContent = analysis.verdict;
            document.getElementById('strengths').innerHTML = analysis.strengths.map(s => '<li>' + s + '</li>').join('');
            document.getElementById('weaknesses').innerHTML = analysis.weaknesses.map(w => '<li>' + w + '</li>').join('');
            document.getElementById('deep-dive').innerHTML = analysis.deepDive.map(d => '<div style="background:white;border:4px solid black;box-shadow:4px 4px 0 0 rgba(0,0,0,1);padding:24px;"><h3 class="font-display font-bold text-xl mb-sm">' + d.section + '</h3><p>' + d.feedback + '</p>' + (d.before ? '<div style="background:#dadada;padding:12px;margin:12px 0;"><p style="font-weight:bold;font-size:14px;">BEFORE:</p><p>' + d.before + '</p></div>' : '') + (d.after ? '<div style="background:#C1FF00;padding:12px;"><p style="font-weight:bold;font-size:14px;">AFTER:</p><p>' + d.after + '</p></div>' : '') + '</div>').join('');
            document.getElementById('recommendations').innerHTML = analysis.recommendations.map(r => '<div style="background:white;border:4px solid black;box-shadow:8px 8px 0 0 rgba(0,0,0,1);padding:24px;"><p>' + r + '</p></div>').join('');
          }
        `}} />
      </body>
    </html>
  );
}
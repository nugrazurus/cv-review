import { TopNavBar, Footer, NeoCard, NeoDropzone, NeoButton, AlertCard } from '../components';

export function UploadPage() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Upload CV — CV_REBEL</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,700,1,0" rel="stylesheet" />
        <style>{`#file-dropzone.drag-over { background-color: rgba(193,255,0,0.2); border-style: solid; } body { background: radial-gradient(circle, #e2e2e2 1px, transparent 1px); background-size: 16px 16px; }`}</style>
      </head>
      <body className="min-h-screen">
        <TopNavBar currentPage="upload" />

        <main className="max-w-7xl mx-auto px-gutter py-xl">
          <div className="grid md:grid-cols-2 gap-lg items-start">
            <div>
              <NeoCard shadow="neo">
                <h1 className="font-display font-bold text-4xl mb-md">UPLOAD YOUR CV</h1>
                <div className="border-t-2 border-black pt-md">
                  <p className="font-body text-lg mb-md">
                    Drop your resume and let our AI find the patterns that make recruiters pause—or scroll past.
                  </p>
                  <ul className="space-y-sm">
                    <li className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary-dark">check_circle</span>
                      PDF, DOCX, or TXT formats
                    </li>
                    <li className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary-dark">check_circle</span>
                      Maximum 5MB file size
                    </li>
                    <li className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary-dark">check_circle</span>
                      Analysis takes ~10 seconds
                    </li>
                  </ul>
                </div>
              </NeoCard>
            </div>

            <div>
              <form id="upload-form" action="/api/upload" method="post" enctype="multipart/form-data">
                <NeoDropzone className="mb-md" />
                <input type="file" name="file" id="file-input" accept=".pdf,.docx,.txt" className="hidden" />
                <NeoButton type="submit" className="w-full text-center">
                  ANALYZE MY CV
                </NeoButton>
              </form>
            </div>
          </div>

          <div id="progress-overlay" className="hidden fixed bottom-lg right-lg z-50">
            <NeoCard shadow="neo-sm" className="w-64">
              <div className="border-b-2 border-black pb-sm mb-sm">
                <span className="font-display font-bold text-sm">ANALYZING...</span>
              </div>
              <div className="border-2 border-black h-3 bg-surface-dim overflow-hidden">
                <div id="progress-bar" className="h-full bg-primary-dark w-0 transition-all"></div>
              </div>
              <p id="progress-text" className="font-body text-sm text-gray-600 mt-xs">Reading document...</p>
            </NeoCard>
          </div>

          <div id="error-notification" className="hidden fixed top-lg right-lg z-50">
            <AlertCard variant="error">
              <p id="error-message" className="font-bold">Error uploading file</p>
            </AlertCard>
          </div>
        </main>

        <Footer />

        <script dangerouslySetInnerHTML={{__html: `
          const dropzone = document.getElementById('file-dropzone');
          const fileInput = document.getElementById('file-input');
          const form = document.getElementById('upload-form');
          const progressOverlay = document.getElementById('progress-overlay');
          const progressBar = document.getElementById('progress-bar');
          const progressText = document.getElementById('progress-text');
          const errorNotification = document.getElementById('error-notification');
          const errorMessage = document.getElementById('error-message');

          dropzone.addEventListener('click', () => fileInput.click());
          dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); });
          dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
          dropzone.addEventListener('drop', (e) => { e.preventDefault(); dropzone.classList.remove('drag-over'); if (e.dataTransfer.files.length) { fileInput.files = e.dataTransfer.files; form.dispatchEvent(new Event('submit')); }});

          form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!fileInput.files.length) { showError('Please select a file'); return; }
            const file = fileInput.files[0];
            if (file.size > 5 * 1024 * 1024) { showError('File too large (max 5MB)'); return; }

            progressOverlay.classList.remove('hidden');
            progressBar.style.width = '30%';
            progressText.textContent = 'Reading document...';

            try {
              const formData = new FormData(form);
              progressBar.style.width = '60%';
              progressText.textContent = 'Analyzing with AI...';

              const response = await fetch('/api/upload', { method: 'POST', body: formData });
              if (!response.ok) { const err = await response.json(); throw new Error(err.error || 'Upload failed'); }

              progressBar.style.width = '100%';
              progressText.textContent = 'Complete!';
              const result = await response.json();
              sessionStorage.setItem('cvAnalysis', JSON.stringify(result));
              window.location.href = '/results';
            } catch (err) {
              progressOverlay.classList.add('hidden');
              showError(err.message);
            }
          });

          function showError(msg) {
            errorMessage.textContent = msg;
            errorNotification.classList.remove('hidden');
            setTimeout(() => errorNotification.classList.add('hidden'), 5000);
          }
        `}} />
      </body>
    </html>
  );
}
import React, { useState, useEffect } from "react";

export default function App() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setInstallPrompt(null);
  };

  return (
    <HomePage
      onInstall={handleInstall}
      canInstall={!!installPrompt}
      installed={installed}
    />
  );
}

function HomePage({ onInstall, canInstall, installed }) {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <header className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <span className="font-bold text-lg">◢◣ GraphCentrality</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">CS / EN</span>
          {installed ? (
            <span className="text-sm text-green-600 font-semibold">
              ✓ Nainstalováno
            </span>
          ) : canInstall ? (
            <button
              onClick={onInstall}
              className="border border-indigo-600 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-indigo-50"
            >
              Instalovat PWA
            </button>
          ) : (
            <span className="text-sm text-gray-400">Instalovat PWA</span>
          )}
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-extrabold leading-tight mb-3">
          Vizualizace měr centrality v grafech
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed mb-6">
          Interaktivní výuková aplikace pro studium degree, closeness,
          betweenness a eigenvector centrality. Pracuje offline.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
            Otevřít pracovní plochu →
          </button>
          <button className="text-indigo-600 font-semibold px-5 py-2.5 hover:underline">
            📚 Projít teorii
          </button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mb-10">
        <h2 className="font-bold text-lg mb-4">Rychlý start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "📂",
              title: "Načíst graf",
              desc: "Importuj soubor ve formátu GraphML, GML, JSON nebo CSV.",
              label: "Vybrat soubor →",
            },
            {
              icon: "✏️",
              title: "Vytvořit nový",
              desc: "Začni s prázdným plátnem a postav graf od nuly.",
              label: "Otevřít editor →",
            },
            {
              icon: "📊",
              title: "Příklady sítí",
              desc: "Zachary karate club, Les Misérables, Dolphins…",
              label: "Zobrazit knihovnu →",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <span className="text-2xl block mb-2">{c.icon}</span>
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                {c.desc}
              </p>
              <button className="text-indigo-600 text-sm font-semibold hover:underline">
                {c.label}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mb-10">
        <a
          href="https://www.figma.com/design/dagCSgIRbEsHeT2dZwEYuC/Graph-centrality-visualization-app?node-id=0-1&p=f&t=iZO5bOQDn9v6gv6r-0"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group"
        >
          <svg
            viewBox="0 0 38 57"
            className="w-6 h-auto shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
              fill="#1ABCFE"
            />
            <path
              d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"
              fill="#0ACF83"
            />
            <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262" />
            <path
              d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"
              fill="#F24E1E"
            />
            <path
              d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"
              fill="#A259FF"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
              Wireframes & design - Figma
            </p>
            <p className="text-xs text-gray-400">
              Graph centrality visualization app
            </p>
          </div>
          <span className="ml-auto text-gray-300 group-hover:text-indigo-400 text-lg transition-colors">
            ↗
          </span>
        </a>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="font-bold text-lg mb-4">Podporované míry centrality</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Degree", formula: "C_D(v) = deg(v)" },
            { name: "Closeness", formula: "C_C(v) = 1 / Σ d(v,u)" },
            { name: "Betweenness", formula: "C_B(v) = Σ σ_st(v)/σ_st" },
            { name: "Eigenvector", formula: "Ax = λx" },
          ].map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2"
            >
              <strong className="text-sm">{m.name}</strong>
              <code className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {m.formula}
              </code>
              <button className="text-indigo-600 text-xs font-semibold hover:underline text-left">
                Zobrazit detail →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

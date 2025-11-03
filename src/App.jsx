import Navbar from "./components/Navbar";
import AuthPanel from "./components/AuthPanel";
import WeatherPanel from "./components/WeatherPanel";
import AdvisoryPanel from "./components/AdvisoryPanel";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-slate-800">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4">
        <section className="py-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Crop Advisory for Smarter, Healthier Harvests
            </h1>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              Manage your season with weather insights, fertilizer guidance, expert help, and simple market tips.
            </p>
          </div>
          <AuthPanel />
        </section>

        <section className="py-10">
          <WeatherPanel />
        </section>

        <section className="py-10">
          <AdvisoryPanel />
        </section>
      </main>

      <footer className="mt-16 border-t border-black/5 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} AgriGuide</span>
          <span className="text-slate-400">Built for farmers to thrive</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

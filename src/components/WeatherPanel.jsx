import { useCallback, useMemo, useState } from "react";
import { MapPin, Compass, CloudSun, Droplets, Wind } from "lucide-react";

function computeMockWeather(lat, lon) {
  // Create deterministic pseudo-weather from coordinates
  const seed = Math.abs(Math.sin(lat) * Math.cos(lon));
  const temp = Math.round(18 + seed * 17); // 18-35°C
  const humidity = Math.round(40 + seed * 50); // 40-90%
  const wind = (2 + seed * 8).toFixed(1); // 2-10 m/s
  const conditionIndex = Math.floor(seed * 4);
  const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"];
  return { temp, humidity, wind, condition: conditions[conditionIndex] };
}

export default function WeatherPanel() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(() => {
    setError(null);
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation not supported in this browser");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: Number(latitude.toFixed(4)), lon: Number(longitude.toFixed(4)) });
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Unable to get location");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }, []);

  const weather = useMemo(() => {
    if (!coords) return null;
    return computeMockWeather(coords.lat, coords.lon);
  }, [coords]);

  return (
    <section id="weather" className="w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><CloudSun className="text-amber-500" size={20}/> Field Weather</h3>
          <button
            onClick={getLocation}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 shadow"
          >
            <Compass size={16}/> {loading ? "Locating..." : "Use my location"}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {coords ? (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-sm text-slate-500 flex items-center gap-2"><MapPin size={16}/> {coords.lat}, {coords.lon}</div>
                  <div className="text-3xl font-semibold mt-1">{weather?.temp}°C</div>
                  <div className="text-slate-600">{weather?.condition}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
                  <MetricCard icon={<Droplets className="text-sky-500" size={18}/>} label="Humidity" value={`${weather?.humidity}%`} />
                  <MetricCard icon={<Wind className="text-emerald-600" size={18}/>} label="Wind" value={`${weather?.wind} m/s`} />
                  <MetricCard icon={<CloudSun className="text-amber-500" size={18}/>} label="Condition" value={weather?.condition} />
                </div>
              </div>
            ) : (
              <div className="text-slate-600">
                Click "Use my location" to get local weather insights. We don't store your location in this demo.
              </div>
            )}
            {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 text-white p-6 shadow-lg">
            <h4 className="font-semibold">Field Readiness</h4>
            <p className="text-white/90 mt-1 text-sm">
              Based on temperature, humidity and wind, we estimate how suitable the field is for common tasks today.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• Irrigation: <b>{scoreLabel(weather?.humidity ?? 60, "lowBetter")}</b></li>
              <li>• Spraying: <b>{scoreLabel(parseFloat(weather?.wind ?? 5), "lowBetter")}</b></li>
              <li>• Harvesting: <b>{scoreLabel(weather?.temp ?? 26, "midBetter")}</b></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
      <div className="flex items-center justify-center gap-2 mb-1">{icon}<span className="text-xs text-slate-500">{label}</span></div>
      <div className="font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function scoreLabel(val, mode) {
  // Simple heuristic labels
  if (mode === "lowBetter") {
    if (val < 4) return "Great";
    if (val < 7) return "Okay";
    return "Poor";
  }
  if (mode === "midBetter") {
    if (val >= 22 && val <= 30) return "Great";
    if (val >= 18 && val <= 34) return "Okay";
    return "Poor";
  }
  return "Okay";
}

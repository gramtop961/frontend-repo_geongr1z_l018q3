import { useState } from "react";
import { Lock, Mail, Phone, User, Eye, EyeOff } from "lucide-react";
import { useI18n } from "../i18n";

export default function AuthPanel() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useI18n();

  const toggle = () => setMode((m) => (m === "login" ? "register" : "login"));

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    console.log(`${mode} form submitted`, entries);
    alert(`${mode === "login" ? t("auth.submitLogin") : t("auth.submitRegister")} (demo only)`);
  };

  return (
    <section aria-label="Authentication" className="w-full">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-white p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl font-semibold">{t("auth.welcomeTitle")}</h2>
          <p className="mt-2 text-white/90">
            {t("hero.subtitle")}
          </p>
          <ul className="mt-6 space-y-3 text-white/95">
            <li className="flex items-start gap-3"><span className="mt-1">🌦️</span> {t("auth.welcomeList1")}</li>
            <li className="flex items-start gap-3"><span className="mt-1">🧪</span> {t("auth.welcomeList2")}</li>
            <li className="flex items-start gap-3"><span className="mt-1">👨‍🌾</span> {t("auth.welcomeList3")}</li>
            <li className="flex items-start gap-3"><span className="mt-1">📈</span> {t("auth.welcomeList4")}</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-800">
              {mode === "login" ? t("auth.login") : t("auth.register")}
            </h3>
            <button
              onClick={toggle}
              className="text-sm text-green-700 hover:text-green-800 font-medium"
            >
              {mode === "login" ? t("auth.toggleToRegister") : t("auth.toggleToLogin")}
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-700">{t("auth.name")}</label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-2.5 text-slate-400"><User size={16}/></span>
                  <input
                    required
                    name="name"
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={t("auth.placeholderName")}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">{t("auth.email")}</label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-2.5 text-slate-400"><Mail size={16}/></span>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t("auth.placeholderEmail")}
                />
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-700">{t("auth.phone")}</label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-2.5 text-slate-400"><Phone size={16}/></span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={t("auth.placeholderPhone")}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">{t("auth.password")}</label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-2.5 text-slate-400"><Lock size={16}/></span>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full pl-9 pr-10 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md shadow"
            >
              {mode === "login" ? t("auth.submitLogin") : t("auth.submitRegister")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

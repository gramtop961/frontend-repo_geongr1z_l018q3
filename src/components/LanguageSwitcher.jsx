import { Globe } from "lucide-react";
import { useI18n } from "../i18n";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="inline-flex items-center gap-2">
      <Globe size={16} className="text-slate-500" />
      <label className="sr-only">{t("language.label")}</label>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="text-sm border border-slate-200 rounded-md px-2 py-1 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="en">{t("language.english")}</option>
        <option value="hi">{t("language.hindi")}</option>
      </select>
    </div>
  );
}

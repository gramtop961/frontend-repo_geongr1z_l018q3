import { useState } from "react";
import { Leaf, MessageSquare, ShoppingBag, Sprout, FlaskConical } from "lucide-react";
import { useI18n } from "../i18n";

export default function AdvisoryPanel() {
  const [tab, setTab] = useState("fertilizer");
  const { t } = useI18n();

  return (
    <section id="advisory" className="w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><Leaf className="text-green-600" size={20}/> {t("advisory.title")}</h3>
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
            <TabButton active={tab === "fertilizer"} onClick={() => setTab("fertilizer")}>
              <FlaskConical size={16}/> {t("advisory.tabs.fertilizer")}
            </TabButton>
            <TabButton active={tab === "experts"} onClick={() => setTab("experts")}>
              <MessageSquare size={16}/> {t("advisory.tabs.experts")}
            </TabButton>
            <TabButton active={tab === "market"} onClick={() => setTab("market")}>
              <ShoppingBag size={16}/> {t("advisory.tabs.market")}
            </TabButton>
          </div>
        </div>

        {tab === "fertilizer" && <FertilizerSuggestions />}
        {tab === "experts" && <ExpertsConsultation />}
        {tab === "market" && <MarketGuidance />}
      </div>
    </section>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-md inline-flex items-center gap-2 transition-colors ${
        active ? "bg-emerald-600 text-white" : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function FertilizerSuggestions() {
  const { t } = useI18n();
  const crops = [
    {
      name: t("advisory.fertilizer.crops.wheat.name"),
      stage: t("advisory.fertilizer.crops.wheat.stage"),
      suggestions: t("advisory.fertilizer.wheat"),
    },
    {
      name: t("advisory.fertilizer.crops.rice.name"),
      stage: t("advisory.fertilizer.crops.rice.stage"),
      suggestions: t("advisory.fertilizer.rice"),
    },
    {
      name: t("advisory.fertilizer.crops.cotton.name"),
      stage: t("advisory.fertilizer.crops.cotton.stage"),
      suggestions: t("advisory.fertilizer.cotton"),
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {crops.map((c) => (
        <div key={c.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sprout className="text-green-600" size={18}/>
            <h4 className="font-semibold text-slate-800">{c.name}</h4>
          </div>
          <p className="text-xs text-slate-500 mb-3">{t("common.currentStage", "Current stage:")} {c.stage}</p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
            {Array.isArray(c.suggestions) && c.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="md:col-span-3 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-white p-6 shadow-lg">
        <h4 className="font-semibold">{t("advisory.fertilizer.generalTipsTitle")}</h4>
        <p className="text-white/90 text-sm mt-1">
          {t("advisory.fertilizer.generalTips")}
        </p>
      </div>
    </div>
  );
}

function ExpertsConsultation() {
  const { t } = useI18n();
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h4 className="font-semibold text-slate-800 mb-2">{t("advisory.experts.askTitle")}</h4>
        <p className="text-sm text-slate-600 mb-4">{t("advisory.experts.askDesc")}</p>
        <form onSubmit={(e) => { e.preventDefault(); alert("Query sent (demo)"); }} className="space-y-3">
          <div>
            <label className="block text-sm text-slate-700 mb-1">{t("advisory.experts.cropVariety")}</label>
            <input className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g., Tomato - Pusa Ruby" />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">{t("advisory.experts.problem")}</label>
            <textarea rows={4} className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Spots on leaves, yellowing..."></textarea>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">{t("advisory.experts.photos")}</label>
            <input type="file" multiple accept="image/*" className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-emerald-600 file:text-white hover:file:bg-emerald-700" />
          </div>
          <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md shadow">{t("advisory.experts.send")}</button>
        </form>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 text-white p-6 shadow-lg">
        <h4 className="font-semibold mb-2">{t("advisory.experts.responseTime")}</h4>
        <p className="text-white/90 text-sm">{t("advisory.experts.responseDesc")}</p>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-semibold">50+</div>
            <div className="text-xs text-white/80">{t("advisory.experts.stats.experts")}</div>
          </div>
          <div>
            <div className="text-3xl font-semibold">95%</div>
            <div className="text-xs text-white/80">{t("advisory.experts.stats.resolution")}</div>
          </div>
          <div>
            <div className="text-3xl font-semibold">24h</div>
            <div className="text-xs text-white/80">{t("advisory.experts.stats.avgResponse")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketGuidance() {
  const { t, lang } = useI18n();
  const items = t("advisory.market.items");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="font-semibold text-slate-800 mb-4">{t("advisory.market.snapshot")}</h4>
      <div className="grid md:grid-cols-3 gap-4">
        {Array.isArray(items) && items.map((it, idx) => (
          <div key={`${it.crop}-${idx}`} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-800">{it.crop}</span>
              <span className="text-sm bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{it.price} {it.unit}</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">{it.tip}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4">{t("advisory.market.note")}</p>
    </div>
  );
}

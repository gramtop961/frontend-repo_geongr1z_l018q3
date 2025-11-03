import { createContext, useContext, useMemo, useState } from "react";

const I18nContext = createContext(null);

const translations = {
  en: {
    app: { name: "AgriGuide", tagline: "Built for farmers to thrive" },
    nav: { weather: "Weather", advisory: "Advisory", account: "Account" },
    hero: {
      title: "Crop Advisory for Smarter, Healthier Harvests",
      subtitle:
        "Manage your season with weather insights, fertilizer guidance, expert help, and simple market tips.",
    },
    auth: {
      welcomeTitle: "Welcome to AgriGuide",
      welcomeList1: "Live weather and field readiness",
      welcomeList2: "Smart fertilizer suggestions",
      welcomeList3: "Ask experts and get quick help",
      welcomeList4: "Simple market guidance",
      login: "Login",
      register: "Create an account",
      toggleToRegister: "Need an account? Register",
      toggleToLogin: "Have an account? Login",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      password: "Password",
      placeholderName: "e.g., Rani Sharma",
      placeholderEmail: "you@example.com",
      placeholderPhone: "+91 90000 00000",
      showPassword: "Show password",
      hidePassword: "Hide password",
      submitLogin: "Login",
      submitRegister: "Create account",
    },
    weather: {
      title: "Field Weather",
      useLocation: "Use my location",
      locating: "Locating...",
      notSupported: "Geolocation not supported in this browser",
      unable: "Unable to get location",
      prompt: "Click \"Use my location\" to get local weather insights. We don't store your location in this demo.",
      readiness: "Field Readiness",
      readinessDesc:
        "Based on temperature, humidity and wind, we estimate how suitable the field is for common tasks today.",
      humidity: "Humidity",
      wind: "Wind",
      condition: "Condition",
      tasks: { irrigation: "Irrigation", spraying: "Spraying", harvesting: "Harvesting" },
      labels: { great: "Great", okay: "Okay", poor: "Poor" },
    },
    advisory: {
      title: "Advisory",
      tabs: { fertilizer: "Fertilizer", experts: "Experts", market: "Market" },
      fertilizer: {
        generalTipsTitle: "General Tips",
        generalTips:
          "Always perform a soil test annually. Split fertilizer doses around rainfall and irrigation schedule. Avoid overuse to protect soil health.",
        crops: {
          wheat: { name: "Wheat", stage: "Tillering" },
          rice: { name: "Rice", stage: "Vegetative" },
          cotton: { name: "Cotton", stage: "Flowering" },
        },
        wheat: [
          "Apply 40-50 kg/acre of Urea (split dose)",
          "Add DAP if soil P is low",
          "Irrigate lightly after application",
        ],
        rice: [
          "Top dress with Urea at 35-40 kg/acre",
          "Zinc sulphate 5-10 kg/acre if deficiency signs",
          "Maintain 2-3 cm standing water",
        ],
        cotton: [
          "19:19:19 foliar spray @1% weekly",
          "Use potash for boll development",
          "Avoid spraying during mid-day heat",
        ],
      },
      experts: {
        askTitle: "Ask an Expert",
        askDesc: "Describe your crop issue and attach clear photos for faster help.",
        cropVariety: "Crop & variety",
        problem: "Describe the problem",
        photos: "Photos",
        send: "Send",
        responseTime: "Response Time",
        responseDesc:
          "Experts typically reply within 24 hours. For urgent pest outbreaks, contact local extension services immediately.",
        stats: { experts: "Agri Experts", resolution: "Issue Resolution", avgResponse: "Avg. Response" },
      },
      market: {
        snapshot: "Local Market Snapshot",
        note: "Prices are indicative for demo purposes. Check your nearest mandi for current rates.",
        items: [
          { crop: "Tomato", price: 18, unit: "₹/kg", tip: "Supply high, prefer nearby mandis to cut transport cost." },
          { crop: "Onion", price: 22, unit: "₹/kg", tip: "Hold for a week if storage is good; prices trending up." },
          { crop: "Wheat", price: 2400, unit: "₹/quintal", tip: "MSP support strong; consider FPO collective sale." },
        ],
      },
    },
    common: { currentStage: "Current stage:" },
    footer: { copyright: "©", tagline: "Built for farmers to thrive" },
    language: { label: "Language", english: "English", hindi: "Hindi" },
  },
  hi: {
    app: { name: "एग्रीगाइड", tagline: "किसानों की तरक्की के लिए" },
    nav: { weather: "मौसम", advisory: "सलाह", account: "खाता" },
    hero: {
      title: "बेहतर और स्वस्थ फसल के लिए सलाह",
      subtitle:
        "मौसम, उर्वरक मार्गदर्शन, विशेषज्ञों की मदद और बाज़ार सुझाव एक ही जगह।",
    },
    auth: {
      welcomeTitle: "एग्रीगाइड में आपका स्वागत है",
      welcomeList1: "लाइव मौसम और खेत की तैयारी",
      welcomeList2: "स्मार्ट उर्वरक सुझाव",
      welcomeList3: "विशेषज्ञों से त्वरित मदद",
      welcomeList4: "सरल बाज़ार मार्गदर्शन",
      login: "लॉगिन",
      register: "खाता बनाएं",
      toggleToRegister: "खाता नहीं है? रजिस्टर करें",
      toggleToLogin: "खाता है? लॉगिन करें",
      name: "पूरा नाम",
      email: "ईमेल",
      phone: "फोन",
      password: "पासवर्ड",
      placeholderName: "जैसे, रानी शर्मा",
      placeholderEmail: "you@example.com",
      placeholderPhone: "+91 90000 00000",
      showPassword: "पासवर्ड दिखाएँ",
      hidePassword: "पासवर्ड छिपाएँ",
      submitLogin: "लॉगिन",
      submitRegister: "खाता बनाएं",
    },
    weather: {
      title: "खेत का मौसम",
      useLocation: "मेरी लोकेशन इस्तेमाल करें",
      locating: "लोकेशन मिल रही है...",
      notSupported: "इस ब्राउज़र में लोकेशन उपलब्ध नहीं",
      unable: "लोकेशन नहीं मिल पाई",
      prompt:
        "स्थानीय मौसम जानने के लिए 'मेरी लोकेशन इस्तेमाल करें' दबाएँ। इस डेमो में हम आपकी लोकेशन सेव नहीं करते।",
      readiness: "खेत की तैयारी",
      readinessDesc:
        "तापमान, आर्द्रता और हवा के आधार पर आज के कार्यों की उपयुक्तता।",
      humidity: "नमी",
      wind: "हवा",
      condition: "स्थिति",
      tasks: { irrigation: "सिंचाई", spraying: "छिड़काव", harvesting: "कटाई" },
      labels: { great: "उत्तम", okay: "ठीक", poor: "कमज़ोर" },
    },
    advisory: {
      title: "सलाह",
      tabs: { fertilizer: "उर्वरक", experts: "विशेषज्ञ", market: "बाज़ार" },
      fertilizer: {
        generalTipsTitle: "सामान्य सुझाव",
        generalTips:
          "हर साल मिट्टी की जाँच कराएँ। बारिश/सिंचाई के अनुसार खुराक बाँटें। अधिक प्रयोग से मिट्टी को नुकसान हो सकता है।",
        crops: {
          wheat: { name: "गेहूँ", stage: "टिलरिंग" },
          rice: { name: "धान", stage: "वेजिटेटिव" },
          cotton: { name: "कपास", stage: "फूल अवस्था" },
        },
        wheat: [
          "यूरिया 40-50 किग्रा/एकड़ (विभाजित खुराक)",
          "यदि फॉस्फोरस कम हो तो डीएपी दें",
          "खाद के बाद हल्की सिंचाई करें",
        ],
        rice: [
          "यूरिया 35-40 किग्रा/एकड़ टॉप ड्रेसिंग",
          "जिंक सल्फेट 5-10 किग्रा/एकड़ कमी के लक्षण पर",
          "2-3 सेमी पानी बनाए रखें",
        ],
        cotton: [
          "19:19:19 पत्तियों पर 1% साप्ताहिक स्प्रे",
          "बोल विकास के लिए पोटाश दें",
          "दोपहर की तेज गर्मी में स्प्रे न करें",
        ],
      },
      experts: {
        askTitle: "विशेषज्ञ से पूछें",
        askDesc: "समस्या लिखें और साफ़ फोटो जोड़ें ताकि जल्द मदद मिल सके।",
        cropVariety: "फसल और किस्म",
        problem: "समस्या का विवरण",
        photos: "फोटो",
        send: "भेजें",
        responseTime: "प्रतिक्रिया समय",
        responseDesc:
          "आमतौर पर 24 घंटे में जवाब मिलता है। गंभीर कीट प्रकोप पर स्थानीय कृषि विभाग से संपर्क करें।",
        stats: { experts: "एग्री विशेषज्ञ", resolution: "समाधान दर", avgResponse: "औसत जवाब" },
      },
      market: {
        snapshot: "स्थानीय बाज़ार स्थिति",
        note: "ये कीमतें डेमो के लिए हैं। अपने नज़दीकी मंडी में जाँच करें।",
        items: [
          { crop: "टमाटर", price: 18, unit: "₹/किग्रा", tip: "आपूर्ति अधिक, पास की मंडियों में बेचें।" },
          { crop: "प्याज", price: 22, unit: "₹/किग्रा", tip: "अगर भंडारण अच्छा है तो एक सप्ताह रोकें; भाव बढ़ रहे हैं।" },
          { crop: "गेहूँ", price: 2400, unit: "₹/क्विंटल", tip: "एमएसपी सहारा अच्छा; एफपीओ के साथ सामूहिक बिक्री पर विचार करें।" },
        ],
      },
    },
    common: { currentStage: "वर्तमान अवस्था:" },
    footer: { copyright: "©", tagline: "किसानों की तरक्की के लिए" },
    language: { label: "भाषा", english: "English", hindi: "हिन्दी" },
  },
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");

  const t = useMemo(() => {
    const dict = translations[lang] || translations.en;
    return (keyPath) => {
      const parts = keyPath.split(".");
      let cur = dict;
      for (const p of parts) {
        cur = cur?.[p];
        if (cur === undefined) break;
      }
      return cur ?? keyPath;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

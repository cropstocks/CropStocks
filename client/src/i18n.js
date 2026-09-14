import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "CropStocks",
      "login": "Login",
      "logout": "Logout",
      "theme": "Theme",
      "language": "Language",
      "hero_title": "Invest in the Future of Farming",
      "hero_subtitle": "A transparent stock market for agricultural produce. Fund verified farmers, track crop health via satellite, and share in the harvest.",
      "start_investing": "Start Investing",
      "raise_capital": "Raise Capital",
      "features": "Features",
      "email": "Email Address",
      "password": "Password",
      "sign_in": "Sign In",
      "sign_in_google": "Sign in with Google",
      "create_new_user": "Create a new user",
      "dashboard": "Dashboard",
      "investments": "Investments",
      "farms_stocks": "Farms / Stocks",
      "filter": "Filter",
      "total_value": "Total Value",
      "value_per_share": "Value per Share",
      "issue_size": "Issue Size",
      "risk_factor": "Risk Factor",
      "purchase": "Buy",
      "remaining_issue": "Remaining Issue",
      "market": "Market",
      "buy_now": "Buy Now"
    }
  },
  hi: {
    translation: {
      "app_name": "क्रॉपस्टॉक्स",
      "login": "लॉग इन करें",
      "logout": "लॉग आउट करें",
      "theme": "थीम",
      "language": "भाषा",
      "hero_title": "खेती के भविष्य में निवेश करें",
      "hero_subtitle": "कृषि उपज के लिए एक पारदर्शी शेयर बाजार। सत्यापित किसानों को निधि दें, उपग्रह के माध्यम से फसल स्वास्थ्य को ट्रैक करें, और फसल में हिस्सा लें।",
      "start_investing": "निवेश शुरू करें",
      "raise_capital": "पूंजी जुटाएं",
      "features": "विशेषताएं",
      "email": "ईमेल पता",
      "password": "पासवर्ड",
      "sign_in": "साइन इन करें",
      "sign_in_google": "Google से साइन इन करें",
      "create_new_user": "नया उपयोगकर्ता बनाएं",
      "dashboard": "डैशबोर्ड",
      "investments": "निवेश",
      "farms_stocks": "खेत / स्टॉक",
      "filter": "फ़िल्टर",
      "total_value": "कुल मूल्य",
      "value_per_share": "प्रति शेयर मूल्य",
      "issue_size": "इश्यू साइज",
      "risk_factor": "जोखिम कारक",
      "purchase": "खरीदें",
      "remaining_issue": "शेष इश्यू",
      "market": "बाज़ार",
      "buy_now": "अभी खरीदें"
    }
  },
  gu: {
    translation: {
      "app_name": "ક્રોપસ્ટોક્સ",
      "login": "લૉગિન",
      "logout": "લૉગઆઉટ",
      "theme": "થીમ",
      "language": "ભાષા",
      "hero_title": "ખેતીના ભવિષ્યમાં રોકાણ કરો",
      "hero_subtitle": "કૃષિ પેદાશો માટે પારદર્શક શેરબજાર. ચકાસાયેલ ખેડૂતોને ભંડોળ આપો, સેટેલાઇટ દ્વારા પાકની તંદુરસ્તી ટ્રૅક કરો અને પાકમાં ભાગ લો.",
      "start_investing": "રોકાણ શરૂ કરો",
      "raise_capital": "ભંડોળ ઉભુ કરો",
      "features": "વિશેષતા",
      "email": "ઇમેઇલ સરનામું",
      "password": "પાસવર્ડ",
      "sign_in": "સાઇન ઇન",
      "sign_in_google": "Google સાથે સાઇન ઇન કરો",
      "create_new_user": "નવો વપરાશકર્તા બનાવો",
      "dashboard": "ડેશબોર્ડ",
      "investments": "રોકાણો",
      "farms_stocks": "ખેતરો / સ્ટોક્સ",
      "filter": "ફિલ્ટર",
      "total_value": "કુલ મૂલ્ય",
      "value_per_share": "શેર દીઠ મૂલ્ય",
      "issue_size": "ઇશ્યૂ કદ",
      "risk_factor": "જોખમ પરિબળ",
      "purchase": "ખરીદો",
      "remaining_issue": "બાકી ઇશ્યૂ",
      "market": "બજાર",
      "buy_now": "હમણાં જ ખરીદો"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

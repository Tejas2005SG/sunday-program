"use client";

import { useState, useEffect } from "react";
import DarkVeil from "@/components/DarkVeil";
import {
  Globe,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  BookOpen,
  User,
  Award,
  Heart,
  Target,
  Users,
  Landmark,
  Phone,
  ArrowRight,
  Sparkles,
  ClipboardList
} from "lucide-react";

type Language = "en" | "hi" | "mr";

const I18N = {
  en: {
    nav: { home: "Home", about: "About", modules: "Modules", mentors: "Mentors", contact: "Contact" },
    hero: {
      kicker: "SUNDAY SCHOOL FOR YOUTH (For Std. 8th, 9th & 10th)",
      title: "Saṁskāra Gurukula",
      titleHindi: "संस्कार गुरुकुल",
      subtitle: "\"Building Character, Confidence & Culture\"",
      meaning: "Meaning: Self-elevate",
      tagline: "संस्कारात् भवति श्रेष्ठता | Greatness comes from values",
      ctaMain: "Register Now",
      ctaSec: "Learn More",
    },
    about: {
      title: "About The Program",
      p1: "In today’s fast-changing world, students face challenges like stress, distractions, lack of focus, and confusion about life goals.",
      p2: "To guide them properly, Gaurang Dham introduces a 1-Year Sunday School Program focused on:",
      points: [
        "Character Development",
        "Personality Development",
        "Emotional Strength",
        "Spiritual Wisdom"
      ]
    },
    modules: {
      title: "Program Highlights (4 Powerful Modules)",
      m1: {
        title: "Module 1: Foundation of Character",
        items: ["Who am I? (Body vs Soul)", "Discipline & Good Habits", "Respect & Responsibility", "Power of Mind", "Truthfulness & Integrity"]
      },
      m2: {
        title: "Module 2: Personality Development",
        items: ["Communication Skills", "Body Language", "Leadership Qualities", "Decision Making"]
      },
      m3: {
        title: "Module 3: Emotional & Moral Strength",
        items: ["Anger & Stress Management", "Handling Peer Pressure", "Social Media Awareness", "Compassion & Service", "Understanding Relationships"]
      },
      m4: {
        title: "Module 4: Vision & Life Purpose",
        items: ["Career and Goal Setting", "Value Driven Growth", "Importance of Good Association", "Spiritual Lifestyle", "Duties towards Nation"]
      }
    },
    details: {
      title: "Program Details",
      duration: "1 Year",
      day: "Every Sunday",
      time: "10:00 AM - 12:00 PM",
      venue: "Gaurang Dham"
    },
    gains: {
      title: "What Students Will Gain",
      items: ["Strong Values & Discipline", "Confidence in Speaking", "Better Focus & Decision Making", "Emotional Balance", "Clear Vision for Future", "Spiritual Development"]
    },
    features: {
      title: "Special Features",
      items: ["Interactive Sessions & Group Discussions", "Outdoor Visits / Trips & Games", "Yoga, Meditation & Shloka learning", "Competitions & Presentations", "Parent Interaction Programs", "Certificate & Awards"]
    },
    mentors: {
      title: "Guidance By Experienced Mentors",
      subtitle: "Experienced mentors committed to youth development, value-based education, and spiritual growth.",
      list: [
        { name: "Shrija Akhade", desc: "B.Com. Graduate, CA Intermediate (Group 1), Senior Manager" },
        { name: "Shraddha Sarwade", desc: "B.Com. Graduate, Chartered Accountant (CA), Senior Head, Capricorn Group" },
        { name: "Vaibhav Bodkhe", desc: "B.E. (Computer Science), Data Engineer, Accenture" },
        { name: "Dr. Himanshu Kamble", desc: "M.B.B.S., Medical Officer, District Hospital, Pune" },
        { name: "Manasi Bhor", desc: "B.Com. Graduate, MBA – ITBM (Symbiosis), Associate Consultant, Infosys Ltd." }
      ]
    },
    contact: {
      title: "Registration Open Now!",
      limited: "Limited Seats Available",
      btn: "Contact Us Today"
    },
    quotes: [
      "आत्मोन्नतिः परं लक्ष्यं – Self-elevation is the highest goal",
      "विद्यया अमृतमश्नुते – Through knowledge, one attains immortality",
      "विद्या ददाति विनयम् – Knowledge gives humility",
      "ज्ञानं परमं बलम् – Knowledge is the greatest strength"
    ]
  },
  hi: {
    nav: { home: "होम", about: "परिचय", modules: "मॉड्यूल", mentors: "मार्गदर्शक", contact: "संपर्क" },
    hero: {
      kicker: "युवाओं के लिए संडे स्कूल (कक्षा 8, 9 और 10 के छात्रों के लिए)",
      title: "संस्कार गुरुकुल",
      titleHindi: "Saṁskāra Gurukula",
      subtitle: "\"चरित्र, आत्मविश्वास और संस्कृति का निर्माण\"",
      meaning: "अर्थ: आत्म-उत्थान (Self-elevate)",
      tagline: "संस्कारात् भवति श्रेष्ठता | संस्कारों से ही महानता आती है",
      ctaMain: "अभी पंजीकरण करें",
      ctaSec: "और जानें",
    },
    about: {
      title: "कार्यक्रम के बारे में",
      p1: "आज की तेजी से बदलती दुनिया में, छात्रों को तनाव, व्याकुलता, एकाग्रता की कमी और जीवन के लक्ष्यों के बारे में भ्रम जैसी चुनौतियों का सामना करना पड़ता है।",
      p2: "उनका सही मार्गदर्शन करने के लिए, गौरांग धाम एक 1-वर्षीय संडे स्कूल कार्यक्रम शुरू कर रहा है, जो केंद्रित है:",
      points: [
        "चरित्र विकास",
        "व्यक्तित्व विकास",
        "भावनात्मक शक्ति",
        "आध्यात्मिक ज्ञान"
      ]
    },
    modules: {
      title: "कार्यक्रम की मुख्य विशेषताएं (4 शक्तिशाली मॉड्यूल)",
      m1: {
        title: "मॉड्यूल 1: चरित्र की नींव",
        items: ["मैं कौन हूँ? (शरीर बनाम आत्मा)", "अनुशासन और अच्छी आदतें", "सम्मान और जिम्मेदारी", "मन की शक्ति", "सत्यवादिता और अखंडता"]
      },
      m2: {
        title: "मॉड्यूल 2: व्यक्तित्व विकास",
        items: ["संचार कौशल", "शारीरिक भाषा (Body Language)", "नेतृत्व के गुण", "निर्णय लेना"]
      },
      m3: {
        title: "मॉड्यूल 3: भावनात्मक और नैतिक शक्ति",
        items: ["क्रोध और तनाव प्रबंधन", "सहकर्मी दबाव (Peer Pressure) को संभालना", "सोशल मीडिया जागरूकता", "करुणा और सेवा", "रिश्तों को समझना"]
      },
      m4: {
        title: "मॉड्यूल 4: दृष्टिकोण और जीवन का उद्देश्य",
        items: ["करियर और लक्ष्य निर्धारण", "मूल्य-संचालित विकास", "अच्छी संगति का महत्व", "आध्यात्मिक जीवन शैली", "राष्ट्र के प्रति कर्तव्य"]
      }
    },
    details: {
      title: "कार्यक्रम विवरण",
      duration: "1 वर्ष",
      day: "प्रत्येक रविवार",
      time: "सुबह 10:00 बजे - दोपहर 12:00 बजे",
      venue: "गौरांग धाम"
    },
    gains: {
      title: "छात्र क्या हासिल करेंगे",
      items: ["मजबूत मूल्य और अनुशासन", "बोलने में आत्मविश्वास", "बेहतर एकाग्रता और निर्णय क्षमता", "भावनात्मक संतुलन", "भविष्य के लिए स्पष्ट दृष्टिकोण", "आध्यात्मिक विकास"]
    },
    features: {
      title: "विशिष्ट विशेषताएं",
      items: ["संवादात्मक सत्र और समूह चर्चा", "बाहरी भ्रमण और खेल", "योग, ध्यान और श्लोक सीखना", "प्रतियोगिताएं और प्रस्तुतियाँ", "अभिभावक सहभागिता कार्यक्रम", "प्रमाण पत्र और पुरस्कार"]
    },
    mentors: {
      title: "अनुभवी मार्गदर्शकों द्वारा मार्गदर्शन",
      subtitle: "युवा विकास, मूल्य आधारित शिक्षा और आध्यात्मिक विकास के लिए प्रतिबद्ध अनुभवी मार्गदर्शक।",
      list: [
        { name: "श्रीजा अखाड़े", desc: "बी.कॉम स्नातक, सीए इंटरमीडिएट (समूह 1), वरिष्ठ प्रबंधक" },
        { name: "श्रद्धा सर्वदे", desc: "बी.कॉम स्नातक, चार्टर्ड अकाउंटेंट (सीए), वरिष्ठ प्रमुख, मकर समूह" },
        { name: "वैभव बोडखे", desc: "बी.ई. (कंप्यूटर विज्ञान), डेटा इंजीनियर, एक्सेंचर" },
        { name: "डॉ. हिमांशु कांबले", desc: "एम.बी.बी.एस., चिकित्सा अधिकारी, जिला अस्पताल, पुणे" },
        { name: "मानसी भोर", desc: "बी.कॉम स्नातक, एमबीए - आईटीबीएम, असोसिएट कंसल्टेंट, इन्फोसिस लिमिटेड" }
      ]
    },
    contact: {
      title: "पंजीकरण अभी खुला है!",
      limited: "सीमित सीटें उपलब्ध हैं",
      btn: "आज ही संपर्क करें"
    },
    quotes: [
      "आत्मोन्नतिः परं लक्ष्यं – आत्मोन्नति ही परम लक्ष्य है",
      "विद्यया अमृतमश्नुते – विद्या से अमृत की प्राप्ति होती है",
      "विद्या ददाति विनयम् – विद्या विनय देती है",
      "ज्ञानं परमं बलम् – ज्ञान सबसे बड़ी शक्ति है"
    ]
  },
  mr: {
    nav: { home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", modules: "मॉड्यूल्स", mentors: "मार्गदर्शक", contact: "संपर्क" },
    hero: {
      kicker: "युवकांसाठी संडे स्कूल (इयत्ता ८वी, ९वी आणि १०वी च्या विद्यार्थ्यांसाठी)",
      title: "संस्कार गुरुकुल",
      titleHindi: "Saṁskāra Gurukula",
      subtitle: "\"चारित्र्य, आत्मविश्वास आणि संस्कृतीची निर्मिती\"",
      meaning: "अर्थ: आत्मोन्नती (Self-elevate)",
      tagline: "संस्कारात् भवति श्रेष्ठता | संस्कारातूनच श्रेष्ठत्व येते",
      ctaMain: "आता नोंदणी करा",
      ctaSec: "अधिक जाणून घ्या",
    },
    about: {
      title: "कार्यक्रमाविषयी",
      p1: "आजच्या वेगाने बदलणाऱ्या जगात, विद्यार्थ्यांना ताणतणाव, विचलित मन, एकाग्रतेचा अभाव आणि जीवनातील ध्येयांबाबत संभ्रम यांसारख्या आव्हानांना सामोरे जावे लागते.",
      p2: "त्यांना योग्य मार्गदर्शन देण्यासाठी, गौरांग धामने १ वर्षाचा संडे स्कूल प्रोग्राम सुरू केला आहे, जो खालील मूल्यांवर केंद्रित आहे:",
      points: [
        "चारित्र्य विकास",
        "व्यक्तिमत्व विकास",
        "भावनिक सामर्थ्य",
        "आध्यात्मिक ज्ञान"
      ]
    },
    modules: {
      title: "कार्यक्रमाची ठळक वैशिष्ट्ये (४ महत्त्वपूर्ण मॉड्यूल्स)",
      m1: {
        title: "मॉड्यूल १: चारित्र्याचा पाया",
        items: ["मी कोण आहे? (शरीर आणि आत्मा)", "शिस्त आणि चांगल्या सवयी", "आदर आणि जबाबदारी", "मनाची ताकद", "सत्यनिष्ठा आणि प्रामाणिकपणा"]
      },
      m2: {
        title: "मॉड्यूल २: व्यक्तिमत्त्व विकास",
        items: ["संभाषण कौशल्य", "देहबोली (Body Language)", "नेतृत्व गुण", "निर्णय क्षमता"]
      },
      m3: {
        title: "मॉड्यूल ३: भावनिक आणि नैतिक सामर्थ्य",
        items: ["राग आणि ताण व्यवस्थापन", "मित्रांचा दबाव (Peer Pressure) हाताळणे", "सोशल मीडिया साक्षरता", "करुणा आणि सेवा", "नातेसंबंध समजून घेणे"]
      },
      m4: {
        title: "मॉड्यूल ४: दृष्टिकोन आणि जीवनाचा उद्देश",
        items: ["करिअर आणि ध्येय निश्चिती", "मूल्य-आधारित प्रगती", "चांगल्या संगतीचे महत्त्व", "आध्यात्मिक जीवनशैली", "राष्ट्राप्रती कर्तव्ये"]
      }
    },
    details: {
      title: "कार्यक्रम तपशील",
      duration: "१ वर्ष",
      day: "दर रविवारी",
      time: "सकाळी 10:00 ते दुपारी 12:00",
      venue: "गौरांग धाम"
    },
    gains: {
      title: "विद्यार्थ्यांना काय मिळेल?",
      items: ["मूल्ये आणि शिस्त", "बोलण्यात आत्मविश्वास", "उत्तम एकाग्रता आणि निर्णय क्षमता", "भावनिक संतुलन", "भविष्यासाठी स्पष्ट दृष्टिकोन", "आध्यात्मिक विकास"]
    },
    features: {
      title: "विशेष वैशिष्ट्ये",
      items: ["संवादात्मक सत्रे आणि गट चर्चा", "क्षेत्रभेट आणि मैदानी खेळ", "योग, ध्यान आणि श्लोक पठण", "स्पर्धा आणि सादरीकरण", "पालकांशी संवाद कार्यक्रम", "प्रमाणपत्र आणि पुरस्कार"]
    },
    mentors: {
      title: "अनुभवी मार्गदर्शकांचे मार्गदर्शन",
      subtitle: "युवा विकास, मूल्य-आधारित शिक्षण आणि आध्यात्मिक प्रगतीसाठी वचनबद्ध अनुभवी मार्गदर्शक.",
      list: [
        { name: "शृजा आखाडे", desc: "बी.कॉम. पदवीधर, सीए इंटरमीजिएट (ग्रुप १), वरिष्ठ व्यवस्थापक" },
        { name: "श्रद्धा सर्वदे", desc: "बी.कॉम. पदवीधर, चार्टर्ड अकाउंटंट (सीए), वरिष्ठ प्रमुख, मकर समूह" },
        { name: "वैभव बोडखे", desc: "बी.ई. (संगणक शास्त्र), डेटा इंजिनिअर, एक्सेंचर" },
        { name: "डॉ. हिमांशू कांबळे", desc: "एम.बी.बी.एस., वैद्यकीय अधिकारी, जिल्हा रुग्णालय, पुणे" },
        { name: "मानसी भोर", desc: "बी.कॉम. पदवीधर, एमबीए - आयटीबीएम, असोसिएट कन्सल्टंट, सायबर सिक्युरिटी, इन्फोसिस लि." }
      ]
    },
    contact: {
      title: "नोंदणी सुरू झाली आहे!",
      limited: "मर्यादित जागा शिल्लक आहेत",
      btn: "आजच संपर्क साधा"
    },
    quotes: [
      "आत्मोन्नतिः परं लक्ष्यं – आत्मोन्नती हेच सर्वोच्च ध्येय",
      "विद्यया अमृतमश्नुते – विद्येने अमृताची प्राप्ती होते",
      "विद्या ददाति विनयम् – विद्या विनय देते",
      "ज्ञानं परमं बलम् – ज्ञान हीच सर्वात मोठी शक्ती आहे"
    ]
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<Language>("en");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = I18N[lang];

  return (
    <div className="min-h-screen font-sans bg-[var(--background)] selection:bg-[var(--accent-soft)] selection:text-[var(--accent-strong)]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-[var(--border)] py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-soft)] flex items-center justify-center border border-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300">
                <Landmark className="w-6 h-6 text-[var(--accent-strong)] group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-[var(--foreground)] tracking-tight">
                {lang === "en" ? "Saṁskāra" : "संस्कार"} <span className="text-[var(--accent)]">Gurukula</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--accent-strong)] transition-colors">{t.nav.about}</a>
              <a href="#modules" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--accent-strong)] transition-colors">{t.nav.modules}</a>
              <a href="#mentors" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--accent-strong)] transition-colors">{t.nav.mentors}</a>

              <div className="relative group">
                <button className="flex items-center gap-2 bg-white/70 border border-[var(--border)] rounded-full px-4 py-2 backdrop-blur-md transition-shadow duration-300 hover:shadow-md hover:border-[var(--border)] focus:outline-none">
                  <Globe className="w-4 h-4 text-[var(--ink-soft)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[var(--ink-soft)] transition-transform duration-300 group-hover:-rotate-180" />
                </button>

                <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-[var(--border)] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top right scale-95 group-hover:scale-100 z-50 overflow-hidden divide-y divide-[var(--border)]/40 p-1">
                  <button onClick={() => setLang('en')} className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[var(--accent-soft)] ${lang === 'en' ? 'text-[var(--accent-strong)] bg-[var(--surface-muted)]' : 'text-[var(--foreground)]'}`}>English</button>
                  <button onClick={() => setLang('hi')} className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[var(--accent-soft)] ${lang === 'hi' ? 'text-[var(--accent-strong)] bg-[var(--surface-muted)]' : 'text-[var(--foreground)]'}`}>हिंदी</button>
                  <button onClick={() => setLang('mr')} className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[var(--accent-soft)] ${lang === 'mr' ? 'text-[var(--accent-strong)] bg-[var(--surface-muted)]' : 'text-[var(--foreground)]'}`}>मराठी</button>
                </div>
              </div>

              <a href="#contact" className="primary-button hidden lg:inline-flex">{t.nav.contact}</a>
            </div>

            {/* Mobile Lang & Menu Toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <div className="relative flex items-center bg-white/70 border border-[var(--border)] rounded-full pl-3 pr-2 py-1.5 cursor-pointer backdrop-blur-md shadow-sm">
                <Globe className="w-4 h-4 text-[var(--ink-soft)] mr-1" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="bg-transparent text-sm font-bold text-[var(--foreground)] border-none outline-none cursor-pointer appearance-none bg-none pr-4 relative z-10"
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                  <option value="mr">MR</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--ink-soft)] absolute right-2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden px-4" id="home">
          
          <div className="absolute top-0 inset-x-0 h-[1000px] w-full bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-[var(--background)] opacity-40 pointer-events-none z-0"></div>

          <div className="max-w-4xl mx-auto text-center animate-rise relative z-10">
            <span className="section-kicker mb-4 inline-block px-3 py-1 bg-white/80 border border-[var(--border)] rounded-full backdrop-blur-sm">
              {t.hero.kicker}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] mb-3 leading-tight">
              {t.hero.title}
            </h1>
            <h2 className="text-2xl md:text-3xl text-[var(--accent-strong)] font-script mb-6">
              {t.hero.titleHindi} — {t.hero.meaning}
            </h2>
            <p className="text-xl md:text-2xl font-medium text-[var(--ink-soft)] mb-6 max-w-2xl mx-auto italic">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-20">
              <a href="#contact" className="primary-button group">
                {t.hero.ctaMain}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="secondary-button">
                {t.hero.ctaSec}
              </a>
            </div>

            {/* Premium Quote Grid */}
            <div className="relative max-w-4xl mx-auto mt-4 px-2 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-soft)] to-[var(--surface-muted)] rounded-3xl transform rotate-1 scale-105 opacity-60 blur-lg -z-10 transition-transform duration-700 hover:rotate-2"></div>
              <div className="glass-panel rounded-3xl p-8 md:p-12 border border-[var(--border)] relative bg-white/70 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(135,69,24,0.15)] w-full">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] text-white px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 border border-white/20 w-max max-w-[90%]">
                  <Sparkles className="w-4 h-4 text-[var(--accent-soft)] animate-pulse shrink-0" />
                  <h3 className="font-bold text-sm md:text-base font-script tracking-wide truncate">{t.hero.tagline}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-8 text-left mt-6">
                  {t.quotes.slice(0, 4).map((q, i) => (
                    <div key={i} className="flex items-start gap-4 group p-4 rounded-2xl hover:bg-white/80 transition-all duration-300 hover:shadow-sm border border-transparent hover:border-[var(--border)]/50">
                      <div className="bg-[var(--surface-muted)] p-2.5 rounded-xl group-hover:bg-[var(--accent)] group-hover:-rotate-3 group-hover:scale-110 transition-all duration-300 shrink-0 shadow-inner">
                        <BookOpen className="w-5 h-5 text-[var(--accent-strong)] group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[var(--ink-soft)] text-sm md:text-[15px] font-medium leading-relaxed group-hover:text-[var(--foreground)] transition-colors mt-0.5">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center">
                    <Heart className="w-10 h-10 text-[var(--accent)] mb-3" />
                    <h4 className="font-bold text-[var(--foreground)]">{t.about.points[0]}</h4>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center translate-y-6">
                    <User className="w-10 h-10 text-[var(--accent)] mb-3" />
                    <h4 className="font-bold text-[var(--foreground)]">{t.about.points[1]}</h4>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center">
                    <Target className="w-10 h-10 text-[var(--accent)] mb-3" />
                    <h4 className="font-bold text-[var(--foreground)]">{t.about.points[2]}</h4>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center translate-y-6">
                    <ArrowRight className="w-10 h-10 text-[var(--accent)] mb-3" />
                    <h4 className="font-bold text-[var(--foreground)]">{t.about.points[3]}</h4>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="section-kicker block mb-2">{t.about.title}</span>
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                  Guiding the Youth towards a <span className="text-[var(--accent-strong)]">Brighter Future</span>
                </h2>
                <p className="text-lg text-[var(--ink-soft)] mb-5 leading-relaxed">
                  {t.about.p1}
                </p>
                <p className="text-lg text-[var(--ink-soft)] mb-8 leading-relaxed">
                  {t.about.p2}
                </p>

                <div className="flex flex-wrap gap-3">
                  {t.about.points.map((pt, i) => (
                    <span key={i} className="chip-link text-sm">{pt}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details & Gains Banner */}
        <section className="py-12 bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
              <div className="py-4 flex flex-col items-center">
                <Calendar className="w-8 h-8 mb-2 text-white/80" />
                <p className="text-sm uppercase tracking-widest text-white/70 mb-1">{t.details.title}</p>
                <p className="font-bold text-lg">{t.details.duration}</p>
              </div>
              <div className="py-4 flex flex-col items-center">
                <Clock className="w-8 h-8 mb-2 text-white/80" />
                <p className="text-sm uppercase tracking-widest text-white/70 mb-1">Time</p>
                <p className="font-bold text-lg">{t.details.day}<br />{t.details.time}</p>
              </div>
              <div className="py-4 flex flex-col items-center">
                <MapPin className="w-8 h-8 mb-2 text-white/80" />
                <p className="text-sm uppercase tracking-widest text-white/70 mb-1">Location</p>
                <p className="font-bold text-lg">{t.details.venue}</p>
              </div>
              <div className="py-4 flex flex-col items-center justify-center">
                <a href="#contact" className="bg-white text-[var(--accent-strong)] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  {t.hero.ctaMain}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section id="modules" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="section-kicker block mb-3">{t.modules.title}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--foreground)]">4 Powerful Modules</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[t.modules.m1, t.modules.m2, t.modules.m3, t.modules.m4].map((mod, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center mb-6 border border-[var(--border)] text-[var(--accent-strong)] font-bold text-xl">
                    0{idx + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6 border-b border-[var(--border)] pb-4">{mod.title}</h3>
                  <ul className="space-y-4">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mr-3 mt-0.5" />
                        <span className="text-[var(--ink-soft)] font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights/Gains Multi-grid */}
        <section className="py-20 bg-[var(--surface-muted)] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* What Students Gain */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Award className="w-8 h-8 text-[var(--accent)]" />
                  <h2 className="text-3xl font-bold text-[var(--foreground)]">{t.gains.title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.gains.items.map((gain, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur border border-[var(--border)] p-4 rounded-xl flex items-center gap-3 hover:bg-white transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-strong)] shrink-0"></div>
                      <span className="font-semibold text-[var(--ink-soft)]">{gain}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Features */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Target className="w-8 h-8 text-[var(--accent)]" />
                  <h2 className="text-3xl font-bold text-[var(--foreground)]">{t.features.title}</h2>
                </div>
                <ul className="space-y-5">
                  {t.features.items.map((feat, i) => (
                    <li key={i} className="flex items-center p-3 rounded-lg hover:bg-white/40 transition-colors">
                      <div className="bg-[var(--accent)] rounded-full p-1.5 mr-4 shadow-sm shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-lg text-[var(--foreground)]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Mentors Section */}
        <section id="mentors" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-kicker block mb-3">Mentorship</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6">{t.mentors.title}</h2>
              <p className="text-xl text-[var(--ink-soft)]">
                {t.mentors.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {t.mentors.list.map((mentor, idx) => (
                <div key={idx} className="bg-white border border-[var(--border)] p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <div className="w-20 h-20 rounded-full bg-[var(--background)] border-2 border-[var(--accent-soft)] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[var(--accent)] transition-all duration-300">
                    <Users className="w-8 h-8 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{mentor.name}</h3>
                  <p className="text-sm font-medium text-[var(--ink-soft)] leading-relaxed">{mentor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Contact Section */}
        <section id="contact" className="py-24 bg-[var(--background)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-panel p-10 md:p-16 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[var(--accent-soft)] rounded-full blur-3xl opacity-60"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white rounded-full blur-3xl opacity-60"></div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">{t.contact.title}</h2>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[var(--border)] mb-10">
                  <ClipboardList className="w-5 h-5 text-[var(--accent-strong)]" />
                  <span className="font-semibold text-[var(--ink-soft)] text-lg">{t.contact.limited}</span>
                </div>

                <br />

                <a href="#register" className="primary-button text-lg px-10 py-4 shadow-2xl inline-flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  {t.contact.btn}
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 opacity-80">
            <Landmark className="w-6 h-6 text-[var(--accent)]" />
            <span className="font-bold text-xl text-[var(--foreground)] tracking-tight">
             Saṁskāra Gurukula
            </span>
          </div>
          <p className="text-[var(--ink-soft)] font-medium mb-6">
            &copy; {new Date().getFullYear()} Saṁskāra Gurukula. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="chip-link text-xs">Privacy Policy</a>
            <a href="#" className="chip-link text-xs">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

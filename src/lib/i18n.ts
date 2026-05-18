export type Language = "en" | "hi" | "mr";

export const I18N = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      modules: "Modules",
      mentors: "Mentors",
      contact: "Contact",
      register: "Register",
      enrollNow: "Enroll Now",
    },
    hero: {
      kicker: "SUNDAY SCHOOL FOR YOUTH (For Std. 8th, 9th & 10th)",
      title: "Medha Samvardhan Gurukul",
      titleHindi: "Greatness comes from values",
      subtitle: "संस्कारात् भवति श्रेष्ठता",
      meaning: "",
      tagline: "Building Character, Confidence & Culture",
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
      time: "4:00 PM - 6:00 PM",
      venue: "Gaurang Dham"
    },
    gains: {
      title: "What Students Will Gain",
      items: [
        { title: "Strong Values & Discipline", desc: "Building a foundation of good habits and unwavering integrity." },
        { title: "Confidence in Speaking", desc: "Developing clear articulation and overcoming stage fright." },
        { title: "Better Focus & Decision Making", desc: "Enhancing concentration and the ability to make right choices." },
        { title: "Emotional Balance", desc: "Learning to handle stress, peer pressure, and anger effectively." },
        { title: "Clear Vision for Future", desc: "Setting meaningful goals and planning a purpose-driven life." },
        { title: "Spiritual Development", desc: "Cultivating inner peace, compassion, and a service-oriented mindset." }
      ]
    },
    features: {
      title: "Special Features",
      items: ["Interactive Sessions & Group Discussions", "Outdoor Visits / Trips & Games", "Yoga, Meditation & Shloka learning", "Competitions & Presentations", "Parent Interaction Programs", "Certificate & Awards"]
    },
    mentors: {
      title: "Guidance By Experienced Mentors",
      subtitle: "Experienced mentors committed to youth development, value-based education.",
      list: [
        { name: "Shrija Akhade", desc: "B.Com. Graduate, CA Intermediate (Group 1), Senior Manager", image: "/mentor/shrija.png" },
        { name: "Shraddha Sarwade", desc: "B.Com. Graduate, Chartered Accountant (CA), Senior Head, Capricorn Group", image: "/mentor/shraddha.png" },
        { name: "Vaibhav Bodkhe", desc: "B.E. (Computer Science), Data Engineer, Accenture", image: "/mentor/vaibhav.png" },
        { name: "Dr. Himanshu Kamble", desc: "M.B.B.S., Medical Officer, District Hospital, Pune", image: "/mentor/himanshu.png" },
        { name: "Manasi Bhor", desc: "B.Com. Graduate, MBA – ITBM (Symbiosis), Associate Consultant, Infosys Ltd.", image: "/mentor/mansi.png" },
        { name: "Nishant Virmani", desc: "M.Tech - BITS Pilani, Senior Manager, Tata Motors", image: "/mentor/nishant.png" }
      ]
    },
    contact: {
      title: "Registration Open Now!",
      limited: "Limited Seats Available",
      btn: "Contact Us Today"
    },
    contactPage: {
      title: "Contact Us",
      subtitle: "Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      nameLabel: "Full Name",
      namePlaceholder: "John Doe",
      emailLabel: "Email Address",
      emailPlaceholder: "john@example.com",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Your phone number",
      messageLabel: "Message",
      messagePlaceholder: "How can we help you?",
      submitBtn: "Send Message",
      submittingBtn: "Sending...",
      successMsg: "Message sent successfully!",
    },
    visionMission: {
      kicker: "About Us",
      title: "Our Vision & Mission",
      visionTitle: "Our Vision",
      visionBody:
        "To develop value-based, confident, and responsible youth with strong character and clear purpose.",
      missionTitle: "Our Mission",
      missionBody:
        "To guide students through structured learning and activities for character building, personality development, and spiritual growth.",
    },
    quotes: [
      "आत्मोन्नतिः परं लक्ष्यं – Self-elevation is the highest goal",
      "विद्यया अमृतमश्नुते – Through knowledge, one attains immortality",
      "विद्या ददाति विनयम् – Knowledge gives humility",
      "ज्ञानं परमं बलम् – Knowledge is the greatest strength"
    ]
  },
  hi: {
    nav: {
      home: "होम",
      about: "परिचय",
      modules: "मॉड्यूल",
      mentors: "मार्गदर्शक",
      contact: "संपर्क",
      register: "पंजीकरण",
      enrollNow: "अभी पंजीकरण करें",
    },
    hero: {
      kicker: "युवाओं के लिए संडे स्कूल (कक्षा 8, 9 और 10 के छात्रों के लिए)",
      title: "संस्कार गुरुकुल",
      titleHindi: "Greatness comes from values",
      subtitle: "संस्कारात् भवति श्रेष्ठता",
      meaning: "",
      tagline: "चरित्र, आत्मविश्वास और संस्कृति का निर्माण",
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
      items: [
        { title: "मजबूत मूल्य और अनुशासन", desc: "अच्छी आदतों और अटूट सत्यनिष्ठा की नींव बनाना।" },
        { title: "बोलने में आत्मविश्वास", desc: "स्पष्ट अभिव्यक्ति विकसित करना और मंच के डर को दूर करना।" },
        { title: "बेहतर एकाग्रता और निर्णय क्षमता", desc: "एकाग्रता और सही विकल्प चुनने की क्षमता बढ़ाना।" },
        { title: "भावनात्मक संतुलन", desc: "तनाव, सहकर्मी दबाव और क्रोध को प्रभावी ढंग से संभालना सीखना।" },
        { title: "भविष्य के लिए स्पष्ट दृष्टिकोण", desc: "सार्थक लक्ष्य निर्धारित करना और उद्देश्य-संचालित जीवन की योजना बनाना।" },
        { title: "आध्यात्मिक विकास", desc: "आंतरिक शांति, करुणा और सेवा-उन्मुख मानसिकता विकसित करना।" }
      ]
    },
    features: {
      title: "विशिष्ट विशेषताएं",
      items: ["संवादात्मक सत्र और समूह चर्चा", "बाहरी भ्रमण और खेल", "योग, ध्यान और श्लोक सीखना", "प्रतियोगिताएं और प्रस्तुतियाँ", "अभिभावक सहभागिता कार्यक्रम", "प्रमाण पत्र और पुरस्कार"]
    },
    mentors: {
      title: "अनुभवी मार्गदर्शकों द्वारा मार्गदर्शन",
      subtitle: "युवा विकास और मूल्य-आधारित शिक्षा के लिए प्रतिबद्ध अनुभवी मार्गदर्शक।",
      list: [
        { name: "श्रीजा अखाड़े", desc: "बी.कॉम स्नातक, सीए इंटरमीडिएट (समूह 1), वरिष्ठ प्रबंधक", image: "/mentor/shrija.png" },
        { name: "श्रद्धा सर्वदे", desc: "बी.कॉम स्नातक, चार्टर्ड अकाउंटेंट (सीए), वरिष्ठ प्रमुख, मकर समूह", image: "/mentor/shraddha.png" },
        { name: "वैभव बोडखे", desc: "बी.ई. (कंप्यूटर विज्ञान), डेटा इंजीनियर, एक्सेंचर", image: "/mentor/vaibhav.png" },
        { name: "डॉ. हिमांशु कांबले", desc: "एम.बी.बी.एस., चिकित्सा अधिकारी, जिला अस्पताल, पुणे", image: "/mentor/himanshu.png" },
        { name: "मानसी भोर", desc: "बी.कॉम स्नातक, एमबीए - आईटीबीएम, असोसिएट कंसल्टेंट, इन्फोसिस लिमिटेड", image: "/mentor/mansi.png" },
        { name: "निशांत विरमानी", desc: "एम.टेक - बिट्स पिलानी, वरिष्ठ प्रबंधक, टाटा मोटर्स", image: "/mentor/nishant.png" }
      ]
    },
    contact: {
      title: "पंजीकरण अभी खुला है!",
      limited: "सीमित सीटें उपलब्ध हैं",
      btn: "आज ही संपर्क करें"
    },
    contactPage: {
      title: "हमसे संपर्क करें",
      subtitle: "कोई प्रश्न है? हमें आपसे सुनना अच्छा लगेगा। हमें संदेश भेजें और हम जल्द से जल्द जवाब देंगे।",
      nameLabel: "पूरा नाम",
      namePlaceholder: "जॉन डो",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "john@example.com",
      phoneLabel: "फ़ोन नंबर",
      phonePlaceholder: "आपका फ़ोन नंबर",
      messageLabel: "संदेश",
      messagePlaceholder: "हम आपकी क्या मदद कर सकते हैं?",
      submitBtn: "संदेश भेजें",
      submittingBtn: "भेजा जा रहा है...",
      successMsg: "संदेश सफलतापूर्वक भेजा गया!",
    },
    visionMission: {
      kicker: "हमारे बारे में",
      title: "हमारा दृष्टिकोण और मिशन",
      visionTitle: "हमारा दृष्टिकोण",
      visionBody:
        "मूल्य-आधारित, आत्मविश्वासी और जिम्मेदार युवाओं का विकास करना, जिनमें मजबूत चरित्र और स्पष्ट उद्देश्य हो।",
      missionTitle: "हमारा मिशन",
      missionBody:
        "छात्रों को संरचित शिक्षण और गतिविधियों के माध्यम से मार्गदर्शन करना ताकि चरित्र निर्माण, व्यक्तित्व विकास और आध्यात्मिक प्रगति हो सके।",
    },
    quotes: [
      "आत्मोन्नतिः परं लक्ष्यं – आत्मोन्नति ही परम लक्ष्य है",
      "विद्यया अमृतमश्नुते – विद्या से अमृत की प्राप्ति होती है",
      "विद्या ददाति विनयम् – विद्या विनय देती है",
      "ज्ञानं परमं बलम् – ज्ञान सबसे बड़ी शक्ति है"
    ]
  },
  mr: {
    nav: {
      home: "मुख्यपृष्ठ",
      about: "आमच्याबद्दल",
      modules: "मॉड्यूल्स",
      mentors: "मार्गदर्शक",
      contact: "संपर्क",
      register: "नोंदणी",
      enrollNow: "आता नोंदणी करा",
    },
    hero: {
      kicker: "युवकांसाठी संडे स्कूल (इयत्ता ८वी, ९वी आणि १०वी च्या विद्यार्थ्यांसाठी)",
      title: "संस्कार गुरुकुल",
      titleHindi: "Greatness comes from values",
      subtitle: "संस्कारात् भवति श्रेष्ठता",
      meaning: "",
      tagline: "चारित्र्य, आत्मविश्वास आणि संस्कृतीची निर्मिती",
      ctaMain: "आता नोंदणी करा",
      ctaSec: "अधिक जाणून घ्या",
    },
    about: {
      title: "कार्यक्रमाविषयी",
      p1: "आजच्या वेगाने बदलणाऱ्या जगात, विद्यार्थ्यांना ताणतणाव, विचलित मन, एकाग्रतेचा अभाव आणि जीवनातील ध्येयांबाबत संभ्रम यांसारख्या आव्हानांना सामोरे जावे लागते.",
      p2: "त्यांना योग्य मार्गदर्शन देण्यासाठी, गौरांग धामने १ वर्षाचा संडे स्कूल प्रोग्राम सुरू केला आहे, जो खालील मूल्यांवर केंद्रित action: \"चारित्र्य विकास\",",
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
      items: [
        { title: "मूल्ये आणि शिस्त", desc: "चांगल्या सवयी आणि अढळ प्रामाणिकपणाचा पाया उभारणे." },
        { title: "बोलण्यात आत्मविश्वास", desc: "स्पष्ट संवाद कौशल्य विकसित करणे आणि स्टेजची भीती दूर करणे." },
        { title: "उत्तम एकाग्रता आणि निर्णय क्षमता", desc: "एकाग्रता वाढवणे आणि योग्य निर्णय घेण्याची क्षमता सुधारणे." },
        { title: "भावनिक संतुलन", desc: "तणाव, मित्रांचा दबाव आणि राग प्रभावीपणे हाताळायला शिकणे." },
        { title: "भविष्यासाठी स्पष्ट दृष्टिकोन", desc: "अर्थपूर्ण ध्येये निश्चित करणे आणि उद्देशपूर्ण जीवनाचे नियोजन करणे." },
        { title: "आध्यात्मिक विकास", desc: "आंतरिक शांतता, करुणा आणि सेवाभावी वृत्ती जोपासणे." }
      ]
    },
    features: {
      title: "विशेष वैशिष्ट्ये",
      items: ["संवादात्मक सत्रे आणि गट चर्चा", "क्षेत्रभेट आणि मैदानी खेळ", "योग, ध्यान आणि श्लोक पठण", "स्पर्धा आणि सादरीकरण", "पालकांशी संवाद कार्यक्रम", "प्रमाणपत्र आणि पुरस्कार"]
    },
    mentors: {
      title: "अनुभवी मार्गदर्शकांचे मार्गदर्शन",
      subtitle: "युवा विकास आणि मूल्य-आधारित शिक्षणासाठी वचनबद्ध अनुभवी मार्गदर्शक.",
      list: [
        { name: "शृजा आखाडे", desc: "बी.कॉम. पदवीधर, सीए इंटरमीजिएट (ग्रुप १), वरिष्ठ व्यवस्थापक", image: "/mentor/shrija.png" },
        { name: "श्रद्धा सर्वदे", desc: "बी.कॉम. पदवीधर, चार्टर्ड अकाउंटंट (सीए), वरिष्ठ प्रमुख, मकर समूह", image: "/mentor/shraddha.png" },
        { name: "वैभव बोडखे", desc: "बी.ई. (संगणक शास्त्र), डेटा इंजिनिअर, एक्सेंचर", image: "/mentor/vaibhav.png" },
        { name: "डॉ. हिमांशू कांबळे", desc: "एम.बी.बी.एस., वैद्यकीय अधिकारी, जिल्हा रुग्णालय, पुणे", image: "/mentor/himanshu.png" },
        { name: "मानसी भोर", desc: "बी.कॉम. पदवीधर, एमबीए - आयटीबीएम, असोसिएट कन्सल्टंट, सायबर सिक्युरिटी, इन्फोसिस लि.", image: "/mentor/mansi.png" },
        { name: "निशांत विरमानी", desc: "एम.टेक - बिट्स पिलानी, वरिष्ठ व्यवस्थापक, टाटा मोटर्स", image: "/mentor/nishant.png" }
      ]
    },
    contact: {
      title: "नोंदणी सुरू झाली आहे!",
      limited: "मर्यादित जागा शिल्लक आहेत",
      btn: "आजच संपर्क साधा"
    },
    contactPage: {
      title: "आमच्याशी संपर्क साधा",
      subtitle: "काही प्रश्न आहे का? आम्हाला तुमच्याकडून ऐकायला आवडेल. आम्हाला संदेश पाठवा आणि आम्ही लवकरात लवकर प्रतिसाद देऊ.",
      nameLabel: "पूर्ण नाव",
      namePlaceholder: "जॉन डो",
      emailLabel: "ईमेल पत्ता",
      emailPlaceholder: "john@example.com",
      phoneLabel: "फोन नंबर",
      phonePlaceholder: "तुमचा फोन नंबर",
      messageLabel: "संदेश",
      messagePlaceholder: "आम्ही तुम्हाला कशी मदत करू शकतो?",
      submitBtn: "संदेश पाठवा",
      submittingBtn: "पाठवत आहे...",
      successMsg: "संदेश यशस्वीरित्या पाठवला गेला!",
    },
    visionMission: {
      kicker: "आमच्याबद्दल",
      title: "आमचा दृष्टिकोन आणि ध्येय",
      visionTitle: "आमचा दृष्टिकोन",
      visionBody:
        "मूल्याधिष्ठित, आत्मविश्वासू आणि जबाबदार युवा घडवणे, ज्यांच्यात मजबूत चारित्र्य आणि स्पष्ट उद्दिष्ट असते.",
      missionTitle: "आमचे ध्येय",
      missionBody:
        "चारित्र्य घडवणूक, व्यक्तिमत्त्व विकास आणि आध्यात्मिक प्रगतीसाठी संरचित शिक्षण आणि उपक्रमांद्वारे विद्यार्थ्यांना मार्गदर्शन करणे.",
    },
    quotes: [
      "आत्मोन्नतिः परं लक्ष्यं – आत्मोन्नती हेच सर्वोच्च ध्येय",
      "विद्यया अमृतमश्नुते – विद्येने अमृताची प्राप्ती होते",
      "विद्या ददाति विनयम् – विद्या विनय देते",
      "ज्ञानं परमं बलम् – ज्ञान हीच सर्वात मोठी शक्ती आहे"
    ]
  }
};

'use client';
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { motion } from 'framer-motion';
import Comment from '@/app/Component/comment/page';
import Header from '@/app/Component/Header/page';
import Footer from '@/app/Component/Footer/page';
import Seo from '@/components/Seo';

// Enhanced translations with more content and details
const translations = {
  en: {
    objective: "Objective: To Glow Bulb Wirelessly Using a Tesla Coil",
    intro: `This project demonstrates the principle of Wireless Power Transmission (WPT) using a simple Tesla Coil. Inspired by Nikola Tesla's pioneering work in the late 19th century, this experiment shows how energy can be transferred without wires to light up a bulb at a distance.
The core of the setup is an electrical resonant transformer circuit. A high-frequency transistor (like the 2N2222) supplies current through the primary coil, powered by a 9V battery. The oscillating current in the primary coil generates a magnetic field, which induces a strong electric field in the secondary coil. This field is powerful enough to light up CFL bulbs placed nearby, demonstrating the concept of wireless energy transfer.`,
    history: "A Brief History of Tesla Coil",
    historyContent: `The Tesla Coil, invented by Nikola Tesla in 1891, was a revolutionary device for generating high-voltage, low-current, high-frequency alternating-current electricity. Tesla's vision was to transmit electricity wirelessly across great distances. While his dream of global wireless power remains unrealized, the Tesla Coil is still used today for educational demonstrations, radio technology, and even entertainment in musical Tesla coil shows.`,
    how: "How Does It Work?",
    howContent: `The positive terminal of the battery connects to the collector of the transistor through the primary coil, while the emitter is grounded. When the transistor conducts, current flows through the primary coil. The base of the transistor is connected to the LED and one end of the secondary coil, causing the circuit to oscillate. This oscillation produces a rapidly changing magnetic field, which induces a high voltage in the secondary coil. The energy is strong enough to light up a bulb wirelessly, even if it is not physically connected to the circuit.`,
    circuit: "Circuit Diagram",
    components: "Components Required",
    componentsList: [
      "9V Battery",
      "2N2222 High-Frequency Transistor",
      "Primary Coil (few turns of copper wire)",
      "Secondary Coil (many turns of fine copper wire)",
      "LED Diode",
      "CFL Bulb",
      "Connecting Wires",
      "Breadboard or PCB",
      "Insulating Tape",
      "Plastic Tube (for winding coils)"
    ],
    assembly: "Assembly & Construction Tips",
    assemblyContent: `Carefully wind the secondary coil with as many turns of fine copper wire as possible on a plastic tube for maximum voltage induction. Ensure the primary and secondary coils are insulated from each other. Use insulating tape to secure windings and prevent short circuits. Place the CFL bulb near the secondary coil for best results.`,
    demo: "Working Model Demonstration",
    applications: "Applications & Advantages",
    applicationsList: [
      "Demonstrates the principle of wireless power transfer",
      "Educational tool for physics and electronics students",
      "Foundation for wireless charging technologies",
      "Can be scaled for higher power transmission",
      "Safe and simple for classroom demonstrations",
      "Great for science fairs and STEM exhibitions",
      "Inspiration for modern wireless charging pads"
    ],
    limitations: "Limitations & Challenges",
    limitationsContent: `While this project is safe and educational, the power transmitted is low and suitable only for small loads like CFL bulbs. Efficiency drops rapidly with distance, and the system is sensitive to coil alignment and environmental interference. For higher power or longer range, more advanced designs and safety precautions are needed.`,
    safety: "Safety Precautions",
    safetyList: [
      "Always use low voltage (9V battery) for demonstration",
      "Do not touch the coil terminals while powered",
      "Keep away from sensitive electronic devices",
      "Ensure proper insulation of wires",
      "Supervise children during experiments",
      "Avoid using near pacemakers or medical devices"
    ],
    explore: "Further Exploration",
    exploreList: [
      "Experiment with different coil sizes and turns for efficiency",
      "Try powering different types of bulbs or small devices",
      "Research modern wireless charging systems (Qi, resonant coupling)",
      "Explore Tesla's original patents and experiments",
      "Integrate with microcontrollers for smart switching",
      "Build a musical Tesla coil for audio demonstrations"
    ],
    faq: "Frequently Asked Questions (FAQ)",
    faqList: [
      "Q: Can I use a different transistor? \nA: Yes, any high-frequency NPN transistor like BC547 can work, but 2N2222 is recommended for stability.",
      "Q: Why is my bulb not glowing? \nA: Check coil windings, connections, and ensure the bulb is a CFL or fluorescent type.",
      "Q: Is this safe for kids? \nA: Yes, if you use a 9V battery and follow safety precautions.",
      "Q: Can I use this for wireless phone charging? \nA: No, this is a basic educational demo. Wireless phone charging uses more advanced, efficient, and safe circuits."
    ],
    conclusion: "Conclusion: This wireless bulb project is a hands-on introduction to the fascinating world of wireless power transmission. By understanding and experimenting with Tesla coil principles, you gain insight into both classic and modern applications of electromagnetic induction. For more projects and tutorials, explore the rest of my portfolio!",
    resources: "Related Resources & References",
    resourcesList: [
      { label: "Nikola Tesla Biography (Wikipedia)", url: "https://en.wikipedia.org/wiki/Nikola_Tesla" },
      { label: "How Wireless Power Works (ExplainThatStuff)", url: "https://www.explainthatstuff.com/how-wireless-power-works.html" },
      { label: "Tesla Coil Project on Instructables", url: "https://www.instructables.com/Tesla-Coil-1/" }
    ]
  },
  hi: {
    objective: "उद्देश्य: टेस्ला कॉइल का उपयोग करके वायरलेस बल्ब जलाना",
    intro: `यह प्रोजेक्ट एक साधारण टेस्ला कॉइल का उपयोग करके वायरलेस पावर ट्रांसमिशन (WPT) के सिद्धांत को दर्शाता है। निकोला टेस्ला के अग्रणी कार्य से प्रेरित, यह प्रयोग दिखाता है कि ऊर्जा को बिना तार के दूरी पर बल्ब जलाने के लिए स्थानांतरित किया जा सकता है।
सेटअप का मूल एक विद्युत अनुनादी ट्रांसफार्मर सर्किट है। एक हाई-फ्रीक्वेंसी ट्रांजिस्टर (जैसे 2N2222) प्राइमरी कॉइल के माध्यम से करंट सप्लाई करता है, जिसे 9V बैटरी से पावर मिलता है। प्राइमरी कॉइल में दोलनशील करंट एक चुंबकीय क्षेत्र उत्पन्न करता है, जो सेकेंडरी कॉइल में एक मजबूत विद्युत क्षेत्र प्रेरित करता है। यह क्षेत्र पास में रखे CFL बल्बों को जलाने के लिए पर्याप्त शक्तिशाली है, जो वायरलेस ऊर्जा ट्रांसफर की अवधारणा को दर्शाता है।`,
    history: "टेस्ला कॉइल का संक्षिप्त इतिहास",
    historyContent: `टेस्ला कॉइल, जिसे निकोला टेस्ला ने 1891 में आविष्कृत किया था, उच्च वोल्टेज, कम करंट, उच्च आवृत्ति वाली AC बिजली उत्पन्न करने के लिए एक क्रांतिकारी उपकरण था। टेस्ला का सपना था कि बिजली को बिना तार के लंबी दूरी तक भेजा जाए। भले ही उनका यह सपना पूरी तरह साकार न हो पाया हो, टेस्ला कॉइल आज भी शैक्षिक डेमो, रेडियो तकनीक और म्यूजिकल टेस्ला कॉइल शो में उपयोग होता है।`,
    how: "यह कैसे काम करता है?",
    howContent: `बैटरी का पॉजिटिव टर्मिनल प्राइमरी कॉइल के माध्यम से ट्रांजिस्टर के कलेक्टर से जुड़ा होता है, जबकि एमिटर ग्राउंड होता है। जब ट्रांजिस्टर कंडक्ट करता है, तो प्राइमरी कॉइल में करंट बहता है। ट्रांजिस्टर का बेस LED और सेकेंडरी कॉइल के एक छोर से जुड़ा होता है, जिससे सर्किट में दोलन होता है। यह दोलनशील करंट एक तेज़ी से बदलता हुआ चुंबकीय क्षेत्र उत्पन्न करता है, जो सेकेंडरी कॉइल में उच्च वोल्टेज प्रेरित करता है। यह ऊर्जा बल्ब को वायरलेस रूप से जलाने के लिए पर्याप्त होती है, भले ही वह सर्किट से फिजिकल रूप से जुड़ा न हो।`,
    circuit: "सर्किट डायग्राम",
    components: "आवश्यक घटक",
    componentsList: [
      "9V बैटरी",
      "2N2222 हाई-फ्रीक्वेंसी ट्रांजिस्टर",
      "प्राइमरी कॉइल (कुछ टर्न कॉपर वायर)",
      "सेकेंडरी कॉइल (कई टर्न पतली कॉपर वायर)",
      "LED डायोड",
      "CFL बल्ब",
      "कनेक्टिंग वायर",
      "ब्रेडबोर्ड या PCB",
      "इंसुलेटिंग टेप",
      "प्लास्टिक ट्यूब (कॉइल वाइंडिंग के लिए)"
    ],
    assembly: "असेंबली और निर्माण सुझाव",
    assemblyContent: `प्लास्टिक ट्यूब पर जितना संभव हो उतना पतले कॉपर वायर से सेकेंडरी कॉइल को सावधानीपूर्वक वाइंड करें ताकि अधिकतम वोल्टेज इंड्यूस हो सके। प्राइमरी और सेकेंडरी कॉइल को एक-दूसरे से इंसुलेट रखें। शॉर्ट सर्किट से बचने के लिए इंसुलेटिंग टेप का उपयोग करें। सर्वोत्तम परिणाम के लिए CFL बल्ब को सेकेंडरी कॉइल के पास रखें।`,
    demo: "वर्किंग मॉडल डेमो",
    applications: "अनुप्रयोग और लाभ",
    applicationsList: [
      "वायरलेस पावर ट्रांसफर के सिद्धांत को दर्शाता है",
      "भौतिकी और इलेक्ट्रॉनिक्स छात्रों के लिए शैक्षिक उपकरण",
      "वायरलेस चार्जिंग तकनीकों की नींव",
      "अधिक पावर ट्रांसमिशन के लिए स्केलेबल",
      "कक्षा डेमो के लिए सुरक्षित और सरल",
      "साइंस फेयर और STEM प्रदर्शनी के लिए उपयुक्त",
      "आधुनिक वायरलेस चार्जिंग पैड के लिए प्रेरणा"
    ],
    limitations: "सीमाएँ और चुनौतियाँ",
    limitationsContent: `यह प्रोजेक्ट सुरक्षित और शैक्षिक है, लेकिन ट्रांसमिटेड पावर कम है और केवल छोटे लोड (जैसे CFL बल्ब) के लिए उपयुक्त है। दूरी के साथ एफिशिएंसी तेजी से घटती है, और सिस्टम कॉइल अलाइनमेंट व पर्यावरणीय हस्तक्षेप के प्रति संवेदनशील है। अधिक पावर या लंबी दूरी के लिए उन्नत डिजाइन और सुरक्षा आवश्यक है।`,
    safety: "सुरक्षा सावधानियां",
    safetyList: [
      "डेमो के लिए हमेशा लो वोल्टेज (9V बैटरी) का उपयोग करें",
      "पावर ऑन रहते समय कॉइल टर्मिनल को न छुएं",
      "संवेदनशील इलेक्ट्रॉनिक डिवाइस से दूर रखें",
      "वायर की उचित इंसुलेशन सुनिश्चित करें",
      "प्रयोग के दौरान बच्चों की निगरानी करें",
      "पेसमेकर या मेडिकल डिवाइस के पास उपयोग न करें"
    ],
    explore: "आगे की खोज",
    exploreList: [
      "अधिक दक्षता के लिए विभिन्न कॉइल आकार और टर्न के साथ प्रयोग करें",
      "विभिन्न प्रकार के बल्ब या छोटे डिवाइस को पावर देने का प्रयास करें",
      "आधुनिक वायरलेस चार्जिंग सिस्टम (Qi, रेजोनेंट कपलिंग) पर शोध करें",
      "टेस्ला के मूल पेटेंट और प्रयोगों का अन्वेषण करें",
      "स्मार्ट स्विचिंग के लिए माइक्रोकंट्रोलर के साथ एकीकृत करें",
      "ऑडियो डेमो के लिए म्यूजिकल टेस्ला कॉइल बनाएं"
    ],
    faq: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    faqList: [
      "प्र: क्या मैं कोई और ट्रांजिस्टर उपयोग कर सकता हूँ?\nउ: हाँ, कोई भी हाई-फ्रीक्वेंसी NPN ट्रांजिस्टर जैसे BC547 काम करेगा, लेकिन 2N2222 स्थिरता के लिए अनुशंसित है।",
      "प्र: मेरा बल्ब क्यों नहीं जल रहा है?\nउ: कॉइल वाइंडिंग, कनेक्शन जांचें, और सुनिश्चित करें कि बल्ब CFL या फ्लोरोसेंट प्रकार का है।",
      "प्र: क्या यह बच्चों के लिए सुरक्षित है?\nउ: हाँ, यदि आप 9V बैटरी का उपयोग करते हैं और सुरक्षा सावधानियों का पालन करते हैं।",
      "प्र: क्या मैं इससे मोबाइल चार्ज कर सकता हूँ?\nउ: नहीं, यह केवल शैक्षिक डेमो है। मोबाइल चार्जिंग के लिए अधिक सुरक्षित और उन्नत सर्किट की आवश्यकता होती है।"
    ],
    conclusion: "निष्कर्ष: यह वायरलेस बल्ब प्रोजेक्ट वायरलेस पावर ट्रांसमिशन की रोमांचक दुनिया का व्यावहारिक परिचय है। टेस्ला कॉइल सिद्धांतों को समझकर और प्रयोग करके, आप विद्युत चुम्बकीय प्रेरण के क्लासिक और आधुनिक अनुप्रयोगों की जानकारी प्राप्त करते हैं। अधिक प्रोजेक्ट्स और ट्यूटोरियल्स के लिए, मेरे पोर्टफोलियो का अन्वेषण करें!",
    resources: "संबंधित संसाधन और संदर्भ",
    resourcesList: [
      { label: "निकोल टेस्ला जीवनी (विकिपीडिया)", url: "https://hi.wikipedia.org/wiki/निकोल_टेस्ला" },
      { label: "वायरलेस पावर कैसे काम करता है (ExplainThatStuff)", url: "https://www.explainthatstuff.com/how-wireless-power-works.html" },
      { label: "इंस्ट्रक्टेबल्स पर टेस्ला कॉइल प्रोजेक्ट", url: "https://www.instructables.com/Tesla-Coil-1/" }
    ]
  }
};

const Index = () => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const t = translations[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Enhanced SEO: Open Graph, Twitter, JSON-LD
  const canonicalUrl = "https://psgpraveen.me/Tesla";
  const imageUrl = "https://psgpraveen.me/img/tesla-coil.jpg";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": t.objective,
    "description": t.intro,
    "author": {
      "@type": "Person",
      "name": "Praveen Kumar Gupta",
      "url": "https://psgpraveen.me"
    },
    "image": imageUrl,
    "datePublished": "2024-05-01",
    "publisher": {
      "@type": "Organization",
      "name": "psgpraveen",
      "logo": {
        "@type": "ImageObject",
        "url": "https://psgpraveen.me/images/psglogo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" href={canonicalUrl} hrefLang="en" />
        <link rel="alternate" href={canonicalUrl} hrefLang="hi" />
        <meta property="og:title" content={t.objective} />
        <meta property="og:description" content={t.intro} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.objective} />
        <meta name="twitter:description" content={t.intro} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <Seo
        title="Tesla Coil Wireless Bulb Project – Wireless Power Transmission Demo"
        description={t.intro.slice(0, 150)}
        keywords={[
          "Tesla Coil",
          "Wireless Power Transmission",
          "Wireless Bulb Project",
          "Nikola Tesla",
          "Physics Project",
          "Electronics DIY",
          "Resonant Transformer",
          "Wireless Energy",
          "STEM",
          "Science Fair",
        ]}
        openGraph={{
          title: t.objective,
          description: t.intro,
          url: canonicalUrl,
          type: "article",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: "Tesla Coil Wireless Power Transmission",
            },
          ],
        }}
        author="Praveen Kumar Gupta"
      />
      
      {/* Enhanced Structured Data */}
      <Script id="tesla-article-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": t.objective,
          "description": t.intro,
          "image": imageUrl,
          "author": {
            "@type": "Person",
            "name": "Praveen Kumar Gupta",
            "url": "https://psgpraveen.me"
          },
          "publisher": {
            "@type": "Person",
            "name": "Praveen Kumar Gupta",
            "logo": {
              "@type": "ImageObject",
              "url": "https://psgpraveen.me/images/psglogo.png"
            }
          },
          "datePublished": "2024-05-01",
          "dateModified": new Date().toISOString(),
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        })}
      </Script>

      <Script id="tesla-howto-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Build a Tesla Coil Wireless Bulb Project",
          "description": "Step-by-step guide to building a wireless power transmission project using Tesla coil",
          "image": imageUrl,
          "totalTime": "PT4H",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "50"
          },
          "supply": t.componentsList.map(item => ({
            "@type": "HowToSupply",
            "name": item
          })),
          "step": [
            {
              "@type": "HowToStep",
              "name": "Wind the Secondary Coil",
              "text": "Use fine copper wire and a plastic tube. The more turns, the higher the voltage.",
              "url": canonicalUrl + "#assembly"
            },
            {
              "@type": "HowToStep",
              "name": "Prepare the Primary Coil",
              "text": "Use thicker copper wire and wind a few turns around the base of the secondary coil.",
              "url": canonicalUrl + "#assembly"
            },
            {
              "@type": "HowToStep",
              "name": "Assemble the Circuit",
              "text": "Connect the transistor, LED, coils, and battery as shown in the circuit diagram.",
              "url": canonicalUrl + "#circuit"
            },
            {
              "@type": "HowToStep",
              "name": "Test the Setup",
              "text": "Place a CFL bulb near the secondary coil and power the circuit.",
              "url": canonicalUrl + "#demo"
            }
          ]
        })}
      </Script>

      <Header />
      
      {/* Modern Article Container */}
      <article className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 opacity-30 -z-10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-pulse"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Language Selector - Modern Design */}
          <motion.div 
            className="flex justify-end mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 border border-gray-200">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <select
                value={lang}
                onChange={e => setLang(e.target.value as 'en' | 'hi')}
                className="bg-transparent text-gray-800 font-medium focus:outline-none cursor-pointer"
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </motion.div>

          {/* Main Content Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-16 border border-gray-100">
            {/* Badge and Title */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-sm">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                Physics & Electronics Project
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-6">
                {t.objective}
              </h1>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {t.intro}
              </p>
            </motion.div>

            {/* History Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {t.history}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t.historyContent}
              </p>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                {t.how}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t.howContent}
              </p>
            </motion.div>

            {/* How-To Build Section with modern styling */}
            <motion.section
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 shadow-xl border border-blue-100"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
                How to Build a Simple Tesla Coil Wireless Bulb Project
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li className="pl-2">
                  <strong className="text-blue-700">Wind the Secondary Coil:</strong> Use fine copper wire and a plastic tube. The more turns, the higher the voltage.
                </li>
                <li className="pl-2">
                  <strong className="text-blue-700">Prepare the Primary Coil:</strong> Use thicker copper wire and wind a few turns around the base of the secondary coil.
                </li>
                <li className="pl-2">
                  <strong className="text-blue-700">Assemble the Circuit:</strong> Connect the transistor, LED, coils, and battery as shown in the circuit diagram.
                </li>
                <li className="pl-2">
                  <strong className="text-blue-700">Insulate and Secure:</strong> Use insulating tape to prevent shorts and secure the coils.
                </li>
                <li className="pl-2">
                  <strong className="text-blue-700">Test the Setup:</strong> Place a CFL bulb near the secondary coil and power the circuit. The bulb should glow wirelessly!
                </li>
              </ol>
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-center text-green-800 font-medium">
                  <strong>💡 Tip:</strong> Try different coil sizes and distances for best results. Always follow safety precautions!
                </p>
              </div>
            </motion.section>

            {/* Circuit Diagram */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                {t.circuit}
              </h3>
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src="/img/Inkedtesla-circuits.jpg"
                className="mx-auto rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full"
                alt="Tesla Coil Circuit Diagram"
              />
            </motion.div>

            {/* Components Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border border-purple-100"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                {t.components}
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {t.componentsList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Assembly Tips */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
                {t.assembly}
              </h3>
              <p className="text-gray-700 leading-relaxed bg-green-50 p-6 rounded-xl border border-green-200">
                {t.assemblyContent}
              </p>
            </motion.div>

            {/* Working Model Demo */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-8">
                {t.demo}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.video
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-full rounded-2xl shadow-2xl border border-gray-200"
                  autoPlay
                  muted
                  loop
                  controls
                >
                  <source src='/img/tesla2.mp4' type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
                <motion.video
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-full rounded-2xl shadow-2xl border border-gray-200"
                  autoPlay
                  muted
                  loop
                  controls
                >
                  <source src='/img/Tesla3.mp4' type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              </div>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 shadow-xl border border-green-100"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
                {t.applications}
              </h3>
              <ul className="space-y-3">
                {t.applicationsList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Limitations */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                {t.limitations}
              </h3>
              <p className="text-gray-700 leading-relaxed bg-orange-50 p-6 rounded-xl border border-orange-200">
                {t.limitationsContent}
              </p>
            </motion.div>

            {/* Safety Precautions */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-xl border border-red-200"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {t.safety}
              </h3>
              <ul className="space-y-3">
                {t.safetyList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-red-800 font-medium">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Further Exploration */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl border border-blue-100"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                {t.explore}
              </h3>
              <ul className="space-y-3">
                {t.exploreList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 shadow-xl border border-yellow-100"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-6">
                {t.faq}
              </h3>
              <div className="space-y-4">
                {t.faqList.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-yellow-200">
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Conclusion */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-8 rounded-2xl shadow-xl border border-purple-200"
            >
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                {t.conclusion}
              </p>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                {t.resources}
              </h3>
              <ul className="space-y-3">
                {t.resourcesList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Comment />
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Index;

'use client';
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from 'framer-motion';
import Comment from '@/app/Component/comment/page';
import Header from '@/app/Component/Header/page';
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
      <Header />
      <div className="flex justify-end px-8 pt-4">
        <select
          value={lang}
          onChange={e => setLang(e.target.value as 'en' | 'hi')}
          className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
      <section id="tes" className="py-3 overflow-hidden min-h-screen">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold text-blue-300 underline text-3xl mb-4"
        >
          {t.objective}
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 text-gray-200 text-lg"
        >
          {t.intro}
        </motion.p>

        {/* How-To Section for extra content and SEO */}
        <section className="bg-gray-900 text-white py-8 px-4 my-8 rounded-xl max-w-3xl mx-auto shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">How to Build a Simple Tesla Coil Wireless Bulb Project</h2>
          <ol className="list-decimal list-inside space-y-3 text-lg">
            <li>
              <b>Wind the Secondary Coil:</b> Use fine copper wire and a plastic tube. The more turns, the higher the voltage.
            </li>
            <li>
              <b>Prepare the Primary Coil:</b> Use thicker copper wire and wind a few turns around the base of the secondary coil.
            </li>
            <li>
              <b>Assemble the Circuit:</b> Connect the transistor, LED, coils, and battery as shown in the circuit diagram.
            </li>
            <li>
              <b>Insulate and Secure:</b> Use insulating tape to prevent shorts and secure the coils.
            </li>
            <li>
              <b>Test the Setup:</b> Place a CFL bulb near the secondary coil and power the circuit. The bulb should glow wirelessly!
            </li>
          </ol>
          <p className="mt-6 text-center text-green-300">
            <b>Tip:</b> Try different coil sizes and distances for best results. Always follow safety precautions!
          </p>
        </section>

        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold text-purple-300 underline text-2xl"
        >
          {t.history}
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 pb-4 text-gray-300"
        >
          {t.historyContent}
        </motion.p>

        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold text-yellow-400 underline text-2xl"
        >
          {t.how}
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 pb-4 text-gray-300"
        >
          {t.howContent}
        </motion.p>

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-blue-400 underline text-xl"
        >
          {t.circuit}
        </motion.h3>
        <motion.img
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src="/img/Inkedtesla-circuits.jpg"
          className="mx-auto py-8 max-w-xl rounded-lg shadow-lg border border-blue-900"
          alt="Tesla Coil Circuit Diagram"
        />

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-blue-400 underline text-xl"
        >
          {t.components}
        </motion.h3>
        <ul className="list-disc list-inside px-12 pb-6 text-gray-300">
          {t.componentsList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-green-300 underline text-xl"
        >
          {t.assembly}
        </motion.h3>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 pb-4 text-gray-300"
        >
          {t.assemblyContent}
        </motion.p>

        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold underline text-yellow-400 text-2xl"
        >
          {t.demo}
        </motion.h2>

        <div className="lg:flex gap-5 mx-16 my-12 justify-center">
          <motion.video
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-80 border-black drop-shadow-md mb-4 lg:mb-0 rounded-lg border-3"
            autoPlay
            muted
            controls
          >
            <source src='/img/tesla2.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
          <motion.video
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-80 border-3 rounded-lg drop-shadow-md border-black"
            autoPlay
            muted
            controls
          >
            <source src='/img/Tesla3.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </div>

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-blue-400 underline text-xl"
        >
          {t.applications}
        </motion.h3>
        <ul className="list-disc list-inside px-12 pb-6 text-green-300">
          {t.applicationsList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-orange-300 underline text-xl"
        >
          {t.limitations}
        </motion.h3>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 pb-4 text-gray-300"
        >
          {t.limitationsContent}
        </motion.p>

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-red-400 underline text-xl"
        >
          {t.safety}
        </motion.h3>
        <ul className="list-disc list-inside px-12 pb-6 text-red-400">
          {t.safetyList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-blue-400 underline text-xl"
        >
          {t.explore}
        </motion.h3>
        <ul className="list-disc list-inside px-12 pb-6 text-gray-300">
          {t.exploreList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-yellow-400 underline text-xl"
        >
          {t.faq}
        </motion.h3>
        <ul className="list-disc list-inside px-12 pb-6 text-gray-200">
          {t.faqList.map((item, idx) => (
            <li key={idx} style={{ whiteSpace: 'pre-line' }}>{item}</li>
          ))}
        </ul>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 pb-8 text-gray-300"
        >
          <b>{t.conclusion}</b>
        </motion.p>

        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold text-blue-300 underline text-xl"
        >
          {t.resources}
        </motion.h3>
        <ul className="list-disc list-inside px-12 pb-10 text-blue-300">
          {t.resourcesList.map((item, idx) => (
            <li key={idx}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="w-full">
          <Comment />
        </div>
      </section>
    </>
  );
};

export default Index;

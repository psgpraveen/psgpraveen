'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Comment from '@/app/Component/comment/page';
import Header from '@/app/Component/Header/page';
import Seo, { SeoProps } from '@/components/Seo';
import Image from 'next/image';

/* eslint-disable @next/next/no-img-element */

const canonicalUrl = 'https://psgpraveen.me/Ldr';
const imageUrl = 'https://psgpraveen.me/img/LDR.png';

// Translations for language switcher
const translations = {
  en: {
    title: 'LDR Street Light Project | Automatic Light Detector using LDR Sensor',
    headline: 'Automatic Street Light Using LDR (Light Dependent Resistor)',
    intro: `Build an automatic street light controller using an LDR sensor. This project demonstrates how to use a Light Dependent Resistor to automatically turn street lights ON at night and OFF during the day, saving energy and enabling smart automation. Includes circuit diagram, video demonstration, and step-by-step guide.`,
    howto: 'How to Build an Automatic Street Light with LDR',
    howtoSteps: [
      'Build the Voltage Divider: Connect the LDR and resistor in series on a breadboard.',
      'Connect the Transistor: Attach the middle point of the divider to the base of a transistor.',
      'Add the Lamp: Connect a lamp (or LED) to the collector circuit with a suitable power supply.',
      'Test the Project: When the light level drops, the lamp should turn on automatically.'
    ],
    tip: 'Tip: Adjust the resistor value for sensitivity. Use this circuit for model streets, gardens, or home automation!',
    materials: 'Materials Needed',
    materialsList: [
      'LDR (Light Dependent Resistor)',
      'Resistor (10kΩ recommended, but can be adjusted)',
      'Transistor (e.g. BC547 or similar NPN)',
      'LED (optional, for visual indication)',
      'Power supply (e.g. 9V battery or a DC power supply)',
      'Lamp (e.g. an incandescent bulb or an LED module)',
      'Breadboard and connecting wires'
    ],
    circuit: 'Circuit Diagram',
    working: 'Working Model',
    applications: 'Applications & Advantages',
    applicationsList: [
      'Energy saving by automatic control of street lights',
      'Low cost and easy to implement',
      'Useful for smart cities and home automation',
      'Hands-on educational electronics project',
      'Demonstrates real-world sensor automation'
    ],
    faq: 'Frequently Asked Questions (FAQ)',
    faqList: [
      'Q: Can I use a different transistor? \nA: Yes, any general purpose NPN transistor like BC547, BC548, or 2N2222 will work.',
      'Q: Why is my lamp not turning on? \nA: Check your wiring, make sure the LDR is exposed to darkness, and verify the resistor value.',
      'Q: Can this circuit handle high power street lamps? \nA: For higher loads, use a relay or a power transistor suitable for the lamp.',
      'Q: How does the LDR work? \nA: The LDR changes resistance based on light. In darkness, resistance increases, triggering the lamp to turn on.'
    ],
    resources: 'Related Resources & References',
    resourcesList: [
      { label: 'Light Dependent Resistor (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Light-dependent_resistor' },
      { label: 'LDR Circuit Tutorial', url: 'https://www.electronics-tutorials.ws/io/ldr.html' },
      { label: 'Automatic Street Light Instructable', url: 'https://www.instructables.com/Automatic-Street-Light-Using-LDR/' }
    ]
  },
  hi: {
    title: 'एलडीआर स्ट्रीट लाइट प्रोजेक्ट | एलडीआर से स्वचालित लाइट डिटेक्टर',
    headline: 'एलडीआर (लाइट डिपेंडेंट रेसिस्टर) से स्वचालित स्ट्रीट लाइट',
    intro: `एलडीआर सेंसर का उपयोग करके स्वचालित स्ट्रीट लाइट कंट्रोलर बनाएं। यह प्रोजेक्ट दिखाता है कि कैसे लाइट डिपेंडेंट रेसिस्टर का उपयोग करके रात में स्ट्रीट लाइट अपने आप चालू और दिन में बंद की जा सकती है, जिससे ऊर्जा की बचत और स्मार्ट ऑटोमेशन संभव होता है। इसमें सर्किट डायग्राम, वीडियो डेमो और स्टेप-बाय-स्टेप गाइड शामिल है।`,
    howto: 'एलडीआर के साथ स्वचालित स्ट्रीट लाइट कैसे बनाएं',
    howtoSteps: [
      'वोल्टेज डिवाइडर बनाएं: ब्रेडबोर्ड पर एलडीआर और रेसिस्टर को सीरीज में जोड़ें।',
      'ट्रांजिस्टर जोड़ें: डिवाइडर के मध्य बिंदु को ट्रांजिस्टर के बेस से जोड़ें।',
      'लैंप जोड़ें: कलेक्टर सर्किट में एक लैंप (या एलईडी) को उपयुक्त पावर सप्लाई के साथ जोड़ें।',
      'प्रोजेक्ट टेस्ट करें: जब प्रकाश स्तर कम हो, तो लैंप अपने आप चालू हो जाना चाहिए।'
    ],
    tip: 'टिप: संवेदनशीलता के लिए रेसिस्टर मान को समायोजित करें। इस सर्किट का उपयोग मॉडल स्ट्रीट, गार्डन या होम ऑटोमेशन के लिए करें!',
    materials: 'आवश्यक सामग्री',
    materialsList: [
      'एलडीआर (लाइट डिपेंडेंट रेसिस्टर)',
      'रेसिस्टर (10kΩ अनुशंसित, लेकिन समायोजित किया जा सकता है)',
      'ट्रांजिस्टर (जैसे BC547 या समान NPN)',
      'एलईडी (वैकल्पिक, दृश्य संकेत के लिए)',
      'पावर सप्लाई (जैसे 9V बैटरी या डीसी पावर सप्लाई)',
      'लैंप (जैसे इनकंडेसेंट बल्ब या एलईडी मॉड्यूल)',
      'ब्रेडबोर्ड और कनेक्टिंग वायर'
    ],
    circuit: 'सर्किट डायग्राम',
    working: 'वर्किंग मॉडल',
    applications: 'अनुप्रयोग और लाभ',
    applicationsList: [
      'स्वचालित स्ट्रीट लाइट नियंत्रण द्वारा ऊर्जा की बचत',
      'कम लागत और लागू करने में आसान',
      'स्मार्ट सिटी और होम ऑटोमेशन के लिए उपयोगी',
      'इलेक्ट्रॉनिक्स प्रोजेक्ट के लिए व्यावहारिक अनुभव',
      'वास्तविक दुनिया के सेंसर ऑटोमेशन का प्रदर्शन'
    ],
    faq: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    faqList: [
      'प्र: क्या मैं कोई और ट्रांजिस्टर उपयोग कर सकता हूँ?\nउ: हाँ, कोई भी सामान्य NPN ट्रांजिस्टर जैसे BC547, BC548, या 2N2222 काम करेगा।',
      'प्र: मेरा लैंप चालू क्यों नहीं हो रहा है?\nउ: अपनी वायरिंग जांचें, सुनिश्चित करें कि एलडीआर अंधेरे में है, और रेसिस्टर मान जांचें।',
      'प्र: क्या यह सर्किट हाई पावर स्ट्रीट लैंप चला सकता है?\nउ: अधिक लोड के लिए, उपयुक्त रिले या पावर ट्रांजिस्टर का उपयोग करें।',
      'प्र: एलडीआर कैसे काम करता है?\nउ: एलडीआर प्रकाश के अनुसार प्रतिरोध बदलता है। अंधेरे में प्रतिरोध बढ़ता है, जिससे लैंप चालू हो जाता है।'
    ],
    resources: 'संबंधित संसाधन और संदर्भ',
    resourcesList: [
      { label: 'लाइट डिपेंडेंट रेसिस्टर (विकिपीडिया)', url: 'https://hi.wikipedia.org/wiki/प्रकाश-आश्रित_प्रतिरोधक' },
      { label: 'एलडीआर सर्किट ट्यूटोरियल', url: 'https://www.electronics-tutorials.ws/io/ldr.html' },
      { label: 'इंस्ट्रक्टेबल्स पर स्वचालित स्ट्रीट लाइट', url: 'https://www.instructables.com/Automatic-Street-Light-Using-LDR/' }
    ]
  }
};

const Index = () => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const t = translations[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": t.title,
    "description": t.intro,
    "keywords": [
      "LDR project",
      "automatic street light",
      "light dependent resistor",
      "LDR sensor",
      "street light automation",
      "energy saving project",
      "LDR working",
      "LDR circuit diagram",
      "DIY electronics",
      "school science project",
      "smart lighting",
      "automatic lighting",
      "sensor based project",
      "LDR application",
      "LDR advantages",
      "LDR disadvantages",
      "LDR relay circuit",
      "LDR based lamp",
      "LDR for home automation",
      "LDR for garden lights",
      "LDR for solar lights",
      "LDR for pathway lighting",
      "LDR for industrial automation",
      "LDR troubleshooting",
      "LDR FAQ",
      "LDR tutorial",
      "LDR explanation",
      "LDR video",
      "LDR step by step",
      "LDR best practices",
      "LDR safety tips"
    ],
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": t.title,
    "description": t.intro,
    "image": imageUrl,
    "totalTime": "PT1H",
    "supply": t.materialsList.map(item => ({ "@type": "HowToSupply", "name": item })),
    "tool": [
      { "@type": "HowToTool", "name": "Breadboard" },
      { "@type": "HowToTool", "name": "Connecting wires" }
    ],
    "step": t.howtoSteps.map((step, idx) => ({
      "@type": "HowToStep",
      "name": `Step ${idx + 1}`,
      "text": step
    }))
  };

  const metadata: SeoProps = {
    title: t.title,
    description: `${t.intro} Learn about LDR working, circuit diagram, applications, advantages, disadvantages, and how to use LDR for automatic street light, home automation, garden lighting, and more. Includes troubleshooting, FAQ, and real-world use cases.`,
    keywords: [
      "LDR project",
      "automatic street light",
      "light dependent resistor",
      "LDR sensor",
      "street light automation",
      "energy saving project",
      "LDR working",
      "LDR circuit diagram",
      "DIY electronics",
      "school science project",
      "smart lighting",
      "automatic lighting",
      "sensor based project",
      "LDR application",
      "LDR advantages",
      "LDR disadvantages",
      "LDR relay circuit",
      "LDR based lamp",
      "LDR for home automation",
      "LDR for garden lights",
      "LDR for solar lights",
      "LDR for pathway lighting",
      "LDR for industrial automation",
      "LDR troubleshooting",
      "LDR FAQ",
      "LDR tutorial",
      "LDR explanation",
      "LDR video",
      "LDR step by step",
      "LDR best practices",
      "LDR safety tips"
    ],
    openGraph: {
      title: t.title,
      description: `${t.intro} Learn about LDR working, circuit diagram, applications, advantages, disadvantages, and how to use LDR for automatic street light, home automation, garden lighting, and more.`,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: 'LDR Circuit Diagram',
        },
      ],
    },
    author: 'Praveen Kumar Gupta',
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={(metadata.keywords ?? []).join(', ')} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="psgpraveen" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="alternate" href={canonicalUrl} hrefLang="en" />
        <link rel="alternate" href={canonicalUrl} hrefLang="hi" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      </Head>
      <Seo {...metadata} />
      <Header />
      <div className="flex justify-end px-8 pt-4">
        <select
          value={lang}
          onChange={e => setLang(e.target.value as 'en' | 'hi')}
          className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1"
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
      <div id="ldr" className="mt-2 p-8 lg:p-16 bg-black min-h-screen">
        <img
          className="mx-auto border-2 border-gray-700 rounded-md"
          alt="Animated LDR Preview"
          src="https://img95.lovepik.com/photo/40111/6108.gif_wh300.gif"
          width={300}
          height={200}
        />
        <h1 className="text-center font-bold text-blue-300 text-3xl p-8">
          {t.headline}
        </h1>
        <p className="text-justify text-gray-200 leading-relaxed mb-6">
          {t.intro}
        </p>

        {/* Principle of Operation */}
        <section className="bg-gray-900 text-gray-100 py-6 px-4 my-8 rounded-xl max-w-3xl mx-auto shadow-lg">
          <h2 className="text-xl font-bold text-purple-300 mb-2">Principle of Operation</h2>
          <p>
            The LDR (Light Dependent Resistor) changes its resistance based on the intensity of light falling on it. In bright light, its resistance drops, while in darkness, the resistance increases. This property is used to sense day and night conditions. The voltage divider formed by the LDR and a fixed resistor provides a voltage that is used to control a transistor switch, which in turn controls the lamp or street light. The LDR&apos;s resistance drops, reducing the base voltage and turning the lamp off.
          </p>
        </section>

        {/* How-To Section */}
        <section className="bg-gray-900 text-gray-100 py-8 px-4 my-8 rounded-xl max-w-3xl mx-auto shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">{t.howto}</h2>
          <ol className="list-decimal list-inside space-y-3 text-lg">
            {t.howtoSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          <p className="mt-6 text-center text-green-300">
            <b>{t.tip}</b>
          </p>
        </section>

        {/* Circuit Explanation */}
        <section className="bg-gray-900 text-gray-100 py-6 px-4 my-8 rounded-xl max-w-3xl mx-auto shadow-lg">
          <h2 className="text-xl font-bold text-yellow-300 mb-2">Circuit Explanation</h2>
          <p>
          During the day, the LDR&apos;s resistance drops, reducing the base voltage and turning the lamp off.          </p>
        </section>

        <h2 className="text-center font-bold text-blue-300 text-2xl mt-8 mb-4">
          {t.materials}
        </h2>
        <ul className="list-disc list-inside text-gray-200">
          {t.materialsList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3 className="text-center font-bold text-blue-400 text-xl mt-10 mb-3">
          {t.circuit}
        </h3>
        <Image
          alt="LDR Circuit Diagram"
          src="/img/LDR.png"
          className="h-60 mx-auto my-4 drop-shadow-md rounded border border-gray-700"
          width={400}
          height={240}
          priority
        />

        {/* Troubleshooting Tips */}
        <section className="bg-gray-900 text-gray-100 py-6 px-4 my-8 rounded-xl max-w-3xl mx-auto shadow-lg">
          <h2 className="text-xl font-bold text-red-300 mb-2">Troubleshooting & Tips</h2>
          <ul className="list-disc list-inside">
            <li>Ensure all connections are secure and correct as per the circuit diagram.</li>
            <li>If the lamp does not turn on, try covering the LDR completely to simulate darkness.</li>
            <li>Use a multimeter to check voltages at the transistor base and collector.</li>
            <li>Try different resistor values for optimal sensitivity in your environment.</li>
            <li>For higher loads, use a relay or a power transistor (e.g., TIP122).</li>
          </ul>
        </section>

        <h3 className="text-center font-bold text-blue-400 text-xl mt-8">
          {t.working}
        </h3>
        <video
          className="w-full max-w-2xl mx-auto my-5 border-2 border-gray-700 rounded-lg drop-shadow-md"
          autoPlay
          muted
          controls
        >
          <source src="/img/LDR.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h3 className="text-center font-bold text-green-300 text-xl mt-10 mb-3">
          {t.applications}
        </h3>
        <ul className="list-disc list-inside text-green-200 mb-8">
          {t.applicationsList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {/* Real-World Use Cases */}
        <section className="bg-gray-900 text-gray-100 py-6 px-4 my-8 rounded-xl max-w-3xl mx-auto shadow-lg">
          <h2 className="text-xl font-bold text-blue-300 mb-2">Real-World Use Cases</h2>
          <ul className="list-disc list-inside">
            <li>Automatic street lighting in smart cities and rural areas</li>
            <li>Garden and pathway lighting for homes and parks</li>
            <li>Solar-powered lighting systems for energy efficiency</li>
            <li>Night lamps for children’s rooms</li>
            <li>Industrial automation for safety lighting</li>
          </ul>
        </section>

        <h3 className="text-center font-bold text-yellow-300 text-xl mt-10 mb-3">
          {t.faq}
        </h3>
        <ul className="list-disc list-inside text-gray-200 mb-8">
          {t.faqList.map((item, idx) => (
            <li key={idx} style={{ whiteSpace: 'pre-line' }}>{item}</li>
          ))}
        </ul>

        <h3 className="text-center font-bold text-blue-400 text-xl mt-10 mb-3">
          {t.resources}
        </h3>
        <ul className="list-disc list-inside text-blue-300 mb-12">
          {t.resourcesList.map((item, idx) => (
            <li key={idx}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Author and Credits */}
        <section className="bg-gray-900 text-gray-100 py-6 px-4 my-8 rounded-xl max-w-3xl mx-auto shadow-lg text-center">
          <h2 className="text-xl font-bold text-blue-400 mb-2">About the Author</h2>
          <p>
            <b>Praveen Kumar Gupta</b> is an electronics enthusiast and educator passionate about STEM projects and open-source learning. For more tutorials and projects, visit <a href="https://psgpraveen.me" className="underline text-blue-300" target="_blank" rel="noopener noreferrer">psgpraveen.me</a>.
          </p>
        </section>

        <div className="w-full mt-8">
          <Comment />
        </div>
      </div>
    </>
  );
};

export default Index;

'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  FaLightbulb, 
  FaInfoCircle, 
  FaDownload, 
  FaCode, 
  FaPlay, 
  FaStop,
  FaExpand,
  FaCompress,
  FaSun,
  FaMoon,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRocket,
  FaBook,
  FaVideo,
  FaGraduationCap,
  FaTools,
  FaBolt,
  FaChartLine,
  FaShareAlt,
  FaPrint,
  FaStar,
  FaPlayCircle,
} from 'react-icons/fa';
import { MdElectricBolt, MdCircle, MdScience, MdTimer } from 'react-icons/md';
import { BiMath } from 'react-icons/bi';
// import Head from 'next/head';

const canonicalUrl = 'https://psgpraveen.me/Ldr';
const imageUrl = 'https://psgpraveen.me/img/LDR.png';
const videoUrl = 'https://psgpraveen.me/img/LDR.mp4';

// Enhanced translations
const translations = {
  en: {
    title: "LDR Circuit Simulation",
    subtitle: "Interactive Light Dependent Resistor Project",
    description: "Explore how an LDR (Light Dependent Resistor) works in this interactive simulation.",
    howItWorks: "How It Works",
    components: "Components Required",
    applications: "Real-World Applications",
    simulation: "Circuit Simulation",
    technicalSpecs: "Technical Specifications",
    codeExample: "Arduino Code Example",
    startSimulation: "Start Simulation",
    stopSimulation: "Stop Simulation",
    downloadImage: "Download Circuit Diagram",
    fullscreen: "Toggle Fullscreen",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    learningPath: "Learning Path",
    troubleshooting: "Troubleshooting Guide",
    mathematics: "Circuit Mathematics",
    safety: "Safety Guidelines",
    resources: "Additional Resources",
    faqs: "Frequently Asked Questions",
    workingDemo: "Working Demo Video",
    watchVideo: "Watch Working Demo",
  },
  hi: {
    title: "एलडीआर सर्किट सिमुलेशन",
    subtitle: "इंटरएक्टिव लाइट डिपेंडेंट रेजिस्टर प्रोजेक्ट",
    description: "इस इंटरैक्टिव सिमुलेशन में जानें कि एलडीआर कैसे काम करता है।",
    howItWorks: "यह कैसे काम करता है",
    components: "आवश्यक घटक",
    applications: "वास्तविक दुनिया के अनुप्रयोग",
    simulation: "सर्किट सिमुलेशन",
    technicalSpecs: "तकनीकी विनिर्देश",
    codeExample: "Arduino कोड उदाहरण",
    startSimulation: "सिमुलेशन शुरू करें",
    stopSimulation: "सिमुलेशन बंद करें",
    downloadImage: "सर्किट डायग्राम डाउनलोड करें",
    fullscreen: "फुलस्क्रीन टॉगल करें",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    learningPath: "सीखने का मार्ग",
    troubleshooting: "समस्या निवारण गाइड",
    mathematics: "सर्किट गणित",
    safety: "सुरक्षा दिशानिर्देश",
    resources: "अतिरिक्त संसाधन",
    faqs: "अक्सर पूछे जाने वाले प्रश्न",
    workingDemo: "कार्यशील डेमो वीडियो",
    watchVideo: "कार्यशील डेमो देखें",
  }
};

export default function LDRCircuit() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isSimulating, setIsSimulating] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(50);
  const [resistance, setResistance] = useState(10);
  const [ledBrightness, setLedBrightness] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [voltage, setVoltage] = useState(5);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);
  // const [showQuiz, setShowQuiz] = useState(false);
  // const [quizScore, setQuizScore] = useState(0);
  const [chartData, setChartData] = useState<number[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  // const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const t = translations[language];

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "LDR Circuit Simulation - Complete Arduino Tutorial",
    "description": "Learn how to build an LDR (Light Dependent Resistor) circuit with Arduino. Interactive simulation, code examples, troubleshooting, and step-by-step guide.",
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
    "datePublished": "2024-10-19",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": canonicalUrl,
    "video": {
      "@type": "VideoObject",
      "name": "LDR Circuit Working Demo",
      "description": "Watch the LDR circuit in action - see how it responds to light changes",
      "thumbnailUrl": imageUrl,
      "contentUrl": videoUrl,
      "uploadDate": "2024-10-19"
    }
  };

  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Build an LDR Circuit with Arduino",
    "description": "Step-by-step guide to building a Light Dependent Resistor circuit",
    "totalTime": "PT30M",
    "estimatedCost": {
      "@type": "MoneyAmount",
      "currency": "INR",
      "value": "500"
    },
    "supply": [
      "LDR (Light Dependent Resistor)",
      "Arduino Uno",
      "LED",
      "220Ω Resistor",
      "10kΩ Resistor",
      "Breadboard",
      "Jumper Wires"
    ],
    "tool": [
      "Arduino IDE",
      "USB Cable",
      "Multimeter"
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Understand the Components",
        "text": "Learn about LDR, LED, resistors, and Arduino",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Connect the Circuit",
        "text": "Wire the components on breadboard according to circuit diagram",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Upload Code",
        "text": "Program the Arduino with the provided code",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Test the Circuit",
        "text": "Cover and uncover the LDR to test LED response",
        "position": 4
      }
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the typical resistance range of an LDR?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LDRs typically range from 1kΩ in bright light to 100kΩ or more in darkness. The exact range depends on the specific LDR model."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this circuit with 3.3V systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but you'll need to adjust resistor values and ensure your microcontroller can handle the voltage divider output."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calibrate my LDR circuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Read values in different lighting conditions and use the map() function to scale them to your desired range (0-255 for LED brightness)."
        }
      }
    ]
  };

  // Simulate LDR behavior with advanced calculations
  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setSimulationTime(prev => prev + 1);
        
        const newResistance = Math.max(1, Math.round(100 - lightIntensity));
        setResistance(newResistance);

        const newBrightness = Math.round(lightIntensity);
        setLedBrightness(newBrightness);

        const calculatedCurrent = (voltage / (newResistance * 1000)).toFixed(3);
        setCurrent(parseFloat(calculatedCurrent));

        const calculatedPower = (parseFloat(calculatedCurrent) * voltage * 1000).toFixed(2);
        setPower(parseFloat(calculatedPower));

        setChartData(prev => [...prev.slice(-19), newBrightness]);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setSimulationTime(0);
    }
  }, [isSimulating, lightIntensity, voltage]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'LDR-Circuit-Diagram.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LDR Circuit Simulation - Interactive Tutorial',
          text: 'Learn how to build an LDR circuit with Arduino! Interactive simulation with code examples.',
          url: canonicalUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Show social share options
      setShowShareMenu(!showShareMenu);
    }
  };

  // const shareOnSocial = (platform: string) => {
  //   const shareUrl = encodeURIComponent(canonicalUrl);
  //   const shareText = encodeURIComponent('Learn LDR Circuit with Arduino - Interactive Tutorial');
    
  //   const urls: { [key: string]: string } = {
  //     twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
  //     facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
  //     linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  //     whatsapp: `https://wa.me/?text=${shareText}%20${shareUrl}`,
  //   };
    
  //   if (urls[platform]) {
  //     window.open(urls[platform], '_blank', 'width=600,height=400');
  //   }
  // };

  const handlePrint = () => {
    window.print();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Component data
  const components = [
    { 
      name: 'LDR (Light Dependent Resistor)', 
      qty: '1x', 
      description: 'Sensor that changes resistance with light',
      specs: 'Typical range: 1kΩ (bright) to 100kΩ (dark)',
      price: '₹10-30'
    },
    { 
      name: 'LED', 
      qty: '1x', 
      description: 'Light emitting diode',
      specs: 'Forward voltage: 2V, Current: 20mA',
      price: '₹2-5'
    },
    { 
      name: 'Resistor (220Ω)', 
      qty: '1x', 
      description: 'Current limiting resistor for LED',
      specs: 'Power rating: 1/4W, Tolerance: ±5%',
      price: '₹1-2'
    },
    { 
      name: 'Resistor (10kΩ)', 
      qty: '1x', 
      description: 'Pull-down resistor',
      specs: 'Power rating: 1/4W, Tolerance: ±5%',
      price: '₹1-2'
    },
    { 
      name: 'Arduino Uno/Nano', 
      qty: '1x', 
      description: 'Microcontroller board',
      specs: 'ATmega328P, 16MHz, 5V operating voltage',
      price: '₹400-800'
    },
    { 
      name: 'Breadboard', 
      qty: '1x', 
      description: 'For prototyping without soldering',
      specs: '830 tie-points, standard size',
      price: '₹50-100'
    },
    { 
      name: 'Jumper Wires', 
      qty: '5-8 pieces', 
      description: 'Male-to-male wires for connections',
      specs: '20-30cm length recommended',
      price: '₹20-40'
    },
    { 
      name: 'USB Cable', 
      qty: '1x', 
      description: 'For Arduino programming and power',
      specs: 'USB Type-A to Type-B',
      price: '₹50-100'
    },
  ];

  const applications = [
    { 
      icon: '💡', 
      title: 'Automatic Street Lights', 
      description: 'Turn on lights when it gets dark',
      difficulty: 'Beginner',
      time: '30 minutes'
    },
    { 
      icon: '📱', 
      title: 'Phone Auto-Brightness', 
      description: 'Adjust screen brightness based on ambient light',
      difficulty: 'Advanced',
      time: '2-3 hours'
    },
    { 
      icon: '🏠', 
      title: 'Home Automation', 
      description: 'Smart lighting control systems',
      difficulty: 'Intermediate',
      time: '1-2 hours'
    },
    { 
      icon: '🌅', 
      title: 'Solar Panels', 
      description: 'Track sun position for optimal energy',
      difficulty: 'Advanced',
      time: '3-4 hours'
    },
    { 
      icon: '🚗', 
      title: 'Automotive', 
      description: 'Automatic headlight control',
      difficulty: 'Advanced',
      time: '2-3 hours'
    },
    { 
      icon: '📷', 
      title: 'Camera Exposure', 
      description: 'Automatic light metering',
      difficulty: 'Expert',
      time: '4-6 hours'
    },
    { 
      icon: '🌱', 
      title: 'Plant Growth Monitor', 
      description: 'Monitor sunlight for optimal plant growth',
      difficulty: 'Beginner',
      time: '45 minutes'
    },
    { 
      icon: '🏭', 
      title: 'Industrial Safety', 
      description: 'Light-based safety systems',
      difficulty: 'Expert',
      time: '6+ hours'
    },
  ];

  const learningSteps = [
    {
      step: 1,
      title: "Understand the Basics",
      description: "Learn what an LDR is and how it responds to light",
      duration: "15 mins",
      icon: <FaBook />
    },
    {
      step: 2,
      title: "Study the Circuit",
      description: "Analyze the circuit diagram and component connections",
      duration: "20 mins",
      icon: <MdScience />
    },
    {
      step: 3,
      title: "Build the Hardware",
      description: "Assemble the components on a breadboard",
      duration: "30 mins",
      icon: <FaTools />
    },
    {
      step: 4,
      title: "Write the Code",
      description: "Program the Arduino with the provided code",
      duration: "25 mins",
      icon: <FaCode />
    },
    {
      step: 5,
      title: "Test & Debug",
      description: "Test the circuit and troubleshoot any issues",
      duration: "20 mins",
      icon: <FaBolt />
    },
    {
      step: 6,
      title: "Experiment & Optimize",
      description: "Try different configurations and improvements",
      duration: "30+ mins",
      icon: <FaRocket />
    },
  ];

  const troubleshooting = [
    {
      problem: "LED not lighting up",
      causes: ["Incorrect wiring", "Damaged LED", "Wrong resistor value"],
      solutions: ["Check all connections", "Test LED with multimeter", "Use 220Ω resistor"]
    },
    {
      problem: "LDR not responding to light",
      causes: ["Faulty LDR", "Incorrect analog pin", "Poor connections"],
      solutions: ["Test LDR with multimeter", "Verify pin A0 connection", "Reseat all wires"]
    },
    {
      problem: "Inconsistent readings",
      causes: ["Ambient light interference", "Loose connections", "Power fluctuations"],
      solutions: ["Shield LDR from external light", "Secure all connections", "Use stable power supply"]
    },
    {
      problem: "Arduino not uploading code",
      causes: ["Wrong board selected", "COM port issue", "Driver problems"],
      solutions: ["Select correct board in IDE", "Check COM port", "Install CH340 drivers"]
    },
  ];

  const safetyGuidelines = [
    {
      icon: <FaExclamationTriangle className="text-yellow-500" />,
      title: "Electrical Safety",
      points: [
        "Always disconnect power before modifying circuits",
        "Use appropriate voltage (5V for Arduino)",
        "Check polarity of components before connecting"
      ]
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      title: "Component Handling",
      points: [
        "Handle components by their bodies, not leads",
        "Avoid static discharge - ground yourself first",
        "Don't exceed component voltage/current ratings"
      ]
    },
    {
      icon: <FaTools className="text-blue-500" />,
      title: "Workspace Safety",
      points: [
        "Work in well-lit, dry environment",
        "Keep liquids away from electronics",
        "Use proper tools - don't force connections"
      ]
    },
  ];

  // const faqs = [
  //   {
  //     question: "What is the typical resistance range of an LDR?",
  //     answer: "LDRs typically range from 1kΩ in bright light to 100kΩ or more in darkness. The exact range depends on the specific LDR model."
  //   },
  //   {
  //     question: "Can I use this with 3.3V systems?",
  //     answer: "Yes, but you'll need to adjust resistor values and ensure your microcontroller can handle the voltage divider output."
  //   },
  //   {
  //     question: "How do I calibrate my LDR circuit?",
  //     answer: "Read values in different lighting conditions and use map() function to scale them to your desired range (0-255 for LED brightness)."
  //   },
  //   {
  //     question: "Why use a 10kΩ resistor specifically?",
  //     answer: "The 10kΩ creates a voltage divider with the LDR. This value provides good sensitivity across the LDR's resistance range."
  //   },
  //   {
  //     question: "Can I control multiple LEDs?",
  //     answer: "Yes! You can control multiple LEDs using additional digital pins and appropriate current-limiting resistors for each."
  //   },
  // ];

  const arduinoCode = `// Advanced LDR Circuit Code with Calibration
int ldrPin = A0;        // LDR connected to analog pin A0
int ledPin = 9;         // LED connected to digital pin 9 (PWM)

// Calibration values (adjust based on your environment)
int minLDR = 0;         // Minimum LDR reading (brightest)
int maxLDR = 1023;      // Maximum LDR reading (darkest)

// Smoothing variables
const int numReadings = 10;
int readings[numReadings];
int readIndex = 0;
int total = 0;
int average = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  
  // Initialize all readings to 0
  for (int i = 0; i < numReadings; i++) {
    readings[i] = 0;
  }
  
  Serial.println("LDR Circuit Initialized");
  Serial.println("Calibrating...");
  calibrate();
}

void calibrate() {
  // Calibration routine - cover and uncover LDR
  Serial.println("Expose LDR to brightest light...");
  delay(3000);
  minLDR = analogRead(ldrPin);
  
  Serial.println("Now cover LDR completely...");
  delay(3000);
  maxLDR = analogRead(ldrPin);
  
  Serial.print("Calibrated: Min=");
  Serial.print(minLDR);
  Serial.print(", Max=");
  Serial.println(maxLDR);
}

void loop() {
  // Smoothing algorithm - average multiple readings
  total = total - readings[readIndex];
  readings[readIndex] = analogRead(ldrPin);
  total = total + readings[readIndex];
  readIndex = (readIndex + 1) % numReadings;
  average = total / numReadings;
  
  // Map the averaged LDR reading to LED brightness
  int brightness = map(average, minLDR, maxLDR, 255, 0);
  brightness = constrain(brightness, 0, 255);
  
  // Write brightness to LED
  analogWrite(ledPin, brightness);
  
  // Serial output for debugging and monitoring
  Serial.print("LDR: ");
  Serial.print(average);
  Serial.print(" | Brightness: ");
  Serial.print(brightness);
  Serial.print(" | Percentage: ");
  Serial.print((brightness * 100) / 255);
  Serial.println("%");
  
  delay(100);
}

// Additional function: Calculate resistance (optional)
float calculateResistance(int ldrValue) {
  // Assuming 10kΩ resistor in voltage divider
  float Vout = (ldrValue / 1023.0) * 5.0;
  float R_LDR = (10000.0 * (5.0 - Vout)) / Vout;
  return R_LDR;
}`;

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div ref={containerRef} className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        {/* Enhanced Floating Action Buttons */}
        <motion.div 
          className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="group relative p-4 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-blue-500/50 transition-all"
            title="Share"
          >
            <FaShareAlt size={20} />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Share Article
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrint}
            className="group relative p-4 rounded-full shadow-2xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-green-500/50 transition-all"
            title="Print"
          >
            <FaPrint size={20} />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Print Page
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative p-4 rounded-full shadow-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-purple-500/50 transition-all"
            title="Scroll to top"
          >
            <FaChevronUp size={20} />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Back to Top
            </span>
          </motion.button>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50 shadow-lg"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Enhanced Header with Glassmorphism */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`sticky top-0 z-40 backdrop-blur-xl ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} shadow-xl border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200/50'}`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <MdElectricBolt className="text-yellow-500 text-3xl drop-shadow-lg" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </div>
                <div>
                  <h1 className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                    {t.title}
                  </h1>
                  <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t.subtitle}
                  </p>
                </div>
              </motion.div>

              {/* Enhanced Controls */}
              <div className="flex items-center space-x-2">
                <motion.select
                  whileHover={{ scale: 1.05 }}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
                  className={`px-3 py-2 rounded-xl text-sm font-medium ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-200'} border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer shadow-lg`}
                >
                  <option value="en">🇬🇧 EN</option>
                  <option value="hi">🇮🇳 HI</option>
                </motion.select>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-3 rounded-xl ${isDarkMode ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'} shadow-lg hover:shadow-2xl transition-all`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFullscreen}
                  className={`hidden md:block p-3 rounded-xl ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-700 border-gray-200'} border-2 shadow-lg hover:shadow-2xl transition-all`}
                  aria-label="Toggle fullscreen"
                >
                  {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Enhanced Hero Section with Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative ${isDarkMode ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900' : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'} rounded-3xl shadow-2xl p-8 md:p-10 mb-8 text-white overflow-hidden`}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)] bg-[length:40px_40px]" />
            </div>

            <div className="relative z-10">
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaInfoCircle className="text-4xl drop-shadow-lg" />
                </motion.div>
                <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
                  {t.description}
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-white/95 text-lg leading-relaxed mb-8 max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                An LDR (Light Dependent Resistor) is a passive electronic component that changes its resistance based on the intensity of light falling on it. 
                This makes it perfect for light-sensing applications, from simple automatic lights to complex robotics projects.
              </motion.p>

              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <MdTimer className="text-3xl" />, value: "15 min", label: "Build Time", color: "from-blue-500 to-cyan-500" },
                  { icon: <span className="text-3xl">₹</span>, value: "500", label: "Total Cost", color: "from-green-500 to-emerald-500" },
                  { icon: <FaStar className="text-yellow-400 text-3xl" />, value: "Easy", label: "Difficulty", color: "from-yellow-500 to-orange-500" },
                  { icon: <FaTools className="text-3xl" />, value: "8", label: "Components", color: "from-purple-500 to-pink-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className={`bg-gradient-to-br ${stat.color} rounded-xl p-5 backdrop-blur shadow-xl hover:shadow-2xl transition-all cursor-default`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-center mb-1">{stat.value}</div>
                    <div className="text-sm text-center opacity-90 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Working Demo Video Section - OPTIMIZED LAYOUT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaVideo className="text-red-500 text-lg sm:text-xl md:text-2xl flex-shrink-0" />
                <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t.workingDemo}
                </h2>
              </div>
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <FaPlayCircle className="flex-shrink-0" />
                <span>{showVideo ? 'Hide Video' : t.watchVideo}</span>
              </button>
            </div>

            <AnimatePresence>
              {showVideo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Video Container with Aspect Ratio */}
                  <div className="relative w-full max-w-5xl mx-auto">
                    {/* 16:9 Aspect Ratio Container */}
                    <div className="relative w-full pb-[56.25%]">
                      <video
                        ref={videoRef}
                        className="absolute top-0 left-0 w-full h-full object-contain bg-black rounded-lg sm:rounded-xl shadow-2xl"
                        controls
                        controlsList="nodownload"
                        poster={imageUrl}
                        preload="metadata"
                        playsInline
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        onEnded={() => setIsVideoPlaying(false)}
                      >
                        <source src={videoUrl} type="video/mp4" />
                        <p className="text-white p-4 text-sm">
                          Your browser doesn&apos;t support video playback. 
                          <a href={videoUrl} className="underline ml-2">Download the video</a>
                        </p>
                      </video>
                      
                      {/* Custom Play Button Overlay */}
                      {!isVideoPlaying && (
                        <motion.button 
                          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group rounded-lg sm:rounded-xl"
                          onClick={handleVideoPlay}
                          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div 
                            className="bg-white/95 rounded-full p-4 sm:p-6 md:p-8 shadow-2xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaPlay className="text-red-500 text-2xl sm:text-3xl md:text-5xl ml-0.5 sm:ml-1" />
                          </motion.div>
                        </motion.button>
                      )}
                    </div>
                  </div>
                  
                  {/* Video Description */}
                  <div className={`mt-3 sm:mt-4 md:mt-6 p-3 sm:p-4 md:p-5 ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'} rounded-lg border ${isDarkMode ? 'border-gray-600' : 'border-blue-200'}`}>
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <FaInfoCircle className={`text-blue-500 text-base sm:text-lg md:text-xl flex-shrink-0 mt-0.5 sm:mt-1`} />
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm sm:text-base mb-1 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          📹 Live Demonstration
                        </h3>
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                          Watch the LDR circuit in action! This video demonstrates how the LED brightness changes in real-time 
                          as light conditions vary. You&apos;ll see the actual working circuit responding to ambient light levels, 
                          making it easier to understand the concept before building your own.
                        </p>
                        
                        {/* Video Stats */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
                          <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} rounded-md sm:rounded-lg p-2 sm:p-3 text-center`}>
                            <div className={`text-xs mb-0.5 sm:mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Duration</div>
                            <div className={`font-semibold text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>~2 min</div>
                          </div>
                          <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} rounded-md sm:rounded-lg p-2 sm:p-3 text-center`}>
                            <div className={`text-xs mb-0.5 sm:mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Quality</div>
                            <div className={`font-semibold text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>HD</div>
                          </div>
                          <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} rounded-md sm:rounded-lg p-2 sm:p-3 text-center`}>
                            <div className={`text-xs mb-0.5 sm:mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Level</div>
                            <div className={`font-semibold text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Beginner</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div className={`mt-3 sm:mt-4 grid sm:grid-cols-2 gap-2 sm:gap-3`}>
                    <div className={`${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-lg p-3 sm:p-4 border ${isDarkMode ? 'border-green-800' : 'border-green-200'}`}>
                      <div className="flex items-start space-x-2">
                        <FaCheckCircle className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-1 text-sm sm:text-base" />
                        <div className="min-w-0 flex-1">
                          <h4 className={`font-medium text-xs sm:text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            What to Observe
                          </h4>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                            Notice how LED brightness inversely relates to light intensity
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg p-3 sm:p-4 border ${isDarkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                      <div className="flex items-start space-x-2">
                        <FaLightbulb className="text-blue-500 flex-shrink-0 mt-0.5 sm:mt-1 text-sm sm:text-base" />
                        <div className="min-w-0 flex-1">
                          <h4 className={`font-medium text-xs sm:text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Pro Tip
                          </h4>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                            Try to recreate this setup at home for hands-on learning
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Interactive Simulation - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t.simulation}
                </h2>
                {isSimulating && (
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MdTimer className="mr-1" />
                    <span>Running: {simulationTime}s</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isSimulating 
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                      : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <FaStop />
                      <span className="hidden sm:inline">{t.stopSimulation}</span>
                    </>
                  ) : (
                    <>
                      <FaPlay />
                      <span className="hidden sm:inline">{t.startSimulation}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  aria-label="Download circuit diagram"
                >
                  <FaDownload />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Circuit Diagram */}
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4`}>
                <img
                  src={imageUrl}
                  alt="LDR Circuit Diagram"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="mt-4 text-center">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Click diagram to view in full screen
                  </p>
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="space-y-6">
                {/* Voltage Control */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                      Supply Voltage
                    </label>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {voltage}V
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="5"
                    step="0.1"
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    aria-label="Voltage Control"
                  />
                </div>

                {/* Light Intensity Control */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                      Light Intensity
                    </label>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lightIntensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={lightIntensity}
                    onChange={(e) => setLightIntensity(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-gray-700 via-yellow-400 to-yellow-100"
                    aria-label="Light Intensity Control"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>🌙 Dark</span>
                    <span>☀️ Bright</span>
                  </div>
                </div>

                {/* Visual Indicators Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* LDR Resistance */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-xl p-4 border-2 ${isDarkMode ? 'border-gray-600' : 'border-blue-200'}`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <MdCircle className="text-blue-500" />
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        LDR Resistance
                      </span>
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      {resistance}kΩ
                    </div>
                  </motion.div>

                  {/* LED Brightness */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} rounded-xl p-4 border-2 ${isDarkMode ? 'border-gray-600' : 'border-yellow-200'}`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <FaLightbulb 
                        className="text-yellow-500"
                        style={{ 
                          filter: `brightness(${1 + (ledBrightness / 100)})`,
                          opacity: ledBrightness / 100
                        }}
                      />
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        LED Brightness
                      </span>
                    </div>
                    <div className="text-xl font-bold text-yellow-600">
                      {ledBrightness}%
                    </div>
                  </motion.div>

                  {/* Current */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-xl p-4 border-2 ${isDarkMode ? 'border-gray-600' : 'border-green-200'}`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <FaBolt className="text-green-500" />
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Current
                      </span>
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {current}mA
                    </div>
                  </motion.div>

                  {/* Power */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl p-4 border-2 ${isDarkMode ? 'border-gray-600' : 'border-purple-200'}`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <FaChartLine className="text-purple-500" />
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Power
                      </span>
                    </div>
                    <div className="text-xl font-bold text-purple-600">
                      {power}mW
                    </div>
                  </motion.div>
                </div>

                {/* Status Message */}
                <motion.div 
                  animate={{ 
                    backgroundColor: lightIntensity < 30 ? '#1e3a8a' : lightIntensity > 70 ? '#fbbf24' : '#3b82f6' 
                  }}
                  className="rounded-xl p-4 text-white"
                >
                  <p className="text-sm font-medium">
                    {lightIntensity < 30 && (
                      <span>🌙 <strong>Dark Environment:</strong> High resistance ({resistance}kΩ), LED at {ledBrightness}% brightness!</span>
                    )}
                    {lightIntensity >= 30 && lightIntensity <= 70 && (
                      <span>🌤️ <strong>Moderate Light:</strong> Medium resistance ({resistance}kΩ), LED brightness balanced at {ledBrightness}%.</span>
                    )}
                    {lightIntensity > 70 && (
                      <span>☀️ <strong>Bright Environment:</strong> Low resistance ({resistance}kΩ), LED dimmed to {ledBrightness}%!</span>
                    )}
                  </p>
                </motion.div>

                {/* Simple Chart Visualization */}
                {chartData.length > 0 && (
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4`}>
                    <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                      Brightness Over Time
                    </h4>
                    <div className="flex items-end space-x-1 h-20">
                      {chartData.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-blue-500 rounded-t"
                          style={{ height: `${Math.max(value, 5)}%` }}
                          aria-label={`Data point ${index + 1}: ${value}%`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Learning Path Section - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8`}
          >
            <div className="flex items-center space-x-2 mb-6">
              <FaGraduationCap className="text-purple-500 text-2xl" />
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t.learningPath}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {learningSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-lg p-5 border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} relative overflow-hidden`}
                >
                  <div className="absolute top-2 right-2 text-4xl opacity-10">
                    {step.icon}
                  </div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl text-blue-500">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                  <div className="flex items-center text-xs text-blue-600">
                    <MdTimer className="mr-1" />
                    {step.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Components Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8`}
          >
            <button
              onClick={() => toggleSection('components')}
              className="w-full flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-2">
                <FaTools className="text-blue-500 text-xl" />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t.components}
                </h2>
              </div>
              {expandedSection === 'components' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'components' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {components.map((component, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-5 border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-lg transition-all`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {component.name}
                          </h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                            {component.qty}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {component.description}
                        </p>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} space-y-1`}>
                          <div>📊 {component.specs}</div>
                          <div className="font-medium text-green-600">💰 {component.price}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Total Cost */}
                  <div className={`mt-6 p-4 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-lg border-2 border-green-500`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Estimated Total Cost:
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ₹500 - ₹1100
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Applications Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8`}
          >
            <button
              onClick={() => toggleSection('applications')}
              className="w-full flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-2">
                <FaRocket className="text-purple-500 text-xl" />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t.applications}
                </h2>
              </div>
              {expandedSection === 'applications' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'applications' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {applications.map((app, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`${isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-600' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-lg p-5 border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-lg transition-all cursor-pointer`}
                      >
                        <div className="text-4xl mb-3">{app.icon}</div>
                        <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {app.title}
                        </h3>
                        <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {app.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            app.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            app.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            app.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.difficulty}
                          </span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            ⏱️ {app.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Circuit Mathematics Section - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8`}
          >
            <button
              onClick={() => toggleSection('mathematics')}
              className="w-full flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-2">
                <BiMath className="text-green-500 text-2xl" />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t.mathematics}
                </h2>
              </div>
              {expandedSection === 'mathematics' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'mathematics' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 mt-4">
                    {/* Voltage Divider */}
                    <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-5 border ${isDarkMode ? 'border-gray-600' : 'border-blue-200'}`}>
                      <h3 className={`font-semibold mb-3 text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Voltage Divider Formula
                      </h3>
                      <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-center text-lg mb-3">
                        V<sub>out</sub> = V<sub>in</sub> × (R<sub>LDR</sub> / (R<sub>LDR</sub> + R<sub>fixed</sub>))
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        This formula calculates the output voltage based on the LDR resistance and the fixed 10kΩ resistor.
                      </p>
                    </div>

                    {/* Ohm's Law */}
                    <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg p-5 border ${isDarkMode ? 'border-gray-600' : 'border-green-200'}`}>
                      <h3 className={`font-semibold mb-3 text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Ohm&apos;s Law
                      </h3>
                      <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-center text-lg mb-3">
                        I = V / R
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Current (I) equals Voltage (V) divided by Resistance (R). Used to calculate current through the LED.
                      </p>
                    </div>

                    {/* Power Calculation */}
                    <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-lg p-5 border ${isDarkMode ? 'border-gray-600' : 'border-purple-200'}`}>
                      <h3 className={`font-semibold mb-3 text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Power Calculation
                      </h3>
                      <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-center text-lg mb-3">
                        P = V × I = I² × R = V² / R
                      </div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Power (P) can be calculated using voltage and current. Essential for component safety.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Troubleshooting Section - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8`}
          >
            <button
              onClick={() => toggleSection('troubleshooting')}
              className="w-full flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-2">
                <FaTools className="text-orange-500 text-xl" />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t.troubleshooting}
                </h2>
              </div>
              {expandedSection === 'troubleshooting' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'troubleshooting' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 mt-4">
                    {troubleshooting.map((item, index) => (
                      <div 
                        key={index}
                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-5 border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
                      >
                        <h3 className={`font-semibold mb-3 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          <FaExclamationTriangle className="text-yellow-500 mr-2" />
                          {item.problem}
                        </h3>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Possible Causes:
                            </h4>
                            <ul className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1 pl-5`}>
                              {item.causes.map((cause, idx) => (
                                <li key={idx} className="list-disc">{cause}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Solutions:
                            </h4>
                            <ul className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1 pl-5`}>
                              {item.solutions.map((solution, idx) => (
                                <li key={idx} className="flex items-start">
                                  <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                  {solution}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Safety Guidelines - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className={`${isDarkMode ? 'bg-gradient-to-r from-red-900 to-orange-900' : 'bg-gradient-to-r from-red-50 to-orange-50'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-red-300`}
          >
            <div className="flex items-center space-x-2 mb-4">
              {/* <FaShieldAlt className="text-red-500 text-2xl" /> */}
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t.safety}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {safetyGuidelines.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-5 border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} shadow-sm`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <ul className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} list-disc pl-5 space-y-1`}>
                    {item.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Arduino Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t.codeExample}
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              >
                <FaCode />
                <span>{showCode ? 'Hide' : 'Show'} Code</span>
              </button>
            </div>

            <AnimatePresence>
              {showCode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'} rounded-lg p-4 overflow-x-auto`}>
                    <pre className="text-sm text-green-400 font-mono">
                      <code>{arduinoCode}</code>
                    </pre>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(arduinoCode)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                    >
                      Copy Code
                    </button>
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(arduinoCode)}`}
                      download="ldr_circuit.ino"
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                    >
                      Download .ino
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}

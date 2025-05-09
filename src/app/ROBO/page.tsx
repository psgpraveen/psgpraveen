'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Comment from '@/app/Component/comment/page';
import Header from '@/app/Component/Header/page';
import Footer from '@/app/Component/Footer/page';
import Seo from '@/components/Seo';
import Head from 'next/head';

const BlogSmartphoneRoboticArm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://example.com/smartphone-controlled-robotic-arm";
  const metadata = {
    description: "In-depth guide to designing, building, and programming a smartphone-controlled robotic arm with Arduino. Learn about hardware, software, circuit diagrams, code, and real-world applications for automation, education, and DIY projects.",
    keywords: [
      'Smartphone Controlled Robotic Arm',
      '4 DOF Arm',
      'Arduino Robotics',
      'Robotics Project',
      'Bluetooth Controlled Robotic Arm',
      'Automation',
      'DIY Robotics',
      'STEM Projects',
      'Mechatronics',
      'Arduino Code',
      'Robotic Arm Tutorial',
      'Electronics Project',
      'Embedded Systems',
      'IoT Robotics',
      'Open Source Hardware',
    ],
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={(metadata.keywords ?? []).join(', ')} />
      </Head>
      <Seo
        title="Smartphone Controlled Programmable Robotic Arm – Project Blog"
        description={metadata.description}
        keywords={metadata.keywords}
      />
      <Header />
      <article className="w-full min-h-screen p-6 lg:px-24 text-white max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.1 }}
            src="https://sklc-tinymce-2021.s3.amazonaws.com/2020/10/robot-kol-animasyon_1602321157.gif"
            alt="Smartphone Controlled Robotic Arm Animation"
            className="mx-auto max-h-56 rounded-xl mix-blend-lighten shadow-lg"
          />
        </motion.div>

        <SectionHeading text="Smartphone Controlled Programmable Robotic Arm" subText="[Project Blog – B.Tech 3rd Sem]" />

        <ContentBlock text="Welcome to my detailed project blog on building a smartphone-controlled programmable robotic arm! This project combines the power of Arduino, Bluetooth communication, and mechanical design to create a versatile robotic arm that can be controlled wirelessly using a smartphone. Whether you're a student, hobbyist, or professional, this guide will walk you through every step of the process." />

        <ContentBlock text="Robotic arms are revolutionizing industries by automating repetitive tasks, increasing precision, and enabling new possibilities in manufacturing, healthcare, and research. This blog explores the journey of building a smartphone-controlled programmable robotic arm, designed for flexibility, ease of use, and educational value." />

        <ContentBlock text="Our project aims to bridge the gap between software and hardware by integrating a 4 DOF robotic arm with a smartphone interface. This allows users to control the arm's movements wirelessly, making automation accessible even to those without advanced programming skills." />

        <SectionHeading text="Key Features & Advantages" />
        {[
          '4 Degrees of Freedom (DOF) for versatile 360° movement',
          'Programmable actions for custom automation tasks',
          'Bluetooth-based smartphone control – no extra hardware required',
          'User-friendly interface with sliders for intuitive movement control',
          'Open-source Arduino code for easy customization',
          'Compact and modular design for easy assembly and upgrades',
          'Ideal for STEM education, prototyping, and DIY automation',
        ].map((item, idx) => (
          <MotionList key={idx} text={item} />
        ))}

        <ContentBlock text="The robotic arm is powered by an Arduino Uno, controlling four gear motors via a motor driver shield. A Bluetooth module enables wireless communication with a custom smartphone app, allowing real-time control and programming of the arm's actions. The modular design makes it easy to upgrade or modify for different use cases." />

        <SectionHeading text="How It Works" />
        <ContentBlock text="The user connects their smartphone to the robotic arm via Bluetooth. The app provides sliders and buttons to control each joint of the arm, enabling precise positioning and movement. The Arduino receives commands and translates them into motor actions, executing complex tasks with ease. The system is designed to be intuitive, so even beginners can start automating tasks quickly." />

        <SectionHeading text="Circuit Diagram" />
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          src="/ArmCircuit.jpg"
          alt="Robotic Arm Circuit Diagram"
          className="mx-auto rounded-xl max-h-96 my-4 shadow-md"
        />

        <ContentBlock text="The circuit diagram above shows the connections between the Arduino Uno, motor driver shield, Bluetooth module, and the four gear motors. Proper wiring and power management are crucial for smooth operation and to prevent damage to components." />

        <SectionHeading text="Components Used" />
        {[
          'Arduino Uno microcontroller',
          '4 Gear Motors',
          'Motor Driver Shield (L293D)',
          'Bluetooth Module (HC-05/06)',
          'Base Frame and Gripper Claws',
          'Supporting Frame and Connectors',
          'PCB, Breadboards, and Wiring',
          'Power Supply (Transformer/Adapter)',
          'Push Buttons and Switches',
          'Smartphone with Bluetooth capability',
        ].map((item, idx) => (
          <MotionList key={idx} text={item} />
        ))}

        <SectionHeading text="Mechanical Design & Assembly" />
        <ContentBlock text="The arm is designed with modular joints and a sturdy base, allowing for stable movement and easy upgrades. 3D-printed or laser-cut parts can be used for the frame and gripper, while the gear motors provide precise control over each axis. Assembly instructions and CAD files are available for customization." />

        <SectionHeading text="Software & Programming" />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold my-2"
        >
          Programming Language: <span className="text-blue-400">C (Arduino)</span>
        </motion.div>
        <motion.h4 className="font-bold underline text-blue-300">Sample Arduino Code</motion.h4>
        <ContentBlock text="The Arduino code is designed to control the motors based on commands received from the smartphone app. Each command corresponds to a specific movement of the arm, allowing for precise control over its actions. The code is modular and can be extended for more complex automation tasks or additional sensors." />
        <SectionHeading text="Sample Arduino Code" />
        <ContentBlock text="Below is a sample Arduino sketch for controlling the robotic arm's four motors using serial commands received via Bluetooth. Each command (F, B, L, R, G, I, H, J) corresponds to a specific movement or joint action. This code can be extended or modified for more complex automation tasks." />

        <pre className="bg-neutral-800 text-sm p-4 rounded-xl overflow-auto my-3 text-green-400 shadow-inner">
{`#include <AFMotor.h>
AF_DCMotor motor1(1);
AF_DCMotor motor2(2);
AF_DCMotor motor3(3);
AF_DCMotor motor4(4);               
int Speed = 230;
char value;

void setup() {
  Serial.begin(9600);
  motor1.setSpeed(Speed);
  motor2.setSpeed(Speed);
  motor3.setSpeed(Speed);
  motor4.setSpeed(Speed);
}               

void loop() {
  if (Serial.available() > 0) {
    value = Serial.read();
  }
  if (value == 'F') {
    motor1.run(FORWARD);
    motor2.run(RELEASE);
    motor3.run(RELEASE);
    motor4.run(RELEASE);
  } else if (value == 'B') {
    motor1.run(BACKWARD);
    motor2.run(RELEASE);
    motor3.run(RELEASE);
    motor4.run(RELEASE);
  } else if (value == 'L') {
    motor1.run(RELEASE);
    motor2.run(BACKWARD);
    motor3.run(RELEASE);
    motor4.run(RELEASE);
  } else if (value == 'R') {
    motor1.run(RELEASE);
    motor2.run(FORWARD);
    motor3.run(RELEASE);
    motor4.run(RELEASE);
  } else if (value == 'G') {
    motor1.run(RELEASE);
    motor3.run(FORWARD);
    motor2.run(RELEASE);
    motor4.run(RELEASE);
  } else if (value == 'I') {
    motor1.run(RELEASE);
    motor2.run(RELEASE);
    motor3.run(BACKWARD);
    motor4.run(RELEASE);
  } else if (value == 'H') {
    motor1.run(RELEASE);
    motor2.run(RELEASE);
    motor3.run(RELEASE);
    motor4.run(FORWARD);
  } else if (value == 'J') {
    motor1.run(RELEASE);
    motor2.run(RELEASE);
    motor3.run(RELEASE);
    motor4.run(BACKWARD);
  } else {
    motor1.run(RELEASE);
    motor2.run(RELEASE);
    motor3.run(RELEASE);
    motor4.run(RELEASE);
  }
}
`}
        </pre>

        <SectionHeading text="Mobile App & User Interface" />
        <ContentBlock text="The custom smartphone app is designed for ease of use, featuring sliders and buttons for each joint. The app communicates with the Arduino via Bluetooth, sending single-character commands for each movement. The UI is intuitive, making it accessible for users of all skill levels." />

        <SectionHeading text="Testing & Troubleshooting" />
        <ContentBlock text="During development, thorough testing was performed to ensure reliable communication and precise movement. Common troubleshooting steps include checking Bluetooth pairing, verifying wiring, and calibrating motor speeds. Debugging tips and FAQs are provided in the project documentation." />

        <SectionHeading text="Applications" />
        {[
          'Industrial automation and production lines',
          'Automated food preparation and sorting',
          'Medical and laboratory robotics',
          'Material handling and logistics',
          'DIY and educational robotics projects',
          'Prototyping for smart automation systems',
          'Remote-controlled and assistive devices',
        ].map((item, idx) => (
          <MotionList key={idx} text={item} />
        ))}

        <SectionHeading text="Further Enhancements & Future Scope" />
        {[
          'Integrate sensors for feedback and safety (limit switches, encoders)',
          'Add a wireless camera for remote monitoring and vision-based control',
          'Expand to 6 DOF or more for advanced manipulation',
          'Develop a web-based or cloud-connected control interface',
          'Implement machine learning for adaptive automation and object recognition',
          'Solar or battery-powered operation for portability',
        ].map((item, idx) => (
          <MotionList key={idx} text={item} />
        ))}

        <SectionHeading text="Conclusion" />
        <ContentBlock text="This project demonstrates how combining software and electronics can lead to powerful, user-friendly automation solutions. Whether for industry, education, or hobbyist use, a smartphone-controlled robotic arm is a great way to explore robotics, programming, and mechatronics. The open-source nature of this project encourages further innovation and collaboration." />

        <ContentBlock text="Have questions, suggestions, or want to collaborate? Leave a comment below or reach out via the contact page! For more projects and tutorials, explore the rest of my portfolio." />

        <SectionHeading text="Related Projects & Resources" />
        <ul className="list-disc list-inside text-blue-300 my-2">
          <li>
            <a href="/Project" className="hover:underline">More Project</a>
          </li>
          <li>
            <a href="/Tesla" className="hover:underline">Wireless Power Transmission</a>
          </li>
          <li>
            <a href="/Ldr" className="hover:underline">LDR Sensor Project</a>
          </li>
          <li>
            <a href="https://github.com/psgpraveen" target="_blank" rel="noopener noreferrer" className="hover:underline">More on my GitHub</a>
          </li>
        </ul>
      </article>
      <Comment />
      <Footer />
    </>
  );
};

export default BlogSmartphoneRoboticArm;

// Reusable Components
const ContentBlock = ({ text }: { text: string }) => (
  <motion.p
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-justify py-2 text-gray-200"
  >
    {text}
  </motion.p>
);

const SectionHeading = ({ text, subText }: { text: string, subText?: string }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center py-4"
  >
    <h2 className="text-2xl font-bold underline text-white">{text}</h2>
    {subText && <p className="text-sm text-gray-400 mt-1">{subText}</p>}
  </motion.div>
);

const MotionList = ({ text }: { text: string }) => (
  <motion.li
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="list-disc list-inside text-gray-300 my-1"
  >
    {text}
  </motion.li>
);

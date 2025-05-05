'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Comment from '@/app/Component/comment/page'
import Header from '@/app/Component/Header/page'
import Footer from '@/app/Component/Footer/page'

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
        <Header/>
      <div className="w-full min-h-screen  py-6 lg:px-24 text-white">
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
            alt="robot gif"
            className="mx-auto max-h-56 rounded-xl mix-blend-lighten shadow-lg"
          />
        </motion.div>

        <SectionHeading text="Smartphone Controlled Programmable Robotic Arm" subText="[Minor Project - B.Tech 3rd Sem]" />

        <ContentBlock text="Robotic arms are now used in a wide variety of applications, from industrial automation to healthcare and research. Their ability to precisely control movement and repeat actions makes them invaluable." />
        <ContentBlock text="We hereby develop a smartphone-controlled programmable robotic arm that offers a smart, simple, and flexible automation system without the need for advanced coding skills." />

        <SectionHeading text="Key Advantages" />
        {[
          'DOF arm for 360° Movements',
          'Programmable Arm as per user automation process',
          'Smartphone controlled system with no added programming hardware needed',
          'Easy to control movements with sliders instead of complicated programming',
        ].map((item, idx) => (
          <MotionList key={idx} text={item} />
        ))}

        <ContentBlock text="The 4 DOF arm makes use of 4 motors controlled by an Arduino Uno controller, providing fluid and precise motion. These motors are controlled through a motor driver shield and a Bluetooth module paired with a smartphone app." />

        <MotionList text="Thus the system provides a smart mechanism to use a 360° programmable robotic arm with smartphone-controlled system." />

        <SectionHeading text="Circuit Diagram" />
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          src="/ArmCircuit.jpg"
          alt="Circuit Diagram"
          className="mx-auto rounded-xl max-h-96 my-4 shadow-md"
        />

        <SectionHeading text="Components" />
        {[
          'Arduino Uno',
          'Gear Motors',
          'Motor Driver Shield',
          'Bluetooth module',
          'Base Frame',
          'Gripper Claws',
          'Supporting Frame',
          'Cables and Connectors',
          'PCB and Breadboards',
          'Transformer/Adapter',
          'Push Buttons',
          'Switch',
        ].map((item, idx) => (
          <MotionList key={idx} text={item} />
        ))}

        <SectionHeading text="Software Specifications" />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold my-2"
        >
          Programming Language: <span className="text-blue-400">C</span>
        </motion.div>
        <motion.h4 className="font-bold underline text-blue-300">Arduino Code</motion.h4>
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
  } else if (value == 'B') {
    motor1.run(BACKWARD);
  } else if (value == 'L') {
    motor2.run(BACKWARD);
  } else if (value == 'R') {
    motor2.run(FORWARD);
  } else if (value == 'G') {
    motor3.run(FORWARD);
  } else if (value == 'I') {
    motor3.run(BACKWARD);
  } else if (value == 'H') {
    motor4.run(FORWARD);
  } else if (value == 'J') {
    motor4.run(BACKWARD);
  } else {
    motor1.run(RELEASE);
    motor2.run(RELEASE);
    motor3.run(RELEASE);
    motor4.run(RELEASE);
  }
}`}
        </pre>

        <SectionHeading text="Applications" />
        {[
          'Production Lines Automation',
          'Automated Cooking Robots',
          'Fruit/Vegetable Sorting Robots',
          'Medical Robots',
          'Material Handling Robots',
          'Smartphone-Controlled DIY Projects',
        ].map((item, idx) => (
          <MotionList key={idx} text={item} />
        ))}
      </div>
      <Comment />
      <Footer />
    </>
  )
}

export default Index

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
)

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
)

const MotionList = ({ text }: { text: string }) => (
  <motion.li
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="list-disc list-inside text-gray-300 my-1"
  >
    {text}
  </motion.li>
)

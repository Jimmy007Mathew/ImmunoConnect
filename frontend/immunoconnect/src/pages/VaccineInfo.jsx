import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Syringe,
  Shield,
  AlertCircle,
  CheckCircle,
  Calendar,
  X,
  Stethoscope,
  Check,
  XCircle,
} from "lucide-react";

const VaccineInfo = () => {
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target)
      ) {
        setSelectedVaccine(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const diseases = [
    {
      name: "Tetanus",
      description: "A serious bacterial infection affecting the nervous system",
      prevention: "DTaP/Tdap vaccines",
      severity: "High",
    },
    {
      name: "Japanese Encephalitis",
      description: "A viral infection that affects the brain",
      prevention: "JE vaccine",
      severity: "High",
    },
    {
      name: "Diphtheria",
      description:
        "A serious bacterial infection affecting the nose and throat",
      prevention: "DTaP/Tdap vaccines",
      severity: "High",
    },
    {
      name: "Polio",
      description:
        "A viral disease that can affect nerves and lead to paralysis",
      prevention: "IPV/OPV vaccines",
      severity: "Very High",
    },
    {
      name: "Tuberculosis",
      description: "A bacterial infection primarily affecting the lungs",
      prevention: "BCG vaccine",
      severity: "High",
    },
    {
      name: "Measles",
      description: "A highly contagious viral infection causing fever and rash",
      prevention: "MMR vaccine",
      severity: "High",
    },
  ];

  const vaccines = [
    {
      id: 1,
      timing: "At Birth",
      name: "BCG, OPV-0, Hepatitis B",
      description: "First set of vaccines administered right after birth",
      details:
        "Includes BCG for tuberculosis protection, first dose of oral polio vaccine, and hepatitis B birth dose",
      benefits: [
        "BCG: Protection against tuberculosis",
        "OPV-0: Initial protection against poliovirus",
        "Hepatitis B: Early protection against liver infection",
      ],
      risks: [
        "Mild fever",
        "Small red mark or scar (BCG)",
        "Temporary fussiness",
      ],
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      image:
        "https://images.unsplash.com/photo-1514192014812-ae2eff10d0f8?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      timing: "6 Weeks",
      name: "OPV-1, Pentavalent-1, RVV-1, fIPV-1, PCV-1",
      description: "Second set of essential vaccines for infant protection",
      details:
        "Multiple vaccines providing protection against various diseases",
      benefits: [
        "OPV-1 & fIPV-1: Enhanced polio protection",
        "Pentavalent-1: Protection against 5 diseases",
        "RVV-1: Rotavirus protection",
        "PCV-1: Prevention of pneumococcal diseases",
      ],
      risks: [
        "Low-grade fever",
        "Mild irritability",
        "Injection site reactions",
      ],
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      image:
        "https://images.unsplash.com/photo-1480985041486-c65b20c01d1f?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      timing: "10 Weeks",
      name: "OPV-2, Pentavalent-2, RVV-2",
      description: "Continuation of vaccine series",
      details: "Second doses of key vaccines",
      benefits: [
        "OPV-2: Continued polio protection",
        "Pentavalent-2: Strengthened immunity",
        "RVV-2: Enhanced rotavirus protection",
      ],
      risks: ["Mild fever", "Local reactions", "Temporary discomfort"],
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      image:
        "https://images.unsplash.com/photo-1632053002928-1919605ee6f7?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      timing: "14 Weeks",
      name: "OPV-3, Pentavalent-3, fIPV-2, RVV-3, PCV-2",
      description: "Completion of initial vaccine series",
      details: "Final doses of primary vaccination series",
      benefits: [
        "Complete protection against multiple diseases",
        "Long-term immunity development",
        "Enhanced vaccine response",
      ],
      risks: [
        "Similar to previous doses",
        "Mild side effects",
        "Temporary discomfort",
      ],
      color: "bg-gradient-to-br from-green-400 to-green-600",
      image:
        "https://images.unsplash.com/photo-1632052999485-d748103abf98?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      timing: "9-12 Months",
      name: "MR-1, JE-1, PCV-Booster",
      description: "First boosters and new vaccines",
      details:
        "Introduction of measles, rubella, and Japanese encephalitis protection",
      benefits: [
        "Protection against measles and rubella",
        "Japanese encephalitis prevention",
        "Enhanced pneumococcal immunity",
      ],
      risks: ["Mild fever", "Possible rash", "Temporary discomfort"],
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      image:
        "https://images.unsplash.com/photo-1632053001332-2268cc09f738?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      timing: "16-24 Months",
      name: "MR-2, JE-2, DPT-Booster-1, OPV-Booster",
      description: "Important booster doses",
      details: "Strengthening immunity with booster doses",
      benefits: [
        "Enhanced protection against multiple diseases",
        "Long-term immunity boost",
        "Continued disease prevention",
      ],
      risks: ["Mild reactions", "Temporary fever", "Local discomfort"],
      color: "bg-gradient-to-br from-red-400 to-red-600",
      image:
        "https://plus.unsplash.com/premium_photo-1663054282494-74a914d0ff89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      timing: "5-6 Years",
      name: "DPT-Booster-2",
      description: "School-entry booster",
      details: "Important booster before school entry",
      benefits: [
        "Renewed protection against diphtheria",
        "Continued pertussis immunity",
        "Tetanus protection maintenance",
      ],
      risks: ["Injection site reactions", "Mild fever", "Brief discomfort"],
      color: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      image:
        "https://plus.unsplash.com/premium_photo-1664373622422-cf79623ad08d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      timing: "10 Years",
      name: "Td",
      description: "Tetanus and diphtheria protection",
      details: "Adolescent booster dose",
      benefits: [
        "Continued tetanus protection",
        "Diphtheria immunity maintenance",
        "Age-appropriate coverage",
      ],
      risks: ["Local reactions", "Mild discomfort", "Brief soreness"],
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      image:
        "https://images.unsplash.com/photo-1576765608622-067973a79f53?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 9,
      timing: "16 Years",
      name: "Td",
      description: "Teen booster dose",
      details: "Final childhood series booster",
      benefits: [
        "Long-term tetanus protection",
        "Continued diphtheria immunity",
        "Adolescent health maintenance",
      ],
      risks: ["Injection site pain", "Temporary soreness", "Mild reactions"],
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      image:
        "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  const questionsPool = [
    {
      question: "What is the primary purpose of vaccines?",
      options: [
        "To cure existing diseases",
        "To prevent specific diseases",
        "To reduce fever",
        "To boost energy levels",
      ],
      correctAnswer: "To prevent specific diseases",
    },
    {
      question: "Which vaccine is given at birth?",
      options: ["BCG", "MMR", "HPV", "Influenza"],
      correctAnswer: "BCG",
    },
    {
      question: "What disease does the MMR vaccine protect against?",
      options: ["Measles", "Mumps", "Rubella", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the recommended age for the DPT booster vaccine?",
      options: ["1 year", "5-6 years", "10 years", "16 years"],
      correctAnswer: "5-6 years",
    },
    {
      question:
        "Which of the following is a potential side effect of vaccines?",
      options: ["Mild fever", "Severe allergic reaction", "Both", "None"],
      correctAnswer: "Both",
    },
    {
      question: "What is the primary cause of polio?",
      options: ["Bacteria", "Virus", "Fungus", "Parasite"],
      correctAnswer: "Virus",
    },
    {
      question: "Which vaccine is used to prevent tuberculosis?",
      options: ["BCG", "DTaP", "IPV", "Hepatitis B"],
      correctAnswer: "BCG",
    },
    {
      question: "What is the full form of OPV?",
      options: [
        "Oral Polio Vaccine",
        "Oral Pertussis Vaccine",
        "Oral Pneumonia Vaccine",
        "Oral Plague Vaccine",
      ],
      correctAnswer: "Oral Polio Vaccine",
    },
    {
      question: "Which disease is prevented by the JE vaccine?",
      options: ["Japanese Encephalitis", "Yellow Fever", "Dengue", "Malaria"],
      correctAnswer: "Japanese Encephalitis",
    },
    {
      question:
        "What is the primary route of administration for most vaccines?",
      options: ["Oral", "Intramuscular", "Subcutaneous", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "Which vaccine is given to prevent rotavirus?",
      options: ["RVV", "IPV", "OPV", "DTaP"],
      correctAnswer: "RVV",
    },
    {
      question: "What is the recommended age for the Td booster vaccine?",
      options: ["5 years", "10 years", "16 years", "Both 10 and 16 years"],
      correctAnswer: "Both 10 and 16 years",
    },
    {
      question: "Which of the following is a bacterial infection?",
      options: ["Polio", "Tetanus", "Measles", "Rubella"],
      correctAnswer: "Tetanus",
    },
    {
      question: "What is the primary symptom of measles?",
      options: ["Fever", "Rash", "Cough", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "Which vaccine is used to prevent pneumococcal diseases?",
      options: ["PCV", "IPV", "OPV", "DTaP"],
      correctAnswer: "PCV",
    },
    {
      question: "What is the primary benefit of vaccination?",
      options: [
        "Prevents disease spread",
        "Reduces healthcare costs",
        "Protects vulnerable populations",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "Which vaccine is given at 6 weeks of age?",
      options: ["OPV-1", "Pentavalent-1", "RVV-1", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the primary cause of Japanese Encephalitis?",
      options: ["Bacteria", "Virus", "Fungus", "Parasite"],
      correctAnswer: "Virus",
    },
    {
      question: "Which vaccine is used to prevent diphtheria?",
      options: ["DTaP", "IPV", "OPV", "Hepatitis B"],
      correctAnswer: "DTaP",
    },
    {
      question: "What is the primary symptom of tetanus?",
      options: ["Muscle stiffness", "Fever", "Headache", "All of the above"],
      correctAnswer: "All of the above",
    },
  ];

  const startQuiz = () => {
    const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setCurrentQuestions(selected);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect =
      currentQuestions[currentQuestionIndex].correctAnswer === answer;

    setTimeout(() => {
      setUserAnswers([...userAnswers, { answer, isCorrect }]);
      if (isCorrect) {
        setScore(score + 1);
      }
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestions([]);
  };

  const Modal = ({ vaccine, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <img
            src={vaccine.image}
            alt={vaccine.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900">{vaccine.name}</h3>
            <p className="text-gray-600">{vaccine.timing}</p>
          </div>

          <p className="text-gray-700 mb-6">{vaccine.details}</p>

          <div className="grid gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Benefits
              </h4>
              <ul className="space-y-2">
                {vaccine.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <Shield className="h-4 w-4 mt-1 text-green-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Potential Side Effects
              </h4>
              <ul className="space-y-2">
                {vaccine.risks.map((risk, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <Syringe className="h-4 w-4 mt-1 text-amber-500 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {/* Top left animated circle */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Bottom right animated circle */}
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300/20 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Middle floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100/20 rounded-full"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-200/20 rounded-full"
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
            rotate: [180, 0, 180],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom left circle */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300/20 rounded-full"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top center small circle */}
        <motion.div
          className="absolute top-20 left-1/2 w-20 h-20 bg-blue-100/30 rounded-full"
          animate={{
            y: [-15, 15, -15],
            x: [-10, 10, -10],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom center small circle */}
        <motion.div
          className="absolute bottom-20 left-1/2 w-20 h-20 bg-blue-300/20 rounded-full"
          animate={{
            y: [15, -15, 15],
            x: [10, -10, 10],
            rotate: [180, 0, 180],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-blue-50/50"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Calendar className="h-10 w-10 text-blue-600" />
            Vaccination Timeline
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive guide to childhood immunizations from birth through
            adolescence
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200"></div>

          <div className="space-y-12">
            {vaccines.map((vaccine, index) => (
              <motion.div
                key={vaccine.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-full md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "mr-8" : "ml-8"
                  }`}
                  onClick={() => setSelectedVaccine(vaccine.id)}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className="relative h-40">
                      <img
                        src={vaccine.image}
                        alt={vaccine.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {vaccine.timing}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div
                        className={`${vaccine.color} w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto transform -mt-10 border-4 border-white shadow-lg`}
                      >
                        <Syringe className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-gray-900 font-semibold text-center mb-2">
                        {vaccine.name}
                      </h4>
                      <p className="text-gray-600 text-sm text-center">
                        {vaccine.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`w-4 h-4 rounded-full ${vaccine.color} border-4 border-white shadow-lg`}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-6xl mx-auto mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              Diseases Prevented by Vaccination
            </h2>
            <p className="text-gray-600">
              These are some of the major diseases that can be prevented through
              proper vaccination.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Disease
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Prevention
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {diseases.map((disease, index) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      key={index}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {disease.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {disease.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {disease.prevention}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            disease.severity === "Very High"
                              ? "bg-red-100 text-red-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {disease.severity}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              Note: This is not an exhaustive list. There are many other
              diseases that can be prevented through vaccination. Consult with
              your healthcare provider for complete information about
              vaccine-preventable diseases.
            </p>
          </div>
        </motion.div>

        {/* New Section: Educational Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-6xl mx-auto mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              Educational Videos
            </h2>
            <p className="text-gray-600">
              Learn more about the history of vaccines and how they work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video 1: The History of Vaccines */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 md:ml-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                The History of Vaccines
              </h3>
              <div className="w-full overflow-hidden rounded-lg">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/qRhKe9yLhPM?si=WXADW2Scp1fc2Hut"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Video 2: How Vaccines Work */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                How Vaccines Work
              </h3>
              <div className="w-full overflow-hidden rounded-lg">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/rb7TVW77ZCs?si=BRMCCsmRsf15Y_sZ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quiz Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-6xl mx-auto mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              Vaccine Knowledge Quiz
            </h2>
            <p className="text-gray-600">
              Test your knowledge about vaccines and vaccine-preventable
              diseases.
            </p>
          </div>

          {!quizStarted ? (
            <motion.div
              className="text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={startQuiz}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Start Quiz
              </button>
            </motion.div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
              {!quizCompleted ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Question {currentQuestionIndex + 1} of{" "}
                      {currentQuestions.length}
                    </h3>
                    <div className="bg-blue-100 px-4 py-2 rounded-full">
                      <span className="text-blue-800 font-medium">
                        Score: {score}/{currentQuestionIndex}
                      </span>
                    </div>
                  </div>

                  <motion.p
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-gray-700 mb-6 font-medium"
                  >
                    {currentQuestions[currentQuestionIndex].question}
                  </motion.p>

                  <div className="grid gap-4">
                    <AnimatePresence mode="wait">
                      {currentQuestions[currentQuestionIndex].options.map(
                        (option, index) => {
                          const isCorrectAnswer =
                            option ===
                            currentQuestions[currentQuestionIndex]
                              .correctAnswer;
                          const isSelected = option === selectedAnswer;
                          const showCorrect = showFeedback && isCorrectAnswer;
                          const showIncorrect =
                            showFeedback && isSelected && !isCorrectAnswer;

                          return (
                            <motion.button
                              key={`${currentQuestionIndex}-${index}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              onClick={() =>
                                !showFeedback && handleAnswer(option)
                              }
                              disabled={showFeedback}
                              className={`
                              relative flex items-center justify-between px-6 py-4 rounded-lg text-left
                              transition-all duration-300 transform hover:scale-[1.02]
                              ${
                                showCorrect
                                  ? "bg-green-100 text-green-800 border-2 border-green-500"
                                  : showIncorrect
                                  ? "bg-red-100 text-red-800 border-2 border-red-500"
                                  : "bg-blue-50 text-gray-700 hover:bg-blue-100 border-2 border-transparent"
                              }
                            `}
                            >
                              <span className="text-lg">{option}</span>
                              {showCorrect && (
                                <Check className="h-6 w-6 text-green-600 ml-2" />
                              )}
                              {showIncorrect && (
                                <XCircle className="h-6 w-6 text-red-600 ml-2" />
                              )}
                            </motion.button>
                          );
                        }
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Quiz Completed!
                  </h3>
                  <div className="mb-8">
                    <div className="text-5xl font-bold mb-4">
                      {score}/{currentQuestions.length}
                    </div>
                    <p className="text-lg">
                      {score === currentQuestions.length ? (
                        <span className="text-green-600 font-semibold">
                          Perfect score! You're a vaccine expert! 🎉
                        </span>
                      ) : score >= currentQuestions.length / 2 ? (
                        <span className="text-yellow-600 font-semibold">
                          Good job! Keep learning about vaccines! 👍
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Don't worry! Learning about vaccines is a journey! 💪
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {selectedVaccine && (
        <Modal
          vaccine={vaccines.find((v) => v.id === selectedVaccine) || {}}
          onClose={() => setSelectedVaccine(null)}
        />
      )}
    </div>
  );
};

export default VaccineInfo;

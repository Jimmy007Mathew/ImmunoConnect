import React, { useState, useRef, useEffect } from "react";
import {
  Syringe,
  Shield,
  AlertCircle,
  CheckCircle,
  Calendar,
  X,
  Stethoscope,
} from "lucide-react";

const VaccineInfo = () => {
  const [selectedVaccine, setSelectedVaccine] = useState(null);
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
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Japanese Encephalitis",
      description: "A viral infection that affects the brain",
      image:
        "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Diphtheria",
      description:
        "A serious bacterial infection affecting the nose and throat",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Polio",
      description:
        "A viral disease that can affect nerves and lead to paralysis",
      image:
        "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Tuberculosis",
      description: "A bacterial infection primarily affecting the lungs",
      image:
        "https://images.unsplash.com/photo-1581593261374-aaa9c0d4d1bd?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Measles",
      description: "A highly contagious viral infection causing fever and rash",
      image:
        "https://images.unsplash.com/photo-1576670159266-ba5b53c324c5?q=80&w=1000&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1632053002434-b523bc1de22c?q=80&w=1000&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1000&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1576670159805-381a0aa93b99?q=80&w=1000&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=1000&auto=format&fit=crop",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Calendar className="h-10 w-10 text-blue-600" />
            Vaccination Timeline
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive guide to childhood immunizations from birth through
            adolescence
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200"></div>

          <div className="space-y-12">
            {vaccines.map((vaccine, index) => (
              <div
                key={vaccine.id}
                className={`relative flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "mr-8" : "ml-8"
                  }`}
                  onClick={() => setSelectedVaccine(vaccine.id)}
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
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
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <div
                    className={`w-4 h-4 rounded-full ${vaccine.color} border-4 border-white shadow-lg`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-24">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseases.map((disease, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={disease.image}
                    alt={disease.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">
                      {disease.name}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{disease.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              Note: This is not an exhaustive list. There are many other
              diseases that can be prevented through vaccination. Consult with
              your healthcare provider for complete information about
              vaccine-preventable diseases.
            </p>
          </div>
        </div>
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

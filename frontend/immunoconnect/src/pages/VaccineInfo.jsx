import React from "react";
import {
  Syringe,
  Shield,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";

const VaccineInfo = () => {
  const vaccines = [
    {
      id: 1,
      name: "BCG (Bacillus Calmette Guerin)",
      timing: "At Birth",
      description:
        "Protects against tuberculosis (TB), particularly severe forms in children.",
      benefits: [
        "Prevents severe forms of childhood tuberculosis",
        "Provides lifelong protection against TB",
        "Reduces risk of TB meningitis",
      ],
      sideEffects: [
        "Small red bump at injection site",
        "Formation of a small scar",
        "Mild fever",
        "Swollen lymph nodes (rare)",
      ],
      image:
        "https://images.unsplash.com/photo-1611694449252-02453c27856a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "OPV-0 & Hepatitis B",
      timing: "At Birth",
      description:
        "Combined protection against polio and hepatitis B infection.",
      benefits: [
        "Prevents polio infection and paralysis",
        "Protects against liver infection and damage",
        "Reduces risk of chronic liver disease and cancer",
        "Prevents transmission of Hepatitis B",
      ],
      sideEffects: [
        "Mild fever",
        "Soreness at injection site",
        "Temporary fussiness",
        "Reduced appetite (rare)",
      ],
      image:
        "https://images.unsplash.com/photo-1624024093647-c240f7944d87?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Vaccination Schedule Section */}
      <div className="w-5/6 mx-auto my-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="h-10 w-10 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Recommended Vaccination Schedule
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Follow this comprehensive timeline for your child's immunization
            needs
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
          <img
            src="/images/vaccination-schedule.jpg"
            alt="Vaccination Schedule"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 text-sm font-medium">
              Note: This schedule serves as a general guide. Your healthcare
              provider may recommend adjustments based on individual
              circumstances.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Title and Intro */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Syringe className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Birth Vaccines Information
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Essential vaccines administered at birth to protect your child's
            health
          </p>
        </div>

        {/* Vaccine Cards */}
        <div className="space-y-16">
          {vaccines.map((vaccine) => (
            <div
              key={vaccine.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Text Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-8 w-8 text-blue-600 mr-3" />
                    {vaccine.name}
                  </h2>
                  <div className="bg-blue-50 rounded-lg px-4 py-2 inline-block mb-6">
                    <p className="text-blue-700 font-semibold">
                      Timing: {vaccine.timing}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-6">{vaccine.description}</p>

                  <div className="space-y-6">
                    {/* Benefits */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                        Benefits
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                        {vaccine.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Side Effects */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertCircle className="h-6 w-6 text-amber-600 mr-2" />
                        Potential Side Effects
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                        {vaccine.sideEffects.map((effect, index) => (
                          <li key={index}>{effect}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-full min-h-[300px] md:min-h-full">
                  <img
                    src={vaccine.image}
                    alt={vaccine.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center bg-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Important Note
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Always consult with your healthcare provider about the vaccination
            schedule and any specific concerns. Individual circumstances may
            affect the timing and appropriateness of vaccines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VaccineInfo;
<img
  src="/images/vaccination-schedule.jpg"
  alt="Vaccination Schedule"
  className="w-full h-auto object-cover rounded-xl shadow-lg"
/>;

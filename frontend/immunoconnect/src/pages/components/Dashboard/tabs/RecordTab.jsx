import { useState, useEffect } from "react";
import axios from "axios";
import { Baby, Calendar, User, Syringe, Download } from "lucide-react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { format } from "date-fns";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#1a365d",
  },
  subtitle: {
    fontSize: 12,
    color: "#718096",
  },
  section: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f7fafc",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  cell: {
    flex: 1,
    fontSize: 10,
    paddingHorizontal: 4,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#718096",
    textAlign: "center",
  },
});

// PDF Component
const VaccinationCardPDF = ({ data }) => {
  if (
    !data ||
    !data.childName ||
    !data.dob ||
    !data.parentName ||
    !data.vaccines
  ) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Invalid Data</Text>
          <Text style={styles.subtitle}>
            Please check the data and try again.
          </Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Immunization Record</Text>
          <Text style={styles.subtitle}>Official Vaccination Certificate</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            Name: {data.childName} | DOB:{" "}
            {format(new Date(data.dob), "dd/MM/yyyy")}
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 20 }}>
            Parent/Guardian: {data.parentName}
          </Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.cell, { fontWeight: "bold" }]}>Vaccine</Text>
            <Text style={[styles.cell, { fontWeight: "bold" }]}>
              Date Administered
            </Text>
            <Text style={[styles.cell, { fontWeight: "bold" }]}>Status</Text>
          </View>

          {data.vaccines.map((vaccine, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{vaccine.name}</Text>
              <Text style={styles.cell}>
                {vaccine.actualDate
                  ? format(new Date(vaccine.actualDate), "dd/MM/yyyy")
                  : "Pending"}
              </Text>
              <Text style={styles.cell}>
                {vaccine.status === "Completed" ? "✓ Completed" : "Pending"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>
            This document is generated electronically and does not require a
            physical signature.
          </Text>
          <Text>
            Issued by ImmunoConnect | contact@immunoconnect.com | +1 555 123
            4567
          </Text>
        </View>
      </Page>
    </Document>
  );
};
const RecordTab = ({ darkMode }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [vaccinationData, setVaccinationData] = useState(null);

  // Fetch children from the backend
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get("https://loud-gretal-immuno-37d08cf0.koyeb.app/api/children", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setChildren(response.data);
      } catch (error) {
        console.error("Error fetching children:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, []);

  // Fetch vaccination data for the selected child
  const fetchVaccinationData = async (childId) => {
    try {
      console.log("Fetching data for child ID:", childId);
      const response = await axios.get(
        `https://loud-gretal-immuno-37d08cf0.koyeb.app/api/children/${childId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Backend response:", response.data);

      const child = response.data;

      // Format the data for the PDF
      const formattedData = {
        childName: child.name,
        dob: child.dateOfBirth,
        parentName: child.parent.name,
        vaccines: child.vaccinations.map((vaccine) => ({
          name: vaccine.name,
          actualDate: vaccine.actualDate,
          status: vaccine.status,
        })),
      };

      setVaccinationData(formattedData);
    } catch (error) {
      console.error("Error fetching vaccination data:", error);
      console.error("Error response:", error.response);
      setError("Failed to fetch vaccination data. Please try again.");
    }
  };

  if (loading) {
    return (
      <p
        className={`text-center ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Loading...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <h2
        className={`text-2xl font-bold mb-6 ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Vaccination Records
      </h2>

      {/* Child Selector */}
      <div className="mb-6">
        <label
          className={`block text-sm font-medium mb-2 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Select Child
        </label>
        <select
          onChange={(e) => {
            setSelectedChild(e.target.value);
            fetchVaccinationData(e.target.value);
          }}
          className={`w-full p-2 rounded-md ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400 focus:ring-blue-400"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        >
          <option value="">Select a child</option>
          {children.map((child) => (
            <option key={child._id} value={child._id}>
              {child.name}
            </option>
          ))}
        </select>
      </div>

      {/* PDF Download Section */}
      {selectedChild && vaccinationData && (
        <div
          className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Download Vaccination Card
          </h3>
          <PDFDownloadLink
            document={<VaccinationCardPDF data={vaccinationData} />}
            fileName={`${vaccinationData.childName}_vaccination_card.pdf`}
          >
            {({ loading: pdfLoading }) => (
              <button
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={pdfLoading}
              >
                <Download className="h-5 w-5 mr-2" />
                {pdfLoading ? "Generating PDF..." : "Download Vaccination Card"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default RecordTab;

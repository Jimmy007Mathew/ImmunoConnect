// components/VaccinationCardPDF.js
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Button } from "your-ui-library";
import { format } from "date-fns";

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

const VaccinationCardPDF = ({ data }) => (
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
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Verified</Text>
        </View>

        {data.vaccines.map((vaccine, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cell}>{vaccine.name}</Text>
            <Text style={styles.cell}>
              {format(new Date(vaccine.actualDate), "dd/MM/yyyy")}
            </Text>
            <Text style={styles.cell}>
              {vaccine.verified ? "✓ Verified" : "Pending Verification"}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>
          This document is generated electronically and does not require a
          physical signature
        </Text>
        <Text>
          Issued by ImmunoConnect | contact@immunoconnect.com | +1 555 123 4567
        </Text>
      </View>
    </Page>
  </Document>
);

export const DownloadVaccinationCard = ({ childId }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/children/${childId}/vaccination-card`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {data ? (
        <PDFDownloadLink
          document={<VaccinationCardPDF data={data} />}
          fileName={`${data.childName}_vaccination_card.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? "Generating PDF..." : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      ) : (
        <Button onClick={fetchData} disabled={loading}>
          {loading ? "Loading..." : "Generate Vaccination Card"}
        </Button>
      )}
    </div>
  );
};

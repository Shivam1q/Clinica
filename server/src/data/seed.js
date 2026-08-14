const patients = [
  {
    id: "P001",
    name: "Aarav Mehta",
    age: 24,
    phone: "9876543210",
    lastVisit: "2026-07-28",
  },
  {
    id: "P002",
    name: "Priya Nair",
    age: 31,
    phone: "9823456712",
    lastVisit: "2026-08-01",
  },
  {
    id: "P003",
    name: "Rohan Kapoor",
    age: 42,
    phone: "9912345678",
    lastVisit: "2026-07-18",
  },
  {
    id: "P004",
    name: "Sneha Kulkarni",
    age: 27,
    phone: "9765432109",
    lastVisit: "2026-08-04",
  },
  {
    id: "P005",
    name: "Neha Sharma",
    age: 29,
    phone: "9811122233",
    lastVisit: "2026-08-02",
  },
  {
    id: "P006",
    name: "Meera Iyer",
    age: 33,
    phone: "9867543210",
    lastVisit: "2026-08-06",
  },
];

const visits = [
  {
    id: "V001",
    patientId: "P001",
    date: "2026-07-28",
    summary: "Viral fever — advised rest and fluids",
  },
  {
    id: "V002",
    patientId: "P001",
    date: "2026-06-10",
    summary: "Follow-up after cough — improving",
  },
  {
    id: "V003",
    patientId: "P002",
    date: "2026-08-01",
    summary: "Annual check-up — labs within normal range",
  },
  {
    id: "V004",
    patientId: "P002",
    date: "2026-05-14",
    summary: "Migraine review — continue preventive meds",
  },
  {
    id: "V005",
    patientId: "P003",
    date: "2026-07-18",
    summary: "Knee pain — physiotherapy recommended",
  },
  {
    id: "V006",
    patientId: "P004",
    date: "2026-08-04",
    summary: "Vaccination visit — no adverse reaction",
  },
  {
    id: "V007",
    patientId: "P004",
    date: "2026-03-22",
    summary: "Seasonal allergy consult",
  },
  {
    id: "V008",
    patientId: "P005",
    date: "2026-08-02",
    summary: "BP follow-up — continue current medication",
  },
  {
    id: "V009",
    patientId: "P005",
    date: "2026-04-09",
    summary: "New hypertension diagnosis — started amlodipine",
  },
  {
    id: "V010",
    patientId: "P006",
    date: "2026-08-06",
    summary: "Diabetes review — adjust diet plan",
  },
  {
    id: "V011",
    patientId: "P006",
    date: "2026-05-30",
    summary: "HbA1c check — slightly elevated",
  },
];

const appointments = [
  {
    id: "A001",
    time: "09:00",
    patientId: "P002",
    patientName: "Priya Nair",
    reason: "General Check-up",
  },
  {
    id: "A002",
    time: "09:30",
    patientId: "P001",
    patientName: "Aarav Mehta",
    reason: "Fever Consultation",
  },
  {
    id: "A003",
    time: "10:00",
    patientId: "P005",
    patientName: "Neha Sharma",
    reason: "Blood Pressure Follow-up",
  },
  {
    id: "A004",
    time: "11:00",
    patientId: "P006",
    patientName: "Meera Iyer",
    reason: "Diabetes Review",
  },
  {
    id: "A005",
    time: "14:00",
    patientId: "P004",
    patientName: "Sneha Kulkarni",
    reason: "Vaccination",
  },
];

function nextId(prefix) {
  return `${prefix}${Date.now()}`;
}

const formattedDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const formattedTime = () => {
  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date().toLocaleTimeString("en-US", options);
};

export {
  patients,
  visits,
  appointments,
  nextId,
  formattedDate,
  formattedTime,
};

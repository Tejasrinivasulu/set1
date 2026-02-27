export interface Question {
  id: number;
  type: "mcq" | "fill";
  question: string;
  options?: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  // MCQs (1-25)
  { id: 1, type: "mcq", question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
  { id: 2, type: "mcq", question: "What is the SI unit of temperature?", options: ["Celsius", "Fahrenheit", "Kelvin", "Joule"], correctAnswer: "Kelvin" },
  { id: 3, type: "mcq", question: "Which organ pumps blood in the human body?", options: ["Brain", "Lungs", "Heart", "Liver"], correctAnswer: "Heart" },
  { id: 4, type: "mcq", question: "What is the chemical formula of water?", options: ["CO₂", "H₂O", "O₂", "NaCl"], correctAnswer: "H₂O" },
  { id: 5, type: "mcq", question: "Which metal has the highest electrical conductivity?", options: ["Copper", "Gold", "Silver", "Aluminium"], correctAnswer: "Silver" },
  { id: 6, type: "mcq", question: "Which gas is most abundant in Earth’s atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correctAnswer: "Nitrogen" },
  { id: 7, type: "mcq", question: "What is the basic unit of life?", options: ["Atom", "Molecule", "Cell", "Tissue"], correctAnswer: "Cell" },
  { id: 8, type: "mcq", question: "Which device measures blood pressure?", options: ["Stethoscope", "Sphygmomanometer", "Thermometer", "Barometer"], correctAnswer: "Sphygmomanometer" },
  { id: 9, type: "mcq", question: "Which planet is the largest in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Jupiter" },
  { id: 10, type: "mcq", question: "What force pulls objects toward the Earth?", options: ["Magnetism", "Friction", "Gravity", "Electricity"], correctAnswer: "Gravity" },
  { id: 11, type: "mcq", question: "MRI primarily works on:", options: ["Nuclear decay", "Nuclear magnetic resonance", "Dipole transitions", "Gravitational resonance"], correctAnswer: "Nuclear magnetic resonance" },
  { id: 12, type: "mcq", question: "Which particle mediates the strong nuclear force?", options: ["Photon", "W boson", "Gluon", "Graviton"], correctAnswer: "Gluon" },
  { id: 13, type: "mcq", question: "Biological conversion of N₂ to NH₃ is called:", options: ["Nitrification", "Denitrification", "Nitrogen fixation", "Ammonification"], correctAnswer: "Nitrogen fixation" },
  { id: 14, type: "mcq", question: "Coriolis effect arises due to:", options: ["Gravity", "Friction", "Earth’s rotation", "Solar radiation"], correctAnswer: "Earth’s rotation" },
  { id: 15, type: "mcq", question: "SI unit of electric current is:", options: ["Volt", "Ampere", "Ohm", "Coulomb"], correctAnswer: "Ampere" },
  { id: 16, type: "mcq", question: "Ice floats on water because:", options: ["It is heavier", "It is less dense", "It contains air", "It repels water"], correctAnswer: "It is less dense" },
  { id: 17, type: "mcq", question: "Which gas causes the greenhouse effect?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correctAnswer: "Carbon dioxide" },
  { id: 18, type: "mcq", question: "Hemoglobin is responsible for:", options: ["Clotting", "Oxygen transport", "Immunity", "pH control"], correctAnswer: "Oxygen transport" },
  { id: 19, type: "mcq", question: "Archimedes’ principle explains:", options: ["Floating", "Motion", "Heat", "Light"], correctAnswer: "Floating" },
  { id: 20, type: "mcq", question: "Who proposed the Theory of Relativity?", options: ["Newton", "Einstein", "Bohr", "Galileo"], correctAnswer: "Einstein" },
  { id: 21, type: "mcq", question: "Pauli exclusion principle states that:", options: ["Same state allowed", "No two electrons share four quantum numbers", "Quantum states ignored", "Electrons identical"], correctAnswer: "No two electrons share four quantum numbers" },
  { id: 22, type: "mcq", question: "Quantum tunneling is used in:", options: ["Microphone", "Tunnel diode", "Thermistor", "Barometer"], correctAnswer: "Tunnel diode" },
  { id: 23, type: "mcq", question: "GPS requires relativistic corrections because of:", options: ["Doppler effect only", "Special and General Relativity", "Quantum effects", "Solar wind"], correctAnswer: "Special and General Relativity" },
  { id: 24, type: "mcq", question: "Schrödinger equation gives:", options: ["Trajectory", "Probability distribution", "Mass", "Charge"], correctAnswer: "Probability distribution" },
  { id: 25, type: "mcq", question: "Weakest fundamental force is:", options: ["Gravitational", "Electromagnetic", "Strong", "Weak"], correctAnswer: "Gravitational" },
  // Image / application-based questions (26-30)
  {
    id: 26,
    type: "mcq",
    question:
      "This image shows a green laser beam passing through a colloidal solution. The scattering of light by these particles allows the entire path of the beam to be visible. What is this phenomenon called?",
    options: ["Raman scattering", "The Tyndall Effect", "Photoelectric effect", "Compton scattering"],
    correctAnswer: "The Tyndall Effect",
  },
  {
    id: 27,
    type: "mcq",
    question:
      "These organisms, known as lichen, are shown growing on a concrete bridge structure. In environmental science, different species of lichen are used as 'bio-indicators.' The presence of specific leafy or crusty types generally correlates to high or low levels of what pollution?",
    options: [
      "Microplastic concentration in groundwater",
      "Ground-level ozone (O₃)",
      "Sulfur dioxide (SO₂) in the air",
      "Heavy metal accumulation in soil",
    ],
    correctAnswer: "Sulfur dioxide (SO₂) in the air",
  },
  {
    id: 28,
    type: "mcq",
    question:
      "Every science and engineering student must use precision tools. While a micrometer or a standard ruler has its place, this specific tool, shown measuring a hexagonal nut, uses a secondary sliding scale to achieve higher precision than a simple rule. What is this tool called?",
    options: ["Micrometer screw gauge", "Vernier caliper", "Feeler gauge", "Dial indicator"],
    correctAnswer: "Vernier caliper",
  },
  {
    id: 29,
    type: "mcq",
    question:
      "This vintage portrait shows a groundbreaking scientist who, along with her husband Pierre, developed the theory of radioactivity. She is the first woman to win a Nobel Prize, the first person to win twice, and the only person to win a Nobel Prize in two different scientific fields (Physics and Chemistry). Name her.",
    options: ["Rosalind Franklin", "Marie Curie", "Lise Meitner", "Dorothy Hodgkin"],
    correctAnswer: "Marie Curie",
  },
  {
    id: 30,
    type: "mcq",
    question:
      "This extreme close-up of plant cells shows distinct green organelles responsible for photosynthesis. In forensic and medical sciences, analyzing these cell structures can help determine everything from a sample’s origin (botanical vs. synthetic) to a person's approximate time of death. Name the primary energy-converting organelle visible in these cells.",
    options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
    correctAnswer: "Chloroplast",
  },
];

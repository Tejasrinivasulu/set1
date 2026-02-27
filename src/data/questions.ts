export interface Question {
  id: number;
  type: "mcq" | "fill";
  question: string;
  options?: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  // MCQs (1-25)
  {
    id: 1,
    type: "mcq",
    question: "MRI imaging is based on interaction with:",
    options: ["X-rays", "Gamma rays", "Magnetic fields and radio waves", "Infrared radiation"],
    correctAnswer: "Magnetic fields and radio waves",
  },
  {
    id: 2,
    type: "mcq",
    question: "Which particle mediates the weak nuclear force?",
    options: ["Photon", "Gluon", "W and Z bosons", "Graviton"],
    correctAnswer: "W and Z bosons",
  },
  {
    id: 3,
    type: "mcq",
    question: "The Coriolis effect primarily influences:",
    options: ["Sound propagation", "Wind and ocean currents", "Magnetic field lines", "Plate tectonics"],
    correctAnswer: "Wind and ocean currents",
  },
  {
    id: 4,
    type: "mcq",
    question: "Which law explains the lifting force on airplane wings?",
    options: ["Pascal’s law", "Archimedes’ principle", "Bernoulli’s principle", "Boyle’s law"],
    correctAnswer: "Bernoulli’s principle",
  },
  {
    id: 5,
    type: "mcq",
    question: "Which quantity remains constant during refraction of light?",
    options: ["Speed", "Wavelength", "Frequency", "Intensity"],
    correctAnswer: "Frequency",
  },
  {
    id: 6,
    type: "mcq",
    question: "The SI unit of electric resistance is:",
    options: ["Volt", "Ampere", "Ohm", "Farad"],
    correctAnswer: "Ohm",
  },
  {
    id: 7,
    type: "mcq",
    question: "Which bond joins amino acids in proteins?",
    options: ["Ionic bond", "Hydrogen bond", "Peptide bond", "Disulfide bond"],
    correctAnswer: "Peptide bond",
  },
  {
    id: 8,
    type: "mcq",
    question: "Which hormone regulates blood glucose levels?",
    options: ["Adrenaline", "Thyroxine", "Insulin", "Estrogen"],
    correctAnswer: "Insulin",
  },
  {
    id: 9,
    type: "mcq",
    question: "Which Indian space mission is dedicated to studying the Sun?",
    options: ["Mangalyaan", "Chandrayaan-3", "Aditya-L1", "INSAT"],
    correctAnswer: "Aditya-L1",
  },
  {
    id: 10,
    type: "mcq",
    question: "Which gas is released as a by-product of photosynthesis?",
    options: ["Nitrogen", "Carbon dioxide", "Oxygen", "Hydrogen"],
    correctAnswer: "Oxygen",
  },
  {
    id: 11,
    type: "mcq",
    question: "Which statistical measure represents dispersion of data?",
    options: ["Mean", "Median", "Standard deviation", "Mode"],
    correctAnswer: "Standard deviation",
  },
  {
    id: 12,
    type: "mcq",
    question: "Which cell organelle is responsible for ATP production?",
    options: ["Ribosome", "Mitochondria", "Lysosome", "Golgi apparatus"],
    correctAnswer: "Mitochondria",
  },
  {
    id: 13,
    type: "mcq",
    question: "Which unit measures electric power?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    correctAnswer: "Watt",
  },
  {
    id: 14,
    type: "mcq",
    question: "Which principle explains buoyancy in fluids?",
    options: ["Pascal’s principle", "Bernoulli’s principle", "Archimedes’ principle", "Boyle’s law"],
    correctAnswer: "Archimedes’ principle",
  },
  {
    id: 15,
    type: "mcq",
    question: "Which law of thermodynamics states energy cannot be created or destroyed?",
    options: ["Zeroth law", "First law", "Second law", "Third law"],
    correctAnswer: "First law",
  },
  {
    id: 16,
    type: "mcq",
    question: "The Heisenberg uncertainty principle relates uncertainty in:",
    options: ["Energy and mass", "Time and energy", "Position and momentum", "Charge and spin"],
    correctAnswer: "Position and momentum",
  },
  {
    id: 17,
    type: "mcq",
    question: "The blue color of the sky is due to:",
    options: ["Reflection", "Diffraction", "Rayleigh scattering", "Refraction"],
    correctAnswer: "Rayleigh scattering",
  },
  {
    id: 18,
    type: "mcq",
    question: "Quantum tunneling is observed in:",
    options: ["Photoelectric effect", "Tunnel diode", "LED", "Photodiode"],
    correctAnswer: "Tunnel diode",
  },
  {
    id: 19,
    type: "mcq",
    question: "The expansion of the universe was discovered by studying:",
    options: ["Cosmic microwave background", "Galactic redshift", "Gravitational waves", "Black holes"],
    correctAnswer: "Galactic redshift",
  },
  {
    id: 20,
    type: "mcq",
    question: "Which equation represents Hubble’s law?",
    options: ["F = ma", "E = mc²", "v = H₀d", "PV = nRT"],
    correctAnswer: "v = H₀d",
  },
  {
    id: 21,
    type: "mcq",
    question: "Entropy of an isolated system:",
    options: ["Always decreases", "Always increases", "Remains constant or increases", "Becomes zero"],
    correctAnswer: "Remains constant or increases",
  },
  {
    id: 22,
    type: "mcq",
    question: "Which force is responsible for radioactive beta decay?",
    options: ["Strong nuclear force", "Electromagnetic force", "Weak nuclear force", "Gravitational force"],
    correctAnswer: "Weak nuclear force",
  },
  {
    id: 23,
    type: "mcq",
    question: "The visibility of a laser beam in a colloidal solution is due to:",
    options: ["Raman effect", "Compton scattering", "Tyndall effect", "Photoelectric effect"],
    correctAnswer: "Tyndall effect",
  },
  {
    id: 24,
    type: "mcq",
    question: "Which scientist proposed the wave equation of quantum mechanics?",
    options: ["Bohr", "Einstein", "Schrödinger", "Heisenberg"],
    correctAnswer: "Schrödinger",
  },
  {
    id: 25,
    type: "mcq",
    question: "In special relativity, time dilation occurs because of:",
    options: ["Gravitational field only", "High acceleration", "Relative velocity between observers", "Atmospheric pressure"],
    correctAnswer: "Relative velocity between observers",
  },
  // Image-based MCQs (26–30)
  {
    id: 26,
    type: "mcq",
    question:
      "What common piece of laboratory equipment, often used in setups like this, produces a single open gas flame to heat substances?",
    options: ["Microscope", "Bunsen burner", "Centrifuge", "Magnet"],
    correctAnswer: "Bunsen burner",
  },
  {
    id: 27,
    type: "mcq",
    question:
      "The scientist shown proposed the equivalence of mass and energy and fundamentally changed the classical understanding of space and time. Which theory is he most closely associated with?",
    options: ["Newton’s laws of motion", "Quantum mechanics", "Theory of Relativity", "Electromagnetic theory"],
    correctAnswer: "Theory of Relativity",
  },
  {
    id: 28,
    type: "mcq",
    question:
      "The biological process illustrated converts radiant energy into chemical energy stored in carbohydrates, releasing oxygen as a by-product. Which process is this?",
    options: ["Cellular respiration", "Transpiration", "Photosynthesis", "Fermentation"],
    correctAnswer: "Photosynthesis",
  },
  {
    id: 29,
    type: "mcq",
    question:
      "The scientist shown is notable for pioneering research on radioactivity and remains the only individual to receive Nobel Prizes in two different scientific disciplines. Who is she?",
    options: ["Rosalind Franklin", "Ada Lovelace", "Jane Goodall", "Marie Curie"],
    correctAnswer: "Marie Curie",
  },
  {
    id: 30,
    type: "mcq",
    question:
      "The colored structure visible in the eye image regulates pupil diameter by contracting and relaxing muscles. Which part performs this light-intensity control?",
    options: ["Retina", "Cornea", "Iris", "Lens"],
    correctAnswer: "Iris",
  },
];

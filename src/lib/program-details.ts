
export interface ProgramDetail {
  programName: string;
  department: string;
  level: "Undergraduate" | "Postgraduate" | "Diploma" | "Integrated";
  dean: {
    name: string;
    title: string;
    message: string;
    imageId: string;
  };
  fees: {
    tuition: number;
    examination: number;
    other: number;
    caution?: number;
    training?: number;
    hostel: number;
  };
  eligibility: string;
  curriculum?: {
    semester: number;
    subjects: {
      code: string;
      name: string;
    }[];
  }[];
}

export const programDetailsData: ProgramDetail[] = [
  // Undergrad
  {
    programName: "B.Tech. (Computer Science)",
    department: "Computer Science & Engineering",
    level: "Undergraduate",
    dean: { name: "Dr. Alok Sharma", title: "Dean, School of Advanced Technology & AI", message: "Our program is designed to create future tech leaders. We focus on a strong foundation in theory, combined with cutting-edge practical skills in AI, data science, and cybersecurity to solve real-world problems.", imageId: "dean-male" },
    fees: { tuition: 105500, examination: 13750, other: 14000, caution: 5000, training: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 60% marks. OPET score is mandatory.",
    curriculum: [
        { semester: 1, subjects: [
            { code: "MA101", name: "Engineering Mathematics – I" },
            { code: "PH101", name: "Engineering Physics" },
            { code: "CS101", name: "Programming for Problem Solving (C)" },
            { code: "ME101", name: "Engineering Graphics" },
            { code: "HS101", name: "Communication Skills" },
            { code: "PH101L", name: "Engineering Physics Lab" },
        ]},
        { semester: 2, subjects: [
            { code: "MA102", name: "Engineering Mathematics – II" },
            { code: "CH102", name: "Engineering Chemistry" },
            { code: "CS102", name: "Object Oriented Programming (C++)" },
            { code: "EE102", name: "Basic Electrical Engineering" },
            { code: "EVS102", name: "Environmental Studies" },
            { code: "CS102L", name: "OOPs Lab" },
        ]},
        { semester: 3, subjects: [
            { code: "MA201", name: "Discrete Mathematics" },
            { code: "CS201", name: "Data Structures" },
            { code: "CS202", name: "Digital Logic Design" },
            { code: "CS203", name: "Computer Organization" },
            { code: "HS201", name: "Organizational Behavior" },
            { code: "CS204", name: "Data Structures Lab" },
        ]},
        { semester: 4, subjects: [
            { code: "CS301", name: "Operating Systems" },
            { code: "CS302", name: "Design & Analysis of Algorithms" },
            { code: "CS303", name: "Database Management Systems" },
            { code: "CS304", name: "Software Engineering" },
            { code: "HS301", name: "Economics for Engineers" },
            { code: "CS305", name: "DBMS Lab" },
        ]},
        { semester: 5, subjects: [
            { code: "CS401", name: "Computer Networks" },
            { code: "CS402", name: "Theory of Computation" },
            { code: "CS403", name: "Web Technologies" },
            { code: "CS404", name: "Artificial Intelligence" },
            { code: "CS405", name: "Web Technologies Lab" },
            { code: "CS406", name: "AI Lab" },
        ]},
        { semester: 6, subjects: [
            { code: "CS501", name: "Machine Learning" },
            { code: "CS502", name: "Compiler Design" },
            { code: "CS503", name: "Cloud Computing" },
            { code: "CS504", name: "Information Security" },
            { code: "CS505", name: "Machine Learning Lab" },
            { code: "CS506", name: "Mini Project" },
        ]},
        { semester: 7, subjects: [
            { code: "CS601", name: "Big Data Analytics" },
            { code: "CS602", name: "Internet of Things" },
            { code: "CS603", name: "Mobile Application Development" },
            { code: "CS604", name: "Professional Elective – I" },
            { code: "CS605", name: "Open Elective - I" },
            { code: "CS606", name: "Major Project – I" },
        ]},
        { semester: 8, subjects: [
            { code: "CS701", name: "Professional Elective – II" },
            { code: "CS702", name: "Professional Elective – III" },
            { code: "CS703", name: "Entrepreneurship Development" },
            { code: "HS701", name: "Professional Ethics" },
            { code: "CS704", name: "Major Project – II" },
            { code: "CS705", name: "Internship / Industrial Training" },
        ]},
    ]
  },
  {
    programName: "B.Tech. (Mechanical Engineering)",
    department: "Mechanical Engineering",
    level: "Undergraduate",
    dean: { name: "Dr. Ramesh Gupta", title: "Dean, School of Engineering & Applied Sciences", message: "We build the builders of tomorrow. Our programs in mechanical, civil, and electrical engineering are hands-on, rigorous, and aligned with the latest industry standards.", imageId: "dean-male" },
    fees: { tuition: 97500, examination: 11750, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 55% marks. OPET score is mandatory.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MA101", name: "Engineering Mathematics – I" }, { code: "PH101", name: "Engineering Physics" }, { code: "CS101", name: "Programming Basics" }, { code: "HS101", name: "Communication Skills" }, { code: "ME101", name: "Engineering Graphics" }, { code: "ME101L", name: "Engineering Graphics Lab" }] },
        { semester: 2, subjects: [{ code: "MA102", name: "Engineering Mathematics – II" }, { code: "CH102", name: "Engineering Chemistry" }, { code: "EE102", name: "Basic Electrical Engineering" }, { code: "EVS102", name: "Environmental Studies" }, { code: "ME102", name: "Workshop Practice" }, { code: "EE102L", name: "Basic Electrical Lab" }] },
        { semester: 3, subjects: [{ code: "ME201", name: "Thermodynamics" }, { code: "ME202", name: "Strength of Materials" }, { code: "ME203", name: "Fluid Mechanics" }, { code: "MA201", name: "Numerical Methods" }, { code: "ME204", name: "Material Science" }, { code: "ME202L", name: "Strength of Materials Lab" }] },
        { semester: 4, subjects: [{ code: "ME301", name: "Theory of Machines" }, { code: "ME302", name: "Manufacturing Processes I" }, { code: "ME303", name: "Heat and Mass Transfer" }, { code: "ME304", name: "Applied Thermodynamics" }, { code: "ME305", name: "Machine Drawing" }, { code: "ME302L", name: "Manufacturing Lab" }] },
        { semester: 5, subjects: [{ code: "ME401", name: "Machine Design I" }, { code: "ME402", name: "IC Engines & Gas Turbines" }, { code: "ME403", name: "Manufacturing Technology II" }, { code: "ME404", name: "Fluid Machinery" }, { code: "ME405", name: "Industrial Engineering" }, { code: "ME404L", name: "Fluid Machinery Lab" }] },
        { semester: 6, subjects: [{ code: "ME501", name: "Machine Design II" }, { code: "ME502", name: "Refrigeration & Air Conditioning" }, { code: "ME503", name: "Power Plant Engineering" }, { code: "ME504", name: "CAD/CAM" }, { code: "ME505", name: "Professional Elective I" }, { code: "ME504L", name: "CAD/CAM Lab" }] },
        { semester: 7, subjects: [{ code: "ME601", name: "Automobile Engineering" }, { code: "ME602", name: "Finite Element Methods" }, { code: "ME603", name: "Operations Research" }, { code: "ME604", name: "Professional Elective II" }, { code: "HS601", name: "Engineering Economics" }, { code: "ME605", name: "Project I" }] },
        { semester: 8, subjects: [{ code: "ME701", name: "Robotics & Automation" }, { code: "ME702", name: "Professional Elective III" }, { code: "ME703", name: "Professional Elective IV" }, { code: "HS701", name: "Professional Ethics" }, { code: "ME704", name: "Project II" }, { code: "ME705", name: "Industrial Internship" }] },
    ]
  },
  {
    programName: "B.Tech. (Civil Engineering)",
    department: "Civil Engineering",
    level: "Undergraduate",
    dean: { name: "Dr. Ramesh Gupta", title: "Dean, School of Engineering & Applied Sciences", message: "Our Civil Engineering program is dedicated to designing and building the infrastructure of the future, with a focus on sustainability, innovation, and structural integrity.", imageId: "dean-male" },
    fees: { tuition: 97500, examination: 11750, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 55% marks. OPET score is mandatory.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MA101", name: "Engineering Mathematics – I" }, { code: "PH101", name: "Engineering Physics" }, { code: "CS101", name: "Programming Basics" }, { code: "HS101", name: "Communication Skills" }, { code: "ME101", name: "Engineering Graphics" }, { code: "ME102", name: "Workshop Practice" }] },
        { semester: 2, subjects: [{ code: "MA102", name: "Engineering Mathematics – II" }, { code: "CH102", name: "Engineering Chemistry" }, { code: "EE102", name: "Basic Electrical Engineering" }, { code: "EVS102", name: "Environmental Studies" }, { code: "CE102", name: "Basic Surveying" }, { code: "CE102L", name: "Surveying Lab" }] },
        { semester: 3, subjects: [{ code: "CE201", name: "Advanced Surveying" }, { code: "CE202", name: "Strength of Materials" }, { code: "CE203", name: "Fluid Mechanics" }, { code: "MA201", name: "Numerical Methods" }, { code: "CE204", name: "Building Materials & Construction" }, { code: "CE202L", name: "Strength of Materials Lab" }] },
        { semester: 4, subjects: [{ code: "CE301", name: "Structural Analysis I" }, { code: "CE302", name: "Geotechnical Engineering I" }, { code: "CE303", name: "Transportation Engineering I" }, { code: "CE304", name: "Hydrology & Water Resources" }, { code: "CE305", name: "Concrete Technology" }, { code: "CE302L", name: "Geotechnical Lab" }] },
        { semester: 5, subjects: [{ code: "CE401", name: "Design of Concrete Structures I" }, { code: "CE402", name: "Geotechnical Engineering II" }, { code: "CE403", name: "Water Resources Engineering" }, { code: "CE404", name: "Transportation Engineering II" }, { code: "CE405", name: "Structural Analysis II" }, { code: "CE401L", name: "Structural Design Lab" }] },
        { semester: 6, subjects: [{ code: "CE501", name: "Design of Steel Structures" }, { code: "CE502", name: "Foundation Engineering" }, { code: "CE503", name: "Environmental Engineering" }, { code: "CE504", name: "Professional Elective I" }, { code: "CE505", name: "Estimating, Costing & Valuation" }, { code: "CE503L", name: "Environmental Engg. Lab" }] },
        { semester: 7, subjects: [{ code: "CE601", name: "Design of Concrete Structures II" }, { code: "CE602", name: "Construction Planning & Management" }, { code: "CE603", name: "Irrigation Engineering" }, { code: "CE604", name: "Professional Elective II" }, { code: "HS601", name: "Engineering Economics" }, { code: "CE605", name: "Project I" }] },
        { semester: 8, subjects: [{ code: "CE701", name: "Structural Dynamics & Earthquake Engg." }, { code: "CE702", name: "Professional Elective III" }, { code: "CE703", name: "Professional Elective IV" }, { code: "HS701", name: "Professional Practice, Law & Ethics" }, { code: "CE704", name: "Project II" }, { code: "CE705", name: "Internship" }] },
    ]
  },
  {
    programName: "B.Tech. (Electrical Engineering)",
    department: "Electrical Engineering",
    level: "Undergraduate",
    dean: { name: "Dr. Ramesh Gupta", title: "Dean, School of Engineering & Applied Sciences", message: "Our Electrical Engineering program focuses on power systems, control systems, and electronics, preparing students for a wide range of careers in the energy and technology sectors.", imageId: "dean-male" },
    fees: { tuition: 97500, examination: 11750, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 55% marks. OPET score is mandatory.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MA101", name: "Engineering Mathematics – I" }, { code: "PH101", name: "Engineering Physics" }, { code: "CS101", name: "Programming Basics" }, { code: "HS101", name: "Communication Skills" }, { code: "ME102", name: "Workshop Practice" }, { code: "PH101L", name: "Physics Lab" }] },
        { semester: 2, subjects: [{ code: "MA102", name: "Engineering Mathematics – II" }, { code: "CH102", name: "Engineering Chemistry" }, { code: "EE102", name: "Basic Electrical Engineering" }, { code: "EVS102", name: "Environmental Studies" }, { code: "ME101", name: "Engineering Graphics" }, { code: "EE102L", name: "Basic Electrical Lab" }] },
        { semester: 3, subjects: [{ code: "EE201", name: "Circuit Theory" }, { code: "EE202", name: "Analog Electronics" }, { code: "EE203", name: "Electrical Machines I" }, { code: "MA201", name: "Numerical Methods" }, { code: "EE204", name: "Electromagnetic Fields" }, { code: "EE202L", name: "Analog Electronics Lab" }] },
        { semester: 4, subjects: [{ code: "EE301", name: "Power Systems I" }, { code: "EE302", name: "Digital Electronics" }, { code: "EE303", name: "Control Systems" }, { code: "EE304", name: "Electrical Machines II" }, { code: "EE305", name: "Measurements & Instrumentation" }, { code: "EE302L", name: "Digital Electronics Lab" }] },
        { semester: 5, subjects: [{ code: "EE401", name: "Power Systems II" }, { code: "EE402", name: "Microprocessors & Microcontrollers" }, { code: "EE403", name: "Power Electronics" }, { code: "EC401", name: "Digital Signal Processing" }, { code: "EE405", name: "Electrical Machine Design" }, { code: "EE402L", name: "Microprocessors Lab" }] },
        { semester: 6, subjects: [{ code: "EE501", name: "Electrical Drives" }, { code: "EE502", name: "High Voltage Engineering" }, { code: "EC502", name: "Digital Communication" }, { code: "EE504", name: "Professional Elective I" }, { code: "HS501", name: "Engineering Economics" }, { code: "EE501L", name: "Power Electronics Lab" }] },
        { semester: 7, subjects: [{ code: "EE601", name: "Switchgear & Protection" }, { code: "EE602", "name": "Utilization of Electrical Energy" }, { code: "EE603", "name": "Professional Elective II" }, { code: "EE604", "name": "Open Elective I" }, { code: "EE605", "name": "Project I" }, { code: "EE601L", name: "Power Systems Lab" }] },
        { semester: 8, subjects: [{ code: "EE701", name: "Flexible AC Transmission Systems" }, { code: "EE702", name: "Professional Elective III" }, { code: "EE703", name: "Professional Elective IV" }, { code: "HS701", name: "Professional Ethics" }, { code: "EE704", name: "Project II" }, { code: "EE705", name: "Industrial Training" }] },
    ]
  },
  {
    programName: "B.Tech. (Electronics & Communication)",
    department: "Electronics & Communication",
    level: "Undergraduate",
    dean: { name: "Dr. Ramesh Gupta", title: "Dean, School of Engineering & Applied Sciences", message: "The ECE program covers the design and development of modern communication systems, from embedded systems to wireless networks, preparing graduates for the fast-paced telecommunications industry.", imageId: "dean-male" },
    fees: { tuition: 97500, examination: 11750, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 55% marks. OPET score is mandatory.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MA101", name: "Engineering Mathematics – I" }, { code: "PH101", name: "Engineering Physics" }, { code: "CS101", name: "Programming Basics" }, { code: "HS101", name: "Communication Skills" }, { code: "EE102", name: "Basic Electrical Engineering" }, { code: "ME102", name: "Workshop Practice" }] },
        { semester: 2, subjects: [{ code: "MA102", name: "Engineering Mathematics – II" }, { code: "CH102", name: "Engineering Chemistry" }, { code: "EC102", name: "Basic Electronics Engineering" }, { code: "EVS102", name: "Environmental Studies" }, { code: "ME101", name: "Engineering Graphics" }, { code: "EC102L", name: "Basic Electronics Lab" }] },
        { semester: 3, subjects: [{ code: "EC201", name: "Analog Electronic Circuits" }, { code: "EC202", name: "Digital System Design" }, { code: "EC203", name: "Signals and Systems" }, { code: "MA201", name: "Complex Variables & Transforms" }, { code: "EC204", name: "Network Theory" }, { code: "EC201L", name: "Analog Circuits Lab" }] },
        { semester: 4, subjects: [{ code: "EC301", name: "Analog Communication" }, { code: "EC302", name: "Microprocessors & Microcontrollers" }, { code: "EC303", name: "Electromagnetic Field Theory" }, { code: "CS301", name: "Operating Systems" }, { code: "EC305", name: "Electronics Circuits Lab" }, { code: "EC302L", name: "Microprocessors Lab" }] },
        { semester: 5, subjects: [{ code: "EC401", name: "Digital Signal Processing" }, { code: "EC402", name: "VLSI Technology" }, { code: "EC403", name: "Antenna & Wave Propagation" }, { code: "EC404", name: "Computer Networks" }, { code: "EC405", name: "Digital System Design Lab" }, { code: "EC401L", name: "DSP Lab" }] },
        { semester: 6, subjects: [{ code: "EC501", name: "Microwave Engineering" }, { code: "EC502", name: "Digital Communication" }, { code: "EC503", name: "Information Theory & Coding" }, { code: "EC504", name: "Professional Elective I" }, { code: "EC505", name: "Communication Lab" }, { code: "EC506", name: "Mini Project" }] },
        { semester: 7, subjects: [{ code: "EC601", name: "Optical Communication" }, { code: "EC602", "name": "Embedded Systems" }, { code: "EC603", "name": "Wireless Communication" }, { code: "EC604", "name": "Professional Elective II" }, { code: "HS601", "name": "Engineering Economics" }, { code: "EC605", "name": "Project I" }] },
        { semester: 8, subjects: [{ code: "EC701", name: "Satellite Communication" }, { code: "EC702", name: "Data Communication Networks" }, { code: "EC703", name: "Professional Elective III" }, { code: "HS701", name: "Professional Ethics" }, { code: "EC704", name: "Project II" }, { code: "EC705", name: "Industrial Training" }] },
    ]
  },
   {
    programName: "B.Tech. (Biotechnology)",
    department: "Biotechnology",
    level: "Undergraduate",
    dean: { name: "Dr. Sunita Verma", title: "Dean, School of Health & Life Sciences", message: "Our B.Tech in Biotechnology program integrates engineering principles with biological sciences, preparing students for innovative careers in healthcare, agriculture, and environmental technology.", imageId: "dean-female" },
    fees: { tuition: 97500, examination: 11750, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Biology/Biotechnology/Mathematics with a minimum of 55% marks.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MA101", name: "Engineering Mathematics – I" }, { code: "PH101", name: "Engineering Physics" }, { code: "BT101", name: "Introduction to Biotechnology" }, { code: "CH101", name: "Engineering Chemistry" }, { code: "HS101", name: "Communication Skills" }, { code: "BT101L", name: "Biology Lab" }] },
        { semester: 2, subjects: [{ code: "MA102", name: "Engineering Mathematics – II" }, { code: "BT102", name: "Cell Biology" }, { code: "CS102", name: "Programming in C++" }, { code: "EVS102", name: "Environmental Studies" }, { code: "BT103", name: "Biochemistry" }, { code: "BT103L", name: "Biochemistry Lab" }] },
        { semester: 3, subjects: [{ code: "BT201", name: "Microbiology" }, { code: "BT202", name: "Genetics" }, { code: "BT203", name: "Fluid Mechanics" }, { code: "BT204", name: "Molecular Biology" }, { code: "BT205", name: "Bio-analytical Techniques" }, { code: "BT201L", name: "Microbiology Lab" }] },
        { semester: 4, subjects: [{ code: "BT301", name: "Immunology" }, { code: "BT302", name: "Thermodynamics of Chemical Processes" }, { code: "BT303", name: "Chemical Engineering Principles" }, { code: "BT304", name: "Bioinformatics" }, { code: "BT305", name: "Industrial Microbiology" }, { code: "BT301L", name: "Immunology Lab" }] },
        { semester: 5, subjects: [{ code: "BT401", name: "Recombinant DNA Technology" }, { code: "BT402", name: "Bioprocess Engineering" }, { code: "BT403", name: "Mass Transfer Operations" }, { code: "BT404", name: "Enzyme Engineering" }, { code: "BT405", name: "Bioinformatics Lab" }, { code: "BT401L", name: "R-DNA Technology Lab" }] },
        { semester: 6, subjects: [{ code: "BT501", name: "Plant Biotechnology" }, { code: "BT502", name: "Animal Biotechnology" }, { code: "BT503", name: "Heat Transfer Operations" }, { code: "BT504", name: "Professional Elective I" }, { code: "BT505", name: "Bioprocess Lab" }, { code: "BT506", name: "Mini Project" }] },
        { semester: 7, subjects: [{ code: "BT601", name: "Downstream Processing" }, { code: "BT602", "name": "Genomics & Proteomics" }, { code: "BT603", "name": "Food Biotechnology" }, { code: "BT604", "name": "Professional Elective II" }, { code: "HS601", "name": "Industrial Management" }, { code: "BT605", "name": "Project I" }] },
        { semester: 8, subjects: [{ code: "BT701", name: "Bioethics & IPR" }, { code: "BT702", name: "Environmental Biotechnology" }, { code: "BT703", name: "Professional Elective III" }, { code: "BT704", name: "Project II" }, { code: "BT705", name: "Industrial Training" }, { code: "BT706", name: "Seminar" }] },
    ]
  },
   {
    programName: "B.Tech. (CSE) Specializations",
    department: "Computer Science & Engineering",
    level: "Undergraduate",
    dean: { name: "Dr. Alok Sharma", title: "Dean, School of Advanced Technology & AI", message: "Our specialized B.Tech programs in AI, Cyber Security, and Data Science are co-designed with industry leaders to provide you with the most relevant and in-demand skills.", imageId: "dean-male" },
    fees: { tuition: 113500, examination: 13750, other: 14000, caution: 5000, training: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 60% marks. OPET score is mandatory.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MA101", name: "Engineering Mathematics – I" }, { code: "PH101", name: "Engineering Physics" }, { code: "CS101", name: "Programming Fundamentals" }, { code: "EC101", name: "Basic Electronics" }, { code: "HS101", name: "Communication Skills" }, { code: "CS101L", name: "Programming Lab" }] },
        { semester: 2, subjects: [{ code: "MA102", name: "Engineering Mathematics – II" }, { code: "CS102", name: "Object Oriented Programming" }, { code: "EE102", name: "Basic Electrical Engineering" }, { code: "EVS102", name: "Environmental Science" }, { code: "CS204", name: "Data Structures Lab" }, { code: "ME102", name: "Workshop Practice" }] },
        { semester: 3, subjects: [{ code: "CS201", name: "Data Structures & Algorithms" }, { code: "CS202", name: "Digital Logic & Design" }, { code: "MA201", name: "Discrete Mathematics" }, { code: "CS203", name: "Computer Organization & Architecture" }, { code: "HS201", name: "Organizational Behaviour" }, { code: "CS201L", name: "Algorithms Lab" }] },
        { semester: 4, subjects: [{ code: "CS301", name: "Operating Systems" }, { code: "CS302", name: "Database Management Systems" }, { code: "CS303", name: "Software Engineering" }, { code: "CS304", name: "Formal Languages & Automata Theory" }, { code: "CS305L", name: "Operating Systems Lab" }, { code: "CS306L", name: "DBMS Lab" }] },
        { semester: 5, subjects: [{ code: "CS401", name: "Computer Networks" }, { code: "CSPE01", name: "Specialization Core I (e.g., Intro to AI/ML)" }, { code: "CSPE02", name: "Specialization Core II (e.g., Network Security)" }, { code: "CS404", name: "Compiler Design" }, { code: "HS401", name: "Economics for Engineers" }, { code: "CSPE01L", name: "Specialization Lab I" }] },
        { semester: 6, subjects: [{ code: "CSPE03", name: "Specialization Core III (e.g., Deep Learning)" }, { code: "CSPE04", name: "Specialization Core IV (e.g., Cryptography)" }, { code: "CS503", name: "Cloud Computing" }, { code: "CSOE01", name: "Open Elective I" }, { code: "CSPE03L", name: "Specialization Lab II" }, { code: "CS506", name: "Industry Project I" }] },
        { semester: 7, subjects: [{ code: "CSPE05", name: "Specialization Elective I" }, { code: "CSPE06", name: "Specialization Elective II" }, { code: "CSOE02", name: "Open Elective II" }, { code: "HS701", name: "Professional Ethics & IPR" }, { code: "CS605", name: "Project Work-I" }, { code: "CS606", name: "Seminar" }] },
        { semester: 8, subjects: [{ code: "CSPE07", name: "Specialization Elective III" }, { code: "CSPE08", name: "Specialization Elective IV" }, { code: "HS702", name: "Entrepreneurship Development" }, { code: "CS704", name: "Project Work-II" }, { code: "CS705", name: "Internship" }] }
    ]
  },
  {
    programName: "B.C.A.",
    department: "Computer Science & Engineering",
    level: "Undergraduate",
    dean: { name: "Dr. Alok Sharma", title: "Dean, School of Advanced Technology & AI", message: "The BCA program provides a strong foundation in computer applications, software development, and modern IT trends, preparing students for a dynamic tech career.", imageId: "dean-male" },
    fees: { tuition: 57000, examination: 8000, other: 9000, caution: 5000, training: 3000, hostel: 80000 },
    curriculum: [
        { semester: 1, subjects: [{ code: "BCA101", name: "Computer Fundamentals" }, { code: "BCA102", name: "Programming in C" }, { code: "MA101", name: "Mathematics I" }, { code: "HS101", name: "Business Communication" }, { code: "BCA101L", name: "Computer Lab" }, { code: "BCA102L", name: "C Programming Lab" }] },
        { semester: 2, subjects: [{ code: "BCA201", name: "Data Structures using C" }, { code: "BCA202", name: "Database Management Systems" }, { code: "BCA203", name: "Digital Logic & Computer Design" }, { code: "MA201", name: "Mathematics II" }, { code: "EVS102", name: "Environmental Science" }, { code: "BCA201L", name: "Data Structures Lab" }] },
        { semester: 3, subjects: [{ code: "BCA301", name: "Object Oriented Programming with Java" }, { code: "BCA302", name: "Operating Systems" }, { code: "BCA303", name: "Software Engineering" }, { code: "BCA304", name: "Computer Organization" }, { code: "BCA305", name: "Financial Accounting" }, { code: "BCA301L", name: "Java Programming Lab" }] },
        { semester: 4, subjects: [{ code: "BCA401", name: "Web Technologies (HTML, CSS, JS)" }, { code: "BCA402", name: "Computer Networks" }, { code: "BCA403", name: "System Analysis and Design" }, { code: "BCA404", name: "Python Programming" }, { code: "BCA405", name: "E-Commerce" }, { code: "BCA401L", name: "Web Tech Lab" }] },
        { semester: 5, subjects: [{ code: "BCA501", name: "Advanced Java (Servlets, JSP)" }, { code: "BCA502", name: "Artificial Intelligence" }, { code: "BCA503", name: "Mobile Application Development" }, { code: "BCA504", name: "Elective I" }, { code: "BCA505", name: "Elective II" }, { code: "BCA506", name: "Mini Project" }] },
        { semester: 6, subjects: [{ code: "BCA601", name: "Cloud Computing" }, { code: "BCA602", name: "Information Security" }, { code: "BCA603", name: "Elective III" }, { code: "BCA604", name: "Elective IV" }, { code: "BCA605", name: "Major Project" }, { code: "BCA606", name: "Internship" }] }
    ]
  },
  {
    programName: "B.B.A.",
    department: "Management & Business Administration",
    level: "Undergraduate",
    dean: { name: "Prof. Meera Desai", title: "Dean, Faculty of Business & Entrepreneurship", message: "We nurture entrepreneurial minds and strategic thinkers. Our curriculum is infused with case studies, industry collaborations, and global perspectives to prepare you for the corporate world.", imageId: "dean-female" },
    fees: { tuition: 69000, examination: 8000, other: 9000, caution: 5000, hostel: 80000 },
    curriculum: [
        { semester: 1, subjects: [{ code: "MG101", name: "Principles of Management" }, { code: "MG102", name: "Business Economics I" }, { code: "HS101", name: "Business Communication" }, { code: "MG103", name: "Business Mathematics" }, { code: "CS103", name: "Computer Applications in Business" }, { code: "MG104", name: "Indian Ethos & Values" }] },
        { semester: 2, subjects: [{ code: "MG201", name: "Financial Accounting" }, { code: "MG202", name: "Marketing Management" }, { code: "MG203", name: "Business Statistics" }, { code: "MG204", name: "Business Economics II" }, { code: "EVS102", name: "Environmental Science" }, { code: "MG205", name: "Personality Development" }] },
        { semester: 3, subjects: [{ code: "MG301", name: "Human Resource Management" }, { code: "MG302", name: "Organizational Behavior" }, { code: "MG303", name: "Business Law" }, { code: "MG304", name: "Cost & Management Accounting" }, { code: "MG305", name: "Business Environment" }, { code: "MG306", name: "Presentation Skills" }] },
        { semester: 4, subjects: [{ code: "MG401", name: "Operations Management" }, { code: "MG402", name: "Financial Management" }, { code: "MG403", name: "Research Methodology" }, { code: "MG404", name: "International Business" }, { code: "MG405", name: "Taxation Law" }, { code: "MG406", name: "Entrepreneurship" }] },
        { semester: 5, subjects: [{ code: "MG501", name: "Specialization I (Major)" }, { code: "MG502", name: "Specialization II (Major)" }, { code: "MG503", name: "Specialization I (Minor)" }, { code: "MG504", name: "Logistics & Supply Chain Management" }, { code: "MG505", name: "Summer Internship Report" }, { code: "MG506", name: "Digital Marketing" }] },
        { semester: 6, subjects: [{ code: "MG601", name: "Strategic Management" }, { code: "MG602", name: "Business Ethics & Corporate Governance" }, { code: "MG603", name: "Specialization III (Major)" }, { code: "MG604", name: "Specialization II (Minor)" }, { code: "MG605", name: "Major Project Report" }, { code: "MG606", name: "Comprehensive Viva-Voce" }] }
    ]
  },
  {
    programName: "LL.B.",
    department: "Law",
    level: "Undergraduate",
    dean: { name: "Justice R. S. Chauhan (Retd.)", title: "Dean, School of Legal Studies", message: "Our mission is to cultivate a new generation of legal professionals who are not only skilled in law but also committed to justice, ethics, and social responsibility.", imageId: "dean-male" },
    fees: { tuition: 75000, examination: 8000, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Bachelor's degree in any discipline with a minimum of 45% marks.",
    curriculum: [
        { semester: 1, subjects: [{ code: "LW101", name: "Jurisprudence" }, { code: "LW102", name: "Law of Contract I" }, { code: "LW103", name: "Law of Torts including MV Accident" }, { code: "LW104", name: "Family Law I (Hindu Law)" }, { code: "LW105", name: "Legal Methods & English Language" }, { code: "LW106", name: "Constitutional Law I" }] },
        { semester: 2, subjects: [{ code: "LW201", name: "Law of Contract II (Special Contracts)" }, { code: "LW202", name: "Constitutional Law II" }, { code: "LW203", name: "Family Law II (Muslim Law)" }, { code: "LW204", name: "Law of Crimes I (Indian Penal Code)" }, { code: "LW205", name: "Professional Ethics & Bar-Bench Relations" }, { code: "LW206", name: "Environmental Law" }] },
        { semester: 3, subjects: [{ code: "LW301", name: "Property Law including Transfer of Property Act" }, { code: "LW302", name: "Company Law" }, { code: "LW303", name: "Administrative Law" }, { code: "LW304", name: "Labour Law I" }, { code: "LW305", name: "Public International Law" }, { code: "LW306", name: "Optional Paper I" }] },
        { semester: 4, subjects: [{ code: "LW401", name: "Code of Civil Procedure I" }, { code: "LW402", name: "Code of Criminal Procedure I" }, { code: "LW403", name: "Law of Evidence" }, { code: "LW404", name: "Labour Law II" }, { code: "LW405", name: "Intellectual Property Rights" }, { code: "LW406", name: "Optional Paper II" }] },
        { semester: 5, subjects: [{ code: "LW501", name: "Code of Civil Procedure II & Limitation Act" }, { code: "LW502", name: "Code of Criminal Procedure II" }, { code: "LW503", name: "Drafting, Pleading and Conveyancing" }, { code: "LW504", name: "Alternative Dispute Resolution (Clinical)" }, { code: "LW505", name: "Optional Paper III" }, { code: "LW506", name: "Human Rights Law and Practice" }] },
        { semester: 6, subjects: [{ code: "LW601", name: "Land Laws including Ceiling and other local laws" }, { code: "LW602", name: "Interpretation of Statutes" }, { code: "LW603", name: "Moot Court Exercise and Internship (Clinical)" }, { code: "LW604", name: "Taxation Law" }, { code: "LW605", name: "Optional Paper IV" }, { code: "LW606", name: "Comprehensive Viva-Voce" }] }
    ]
  },
  {
    programName: "B.Sc. (H) (Bio-Tech)",
    department: "Biotechnology",
    level: "Undergraduate",
    dean: { name: "Dr. Sunita Verma", title: "Dean, School of Health & Life Sciences", message: "Explore the frontiers of science with us. We provide state-of-the-art labs and a research-driven environment to foster innovation in biotechnology, pharmacy and life sciences.", imageId: "dean-female" },
    fees: { tuition: 42000, examination: 5500, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Biology/Biotechnology with a minimum of 55% marks.",
     curriculum: [
        { semester: 1, subjects: [{ code: "BT101", name: "Cell Biology" }, { code: "BT102", name: "Biochemistry" }, { code: "CH101", name: "Chemistry I" }, { code: "HS101", name: "Communication Skills" }, { code: "BT101L", name: "Cell Biology Lab" }, { code: "CH101L", name: "Chemistry Lab" }] },
        { semester: 2, subjects: [{ code: "BT201", name: "Genetics" }, { code: "BT202", name: "Microbiology" }, { code: "BT203", name: "Molecular Biology" }, { code: "EVS102", name: "Environmental Science" }, { code: "BT202L", name: "Microbiology Lab" }, { code: "BT203L", name: "Molecular Biology Lab" }] },
        { semester: 3, subjects: [{ code: "BT301", name: "Immunology" }, { code: "BT302", name: "Recombinant DNA Technology" }, { code: "BT303", name: "Bioprocess Technology" }, { code: "BT304", name: "Plant Biotechnology" }, { code: "BT301L", name: "Immunology Lab" }, { code: "BT302L", name: "R-DNA Tech Lab" }] },
        { semester: 4, subjects: [{ code: "BT401", name: "Animal Biotechnology" }, { code: "BT402", name: "Bioinformatics" }, { code: "BT403", name: "Enzyme Technology" }, { code: "BT404", name: "Developmental Biology" }, { code: "BT402L", name: "Bioinformatics Lab" }, { code: "HS401", name: "Scientific Writing" }] },
        { semester: 5, subjects: [{ code: "BT501", name: "Genomics and Proteomics" }, { code: "BT502", name: "Food Biotechnology" }, { code: "BT503", name: "Environmental Biotechnology" }, { code: "BT504", name: "Discipline Specific Elective I" }, { code: "BT505", name: "Skill Enhancement Course I" }, { code: "BT501L", name: "Genomics Lab" }] },
        { semester: 6, subjects: [{ code: "BT601", name: "Bioethics and IPR" }, { code: "BT602", name: "Medical Biotechnology" }, { code: "BT603", name: "Discipline Specific Elective II" }, { code: "BT604", name: "Skill Enhancement Course II" }, { code: "BT605", name: "Project/Dissertation" }] }
    ]
  },
  {
    programName: "B.Sc. (H) (Agriculture)",
    department: "Agricultural Sciences",
    level: "Undergraduate",
    dean: { name: "Dr. Sunita Verma", title: "Dean, School of Health & Life Sciences", message: "Our agriculture program is dedicated to advancing sustainable farming practices through modern science and technology, preparing students to meet global food challenges.", imageId: "dean-female" },
    fees: { tuition: 45000, examination: 5000, other: 7000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Biology/Agriculture with a minimum of 50% marks.",
    curriculum: [
        { semester: 1, subjects: [{ code: "AG101", name: "Fundamentals of Agronomy" }, { code: "AG102", name: "Fundamentals of Soil Science" }, { code: "AG103", name: "Fundamentals of Genetics" }, { code: "AG104", name: "Rural Sociology & Educational Psychology" }, { code: "AG105", name: "Introductory Biology" }, { code: "AG106", name: "Agricultural Heritage" }] },
        { semester: 2, subjects: [{ code: "AG201", name: "Fundamentals of Horticulture" }, { code: "AG202", name: "Fundamentals of Plant Pathology" }, { code: "AG203", name: "Agricultural Meteorology" }, { code: "AG204", name: "Principles of Genetics & Cytogenetics" }, { code: "AG205", name: "Agricultural Microbiology" }, { code: "AG206", name: "Soil & Water Conservation Engineering" }] },
        { semester: 3, subjects: [{ code: "AG301", name: "Agricultural Finance & Cooperation" }, { code: "AG302", name: "Crop Production Technology - I (Kharif Crops)" }, { code: "AG303", name: "Fundamentals of Weed Management" }, { code: "AG304", name: "Agricultural Entomology" }, { code: "AG305", name: "Farm Machinery and Power" }, { code: "AG306", name: "Principles of Integrated Disease Management" }] },
        { semester: 4, subjects: [{ code: "AG401", name: "Crop Production Technology - II (Rabi Crops)" }, { code: "AG402", name: "Principles of Seed Technology" }, { code: "AG403", name: "Problematic Soils and their Management" }, { code: "AG404", "name": "Renewable Energy and Green Technology" }, { code: "AG405", name: "Principles of Plant Breeding" }, { code: "AG406", name: "Production Technology for Vegetables and Spices" }] },
        { semester: 5, subjects: [{ code: "AG501", name: "Rainfed Agriculture & Watershed Management" }, { code: "AG502", name: "Pests of Crops and Stored Grains and their Management" }, { code: "AG503", name: "Livestock and Poultry Management" }, { code: "AG504", name: "Agricultural Marketing, Trade & Prices" }, { code: "AG505", name: "Intellectual Property Rights" }, { code: "AG506", name: "Geoinformatics and Nanotechnology" }] },
        { semester: 6, subjects: [{ code: "AG601", name: "Farming System & Sustainable Agriculture" }, { code: "AG602", name: "Post-harvest Management of Horticultural Crops" }, { code: "AG603", name: "Manures, Fertilizers & Soil Fertility Management" }, { code: "AG604", name: "Beneficial Insects and Pest Management" }, { code: "AG605", name: "Agri-Business Management for Rural Development" }, { code: "AG606", name: "Environmental Studies & Disaster Management" }] },
        { semester: 7, subjects: [{ code: "RAWE701", name: "Rural Agricultural Work Experience (RAWE)" }, { code: "AIA702", name: "Agro-Industrial Attachment" }] },
        { semester: 8, subjects: [{ code: "ELP801", name: "Experiential Learning Program Module I" }, { code: "ELP802", name: "Experiential Learning Program Module II" }, { code: "PROJ803", name: "Project Work" }, { code: "SEM804", name: "Seminar" }] },
    ]
  },
  {
    programName: "B.Pharm",
    department: "Pharmaceutical Sciences",
    level: "Undergraduate",
    dean: { name: "Dr. Sunita Verma", title: "Dean, School of Health & Life Sciences", message: "The B.Pharm program blends pharmaceutical sciences with healthcare, training competent pharmacists to play a vital role in medicine and patient care.", imageId: "dean-female" },
    fees: { tuition: 97500, examination: 11750, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Biology/Mathematics with a minimum of 50% marks.",
     curriculum: [
        { semester: 1, subjects: [{ code: "PHR101", name: "Human Anatomy and Physiology I" }, { code: "PHR102", name: "Pharmaceutical Analysis I" }, { code: "PHR103", name: "Pharmaceutics I" }, { code: "PHR104", name: "Pharmaceutical Inorganic Chemistry" }, { code: "HS101", name: "Communication Skills" }, { code: "EVS102", name: "Environmental Sciences" }] },
        { semester: 2, subjects: [{ code: "PHR201", name: "Human Anatomy and Physiology II" }, { code: "PHR202", name: "Pharmaceutical Organic Chemistry I" }, { code: "PHR203", name: "Biochemistry" }, { code: "PHR204", name: "Pathophysiology" }, { code: "CS205", name: "Computer Applications in Pharmacy" }, { code: "MA201", name: "Remedial Mathematics/Biology" }] },
        { semester: 3, subjects: [{ code: "PHR301", name: "Pharmaceutical Organic Chemistry II" }, { code: "PHR302", name: "Physical Pharmaceutics I" }, { code: "PHR303", name: "Pharmaceutical Microbiology" }, { code: "PHR304", name: "Pharmaceutical Engineering" }, { code: "PHR301L", name: "Organic Chemistry Lab" }, { code: "PHR303L", name: "Microbiology Lab" }] },
        { semester: 4, subjects: [{ code: "PHR401", name: "Pharmaceutical Organic Chemistry III" }, { code: "PHR402", name: "Medicinal Chemistry I" }, { code: "PHR403", name: "Physical Pharmaceutics II" }, { code: "PHR404", name: "Pharmacology I" }, { code: "PHR405", name: "Pharmacognosy and Phytochemistry I" }, { code: "PHR403L", name: "Physical Pharmaceutics Lab" }] },
        { semester: 5, subjects: [{ code: "PHR501", name: "Medicinal Chemistry II" }, { code: "PHR502", name: "Industrial Pharmacy I" }, { code: "PHR503", name: "Pharmacology II" }, { code: "PHR504", name: "Pharmacognosy & Phytochemistry II" }, { code: "PHR505", name: "Pharmaceutical Jurisprudence" }, { code: "PHR503L", name: "Pharmacology Lab" }] },
        { semester: 6, subjects: [{ code: "PHR601", name: "Medicinal Chemistry III" }, { code: "PHR602", name: "Pharmacology III" }, { code: "PHR603", name: "Herbal Drug Technology" }, { code: "PHR604", name: "Biopharmaceutics and Pharmacokinetics" }, { code: "PHR605", name: "Pharmaceutical Biotechnology" }, { code: "PHR606", name: "Quality Assurance" }] },
        { semester: 7, subjects: [{ code: "PHR701", name: "Instrumental Methods of Analysis" }, { code: "PHR702", name: "Industrial Pharmacy II" }, { code: "PHR703", name: "Pharmacy Practice" }, { code: "PHR704", name: "Novel Drug Delivery Systems" }, { code: "PHR705", name: "Instrumental Analysis Lab" }, { code: "PHR706", name: "Practice School" }] },
        { semester: 8, subjects: [{ code: "PHR801", name: "Biostatistics and Research Methodology" }, { code: "PHR802", name: "Social and Preventive Pharmacy" }, { code: "PHR803", name: "Pharmaceutical Marketing Management" }, { code: "PHR804", name: "Project Work" }, { code: "PHR805", name: "Elective Subject I" }, { code: "PHR806", name: "Elective Subject II" }] },
    ]
  },

  // PG
  {
    programName: "M.B.A.",
    department: "Management & Business Administration",
    level: "Postgraduate",
    dean: { name: "Prof. Meera Desai", title: "Dean, Faculty of Business & Entrepreneurship", message: "Our MBA program is designed to develop visionary leaders with the strategic skills and global mindset needed to excel in today's competitive business environment.", imageId: "dean-female" },
    fees: { tuition: 108000, examination: 11250, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Bachelor's degree in any discipline with a minimum of 50% marks. Valid CAT/MAT/XAT/OPET score required.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MG501", name: "Management Principles & Practices" }, { code: "MG502", name: "Managerial Economics" }, { code: "MG503", name: "Accounting for Managers" }, { code: "MG504", name: "Quantitative Techniques" }, { code: "MG505", name: "Organizational Behavior" }, { code: "MG506", name: "Business Communication" }] },
        { semester: 2, subjects: [{ code: "MG601", name: "Marketing Management" }, { code: "MG602", name: "Human Resource Management" }, { code: "MG603", name: "Financial Management" }, { code: "MG604", name: "Operations Management" }, { code: "MG605", name: "Business Research Methods" }, { code: "MG606", name: "Legal Aspects of Business" }] },
        { semester: 3, subjects: [{ code: "MG701", name: "Specialization I (Major)" }, { code: "MG702", name: "Specialization II (Major)" }, { code: "MG703", name: "Specialization III (Major)" }, { code: "MG704", name: "Specialization I (Minor)" }, { code: "MG705", name: "Summer Internship Project" }, { code: "MG706", name: "International Business" }] },
        { semester: 4, subjects: [{ code: "MG801", name: "Strategic Management & Corporate Governance" }, { code: "MG802", name: "Entrepreneurship Development" }, { code: "MG803", name: "Specialization IV (Major)" }, { code: "MG804", name: "Specialization II (Minor)" }, { code: "MG805", name: "Major Research Project" }, { code: "MG806", name: "Comprehensive Viva-Voce" }] },
    ]
  },
  {
    programName: "M.C.A.",
    department: "Computer Science & Engineering",
    level: "Postgraduate",
    dean: { name: "Dr. Alok Sharma", title: "Dean, School of Advanced Technology & AI", message: "The MCA program provides advanced knowledge and practical skills in computer science, preparing graduates for high-level roles in the software industry and academia.", imageId: "dean-male" },
    fees: { tuition: 77000, examination: 9000, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Bachelor's degree with Mathematics at 10+2 level or at Graduation level with a minimum of 50% marks.",
     curriculum: [
        { semester: 1, subjects: [{ code: "CA501", name: "Advanced Data Structures & Algorithms" }, { code: "CA502", name: "Advanced Database Management Systems" }, { code: "CA503", name: "Software Engineering & Project Management" }, { code: "CA504", name: "Mathematical Foundations for Computer Science" }, { code: "CA501L", name: "Advanced Data Structures Lab" }, { code: "CA502L", name: "Advanced DBMS Lab" }] },
        { semester: 2, subjects: [{ code: "CA601", name: "Cloud Computing & Virtualization" }, { code: "CA602", name: "Artificial Intelligence & Machine Learning" }, { code: "CA603", name: "Mobile Application Development" }, { code: "CA604", name: "Advanced Computer Networks" }, { code: "CA601L", name: "Cloud Computing Lab" }, { code: "CA603L", name: "Mobile App Dev Lab" }] },
        { semester: 3, subjects: [{ code: "CA701", name: "Big Data Analytics" }, { code: "CA702", name: "Cyber Security & Forensics" }, { code: "CA703", name: "Elective I" }, { code: "CA704", name: "Elective II" }, { code: "CA705", name: "Seminar & Technical Writing" }, { code: "CA706", name: "Minor Project" }] },
        { semester: 4, subjects: [{ code: "CA801", name: "Major Project / Internship (6 months)" }] },
    ]
  },
  {
    programName: "M.Tech.",
    department: "Computer Science & Engineering",
    level: "Postgraduate",
    dean: { name: "Dr. Ramesh Gupta", title: "Dean, School of Engineering & Applied Sciences", message: "Our M.Tech programs offer specialization in various engineering fields, fostering research, innovation, and advanced technical expertise.", imageId: "dean-male" },
    fees: { tuition: 80000, examination: 9000, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "B.E./B.Tech. in the relevant discipline with a minimum of 55% marks. Valid GATE/OPET-PG score required.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MT501", name: "Advanced Algorithms" }, { code: "MT502", name: "Research Methodology and IPR" }, { code: "MT503", name: "Advanced Operating Systems" }, { code: "MT504", name: "Department Elective I" }, { code: "MT505", name: "Department Elective II" }, { code: "MT501L", name: "Advanced Algorithms Lab" }] },
        { semester: 2, subjects: [{ code: "MT601", name: "Machine Learning" }, { code: "MT602", name: "Department Elective III" }, { code: "MT603", name: "Department Elective IV" }, { code: "MT604", name: "Open Elective" }, { code: "MT605", name: "Mini Project with Seminar" }, { code: "MT601L", name: "Machine Learning Lab" }] },
        { semester: 3, subjects: [{ code: "MT701", name: "Department Elective V" }, { code: "MT702", name: "Dissertation Stage-I" }] },
        { semester: 4, subjects: [{ code: "MT801", name: "Dissertation Stage-II" }] },
    ]
  },
  {
    programName: "LL.M.",
    department: "Law",
    level: "Postgraduate",
    dean: { name: "Justice R. S. Chauhan (Retd.)", title: "Dean, School of Legal Studies", message: "The LL.M. program provides an opportunity for in-depth study and research in specialized areas of law, mentored by experienced legal scholars and practitioners.", imageId: "dean-male" },
    fees: { tuition: 60000, examination: 5500, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "LL.B. degree with a minimum of 50% marks.",
    curriculum: [
        { semester: 1, subjects: [{ code: "LWM501", name: "Research Methodology & Legal Writing" }, { code: "LWM502", name: "Comparative Public Law & Governance" }, { code: "LWM503", name: "International Trade Law" }, { code: "LWM504", name: "Law and Social Transformation in India" }, { code: "LWM505", name: "Specialization Paper I (e.g., Corporate Law)" }, { code: "LWM506", name: "Seminar" }] },
        { semester: 2, subjects: [{ code: "LWM601", name: "Specialization Paper II" }, { code: "LWM602", name: "Specialization Paper III" }, { code: "LWM603", name: "Dissertation" }, { code: "LWM604", name: "Viva-Voce" }] },
    ]
  },

  // Diploma
  {
    programName: "Diploma in Engineering",
    department: "Polytechnic",
    level: "Diploma",
    dean: { name: "Dr. Ramesh Gupta", title: "Dean, School of Engineering & Applied Sciences", message: "Our diploma programs provide a strong foundation in engineering principles and practical skills, preparing students for technical roles or further studies.", imageId: "dean-male" },
    fees: { tuition: 37000, examination: 5500, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10th standard/SSC examination with a minimum of 35% marks.",
    curriculum: [
        { semester: 1, subjects: [{ code: "MA101", name: "Applied Mathematics I" }, { code: "PH101", name: "Applied Physics I" }, { code: "CH101", name: "Applied Chemistry" }, { code: "HS101", name: "Communication Skills I" }, { code: "ME101", name: "Engineering Drawing I" }, { code: "WS101", name: "Workshop Practice" }] },
        { semester: 2, subjects: [{ code: "MA102", name: "Applied Mathematics II" }, { code: "PH102", name: "Applied Physics II" }, { code: "EE102", name: "Fundamentals of Electrical & Electronics" }, { code: "CS102", name: "Fundamentals of Computer" }, { code: "ME102", name: "General Mechanical Engineering" }, { code: "CH102L", name: "Applied Chemistry Lab" }] },
        { semester: 3, subjects: [{ code: "MA201", name: "Applied Mathematics III" }, { code: "DCS201", name: "Branch Specific Course I" }, { code: "DCS202", name: "Branch Specific Course II" }, { code: "DCS203", name: "Branch Specific Course III" }, { code: "DCS201L", name: "Branch Specific Lab I" }, { code: "HS201", name: "Industrial Psychology" }] },
        { semester: 4, subjects: [{ code: "DCS301", name: "Branch Specific Course IV" }, { code: "DCS302", name: "Branch Specific Course V" }, { code: "DCS303", name: "Branch Specific Course VI" }, { code: "DCS301L", name: "Branch Specific Lab II" }, { code: "DCS302L", name: "Branch Specific Lab III" }, { code: "EVS102", name: "Environmental Education" }] },
        { semester: 5, subjects: [{ code: "DCS401", name: "Branch Specific Course VII" }, { code: "DCS402", name: "Branch Specific Course VIII" }, { code: "MG401", name: "Industrial Management" }, { code: "DCS401L", name: "Branch Specific Lab IV" }, { code: "DCS402L", name: "Universal Human Values" }, { code: "DCS403", name: "Project Work I" }] },
        { semester: 6, subjects: [{ code: "DCS501", name: "Branch Specific Course IX" }, { code: "DCS502", name: "Branch Specific Course X" }, { code: "HS501", name: "Entrepreneurship Development" }, { code: "DCS501L", name: "Branch Specific Lab V" }, { code: "DCS502", name: "Project Work II" }, { code: "DCS503", name: "Industrial Training" }] },
    ]
  },
  {
    programName: "D.Pharm",
    department: "Pharmaceutical Sciences",
    level: "Diploma",
    dean: { name: "Dr. Sunita Verma", title: "Dean, School of Health & Life Sciences", message: "The D.Pharm program is a two-year course that prepares students for a career as a licensed pharmacist, focusing on practical skills and pharmaceutical knowledge.", imageId: "dean-female" },
    fees: { tuition: 67000, examination: 8000, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Passed 10+2 with Physics, Chemistry, and Biology/Mathematics.",
    curriculum: [
        { semester: 1, subjects: [{ code: "DPH101", name: "Pharmaceutics I" }, { code: "DPH102", name: "Pharmaceutical Chemistry I" }, { code: "DPH103", name: "Pharmacognosy" }, { code: "DPH104", name: "Biochemistry & Clinical Pathology" }, { code: "DPH105", name: "Human Anatomy & Physiology" }, { code: "DPH106", name: "Social Pharmacy" }] },
        { semester: 2, subjects: [{ code: "DPH201", name: "Pharmacology & Toxicology" }, { code: "DPH202", name: "Pharmaceutical Chemistry II" }, { code: "DPH203", name: "Pharmaceutics II" }, { code: "DPH204", "name": "Hospital and Clinical Pharmacy" }, { code: "DPH205", name: "Pharmaceutical Jurisprudence" }, { code: "DPH206", name: "Drug Store and Business Management" }] },
    ]
  },
  
  // Default for other programs not explicitly listed
  {
    programName: "Default",
    department: "General",
    level: "Undergraduate",
    dean: {
      name: "Prof. (Dr.) B.L. Gupta",
      title: "Vice Chancellor",
      message: "Welcome to Obsidian Peak University. We are committed to providing a world-class education that empowers our students to become leaders and innovators in their chosen fields.",
      imageId: "founder-image",
    },
    fees: { tuition: 62000, examination: 8000, other: 9000, caution: 5000, hostel: 80000 },
    eligibility: "Please refer to the specific program page for detailed eligibility criteria.",
  },
  {
    programName: "Ph.D.",
    department: "Research & Development",
    level: "Postgraduate",
    dean: {
      name: "Prof. (Dr.) B.L. Gupta",
      title: "Vice Chancellor",
      message: "Our Ph.D. program is at the forefront of research and innovation, designed to nurture the next generation of scholars and thought leaders who will drive progress in their respective fields.",
      imageId: "founder-image",
    },
    fees: { tuition: 75000, examination: 10000, other: 5000, caution: 10000, hostel: 80000 },
    eligibility: "Master's degree in a relevant field with a minimum of 55% marks or an equivalent grade. A valid score in UGC-NET/CSIR-NET/GATE or the university's entrance test (OPU-RET) is required.",
    curriculum: [
        { semester: 1, subjects: [
            { code: "PHD101", name: "Research Methodology" },
            { code: "PHD102", name: "Advanced Coursework in Specialization" },
            { code: "PHD103", name: "Literature Review and Seminar" },
        ]},
        { semester: 2, subjects: [
            { code: "PHD201", name: "Research Proposal Finalization" },
            { code: "PHD202", name: "Comprehensive Examination" },
        ]},
    ]
  }
];

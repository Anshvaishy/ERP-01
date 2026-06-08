
import type { Faculty } from './local-storage-db';

export interface DepartmentDetail {
    id: string;
    name: string;
    hodId: Faculty['id'];
    programs: string[];
}

export interface InstituteDetail {
  id: string;
  name: string;
  description: string;
  directorId: Faculty['id'];
  departments: DepartmentDetail[];
}

export const instituteDetailsData: InstituteDetail[] = [
  {
    id: "technology",
    name: "Institute of Technology",
    description: "Fostering future engineers with cutting-edge knowledge in Computer Science, Mechanical, Civil, and Electrical Engineering to build a better world.",
    directorId: "DIR_TECH",
    departments: [
        { id: "cse", name: "Computer Science & Engineering", hodId: "HOD_CSE", programs: ["B.Tech. (Computer Science)", "B.Tech. (CSE) Specializations", "M.Tech.", "B.C.A.", "M.C.A."] },
        { id: "me", name: "Mechanical Engineering", hodId: "HOD_ME", programs: ["B.Tech. (Mechanical Engineering)"] },
        { id: "ce", name: "Civil Engineering", hodId: "HOD_CE", programs: ["B.Tech. (Civil Engineering)"] },
        { id: "ee", name: "Electrical Engineering", hodId: "HOD_EE", programs: ["B.Tech. (Electrical Engineering)"] },
        { id: "ece", name: "Electronics & Communication", hodId: "HOD_ECE", programs: ["B.Tech. (Electronics & Communication)"] }
    ],
  },
  {
    id: "biosciences",
    name: "Institute of Biosciences & Technology",
    description: "At the forefront of biological innovation, addressing global challenges in health, agriculture, and environmental sciences.",
    directorId: "DIR_BIO",
    departments: [
        { id: "biotech", name: "Biotechnology", hodId: "HOD_BIOTECH", programs: ["B.Tech. (Biotechnology)", "B.Sc. (H) (Bio-Tech)"] },
        { id: "microbio", name: "Microbiology", hodId: "HOD_MICRO", programs: [] },
        { id: "foodtech", name: "Food Technology", hodId: "HOD_FOOD", programs: [] }
    ],
  },
  {
    id: "management",
    name: "Institute of Management, Commerce & Economics",
    description: "Nurturing the next generation of business leaders and entrepreneurs with a strong foundation in management and economic principles.",
    directorId: "DIR_MGMT",
    departments: [
        { id: "mgmt", name: "Management & Business Administration", hodId: "HOD_MGMT", programs: ["B.B.A.", "M.B.A."] },
        { id: "comm", name: "Commerce & Economics", hodId: "HOD_COMM", programs: [] }
    ],
  },
  {
    id: "agriculture",
    name: "Institute of Agricultural Sciences & Technology",
    description: "Dedicated to advancing sustainable agriculture through research and technology, recognized by the Indian Council of Agricultural Sciences.",
    directorId: "DIR_AGRI",
    departments: [
        { id: "agri", name: "Agricultural Sciences", hodId: "HOD_AGRI", programs: ["B.Sc. (H) (Agriculture)"] }
    ],
  },
  {
    id: "legal",
    name: "Institute of Legal Studies",
    description: "A hub of legal scholarship, committed to producing ethical and skilled legal professionals with a deep understanding of justice.",
    directorId: "DIR_LAW",
    departments: [
        { id: "law", name: "Law", hodId: "HOD_LAW", programs: ["LL.B.", "LL.M."] }
    ],
  },
  {
    id: "pharmacy",
    name: "Institute of Pharmacy",
    description: "Blending chemical and health sciences to train competent pharmacists who play a vital role in healthcare and medicine.",
    directorId: "DIR_PHARM",
    departments: [
        { id: "pharm", name: "Pharmaceutical Sciences", hodId: "HOD_PHARM", programs: ["B.Pharm", "D.Pharm"] }
    ],
  },
  {
    id: "media",
    name: "Institute of Media Studies",
    description: "Shaping socially conscious journalists and media professionals in one of the fastest-growing industries.",
    directorId: "DIR_MEDIA",
    departments: [
        { id: "jmc", name: "Journalism & Mass Communication", hodId: "HOD_MEDIA", programs: [] }
    ],
  },
  {
    id: "natural_sciences",
    name: "Institute of Natural Sciences & Humanities",
    description: "The intellectual core of the university, providing fundamental knowledge in Physics, Chemistry, Mathematics, and Humanities.",
    directorId: "DIR_SCI",
    departments: [
        { id: "phy", name: "Physics", hodId: "HOD_PHYSICS", programs: [] },
        { id: "chem", name: "Chemistry", hodId: "HOD_CHEM", programs: [] },
        { id: "math", name: "Mathematics", hodId: "HOD_MATH", programs: [] },
        { id: "hum", name: "Humanities & Social Sciences", hodId: "HOD_HUM", programs: [] }
    ],
  },
  {
    id: "education",
    name: "Institute of Education & Research",
    description: "Producing teachers and educators equipped with traditional values and modern pedagogical techniques.",
    directorId: "DIR_EDU",
    departments: [
        { id: "edu", name: "Education", hodId: "HOD_EDU", programs: [] }
    ],
  },
  {
    id: "polytechnic",
    name: "Obsidian Peak Polytechnic",
    description: "Offering diploma programs in core engineering disciplines to create skilled technicians and supervisors for the industry.",
    directorId: "DIR_POLY",
    departments: [
        { id: "poly_me", name: "Mechanical Engineering", hodId: "HOD_ME", programs: ["Diploma in Engineering"] },
        { id: "poly_ce", name: "Civil Engineering", hodId: "HOD_CE", programs: ["Diploma in Engineering"] },
        { id: "poly_ee", name: "Electrical Engineering", hodId: "HOD_EE", programs: ["Diploma in Engineering"] },
        { id: "poly_cse", name: "Computer Science", hodId: "HOD_CSE", programs: ["Diploma in Engineering"] }
    ],
  },
];

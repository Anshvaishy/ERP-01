
// Client-side localStorage database simulation
'use client';
import { programDetailsData } from './program-details';

// Type definitions
export type Student = {
  roll: string;
  name: string;
  class: string;
  department: string;
  dob: string;
  contact: string;
  email: string;
  photo: string;
  password?: string; // Added for password login
  uid?: string;
};

export type Faculty = {
  id: string;
  name: string;
  department: string;
  role: 'Faculty' | 'HOD' | 'Director';
  contact: string;
  email?: string;
  password?: string;
};

export type Subject = {
  code: string;
  name: string;
  class: string;
  facultyId: string;
  department: string;
  description?: string;
};

export type AttendanceRecord = {
  date: string;
  class: string;
  subject: string;
  roll: string;
  status: 'Present' | 'Absent';
};

export type Marks = {
  roll: string;
  subject: string;
  examType: 'Mid-Term' | 'Final' | 'Assignment';
  obtained: number;
  total: number;
};

export type FeeRecord = {
  roll: string;
  name: string; // denormalized for easier display
  feeType: 'Tuition' | 'Hostel' | 'Examination' | 'Other';
  amount: number;
  date?: string;
};

export type Admission = {
  id: string;
  name: string;
  class: string;
  dob: string;
  contact: string;
  email: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  password?: string;
  uid?: string;
};

export type HostelRoom = {
  roomNo: string;
  capacity: number;
  roll: string | null;
  status: 'Occupied' | 'Vacant';
};


export type LibraryBook = {
  bookTitle: string;
  roll?: string;
  issueDate?: string;
  dueDate?: string;
  status: 'Issued' | 'Available';
};

export type Payroll = {
  facultyId: string;
  month: string;
  amount: number;
  status: 'Paid' | 'Pending';
};

export type LmsAssignment = {
    id: string;
    subjectCode: string;
    title: string;
    dueDate: string;
    instructions: string;
};

export type LmsMaterial = {
    id: string;
    subjectCode: string;
    title: string;
    type: 'PDF' | 'Video' | 'Link' | string;
    url: string;
};

export type LmsSubmission = {
    assignmentId: string;
    studentRoll: string;
    submissionDate: string;
    file: {
        name: string;
        url: string; // In a real app, this would be a storage URL
    };
};

export type Placement = {
  roll: string;
  company: string;
  jobTitle: string;
  date: string;
};

export type Alumni = {
  roll: string;
  name: string;
  year: number;
  job: string;
};

export type Grievance = {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  category: string;
  subject: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  department?: string;
  assignedTo?: 'Faculty' | 'HOD' | 'Director';
};

export type Committee = {
    id: string;
    grievanceId: string;
    name: string;
    members: string[]; // Array of faculty IDs
    creationDate: string;
};

export type Notice = {
  title: string;
  text: string;
  timestamp: string;
};

export type Session = {
    isLoggedIn: boolean;
    user: string;
    userType: 'student' | 'admin' | 'faculty';
};

export type Role = {
  name: string;
  description: string;
};

export type Permission = {
  id: string;
  label: string;
};

export type RolePermissions = {
  [roleName: string]: string[];
};

export type Settings = {
  academicSession: string;
  admissionDeadline: string;
  obeMode: boolean;
  universityName: string;
  universityLogoUrl: string;
  maintenanceMode: boolean;
};

type DbTables = {
  students: Student[];
  faculty: Faculty[];
  subjects: Subject[];
  attendance: AttendanceRecord[];
  marks: Marks[];
  fees: FeeRecord[];
  admissions: Admission[];
  hostel: HostelRoom[];
  library: LibraryBook[];
  payroll: Payroll[];
  lmsAssignments: LmsAssignment[];
  lmsMaterials: LmsMaterial[];
  lmsSubmissions: LmsSubmission[];
  placements: Placement[];
  alumni: Alumni[];
  grievances: Grievance[];
  committees: Committee[];
  notices: Notice[];
  session: Session | null;
  roles: Role[];
  permissions: Permission[];
  rolePermissions: RolePermissions;
  settings: Settings | null;
};

const tableKeys: (keyof DbTables)[] = [
  'students', 'faculty', 'subjects', 'attendance', 'marks', 'fees', 'admissions',
  'hostel', 'library', 'payroll', 'lmsAssignments', 'lmsMaterials', 'lmsSubmissions', 'placements', 'alumni', 'grievances',
  'committees', 'notices', 'session', 'roles', 'permissions', 'rolePermissions', 'settings'
];

let dbInitialized = false;

const getInitialData = (): DbTables => ({
  students: [
    { uid: '8629NVY7gfOiX4QJCPh9OVmqD1U2', roll: 'STU1768237918712', name: 'Ansh Vaishy', class: 'B.Tech. (Computer Science)', department: 'Computer Science & Engineering', dob: '2004-01-01', contact: '08423293265', email: 'anshvaish4466@gmail.com', photo: '', password: 'admin123' },
    { roll: 'STU123', name: 'Demo Student', class: 'B.Tech. (Computer Science)', department: 'Computer Science & Engineering', dob: '2002-05-10', contact: '9876543210', email: 'student@obsidianpeak.ac.in', photo: '', password: 'password' },
    { roll: 'STU124', name: 'Riya Sharma', class: 'B.Tech. (Computer Science)', department: 'Computer Science & Engineering', dob: '2002-08-15', contact: '9876543211', email: 'riya.sharma@obsidianpeak.ac.in', photo: '', password: 'password' },
    { roll: 'STU125', name: 'Amit Kumar', class: 'M.B.A.', department: 'Management & Business Administration', dob: '2001-01-20', contact: '9876543212', email: 'amit.kumar@obsidianpeak.ac.in', photo: '', password: 'password' },
    { roll: 'STU126', name: 'Priya Patel', class: 'LL.B.', department: 'Law', dob: '2003-03-22', contact: '9876543213', email: 'priya.patel@obsidianpeak.ac.in', photo: '', password: 'password' },
    { roll: 'STU127', name: 'Rahul Verma', class: 'B.Sc. (H) (Bio-Tech)', department: 'Biotechnology', dob: '2002-11-30', contact: '9876543214', email: 'rahul.verma@obsidianpeak.ac.in', photo: '', password: 'password' },
    { roll: 'STU128', name: 'Sneha Reddy', class: 'B.Tech. (Computer Science)', department: 'Computer Science & Engineering', dob: '2003-01-12', contact: '9876543215', email: 'sneha.reddy@obsidianpeak.ac.in', photo: '', password: 'password' },
    { roll: 'STU129', name: 'Karan Singh', class: 'B.B.A.', department: 'Management & Business Administration', dob: '2002-07-25', contact: '9876543216', email: 'karan.singh@obsidianpeak.ac.in', photo: '', password: 'password' },
  ],
  faculty: [
    // Directors
    { id: 'DIR_TECH', name: 'Dr. Ramesh Gupta', department: 'Technology', role: 'Director', contact: '1110001110', email: 'director.tech@obsidianpeak.ac.in' },
    { id: 'DIR_BIO', name: 'Dr. Sunita Verma', department: 'Biosciences', role: 'Director', contact: '2220002220', email: 'director.bio@obsidianpeak.ac.in' },
    { id: 'DIR_MGMT', name: 'Prof. Meera Desai', department: 'Management', role: 'Director', contact: '3330003330', email: 'director.mgmt@obsidianpeak.ac.in' },
    { id: 'DIR_AGRI', name: 'Dr. Harish Patel', department: 'Agricultural Sciences', role: 'Director', contact: '4440004440', email: 'director.agri@obsidianpeak.ac.in' },
    { id: 'DIR_LAW', name: 'Justice R. S. Chauhan (Retd.)', department: 'Legal Studies', role: 'Director', contact: '5550005550', email: 'director.law@obsidianpeak.ac.in' },
    { id: 'DIR_PHARM', name: 'Dr. Priya Singh', department: 'Pharmacy', role: 'Director', contact: '6660006660', email: 'director.pharm@obsidianpeak.ac.in' },
    { id: 'DIR_MEDIA', name: 'Mr. Vikram Singh', department: 'Media Studies', role: 'Director', contact: '7770007770', email: 'director.media@obsidianpeak.ac.in' },
    { id: 'DIR_SCI', name: 'Dr. Alok Sharma', department: 'Natural Sciences', role: 'Director', contact: '8880008880', email: 'director.sci@obsidianpeak.ac.in' },
    { id: 'DIR_EDU', name: 'Dr. Anjali Mehta', department: 'Education', role: 'Director', contact: '9990009990', email: 'director.edu@obsidianpeak.ac.in' },
    { id: 'DIR_POLY', name: 'Er. Rajesh Kumar', department: 'Polytechnic', role: 'Director', contact: '1010101010', email: 'director.poly@obsidianpeak.ac.in' },

    // HODs
    { id: 'HOD_CSE', name: 'Prof. Sanjay Jain', department: 'Computer Science & Engineering', role: 'HOD', contact: '1234567890', email: 'hod.cse@obsidianpeak.ac.in', password: 'password123' },
    { id: 'HOD_ME', name: 'Prof. Arun Kumar', department: 'Mechanical Engineering', role: 'HOD', contact: '1234567891' },
    { id: 'HOD_CE', name: 'Prof. Geeta Iyer', department: 'Civil Engineering', role: 'HOD', contact: '1234567892' },
    { id: 'HOD_EE', name: 'Prof. Manish Verma', department: 'Electrical Engineering', role: 'HOD', contact: '1234567893' },
    { id: 'HOD_ECE', name: 'Prof. Swati Rao', department: 'Electronics & Communication', role: 'HOD', contact: '1234567894' },
    { id: 'HOD_BIOTECH', name: 'Dr. Rohan Mehra', department: 'Biotechnology', role: 'HOD', contact: '1234567895' },
    { id: 'HOD_MICRO', name: 'Dr. Fatima Khan', department: 'Microbiology', role: 'HOD', contact: '1234567896' },
    { id: 'HOD_FOOD', name: 'Dr. Suresh Reddy', department: 'Food Technology', role: 'HOD', contact: '1234567897' },
    { id: 'HOD_MGMT', name: 'Dr. Ankit Agarwal', department: 'Management & Business Administration', role: 'HOD', contact: '1234567898' },
    { id: 'HOD_COMM', name: 'Dr. Nisha Gupta', department: 'Commerce & Economics', role: 'HOD', contact: '1234567899' },
    { id: 'HOD_AGRI', name: 'Dr. Balwinder Singh', department: 'Agricultural Sciences', role: 'HOD', contact: '1234567880' },
    { id: 'HOD_LAW', name: 'Adv. Preeti Sharma', department: 'Law', role: 'HOD', contact: '1234567881' },
    { id: 'HOD_PHARM', name: 'Dr. Vinay Saxena', department: 'Pharmaceutical Sciences', role: 'HOD', contact: '1234567882' },
    { id: 'HOD_MEDIA', name: 'Ms. Smita Patil', department: 'Journalism & Mass Communication', role: 'HOD', contact: '1234567883' },
    { id: 'HOD_PHYSICS', name: 'Dr. K. S. Krishnan', department: 'Physics', role: 'HOD', contact: '1234567884' },
    { id: 'HOD_CHEM', name: 'Dr. Leena Trivedi', department: 'Chemistry', role: 'HOD', contact: '1234567885' },
    { id: 'HOD_MATH', name: 'Dr. R. S. Pathak', department: 'Mathematics', role: 'HOD', contact: '1234567886' },
    { id: 'HOD_HUM', name: 'Dr. Ila Sharma', department: 'Humanities & Social Sciences', role: 'HOD', contact: '1234567887' },
    { id: 'HOD_EDU', name: 'Dr. R. P. Singh', department: 'Education', role: 'HOD', contact: '1234567888' },
    
    // Other Faculty
    { id: 'FAC111', name: 'Prof. A. Sharma', department: 'Mathematics', role: 'Faculty', contact: '2345678901' },
    { id: 'FAC112', name: 'Prof. R. Verma', department: 'Physics', role: 'Faculty', contact: '2345678902' },
    { id: 'FAC113', name: 'Prof. N. Gupta', department: 'Computer Science & Engineering', role: 'Faculty', contact: '2345678903' },
    { id: 'FAC114', name: 'Prof. P. Roy', department: 'Humanities & Social Sciences', role: 'Faculty', contact: '2345678904' },
    { id: 'FAC115', name: 'Prof. S. Mishra', department: 'Chemistry', role: 'Faculty', contact: '2345678905' },
    { id: 'FAC116', name: 'Prof. K. Singh', department: 'Electrical Engineering', role: 'Faculty', contact: '2345678906' },
    { id: 'FAC117', name: 'Prof. S. Jain', department: 'Computer Science & Engineering', role: 'Faculty', contact: '2345678907' },
    { id: 'FAC118', name: 'Prof. P. Khanna', department: 'Computer Science & Engineering', role: 'Faculty', contact: '2345678908' },
    { id: 'FAC119', name: 'Prof. V. Rao', department: 'Computer Science & Engineering', role: 'Faculty', contact: '2345678909' },
    { id: 'FAC120', name: 'Prof. A. Iyer', department: 'Computer Science & Engineering', role: 'Faculty', contact: '2345678910' },

    { id: 'FAC109', name: 'Dr. Priya Singh', department: 'Computer Science & Engineering', role: 'Faculty', contact: '1234567886', email: 'priya.singh@obsidianpeak.ac.in' },
    { id: 'FAC110', name: 'Prof. Arjun Mehta', department: 'Management & Business Administration', role: 'Faculty', contact: '1234567885' },
    { id: 'FAC101', name: 'Dr. B. L. Gupta', department: 'ALL', role: 'Director', contact: '1111111111', email: 'director@obsidianpeak.ac.in'},
    { id: 'FAC102', name: 'Prof. Anil Kumar', department: 'Humanities & Social Sciences', role: 'Faculty', contact: '1234567894' },
    { id: 'FAC103', name: 'Mr. Vivek Kapoor', department: 'Admissions', role: 'Faculty', contact: '1234567896' },
    { id: 'FACULTY_ADMIN', name: 'Faculty Member', department: 'Admin', role: 'Faculty', contact: '0000000000', email: 'faculty@obsidianpeak.ac.in', password: 'password123' },
  ],
  subjects: [
    // B.Tech CSE Subjects
    { code: 'MA101', name: 'Engineering Mathematics – I', class: 'B.Tech. (Computer Science)', facultyId: 'FAC111', department: 'Mathematics' },
    { code: 'PH101', name: 'Engineering Physics', class: 'B.Tech. (Computer Science)', facultyId: 'FAC112', department: 'Physics' },
    { code: 'CS101', name: 'Programming for Problem Solving (C)', class: 'B.Tech. (Computer Science)', facultyId: 'FAC113', department: 'Computer Science & Engineering' },
    { code: 'ME101', name: 'Engineering Graphics', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_ME', department: 'Mechanical Engineering' },
    { code: 'HS101', name: 'Communication Skills', class: 'B.Tech. (Computer Science)', facultyId: 'FAC114', department: 'Humanities & Social Sciences' },
    { code: 'MA102', name: 'Engineering Mathematics – II', class: 'B.Tech. (Computer Science)', facultyId: 'FAC111', department: 'Mathematics' },
    { code: 'CH102', name: 'Engineering Chemistry', class: 'B.Tech. (Computer Science)', facultyId: 'FAC115', department: 'Chemistry' },
    { code: 'CS102', name: 'Object Oriented Programming (C++)', class: 'B.Tech. (Computer Science)', facultyId: 'FAC113', department: 'Computer Science & Engineering' },
    { code: 'EE102', name: 'Basic Electrical Engineering', class: 'B.Tech. (Computer Science)', facultyId: 'FAC116', department: 'Electrical Engineering' },
    { code: 'EVS102', name: 'Environmental Studies', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CE', department: 'Civil Engineering' },
    { code: 'MA201', name: 'Discrete Mathematics', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_MATH', department: 'Mathematics' },
    { code: 'CS201', name: 'Data Structures', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS202', name: 'Digital Logic Design', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_ECE', department: 'Electronics & Communication' },
    { code: 'CS203', name: 'Computer Organization', class: 'B.Tech. (Computer Science)', facultyId: 'FAC109', department: 'Computer Science & Engineering' },
    { code: 'CS204', name: 'Data Structures Lab', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS301', name: 'Operating Systems', class: 'B.Tech. (Computer Science)', facultyId: 'FAC117', department: 'Computer Science & Engineering' },
    { code: 'CS302', name: 'Design & Analysis of Algorithms', class: 'B.Tech. (Computer Science)', facultyId: 'FAC117', department: 'Computer Science & Engineering' },
    { code: 'CS303', name: 'Database Management Systems', class: 'B.Tech. (Computer Science)', facultyId: 'FAC118', department: 'Computer Science & Engineering' },
    { code: 'CS304', name: 'Software Engineering', class: 'B.Tech. (Computer Science)', facultyId: 'FAC118', department: 'Computer Science & Engineering' },
    { code: 'CS305', name: 'DBMS Lab', class: 'B.Tech. (Computer Science)', facultyId: 'FAC118', department: 'Computer Science & Engineering' },
    { code: 'CS401', name: 'Computer Networks', class: 'B.Tech. (Computer Science)', facultyId: 'FAC119', department: 'Computer Science & Engineering' },
    { code: 'CS402', name: 'Theory of Computation', class: 'B.Tech. (Computer Science)', facultyId: 'FAC117', department: 'Computer Science & Engineering' },
    { code: 'CS403', name: 'Web Technologies', class: 'B.Tech. (Computer Science)', facultyId: 'FAC113', department: 'Computer Science & Engineering' },
    { code: 'CS404', name: 'Artificial Intelligence', class: 'B.Tech. (Computer Science)', facultyId: 'FAC120', department: 'Computer Science & Engineering' },
    { code: 'CS405', name: 'Web Technologies Lab', class: 'B.Tech. (Computer Science)', facultyId: 'FAC113', department: 'Computer Science & Engineering' },
    { code: 'CS501', name: 'Machine Learning', class: 'B.Tech. (Computer Science)', facultyId: 'FAC120', department: 'Computer Science & Engineering' },
    { code: 'CS502', name: 'Compiler Design', class: 'B.Tech. (Computer Science)', facultyId: 'FAC117', department: 'Computer Science & Engineering' },
    { code: 'CS503', name: 'Cloud Computing', class: 'B.Tech. (Computer Science)', facultyId: 'FAC119', department: 'Computer Science & Engineering' },
    { code: 'CS504', name: 'Information Security', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS505', name: 'Mini Project', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS601', name: 'Big Data Analytics', class: 'B.Tech. (Computer Science)', facultyId: 'FAC120', department: 'Computer Science & Engineering' },
    { code: 'CS602', name: 'Internet of Things', class: 'B.Tech. (Computer Science)', facultyId: 'FAC119', department: 'Computer Science & Engineering' },
    { code: 'CS603', name: 'Mobile Application Development', class: 'B.Tech. (Computer Science)', facultyId: 'FAC113', department: 'Computer Science & Engineering' },
    { code: 'CS604', name: 'Professional Elective – I', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS605', name: 'Open Elective - I', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS606', name: 'Major Project – I', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS701', name: 'Professional Elective – II', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS702', name: 'Professional Elective – III', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS703', name: 'Entrepreneurship Development', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_MGMT', department: 'Management & Business Administration' },
    { code: 'HS701', name: 'Professional Ethics', class: 'B.Tech. (Computer Science)', facultyId: 'FAC114', department: 'Humanities & Social Sciences' },
    { code: 'CS704', name: 'Major Project – II', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },
    { code: 'CS705', name: 'Internship / Industrial Training', class: 'B.Tech. (Computer Science)', facultyId: 'HOD_CSE', department: 'Computer Science & Engineering' },

    // Other courses for variety
    { code: 'MG101', name: 'Principles of Management', class: 'B.B.A.', facultyId: 'HOD_MGMT', department: 'Management & Business Administration' },
    { code: 'BT201', name: 'Microbiology', class: 'B.Sc. (H) (Bio-Tech)', facultyId: 'HOD_BIOTECH', department: 'Biotechnology' },
    { code: 'LW201', name: 'Constitutional Law', class: 'LL.B.', facultyId: 'HOD_LAW', department: 'Law' },
  ],
  attendance: [
      { date: '2024-07-15', class: 'B.Tech. (Computer Science)', subject: 'CS101', roll: 'STU123', status: 'Present' },
      { date: '2024-07-15', class: 'B.Tech. (Computer Science)', subject: 'CS101', roll: 'STU124', status: 'Present' },
      { date: '2024-07-15', class: 'B.Tech. (Computer Science)', subject: 'CS101', roll: 'STU128', status: 'Absent' },
      { date: '2024-07-16', class: 'B.Tech. (Computer Science)', subject: 'CS101', roll: 'STU123', status: 'Present' },
      { date: '2024-07-16', class: 'B.Tech. (Computer Science)', subject: 'CS101', roll: 'STU124', status: 'Absent' },
      { date: '2024-07-16', class: 'B.Tech. (Computer Science)', subject: 'CS101', roll: 'STU128', status: 'Present' },
  ],
  marks: [
      { roll: 'STU123', subject: 'CS101', examType: 'Assignment', obtained: 85, total: 100 },
      { roll: 'STU123', subject: 'MA101', examType: 'Assignment', obtained: 90, total: 100 },
      { roll: 'STU123', subject: 'PH101', examType: 'Assignment', obtained: 75, total: 100 },
      { roll: 'STU124', subject: 'CS101', examType: 'Assignment', obtained: 92, total: 100 },
      { roll: 'STU128', subject: 'CS101', examType: 'Assignment', obtained: 78, total: 100 },
      { roll: 'STU123', subject: 'CS301', examType: 'Assignment', obtained: 88, total: 100 },
      { roll: 'STU123', subject: 'CS302', examType: 'Assignment', obtained: 95, total: 100 },
      { roll: 'STU123', subject: 'CS303', examType: 'Assignment', obtained: 82, total: 100 },
      { roll: 'STU123', subject: 'CS304', examType: 'Assignment', obtained: 78, total: 100 },
      { roll: 'STU123', subject: 'HS301', examType: 'Assignment', obtained: 91, total: 100 },
  ],
  fees: [
    { roll: 'STU123', name: 'Demo Student', feeType: 'Tuition', amount: 105500, date: '2024-07-01'},
    { roll: 'STU124', name: 'Riya Sharma', feeType: 'Tuition', amount: 50000, date: '2024-07-05'},
  ],
  admissions: [
      { uid: 'some-uid-for-new-applicant', id: 'ADM001', name: 'New Applicant', class: 'B.Tech. (Computer Science)', dob: '2005-10-10', contact: '9998887770', email: 'new@applicant.com', date: new Date().toISOString(), status: 'Pending', password: 'password123'}
  ],
  hostel: [
      { roomNo: 'A-101', capacity: 2, roll: 'STU123', status: 'Occupied' },
      { roomNo: 'A-102', capacity: 2, roll: 'STU1768237918712', status: 'Occupied' },
      { roomNo: 'B-201', capacity: 3, roll: null, status: 'Vacant' },
      { roomNo: 'B-202', capacity: 3, roll: 'STU124', status: 'Occupied' },
      { roomNo: 'C-101', capacity: 1, roll: null, status: 'Vacant' },
  ],
  library: [
      { bookTitle: 'The Art of Computer Programming', status: 'Available' },
      { bookTitle: 'A Brief History of Time', status: 'Issued', roll: 'STU123', issueDate: '2024-07-10', dueDate: '2024-07-24'},
      { bookTitle: 'Clean Code', status: 'Available' },
      { bookTitle: 'Data Structures and Algorithms in Java', status: 'Available' },
  ],
  payroll: [],
  lmsAssignments: [
      { id: 'ASGN001', subjectCode: 'CS101', title: 'Implement a Linked List', dueDate: '2024-08-15', instructions: 'Implement a singly linked list in Java with methods for insertion, deletion, and traversal.' },
      { id: 'ASGN002', subjectCode: 'CS301', title: 'Big O Notation Analysis', dueDate: '2024-08-20', instructions: 'Analyze the time complexity of five different sorting algorithms and submit a report.' },
      { id: 'ASGN003', subjectCode: 'CS101', title: 'Binary Search Tree Operations', dueDate: '2024-09-01', instructions: 'Write a program to perform insertion, deletion, and search operations on a binary search tree.' },
  ],
  lmsMaterials: [
      { id: 'MAT001', subjectCode: 'CS101', title: 'Lecture 1: Introduction to Programming', type: 'PDF', url: '/materials/cs101_lec1.pdf' },
      { id: 'MAT002', subjectCode: 'CS101', title: 'Lecture 2: Variables and Data Types', type: 'Video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 'MAT003', subjectCode: 'CS301', title: 'Lecture 1: Asymptotic Analysis', type: 'PDF', url: '/materials/cs301_lec1.pdf' },
  ],
  lmsSubmissions: [
      { assignmentId: 'ASGN002', studentRoll: 'STU123', submissionDate: '2024-08-18', file: { name: 'big_o_report.pdf', url: '#' } }
  ],
  placements: [],
  alumni: [],
  grievances: [
      { id: 'TKT123', studentId: 'STU123', studentName: 'Demo Student', date: '2024-07-18', category: 'Hostel', subject: 'Leaking Faucet in Room A-101', description: 'The faucet in my room has been leaking for two days.', status: 'Pending', department: 'Hostel', assignedTo: 'Faculty' }
  ],
  committees: [],
  notices: [],
  session: null,
  roles: [
    { name: 'Admin', description: 'Full access to all system features.' },
    { name: 'Faculty', description: 'Access to attendance, grades, and course management.' },
    { name: 'Accountant', description: 'Access to fee and payroll management.' },
    { name: 'Student', description: 'Access to the student portal.' },
    { name: 'Librarian', description: 'Access to library management.' },
    { name: 'Hostel Warden', description: 'Access to hostel management.' },
  ],
  permissions: [
    { id: 'dashboard', label: 'View Dashboard' },
    { id: 'students', label: 'Manage Students' },
    { id: 'attendance', label: 'Manage Attendance' },
    { id: 'fees', label: 'Manage Fees' },
  ],
  rolePermissions: {
    'Admin': ['dashboard', 'students', 'attendance', 'fees'],
    'Faculty': ['dashboard', 'attendance'],
    'Accountant': ['dashboard', 'fees'],
    'Student': ['dashboard'],
    'Librarian': ['dashboard'],
    'Hostel Warden': ['dashboard'],
  },
  settings: {
    academicSession: '2025-2026',
    admissionDeadline: '2025-08-31',
    obeMode: true,
    universityName: 'Obsidian Peak University',
    universityLogoUrl: '',
    maintenanceMode: false,
  },
});

const initializeDb = () => {
    if (typeof window === 'undefined') return;
    if (dbInitialized) return;

    try {
        const isInitializedOnStorage = localStorage.getItem('db_initialized_v15');
        if (!isInitializedOnStorage) {
            tableKeys.forEach(key => {
                const initialData = getInitialData();
                localStorage.setItem(key, JSON.stringify((initialData as any)[key]));
            });
            localStorage.setItem('db_initialized_v15', 'true');
        }
    } catch (error) {
        console.error("Failed to initialize DB from localStorage:", error);
    } finally {
        dbInitialized = true;
    }
};

function dispatchDbChangeEvent(table: keyof DbTables) {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('db-change', { detail: { table } }));
}

export const db = {
  getAll: <T extends keyof DbTables>(table: T): DbTables[T] => {
    initializeDb();
    if (typeof window === 'undefined') return [] as any;
    try {
        const data = localStorage.getItem(table);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error(`Failed to parse table ${table} from localStorage`, e);
        return [] as any;
    }
  },

  getById: <T extends keyof DbTables>(table: T, id: string): any | null => {
    initializeDb();
    if (typeof window === 'undefined') return null;
    const items: any[] = db.getAll(table) as any[];
    const primaryKey = table === 'students' ? 'roll' : table === 'subjects' ? 'code' : table === 'hostel' ? 'roomNo' : table === 'library' ? 'bookTitle' : 'id';
    return items.find((item: any) => item[primaryKey] === id) || null;
  },

  add: <T extends keyof DbTables>(table: T, item: any) => {
    initializeDb();
    if (typeof window === 'undefined') return;
    const items = db.getAll(table);
    // @ts-ignore
    items.push(item);
    localStorage.setItem(table, JSON.stringify(items));
    dispatchDbChangeEvent(table);
  },

  update: <T extends keyof DbTables>(table: T, id: string, updatedItem: any) => {
    initializeDb();
    if (typeof window === 'undefined') return;
    let items: any[] = db.getAll(table) as any[];
    const primaryKey = table === 'students' || table === 'fees' ? 'roll' : table === 'subjects' ? 'code' : table === 'hostel' ? 'roomNo' : table === 'library' ? 'bookTitle' : 'id';
    const itemIndex = items.findIndex((item: any) => item[primaryKey] === id);
    
    if (itemIndex > -1) {
        items[itemIndex] = { ...items[itemIndex], ...updatedItem };
    }
    
    localStorage.setItem(table, JSON.stringify(items));
    dispatchDbChangeEvent(table);
  },
  
  updateFee: (roll: string, feeType: FeeRecord['feeType'], newAmount: number) => {
    initializeDb();
    if (typeof window === 'undefined') return;
    let fees: FeeRecord[] = db.getAll('fees') as FeeRecord[];
    const feeIndex = fees.findIndex(f => f.roll === roll && f.feeType === feeType);
    if(feeIndex > -1) {
        fees[feeIndex].amount = newAmount;
        fees[feeIndex].date = new Date().toISOString().split('T')[0];
    } else {
        const student = db.getAll('students').find(s => s.roll === roll);
        if (student) {
            fees.push({
                roll,
                name: student.name,
                feeType,
                amount: newAmount,
                date: new Date().toISOString().split('T')[0]
            })
        }
    }
    localStorage.setItem('fees', JSON.stringify(fees));
    dispatchDbChangeEvent('fees');
  },


  delete: <T extends keyof DbTables>(table: T, id: string) => {
    initializeDb();
    if (typeof window === 'undefined') return;
    let items: any[] = db.getAll(table) as any[];
    const primaryKey = table === 'students' || table === 'hostel' ? 'roll' : table === 'subjects' ? 'code' : table === 'rooms' ? 'roomNo' : table === 'library' ? 'bookTitle' : 'id';
    items = items.filter((item: any) => item[primaryKey] !== id);
    localStorage.setItem(table, JSON.stringify(items));
    dispatchDbChangeEvent(table);
  },
  
  get: <T extends keyof DbTables>(table: T): DbTables[T] | null => {
    initializeDb();
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(table);
    try {
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error(`Failed to parse table ${table} from localStorage`, e);
        return null;
    }
  },
  
  set: <T extends keyof DbTables>(table: T, data: DbTables[T]) => {
     initializeDb();
     if (typeof window === 'undefined') return;
     localStorage.setItem(table, JSON.stringify(data));
     dispatchDbChangeEvent(table);
  },

  verifyPassword(email: string, password: string): { success: boolean; message?: string; userType?: 'student' | 'admin' | 'faculty' } {
      initializeDb();
      if (email === 'anshvaish4466@gmail.com' && password === 'admin123') {
        db.set('session', { isLoggedIn: true, user: email, userType: 'admin' });
        return { success: true, userType: 'admin' };
      }
      
      const faculty = db.getAll('faculty').find(f => f.email === email);
      if (faculty && faculty.password === password) {
            db.set('session', { isLoggedIn: true, user: email, userType: 'faculty' });
          return { success: true, userType: 'faculty' };
      }

      const student = db.getAll('students').find(s => s.email === email);
      if (student && student.password === password) {
        db.set('session', { isLoggedIn: true, user: email, userType: 'student' });
        return { success: true, userType: 'student' };
      }

      return { success: false, message: 'Invalid credentials.' };
  },

  changePassword(email: string, currentPassword: string, newPassword: string): { success: boolean; message: string } {
    initializeDb();
    const students: Student[] = db.getAll('students');
    const studentIndex = students.findIndex(s => s.email === email);
    if (studentIndex > -1) {
        if (students[studentIndex].password === currentPassword) {
            students[studentIndex].password = newPassword;
            db.set('students', students);
            return { success: true, message: "Password updated successfully." };
        } else {
            return { success: false, message: "Incorrect current password." };
        }
    }

    const faculty: Faculty[] = db.getAll('faculty');
    const facultyIndex = faculty.findIndex(f => f.email === email);
     if (facultyIndex > -1) {
        if (faculty[facultyIndex].password === currentPassword) {
            faculty[facultyIndex].password = newPassword;
            db.set('faculty', faculty);
            return { success: true, message: "Password updated successfully." };
        } else {
            return { success: false, message: "Incorrect current password." };
        }
    }
    
    // Handle admin user
    if (email === 'anshvaish4466@gmail.com') {
      const studentAdmin = students.find(s => s.email === email);
      if(studentAdmin && studentAdmin.password === currentPassword) {
        studentAdmin.password = newPassword;
        db.set('students', students);
        return { success: true, message: "Password updated successfully." };
      } else {
        return { success: false, message: "Incorrect current password for admin." };
      }
    }


    return { success: false, message: "User not found." };
  },

  logout() {
    initializeDb();
    db.set('session', null);
  },

  getFeeForStudent(roll: string) {
    initializeDb();
    const student = this.getAll('students').find(s => s.roll === roll);
    if (!student) return null;
    const program = programDetailsData.find(p => p.programName === student.class);
    if (!program) return null;
    
    const allFees = this.getAll('fees').filter(f => f.roll === roll);
    const paid = allFees.reduce((acc, f) => acc + f.amount, 0);

    const total = program.fees.tuition + program.fees.examination + program.fees.other + (program.fees.training || 0) + program.fees.hostel;
    
    return {
      total,
      paid,
      due: total - paid,
    };
  }
};

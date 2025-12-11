// src/components/dashboard/admin/utils/mockDataGenerators.js

export const generateMockUsers = () => {
  const names = ['Ahmed Khan', 'Fatima Rahman', 'Rahim Ali', 'Sadia Islam', 'Karim Hossain', 'Nadia Chowdhury', 'Imran Sheikh', 'Ayesha Begum'];
  const roles = ['student', 'tutor', 'admin'];
  const statuses = ['active', 'suspended', 'blocked'];
  
  return Array.from({ length: 20 }, (_, i) => ({
    _id: `user_${i + 1}`,
    name: names[Math.floor(Math.random() * names.length)],
    email: `user${i + 1}@etuitionbd.com`,
    phone: `01712${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
  }));
};

export const generateMockTuitions = () => {
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology', 'ICT'];
  const classes = ['Class 8', 'Class 9', 'Class 10', 'SSC', 'HSC'];
  const locations = ['Dhanmondi', 'Gulshan', 'Banani', 'Mirpur', 'Uttara', 'Mohammadpur'];
  const statuses = ['pending', 'approved', 'ongoing', 'completed', 'rejected'];
  
  return Array.from({ length: 15 }, (_, i) => ({
    _id: `tuition_${i + 1}`,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    class: classes[Math.floor(Math.random() * classes.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    salary: (Math.floor(Math.random() * 5) + 3) * 1000,
    daysPerWeek: Math.floor(Math.random() * 3) + 3,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    student: {
      name: 'Student ' + (i + 1),
      email: `student${i + 1}@example.com`
    },
    applications: Array.from({ length: Math.floor(Math.random() * 8) }),
    requirements: 'Experienced tutor needed for home tuition',
    createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
  }));
};

export const generateMockPayments = () => {
  const types = ['Tuition Payment', 'Registration Fee', 'Commission'];
  const statuses = ['completed', 'pending'];
  
  return Array.from({ length: 25 }, (_, i) => ({
    _id: `payment_${i + 1}`,
    user: {
      name: 'User ' + (i + 1)
    },
    type: types[Math.floor(Math.random() * types.length)],
    amount: (Math.floor(Math.random() * 10) + 1) * 1000,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
  }));
};

export const generateMockStats = () => ({
  users: { total: 1250, students: 850, tutors: 380, admins: 20 },
  tuitions: { total: 567, pending: 45, approved: 234, ongoing: 178, completed: 110 },
  payments: { total: 340, revenue: 2450000, pending: 25000 },
  applications: 892
});
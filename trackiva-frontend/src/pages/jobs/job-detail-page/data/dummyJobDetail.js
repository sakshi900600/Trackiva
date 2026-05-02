const dummyJobDetail = {
  _id: "job_001",
  title: "Senior Frontend Engineer",
  company: "Stripe",
  status: "Interview",
  platform: { name: "LinkedIn", type: "Job Board" },
  confidence: 72,

  jobInfo: {
    location: "San Francisco, CA (Hybrid)",
    salary: "$140,000 – $180,000",
    appliedDate: "Apr 18, 2025",
    lastUpdated: "Apr 26, 2025",
  },

  links: {
    jobUrl: "https://stripe.com/jobs/123",
    applicationUrl: "https://stripe.com/apply/123",
    companySite: "https://stripe.com",
    recruiterProfile: "https://linkedin.com/in/recruiter",
  },

  tags: ["React", "TypeScript", "Fintech", "Remote-friendly"],

  statusHistory: [
    { status: "Applied", date: "Apr 18, 2025" },
    { status: "Screening", date: "Apr 21, 2025" },
    { status: "Interview", date: "Apr 26, 2025" },
  ],

  resume: {
    name: "SreejithCV_2025.pdf",
    uploadedAt: "Apr 17, 2025",
  },

  notes: [
    {
      id: "n1",
      text: "Spoke with recruiter Sarah — she mentioned the team is growing fast and values ownership.",
      createdAt: "2025-04-21T10:30:00Z",
    },
    {
      id: "n2",
      text: "Technical round focuses on system design + React performance patterns.",
      createdAt: "2025-04-24T14:00:00Z",
    },
  ],

  reminders: [
    {
      id: "r1",
      text: "Send thank-you email after interview",
      date: "2025-04-28",
      completed: false,
    },
    {
      id: "r2",
      text: "Follow up if no response by May 5",
      date: "2025-05-05",
      completed: false,
    },
  ],

  contacts: [
    {
      id: "c1",
      name: "Sarah Mitchell",
      role: "Recruiter",
      email: "sarah.m@stripe.com",
    },
    {
      id: "c2",
      name: "James Forrest",
      role: "Engineering Manager",
      email: "jforrest@stripe.com",
    },
  ],

  extras: {
    referral: true,
    coverLetter: true,
    skillGap: ["GraphQL", "Go basics"],
  },
};

export default dummyJobDetail;
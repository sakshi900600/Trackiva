const dummyJobDetail = {
  id: "job_1",

  title: "Product Designer",
  company: "Spotify",

  status: "Applied", // Applied | Screening | Interview | Offer

  jobInfo: {
    location: "New York, NY",
    salary: "$115k - $165k",
    appliedDate: "2026-04-02",
    lastUpdated: "2026-04-02",
  },

  notes: [
    {
      id: "note_1",
      text: "Strong focus on UX research.",
      createdAt: "2026-04-02",
    },
  ],

  reminders: [
    {
      id: "rem_1",
      text: "Follow up on application",
      date: "2026-04-05",
      completed: false,
    },
    {
      id: "rem_2",
      text: "Prepare for interview",
      date: "2026-04-08",
      completed: false,
    },
  ],

  confidence: 86, // 0 - 100

  platform: {
    name: "LinkedIn",
    type: "Job Board",
  },

  contacts: [
    {
      id: "contact_1",
      name: "John Doe",
      role: "Recruiter",
      email: "john@spotify.com",
    },
  ],

  resume: {
    name: "resume_v3.pdf",
    uploadedAt: "2026-04-01",
  },

  extras: {
    referral: true,
    coverLetter: true,
    skillGap: ["Figma Advanced", "User Research"],
  },
};

export default dummyJobDetail;
import Job from "../jobs/job.model.js";

// 📅 Date Filter
const getDateFilter = (range) => {
  const now = new Date();

  if (range === "week") {
    const d = new Date();
    d.setDate(now.getDate() - 7);
    return d;
  }

  if (range === "month") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  if (range === "year") {
    return new Date(now.getFullYear(), 0, 1);
  }

  return null;
};

// 🔥 MAIN DASHBOARD (ALL IN ONE)
export const getAnalytics = async (userId, range = "all") => {
  const dateFilter = getDateFilter(range);

  const match = { userId };
  if (dateFilter) match.appliedDate = { $gte: dateFilter };

  const jobs = await Job.find(match);

  const total = jobs.length;

  const interviews = jobs.filter(j => j.status === "interview").length;
  const offers = jobs.filter(j => j.status === "offer").length;
  const rejected = jobs.filter(j => j.status === "rejected").length;
  const screening = jobs.filter(j => j.status === "screening").length;

  // 🔥 THIS WEEK CALCULATION (NEW)
  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);

  const jobsThisWeek = jobs.filter(
    j => new Date(j.appliedDate) >= lastWeekDate
  );

  const totalThisWeek = jobsThisWeek.length;
  const interviewsThisWeek = jobsThisWeek.filter(j => j.status === "interview").length;
  const offersThisWeek = jobsThisWeek.filter(j => j.status === "offer").length;
  const rejectedThisWeek = jobsThisWeek.filter(j => j.status === "rejected").length;

  // 📊 Rates
  const successRate = total ? ((offers / total) * 100).toFixed(1) : 0;
  const interviewRate = total ? ((interviews / total) * 100).toFixed(1) : 0;
  const offerConversion = interviews ? ((offers / interviews) * 100).toFixed(1) : 0;

  // ⏱️ Avg Response Time
  let totalDays = 0;
  let count = 0;

  jobs.forEach(job => {
    const applied = job.statusHistory.find(s => s.status === "applied");
    const response = job.statusHistory.find(s =>
      ["screening", "interview", "offer"].includes(s.status)
    );

    if (applied && response) {
      const diff = (response.date - applied.date) / (1000 * 60 * 60 * 24);
      totalDays += diff;
      count++;
    }
  });

  const avgResponseTime = count ? (totalDays / count).toFixed(1) : 0;

  // 📊 Status Distribution (%)
  const statusDist = [
    { label: "Applied", value: total ? ((total / total) * 100).toFixed(0) : 0 },
    { label: "Screening", value: total ? ((screening / total) * 100).toFixed(0) : 0 },
    { label: "Interview", value: total ? ((interviews / total) * 100).toFixed(0) : 0 },
    { label: "Offer", value: total ? ((offers / total) * 100).toFixed(0) : 0 },
    { label: "Rejected", value: total ? ((rejected / total) * 100).toFixed(0) : 0 },
  ];

  // 🔥 Funnel
  const funnel = {
    applied: total,
    screening,
    interview: interviews,
    offer: offers,
    conversion: {
      appliedToScreening: total ? ((screening / total) * 100).toFixed(1) : 0,
      screeningToInterview: screening ? ((interviews / screening) * 100).toFixed(1) : 0,
      interviewToOffer: interviews ? ((offers / interviews) * 100).toFixed(1) : 0,
    },
  };

  // 🏢 Platform Stats
  const platformMap = {};

  jobs.forEach(j => {
    if (!platformMap[j.platform]) {
      platformMap[j.platform] = { applications: 0, interviews: 0, offers: 0 };
    }

    platformMap[j.platform].applications++;

    if (j.status === "interview") platformMap[j.platform].interviews++;
    if (j.status === "offer") platformMap[j.platform].offers++;
  });

  const platforms = Object.entries(platformMap).map(([name, val]) => ({
    name,
    applications: val.applications,
    interviews: val.interviews,
    offers: val.offers,
    responseRate: val.applications
      ? ((val.interviews + val.offers) / val.applications * 100).toFixed(1)
      : 0,
  }));

  // 📈 Trends (month wise)
  const trendsMap = {};

  jobs.forEach(j => {
    const d = new Date(j.appliedDate);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;

    if (!trendsMap[key]) {
      trendsMap[key] = { applications: 0, interviews: 0, offers: 0 };
    }

    trendsMap[key].applications++;
    if (j.status === "interview") trendsMap[key].interviews++;
    if (j.status === "offer") trendsMap[key].offers++;
  });

  const trends = Object.entries(trendsMap).map(([month, val]) => ({
    month,
    ...val,
  }));

  // 🎯 FINAL RESPONSE (UI READY)
  return {
    overview: {
      total,
      successRate,
      avgResponseTime: `${avgResponseTime}d`,
      interviewRate,
      offerConversion,
    },

    // 🔥 NEW (for JobStats UI)
    jobStats: {
      totalApplications: {
        value: total,
        thisWeek: totalThisWeek,
      },
      interviews: {
        value: interviews,
        thisWeek: interviewsThisWeek,
      },
      offers: {
        value: offers,
        thisWeek: offersThisWeek,
      },
      rejections: {
        value: rejected,
        thisWeek: rejectedThisWeek,
      },
    },

    statusDistribution: statusDist,
    funnel,
    platforms,
    trends,
  };
};
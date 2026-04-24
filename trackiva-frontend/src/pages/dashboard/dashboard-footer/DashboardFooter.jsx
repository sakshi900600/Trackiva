import React from "react";
import styles from "./DashboardFooter.module.css";
import FooterCard from "../../../components/footer-card/FooterCard";

// Icons (you can change if needed)
import { Lightbulb, Target, Rocket } from "lucide-react";

const DashboardFooter = () => {
  return (
    <div className={styles.container}>
      {/* Card 1 */}
      <FooterCard
        title="Smart Tip"
        description="Tailor your resume for each job. <br/> Use keywords from the job description."
        subText="Increases shortlisting chances 🚀"
        icon={Lightbulb}
        color="purple"
      />

      {/* Card 2 */}
      <FooterCard
        title="Weekly Focus"
        description="Apply to at least <b>15 quality jobs</b> instead of mass applying."
        subText="Quality > Quantity 🎯"
        icon={Target}
        color="green"
      />

      {/* Card 3 */}
      <FooterCard
        title="Growth Hack"
        description="Reach out to recruiters on LinkedIn after applying."
        subText="Boost your visibility 🔥"
        icon={Rocket}
        color="blue"
      />
    </div>
  );
};

export default DashboardFooter;
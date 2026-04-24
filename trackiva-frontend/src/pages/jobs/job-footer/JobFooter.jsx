import React from "react";
import styles from "./JobFooter.module.css";
import FooterCard from "../../../components/footer-card/FooterCard";

// Icons
import { Lightbulb, Target } from "lucide-react";

const footerData = [
  {
    title: "Interview Quick Tips",
    description:
      "Prepare <b>real-world examples</b> for behavioral questions.Practice <b>mock interviews</b> regularly.",
    subText: "Stay confident and be yourself.",
    icon: Lightbulb,
    color: "purple",
  },
  {
    title: "Application Strategy",
    description:
      "Tailor your <b>resume</b> for each role.<br/>Follow up after <b>7-10 days</b> of applying.",
    subText: "Consistency beats luck.",
    icon: Target,
    color: "blue",
  },
];

const JobFooter = () => {
  return (
    <div className={styles.container}>
      {footerData.map((item, index) => (
        <FooterCard key={index} {...item} />
      ))}
    </div>
  );
};

export default JobFooter;
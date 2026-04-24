import { useState, useEffect } from "react";
import { ChevronLeft, Clipboard, Save, Lightbulb } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { showSuccess, showError, showLoading, dismissToast } from "../../../utils/toast";
import { saveCoverLetter, getCoverLetter } from "../../../api/cover-letter";
import styles from "./CoverLetterPage.module.css";

export default function CoverLetterPage() {
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { jobId } = useParams();

  // Check if content has changed to toggle Save/Copy button
  const hasChanges = content !== originalContent;

  useEffect(() => {
    const fetchLetter = async () => {
      if (!jobId) return;
      try {
        const response = await getCoverLetter(jobId);
        if (response.data?.data) {
          const savedContent = response.data.data.content;
          setContent(savedContent);
          setOriginalContent(savedContent);
        }
      } catch (err) {
        console.log("Starting fresh cover letter.");
      }
    };
    fetchLetter();
  }, [jobId]);

  const handleSave = async () => {
    if (!content.trim()) return showError("Letter cannot be empty!");
    const toastId = showLoading("Saving...");
    setIsSaving(true);
    try {
      await saveCoverLetter({ jobId, content });
      setOriginalContent(content);
      dismissToast(toastId);
      showSuccess("Saved successfully!");
    } catch (error) {
      dismissToast(toastId);
      showError(error.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    showSuccess("Copied to clipboard!");
  };

  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <nav className={styles.navHeader}>
        <button onClick={() => navigate("/jobs")} className={styles.backBtn}>
          <ChevronLeft size={20} />
          Back to Jobs
        </button>
      </nav>

      <div className={styles.header}>
        <h1>Cover Letter Builder</h1>
        <p>Craft a compelling narrative for your next role.</p>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Side: Editor */}
        <div className={styles.leftColumn}>
          <div className={styles.editorCard}>
            <div className={styles.cardHeader}>
              <h2>Write Your Letter</h2>
              <div className={styles.actions}>
                {hasChanges ? (
                  <button onClick={handleSave} className={styles.saveActionBtn} disabled={isSaving}>
                    <Save size={16} /> Save Changes
                  </button>
                ) : (
                  <button onClick={handleCopy} className={styles.iconBtn} title="Copy text">
                    <Clipboard size={18} />
                  </button>
                )}
              </div>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Start typing your personalized cover letter here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className={styles.tipsCard}>
            <div className={styles.cardHeader}>
              <Lightbulb size={20} className={styles.tipIcon} />
              <h2>Pro Tips</h2>
            </div>
            <ul>
              <li><strong>Personalize:</strong> Mention specific projects or company values.</li>
              <li><strong>Quantify:</strong> Use numbers (e.g., "Improved efficiency by 20%").</li>
              <li><strong>The 'Hook':</strong> Start with why you are uniquely excited about them.</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Professional Template */}
        <div className={styles.rightColumn}>
          <div className={styles.templateCard}>
            <div className={styles.templateBrand}>Professional Format</div>
            <div className={styles.letterFormat}>
              <header className={styles.letterHeader}>
                <div className={styles.contactInfo}>
                  <p className={styles.bold}>[Your Full Name]</p>
                  <p>[City, State, Zip Code]</p>
                  <p>[Email Address] | [Phone Number]</p>
                </div>
                <p className={styles.date}>{new Date().toLocaleDateString()}</p>
              </header>

              <section className={styles.recipientInfo}>
                <p>[Hiring Manager Name]</p>
                <p>[Company Name]</p>
                <p>[Company Address]</p>
              </section>

              <section className={styles.letterBody}>
                <p>Dear [Hiring Manager Name/Team],</p>
                <p>I am writing to express my interest in the <strong>[Position Title]</strong> role at <strong>[Company Name]</strong>.</p>
                <p>Having background in [Skill], I have successfully [mention achievement]. I am confident I can contribute to your team's success.</p>
                <p>Thank you for your time. I look forward to hearing from you.</p>
                <p>Sincerely,</p>
                <p className={styles.signature}>[Your Name]</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
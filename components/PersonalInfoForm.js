import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import styles from '../styles/ResumeForm.module.css';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const [formData, setFormData] = useState(resumeData.personalInfo);

  useEffect(() => {
    setFormData(resumeData.personalInfo);
  }, [resumeData.personalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    updatePersonalInfo(updatedData);
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Personal Information</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="portfolio">Portfolio/Website</label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="johndoe.com"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="summary">Professional Summary</label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Brief professional summary highlighting your key strengths and experience..."
          rows="4"
        />
      </div>
    </div>
  );
}

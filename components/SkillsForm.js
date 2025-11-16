import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import styles from '../styles/ResumeForm.module.css';

export default function SkillsForm() {
  const { resumeData, updateSkills } = useResume();
  const [technicalInput, setTechnicalInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [skills, setSkills] = useState({
    technical: [],
    soft: []
  });

  useEffect(() => {
    setSkills(resumeData.skills);
  }, [resumeData.skills]);

  const handleAddTechnical = (e) => {
    e.preventDefault();
    if (technicalInput.trim()) {
      const newSkills = {
        ...skills,
        technical: [...skills.technical, technicalInput.trim()]
      };
      setSkills(newSkills);
      updateSkills(newSkills);
      setTechnicalInput('');
    }
  };

  const handleAddSoft = (e) => {
    e.preventDefault();
    if (softInput.trim()) {
      const newSkills = {
        ...skills,
        soft: [...skills.soft, softInput.trim()]
      };
      setSkills(newSkills);
      updateSkills(newSkills);
      setSoftInput('');
    }
  };

  const handleRemoveTechnical = (index) => {
    const newSkills = {
      ...skills,
      technical: skills.technical.filter((_, i) => i !== index)
    };
    setSkills(newSkills);
    updateSkills(newSkills);
  };

  const handleRemoveSoft = (index) => {
    const newSkills = {
      ...skills,
      soft: skills.soft.filter((_, i) => i !== index)
    };
    setSkills(newSkills);
    updateSkills(newSkills);
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Skills</h2>

      <div className={styles.skillsContainer}>
        <div className={styles.skillCategory}>
          <h3>Technical Skills</h3>
          <form onSubmit={handleAddTechnical} className={styles.skillInputForm}>
            <input
              type="text"
              value={technicalInput}
              onChange={(e) => setTechnicalInput(e.target.value)}
              placeholder="e.g., JavaScript, Python, React"
              className={styles.skillInput}
            />
            <button type="submit" className={styles.addSkillButton}>
              Add
            </button>
          </form>
          <div className={styles.skillsList}>
            {skills.technical.map((skill, index) => (
              <div key={index} className={styles.skillTag}>
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTechnical(index)}
                  className={styles.removeSkillButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.skillCategory}>
          <h3>Soft Skills</h3>
          <form onSubmit={handleAddSoft} className={styles.skillInputForm}>
            <input
              type="text"
              value={softInput}
              onChange={(e) => setSoftInput(e.target.value)}
              placeholder="e.g., Leadership, Communication"
              className={styles.skillInput}
            />
            <button type="submit" className={styles.addSkillButton}>
              Add
            </button>
          </form>
          <div className={styles.skillsList}>
            {skills.soft.map((skill, index) => (
              <div key={index} className={styles.skillTag}>
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSoft(index)}
                  className={styles.removeSkillButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

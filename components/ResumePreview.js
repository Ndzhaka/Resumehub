import { useResume } from '../context/ResumeContext';
import styles from '../styles/ResumePreview.module.css';

export default function ResumePreview() {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, skills, projects } = resumeData;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className={styles.preview} id="resume-preview">
      <div className={styles.resumePage}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.name}>{personalInfo.fullName || 'Your Name'}</h1>
          <div className={styles.contactInfo}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          <div className={styles.links}>
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Summary</h2>
            <p className={styles.summary}>{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Work Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div>
                    <h3 className={styles.entryTitle}>{exp.position}</h3>
                    <div className={styles.entrySubtitle}>{exp.company}</div>
                  </div>
                  <div className={styles.entryDate}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.location && <div className={styles.location}>{exp.location}</div>}
                {exp.description && (
                  <div className={styles.description}>
                    {exp.description.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            {projects.map(project => (
              <div key={project.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div>
                    <h3 className={styles.entryTitle}>{project.name}</h3>
                    {project.technologies && (
                      <div className={styles.entrySubtitle}>{project.technologies}</div>
                    )}
                  </div>
                </div>
                {project.link && (
                  <div className={styles.projectLink}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.link}
                    </a>
                  </div>
                )}
                {project.description && (
                  <div className={styles.description}>
                    {project.description.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div>
                    <h3 className={styles.entryTitle}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className={styles.entrySubtitle}>{edu.school}</div>
                  </div>
                  <div className={styles.entryDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.gpa && <div className={styles.gpa}>GPA: {edu.gpa}</div>}
                {edu.description && (
                  <div className={styles.description}>
                    {edu.description.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            {skills.technical.length > 0 && (
              <div className={styles.skillCategory}>
                <strong>Technical:</strong> {skills.technical.join(', ')}
              </div>
            )}
            {skills.soft.length > 0 && (
              <div className={styles.skillCategory}>
                <strong>Soft Skills:</strong> {skills.soft.join(', ')}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

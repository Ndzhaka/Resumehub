import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import styles from '../styles/ResumeForm.module.css';

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateExperience(editingId, formData);
      setEditingId(null);
    } else {
      addExperience(formData);
    }
    resetForm();
  };

  const handleEdit = (exp) => {
    setFormData({
      company: exp.company,
      position: exp.position,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      current: exp.current || false,
      description: exp.description || ''
    });
    setEditingId(exp.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        {!showForm && (
          <button
            type="button"
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            + Add Experience
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.entryForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="position">Position/Title *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
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
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="month"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="endDate">End Date</label>
              <input
                type="month"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.current}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="current"
                  checked={formData.current}
                  onChange={handleChange}
                />
                Currently working here
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="• Developed and maintained...&#10;• Led a team of...&#10;• Improved performance by..."
              rows="5"
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>
              {editingId ? 'Update' : 'Save'}
            </button>
            <button type="button" className={styles.cancelButton} onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className={styles.entriesList}>
        {resumeData.experience.map(exp => (
          <div key={exp.id} className={styles.entryCard}>
            <div className={styles.entryHeader}>
              <div>
                <h3>{exp.position}</h3>
                <p className={styles.entrySubtitle}>{exp.company}</p>
              </div>
              <div className={styles.entryActions}>
                <button onClick={() => handleEdit(exp)} className={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => removeExperience(exp.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
            <p className={styles.entryDate}>
              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              {exp.location && ` • ${exp.location}`}
            </p>
            {exp.description && (
              <p className={styles.entryDescription}>{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

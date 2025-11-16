import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import styles from '../styles/ResumeForm.module.css';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateEducation(editingId, formData);
      setEditingId(null);
    } else {
      addEducation(formData);
    }
    resetForm();
  };

  const handleEdit = (edu) => {
    setFormData({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      gpa: edu.gpa || '',
      description: edu.description || ''
    });
    setEditingId(edu.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Education</h2>
        {!showForm && (
          <button
            type="button"
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            + Add Education
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.entryForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="school">School/University *</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="degree">Degree *</label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="Bachelor's, Master's, etc."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="field">Field of Study *</label>
              <input
                type="text"
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                placeholder="Computer Science"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gpa">GPA (Optional)</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="3.8/4.0"
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
              <label htmlFor="endDate">End Date *</label>
              <input
                type="month"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Relevant coursework, achievements, honors..."
              rows="3"
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
        {resumeData.education.map(edu => (
          <div key={edu.id} className={styles.entryCard}>
            <div className={styles.entryHeader}>
              <div>
                <h3>{edu.degree} in {edu.field}</h3>
                <p className={styles.entrySubtitle}>{edu.school}</p>
              </div>
              <div className={styles.entryActions}>
                <button onClick={() => handleEdit(edu)} className={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => removeEducation(edu.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
            <p className={styles.entryDate}>
              {edu.startDate} - {edu.endDate}
            </p>
            {edu.gpa && <p className={styles.entryDetail}>GPA: {edu.gpa}</p>}
            {edu.description && <p className={styles.entryDescription}>{edu.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

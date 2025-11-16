import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import styles from '../styles/ResumeForm.module.css';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    technologies: '',
    link: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
      setEditingId(null);
    } else {
      addProject(formData);
    }
    resetForm();
  };

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      technologies: project.technologies || '',
      link: project.link || '',
      description: project.description || ''
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      technologies: '',
      link: '',
      description: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        {!showForm && (
          <button
            type="button"
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            + Add Project
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.entryForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Project Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="technologies">Technologies Used</label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="link">Project Link</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the project, your role, and key achievements..."
              rows="4"
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
        {resumeData.projects.map(project => (
          <div key={project.id} className={styles.entryCard}>
            <div className={styles.entryHeader}>
              <div>
                <h3>{project.name}</h3>
                {project.technologies && (
                  <p className={styles.entrySubtitle}>{project.technologies}</p>
                )}
              </div>
              <div className={styles.entryActions}>
                <button onClick={() => handleEdit(project)} className={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => removeProject(project.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
            {project.link && (
              <p className={styles.entryDetail}>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.link}
                </a>
              </p>
            )}
            {project.description && (
              <p className={styles.entryDescription}>{project.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

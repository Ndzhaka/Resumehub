import { useState } from 'react';
import Head from 'next/head';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from '../components/PersonalInfoForm';
import EducationForm from '../components/EducationForm';
import ExperienceForm from '../components/ExperienceForm';
import SkillsForm from '../components/SkillsForm';
import ProjectsForm from '../components/ProjectsForm';
import ResumePreview from '../components/ResumePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../styles/Builder.module.css';

export default function Builder() {
  const { clearResume } = useResume();
  const [activeTab, setActiveTab] = useState('personal');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('resume-preview');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all resume data? This cannot be undone.')) {
      clearResume();
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', component: PersonalInfoForm },
    { id: 'experience', label: 'Experience', component: ExperienceForm },
    { id: 'education', label: 'Education', component: EducationForm },
    { id: 'projects', label: 'Projects', component: ProjectsForm },
    { id: 'skills', label: 'Skills', component: SkillsForm }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <>
      <Head>
        <title>Resume Builder - ResumeHub</title>
        <meta name="description" content="Build your professional resume" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Resume Builder</h1>
          <div className={styles.actions}>
            <button
              onClick={handleExportPDF}
              className={styles.exportButton}
              disabled={isExporting}
            >
              {isExporting ? 'Generating PDF...' : 'Download PDF'}
            </button>
            <button
              onClick={handleClearAll}
              className={styles.clearButton}
            >
              Clear All
            </button>
          </div>
        </header>

        <div className={styles.main}>
          <div className={styles.editorPanel}>
            <div className={styles.tabs}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.formContainer}>
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>

          <div className={styles.previewPanel}>
            <div className={styles.previewHeader}>
              <h2>Preview</h2>
            </div>
            <ResumePreview />
          </div>
        </div>
      </div>
    </>
  );
}

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ResumeHub - Professional Resume Builder</title>
        <meta name="description" content="Create professional resumes easily with ResumeHub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>ResumeHub</span>
        </h1>

        <p className={styles.description}>
          Create professional, polished resumes in minutes with our easy-to-use builder
        </p>

        <Link href="/builder">
          <a className={styles.ctaButton}>
            Start Building Your Resume &rarr;
          </a>
        </Link>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Easy to Use</h3>
            <p>Simple, intuitive interface to build your resume step by step with real-time preview.</p>
          </div>

          <div className={styles.card}>
            <h3>Professional Templates</h3>
            <p>Clean, professional design that highlights your skills and experience effectively.</p>
          </div>

          <div className={styles.card}>
            <h3>Export to PDF</h3>
            <p>Download your completed resume as a PDF ready for job applications.</p>
          </div>

          <div className={styles.card}>
            <h3>Auto-Save</h3>
            <p>Your progress is automatically saved locally, so you never lose your work.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>ResumeHub - Build Your Professional Resume</p>
      </footer>
    </div>
  )
}

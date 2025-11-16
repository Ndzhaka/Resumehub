import '../styles/globals.css'
import { ResumeProvider } from '../context/ResumeContext'

function MyApp({ Component, pageProps }) {
  return (
    <ResumeProvider>
      <Component {...pageProps} />
    </ResumeProvider>
  )
}

export default MyApp

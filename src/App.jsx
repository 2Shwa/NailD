import { useEffect, useState } from 'react'
import { ONBOARDING_DURATION_MS } from './appConfig'
import MainHome from './MainHome'
import OnboardingScreen from './OnboardingScreen'
import './App.css'

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowOnboarding(false)
    }, ONBOARDING_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [])

  if (!showOnboarding) {
    return <MainHome />
  }

  return (
    <main className="app-shell">
      <OnboardingScreen />
    </main>
  )
}

export default App

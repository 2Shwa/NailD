import { useEffect, useState } from 'react'
import MainHome from './mainHome/MainHome'
import OnboardingScreen from './onboarding/OnboardingScreen'
import './App.css'

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowOnboarding(false)
    }, 2000)

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

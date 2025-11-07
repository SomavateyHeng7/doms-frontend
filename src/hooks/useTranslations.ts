import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

export function useTranslations() {
  const { t, i18n } = useTranslation('common')
  const [isHydrated, setIsHydrated] = useState(false)
  
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  
  return {
    t,
    language: isHydrated ? i18n.language : 'en',
    changeLanguage: i18n.changeLanguage,
    isHydrated
  }
}
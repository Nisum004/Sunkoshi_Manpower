'use client'
import { useEffect } from 'react'
import { integrations } from '@/data/company'

export default function TawkTo() {
  useEffect(() => {
    const { enabled, propertyId, widgetId } = integrations.tawkto
    if (!enabled || !propertyId || !widgetId) return
    var Tawk_API = Tawk_API || {}
    var s1 = document.createElement('script')
    s1.async = true
    s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    document.head.appendChild(s1)
  }, [])
  return null
}

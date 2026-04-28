'use client'
import { social } from '@/data/company'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const msg = encodeURIComponent('Hello Sunkoshi Manpower, I would like to know more about working abroad.')
  return (
    <a
      href={`https://wa.me/${social.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed', bottom: 30, right: 28, zIndex: 9000,
        width: 58, height: 58, borderRadius: '50%',
        background: '#25D366', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)' }}
    >
      <MessageCircle size={26} fill="white" />
    </a>
  )
}

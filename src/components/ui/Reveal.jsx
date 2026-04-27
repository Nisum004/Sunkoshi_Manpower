'use client'
import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, direction = 'up', className, style, amount = 0.15 }) {
  const y = direction === 'up' ? 32 : direction === 'down' ? -32 : 0
  const x = direction === 'left' ? 32 : direction === 'right' ? -32 : 0
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

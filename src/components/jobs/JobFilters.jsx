'use client'
import { X } from 'lucide-react'

export default function JobFilters({ countries, categories, filter, setFilter }) {
  return (
    <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:32,alignItems:'center'}}>
      <span style={{fontSize:'0.82rem',color:'var(--muted)',fontWeight:600}}>Filter:</span>
      <select value={filter.country} onChange={e=>setFilter(f=>({...f,country:e.target.value}))}
        style={{padding:'9px 14px',borderRadius:8,border:'1.5px solid var(--border)',fontFamily:'var(--ff-body)',fontSize:'0.85rem',background:'var(--white)',color:'var(--dark)',cursor:'pointer',outline:'none'}}>
        <option value="">All Countries</option>
        {countries.map(c=><option key={c}>{c}</option>)}
      </select>
      <select value={filter.category} onChange={e=>setFilter(f=>({...f,category:e.target.value}))}
        style={{padding:'9px 14px',borderRadius:8,border:'1.5px solid var(--border)',fontFamily:'var(--ff-body)',fontSize:'0.85rem',background:'var(--white)',color:'var(--dark)',cursor:'pointer',outline:'none'}}>
        <option value="">All Categories</option>
        {categories.map(c=><option key={c}>{c}</option>)}
      </select>
      {(filter.country||filter.category)&&(
        <button onClick={()=>setFilter({country:'',category:''})} style={{padding:'9px 14px',borderRadius:8,border:'1.5px solid var(--border)',background:'none',fontFamily:'var(--ff-body)',fontSize:'0.85rem',cursor:'pointer',color:'var(--muted)',display:'flex',alignItems:'center',gap:6}}>
          <X size={14}/> Clear
        </button>
      )}
    </div>
  )
}

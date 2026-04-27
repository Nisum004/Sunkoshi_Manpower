function Sk({ w, h, r = 6, style: s = {} }) {
  return <div className="skeleton" style={{ width: w, height: h, borderRadius: r, ...s }} />
}

export function JobCardSkeleton() {
  return (
    <div style={{ background: 'var(--white)', borderRadius: 14, padding: 28, border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--light)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
        <Sk w={36} h={27} r={4} />
        <Sk w={80} h={22} r={100} />
      </div>
      <Sk w="70%" h={22} s={{ marginBottom: 8 }} />
      <Sk w="45%" h={15} s={{ marginBottom: 18 }} />
      <Sk w="60%" h={13} s={{ marginBottom: 8 }} />
      <Sk w="50%" h={13} s={{ marginBottom: 20 }} />
      <div style={{ display: 'flex', gap: 10 }}>
        <Sk w="100%" h={40} r={8} s={{ flex: 1 }} />
        <Sk w="100%" h={40} r={8} s={{ flex: 1 }} />
      </div>
    </div>
  )
}

export function NewsCardSkeleton() {
  return (
    <div style={{ background: 'var(--white)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <Sk w="100%" h={170} r={0} />
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <Sk w={70} h={18} r={100} />
          <Sk w={50} h={18} r={100} />
        </div>
        <Sk w="90%" h={15} s={{ marginBottom: 6 }} />
        <Sk w="70%" h={15} s={{ marginBottom: 12 }} />
        <Sk w="100%" h={12} s={{ marginBottom: 4 }} />
        <Sk w="80%" h={12} s={{ marginBottom: 4 }} />
        <Sk w="60%" h={12} s={{ marginBottom: 14 }} />
        <Sk w={80} h={14} />
      </div>
    </div>
  )
}

export function FeaturedNewsSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, background: 'var(--white)', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 48 }} className="news-featured">
      <Sk w="100%" h={320} r={0} />
      <div style={{ padding: '36px 36px 36px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        <Sk w={130} h={20} r={100} />
        <Sk w="90%" h={26} />
        <Sk w="75%" h={26} />
        <Sk w="100%" h={14} />
        <Sk w="85%" h={14} />
        <Sk w="65%" h={14} />
        <Sk w={100} h={14} />
        <Sk w={130} h={18} />
      </div>
    </div>
  )
}

export function JobDetailSkeleton() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <Sk w={48} h={36} r={4} s={{ opacity: 0.25 }} />
            <Sk w={90} h={28} r={100} s={{ opacity: 0.25 }} />
          </div>
          <Sk w="60%" h={44} s={{ marginBottom: 12, opacity: 0.25 }} />
          <Sk w="35%" h={20} s={{ opacity: 0.25 }} />
        </div>
      </div>
      <section style={{ padding: '72px 0', background: 'var(--pale)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40 }} className="detail-grid">
            <div>
              <div style={{ background: 'var(--white)', borderRadius: 16, padding: 36, border: '1px solid var(--border)', marginBottom: 24 }}>
                <Sk w={200} h={24} s={{ marginBottom: 20 }} />
                <Sk w="100%" h={14} s={{ marginBottom: 8 }} />
                <Sk w="95%" h={14} s={{ marginBottom: 8 }} />
                <Sk w="80%" h={14} s={{ marginBottom: 8 }} />
                <Sk w="85%" h={14} />
              </div>
              <div style={{ background: 'var(--white)', borderRadius: 16, padding: 36, border: '1px solid var(--border)' }}>
                <Sk w={160} h={24} s={{ marginBottom: 20 }} />
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
                    <Sk w={22} h={22} r="50%" />
                    <Sk w="80%" h={14} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--navy)', borderRadius: 16, padding: 28 }}>
              <Sk w={130} h={20} s={{ marginBottom: 24, background: 'rgba(255,255,255,0.12)' }} />
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <Sk w={80} h={10} s={{ marginBottom: 6, background: 'rgba(255,255,255,0.12)' }} />
                  <Sk w="70%" h={14} s={{ background: 'rgba(255,255,255,0.12)' }} />
                </div>
              ))}
              <Sk w="100%" h={44} r={8} s={{ marginTop: 8, background: 'rgba(200,168,75,0.25)' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function NewsDetailSkeleton() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Sk w={90} h={18} r={100} s={{ marginBottom: 16, opacity: 0.25 }} />
          <Sk w="65%" h={44} s={{ marginBottom: 12, opacity: 0.25 }} />
          <Sk w="40%" h={20} s={{ opacity: 0.25 }} />
        </div>
      </div>
      <section style={{ padding: '72px 0', background: 'var(--pale)' }}>
        <div className="container article-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, alignItems: 'start' }}>
          <div>
            <Sk w="100%" h={360} r={16} s={{ marginBottom: 32 }} />
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <Sk w={80} h={22} r={100} />
              <Sk w={120} h={22} r={100} />
            </div>
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: 36, border: '1px solid var(--border)' }}>
              {[100, 90, 95, 80, 70, 100, 85, 75, 60].map((w, i) => (
                <Sk key={i} w={`${w}%`} h={14} s={{ marginBottom: 10 }} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: 24, border: '1px solid var(--border)', marginBottom: 24 }}>
              <Sk w={120} h={18} s={{ marginBottom: 16 }} />
              <Sk w="100%" h={40} r={6} s={{ marginBottom: 10 }} />
              <Sk w="100%" h={40} r={6} />
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){.article-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}

import { useRef } from 'react'
import './CertificateViewer.css'

export default function CertificateViewer({ cert, industry, onBack }) {
  const certRef = useRef()

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    const text = `🎓 I just earned the ${cert.industry} Certificate from Electroduction!\nScore: ${cert.score}% | ID: ${cert.cert_id}\n🔗 electroduction.vercel.app`
    if (navigator.share) {
      navigator.share({ title: 'My Certificate', text })
    } else {
      navigator.clipboard.writeText(text)
      alert('Certificate details copied to clipboard!')
    }
  }

  return (
    <div className="cv-wrapper">
      <div className="cv-controls no-print">
        <button className="cv-btn cv-back" onClick={onBack}>← Back</button>
        <div className="cv-actions">
          <button className="cv-btn cv-share" onClick={handleShare}>🔗 Share</button>
          <button className="cv-btn cv-print" onClick={handlePrint}>⬇ Download / Print</button>
        </div>
      </div>

      <div className="cv-certificate" ref={certRef} style={{ '--cert-color': industry.color }}>
        {/* Header */}
        <div className="cv-header">
          <div className="cv-logo">⚡ ELECTRODUCTION</div>
          <div className="cv-subtitle">Multi-Industry Rapid Certificate Program</div>
        </div>

        {/* Border decoration */}
        <div className="cv-border-deco" style={{ background: industry.color }} />

        {/* Body */}
        <div className="cv-body">
          <p className="cv-presents">This certifies that</p>
          <h1 className="cv-name">{cert.learner_name}</h1>
          <p className="cv-completed">has successfully completed the</p>
          <h2 className="cv-program" style={{ color: industry.color }}>
            {industry.icon} {cert.industry} Certificate Program
          </h2>
          <p className="cv-description">
            Demonstrating knowledge across {cert.modules.length} modules with a final score of
          </p>
          <div className="cv-score" style={{ color: industry.color }}>{cert.score}%</div>

          {/* Module breakdown */}
          <div className="cv-modules">
            {cert.modules.map((m, i) => (
              <div key={i} className="cv-module-row">
                <span className="cv-module-name">{m.title}</span>
                <div className="cv-module-bar-track">
                  <div className="cv-module-bar-fill"
                    style={{ width: `${m.score}%`, background: industry.color }} />
                </div>
                <span className="cv-module-score">{m.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="cv-border-deco" style={{ background: industry.color }} />
        <div className="cv-footer">
          <div className="cv-footer-col">
            <div className="cv-sig-line" />
            <div className="cv-sig-name">Kenny Situ</div>
            <div className="cv-sig-title">Founder, Electroduction</div>
          </div>
          <div className="cv-footer-center">
            <div className="cv-seal" style={{ borderColor: industry.color, color: industry.color }}>
              <div className="cv-seal-inner">✓</div>
              <div className="cv-seal-text">VERIFIED</div>
            </div>
          </div>
          <div className="cv-footer-col cv-footer-right">
            <div className="cv-cert-id">Certificate ID: {cert.cert_id}</div>
            <div className="cv-cert-date">Issued: {formatDate(cert.issued_at)}</div>
            <div className="cv-cert-url">electroduction.vercel.app</div>
          </div>
        </div>
      </div>
    </div>
  )
}

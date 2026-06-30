import { useState, useEffect } from 'react'
import InputForm from './components/InputForm'
import LabelPreview from './components/LabelPreview'

function App() {
  const [barcodeNumber, setBarcodeNumber] = useState('')
  const [refNumber, setRefNumber] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const handleGenerate = (barcode: string, ref: string) => {
    setBarcodeNumber(barcode)
    setRefNumber(ref)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setBarcodeNumber('')
    setRefNumber('')
  }

  return (
    <div className="app">
      {/* Cabeçalho — oculto na impressão */}
      <header className="app-header no-print">
        <div className="app-header-inner">
          <div className="app-logo">
            <svg className="app-logo-icon" width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect x="0" y="2" width="3" height="24" fill="currentColor"/>
              <rect x="5" y="2" width="1.5" height="24" fill="currentColor"/>
              <rect x="8" y="2" width="4" height="24" fill="currentColor"/>
              <rect x="14" y="2" width="2" height="24" fill="currentColor"/>
              <rect x="18" y="2" width="1" height="24" fill="currentColor"/>
              <rect x="21" y="2" width="3.5" height="24" fill="currentColor"/>
              <rect x="26.5" y="2" width="1.5" height="24" fill="currentColor"/>
            </svg>
            <span className="app-logo-name">
              <span className="app-logo-main">Gerador de Etiquetas</span>
            </span>
          </div>

          <p className="app-tagline">Gere etiquetas A4 com código de barras prontas a imprimir</p>

          {/* Toggle modo escuro / claro */}
          <button
            id="theme-toggle-btn"
            className="theme-toggle no-print"
            onClick={() => setDarkMode(d => !d)}
            aria-label={darkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            title={darkMode ? 'Modo claro' : 'Modo escuro'}
          >
            <span aria-hidden="true">{darkMode ? '☀️' : '🌙'}</span>
            <span className="theme-toggle-knob" />
            <span>{darkMode ? 'Claro' : 'Escuro'}</span>
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Painel de entradas — oculto na impressão */}
        <section className="input-panel no-print" aria-label="Formulário de etiqueta">
          <InputForm
            onGenerate={handleGenerate}
            onReset={handleReset}
            hasLabel={submitted}
            currentBarcode={barcodeNumber}
            currentRef={refNumber}
          />
        </section>

        {/* Pré-visualização / etiqueta imprimível */}
        {submitted && (
          <section className="preview-panel" aria-label="Pré-visualização da etiqueta de código de barras">
            <div className="preview-panel-header no-print">
              <h2>Pré-visualização da Etiqueta</h2>
              <p className="preview-hint">É exactamente o que será impresso em A4</p>
            </div>
            <LabelPreview barcodeNumber={barcodeNumber} refNumber={refNumber} />
          </section>
        )}

        {!submitted && (
          <div className="empty-state no-print" aria-hidden="true">
            <div className="empty-state-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <rect x="4" y="10" width="8" height="60" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="16" y="10" width="4" height="60" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="24" y="10" width="10" height="60" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="38" y="10" width="5" height="60" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="47" y="10" width="3" height="60" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="54" y="10" width="9" height="60" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="67" y="10" width="4" height="60" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="75" y="10" width="2" height="60" rx="1" fill="currentColor" opacity="0.4"/>
              </svg>
            </div>
            <h2>Introduza os números para gerar uma etiqueta</h2>
            <p>Preencha o formulário à esquerda para criar uma etiqueta A4 com código de barras.</p>
          </div>
        )}
      </main>

      {/* Rodapé */}
      <footer className="app-footer no-print">
        © {new Date().getFullYear()} Gerador de Etiquetas &nbsp;·&nbsp; Desenvolvido por <strong>Selton de Souza</strong>
      </footer>
    </div>
  )
}

export default App

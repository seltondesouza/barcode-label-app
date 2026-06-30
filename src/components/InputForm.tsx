import { useState, useEffect } from 'react'

interface Props {
  onGenerate: (barcodeNumber: string, refNumber: string) => void
  onReset: () => void
  hasLabel: boolean
  currentBarcode: string
  currentRef: string
}

interface ValidationState {
  barcode: string | null
  ref: string | null
}

export default function InputForm({ onGenerate, onReset, hasLabel, currentBarcode, currentRef }: Props) {
  const [barcodeInput, setBarcodeInput] = useState(currentBarcode)
  const [refInput, setRefInput] = useState(currentRef)
  const [errors, setErrors] = useState<ValidationState>({ barcode: null, ref: null })
  const [touched, setTouched] = useState({ barcode: false, ref: false })

  useEffect(() => {
    setBarcodeInput(currentBarcode)
    setRefInput(currentRef)
  }, [currentBarcode, currentRef])

  const validateBarcode = (val: string): string | null => {
    if (!val) return 'O número de código de barras é obrigatório'
    if (!/^\d+$/.test(val)) return 'Apenas dígitos são permitidos'
    if (val.length < 10) return `Mínimo 10 dígitos (actualmente ${val.length})`
    return null
  }

  const validateRef = (val: string): string | null => {
    if (!val) return 'O número de referência é obrigatório'
    if (!/^\d+$/.test(val)) return 'Apenas dígitos são permitidos'
    if (val.length < 4) return `Mínimo 4 dígitos (actualmente ${val.length})`
    return null
  }

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    setBarcodeInput(val)
    if (touched.barcode) {
      setErrors(prev => ({ ...prev, barcode: validateBarcode(val) }))
    }
  }

  const handleRefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    setRefInput(val)
    if (touched.ref) {
      setErrors(prev => ({ ...prev, ref: validateRef(val) }))
    }
  }

  const handleBlurBarcode = () => {
    setTouched(prev => ({ ...prev, barcode: true }))
    setErrors(prev => ({ ...prev, barcode: validateBarcode(barcodeInput) }))
  }

  const handleBlurRef = () => {
    setTouched(prev => ({ ...prev, ref: true }))
    setErrors(prev => ({ ...prev, ref: validateRef(refInput) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ barcode: true, ref: true })
    const bErr = validateBarcode(barcodeInput)
    const rErr = validateRef(refInput)
    setErrors({ barcode: bErr, ref: rErr })
    if (!bErr && !rErr) {
      onGenerate(barcodeInput, refInput)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleClear = () => {
    setBarcodeInput('')
    setRefInput('')
    setErrors({ barcode: null, ref: null })
    setTouched({ barcode: false, ref: false })
    onReset()
  }

  const isValid = !validateBarcode(barcodeInput) && !validateRef(refInput)

  return (
    <div className="form-card">
      <div className="form-card-header">
        <h1>Gerador de Etiquetas</h1>
        <p>Introduza ambos os números para gerar a sua etiqueta</p>
      </div>

      <form id="label-form" onSubmit={handleSubmit} noValidate>
        {/* Número de Referência */}
        <div className={`field-group ${touched.ref && errors.ref ? 'field-error' : ''} ${touched.ref && !errors.ref && refInput ? 'field-success' : ''}`}>
          <label htmlFor="ref-number" className="field-label">
            <span className="label-badge label-badge--top">TOPO</span>
            Número de Referência
          </label>
          <p className="field-desc">Aparece no topo da etiqueta (mín. 4 dígitos)</p>
          <div className="input-wrapper">
            <input
              id="ref-number"
              type="text"
              inputMode="numeric"
              value={refInput}
              onChange={handleRefChange}
              onBlur={handleBlurRef}
              placeholder="ex. 1234"
              maxLength={20}
              className="field-input"
              aria-describedby="ref-number-error"
              autoComplete="off"
            />
            <span className="input-counter" aria-live="polite">{refInput.length}/4+</span>
          </div>
          {touched.ref && errors.ref && (
            <p id="ref-number-error" className="field-error-msg" role="alert">{errors.ref}</p>
          )}
          {touched.ref && !errors.ref && refInput && (
            <p className="field-success-msg">✓ Número de referência válido</p>
          )}
        </div>

        {/* Número de Código de Barras */}
        <div className={`field-group ${touched.barcode && errors.barcode ? 'field-error' : ''} ${touched.barcode && !errors.barcode && barcodeInput ? 'field-success' : ''}`}>
          <label htmlFor="barcode-number" className="field-label">
            <span className="label-badge label-badge--bar">CÓDIGO</span>
            Número de Código de Barras
          </label>
          <p className="field-desc">Este número é codificado no código de barras (mín. 10 dígitos)</p>
          <div className="input-wrapper">
            <input
              id="barcode-number"
              type="text"
              inputMode="numeric"
              value={barcodeInput}
              onChange={handleBarcodeChange}
              onBlur={handleBlurBarcode}
              placeholder="ex. 1234567890123"
              maxLength={30}
              className="field-input field-input--mono"
              aria-describedby="barcode-number-error"
              autoComplete="off"
            />
            <span className="input-counter" aria-live="polite">{barcodeInput.length}/10+</span>
          </div>
          {touched.barcode && errors.barcode && (
            <p id="barcode-number-error" className="field-error-msg" role="alert">{errors.barcode}</p>
          )}
          {touched.barcode && !errors.barcode && barcodeInput && (
            <p className="field-success-msg">✓ Número válido ({barcodeInput.length} dígitos)</p>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            id="generate-btn"
            className="btn btn--primary"
            disabled={!barcodeInput || !refInput}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="1" y="3" width="2.5" height="12" rx="0.5" fill="currentColor"/>
              <rect x="5" y="3" width="1" height="12" rx="0.5" fill="currentColor"/>
              <rect x="7.5" y="3" width="3" height="12" rx="0.5" fill="currentColor"/>
              <rect x="12" y="3" width="1.5" height="12" rx="0.5" fill="currentColor"/>
              <rect x="15" y="3" width="2" height="12" rx="0.5" fill="currentColor"/>
            </svg>
            Gerar Etiqueta
          </button>

          {hasLabel && isValid && (
            <button
              type="button"
              id="print-btn"
              className="btn btn--print"
              onClick={handlePrint}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Imprimir Etiqueta A4
            </button>
          )}

          {hasLabel && (
            <button type="button" id="clear-btn" className="btn btn--ghost" onClick={handleClear}>
              Limpar
            </button>
          )}
        </div>
      </form>

      {/* Dicas */}
      <div className="form-tips">
        <h3>Dicas</h3>
        <ul>
          <li>Certifique-se de que a impressora está configurada para <strong>A4, vertical</strong></li>
          <li>Desactive "ajustar à página" — imprima a <strong>100% de escala</strong></li>
          <li>Formato Code 128 — compatível com todos os leitores de código de barras</li>
        </ul>
      </div>
    </div>
  )
}

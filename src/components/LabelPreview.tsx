import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
import { QRCodeSVG } from 'qrcode.react'

interface Props {
  barcodeNumber: string
  refNumber: string
}

export default function LabelPreview({ barcodeNumber, refNumber }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!svgRef.current || !barcodeNumber) return

    try {
      JsBarcode(svgRef.current, barcodeNumber, {
        format: 'CODE128',
        lineColor: '#000000',
        background: '#ffffff',
        width: 1.5,         // bar width in px (50% smaller)
        height: 65,         // bar height in px – 50% smaller
        displayValue: false, // we render digits ourselves below
        margin: 0,
        valid: () => {
          if (errorRef.current) errorRef.current.textContent = ''
        },
      })
    } catch (err) {
      if (errorRef.current) {
        errorRef.current.textContent = 'Could not generate barcode. Please check the barcode number.'
      }
    }
  }, [barcodeNumber])

  // Format: group digits for readability (e.g. every 4 digits)
  const formattedDigits = barcodeNumber.match(/.{1,4}/g)?.join(' ') ?? barcodeNumber

  return (
    <div className="label-page" role="img" aria-label={`Etiqueta de código de barras – Referência: ${refNumber}, Código: ${barcodeNumber}`}>
      {/* Reference number — TOP */}
      <div className="label-ref-section">
        <QRCodeSVG value={barcodeNumber} className="label-qr-code" level="M" includeMargin={false} />
        
        <div className="label-ref-center">
          <span className="label-ref-tag">REF</span>
          <span className="label-ref-number">{refNumber}</span>
        </div>
        
        <QRCodeSVG value={barcodeNumber} className="label-qr-code" level="M" includeMargin={false} />
      </div>

      <div className="label-divider" />

      {/* Barcode */}
      <div className="label-barcode-section">
        <svg
          ref={svgRef}
          className="label-barcode-svg"
          aria-hidden="true"
          role="presentation"
        />
        <p ref={errorRef} className="barcode-error" role="alert" />

        {/* Digit string below barcode */}
        <div className="label-barcode-digits" aria-label={`Número codificado: ${barcodeNumber}`}>
          {formattedDigits}
        </div>
      </div>

      {/* Footer watermark – only visible on screen, not printed */}
      <div className="label-footer no-print">
        <span>Gerador de Etiquetas · Code 128 · Desenvolvido por Selton de Souza</span>
      </div>
    </div>
  )
}

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import ContactForm from '@/components/forms/ContactForm'

// Mock fetch
global.fetch = vi.fn()

// Mock DatePicker
vi.mock('@/components/forms/DatePicker', () => ({
  __esModule: true,
  default: ({ name, value, onChange, style }: { 
    name: string; 
    value?: Date; 
    onChange: (date: Date | undefined) => void; 
    style?: React.CSSProperties 
  }) => (
    <div>
      <input type="hidden" name={name} value={value ? '2026-03-09' : ''} />
      <button 
        type="button" 
        onClick={() => onChange(new Date())} 
        style={style}
        data-testid="date-picker-btn"
      >
        {value ? '2026-03-09' : 'Date'}
      </button>
    </div>
  )
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with default type (reservation)', () => {
    render(<ContactForm />)
    expect(screen.getByDisplayValue('Contact réservation')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByText('Type d’événement')).toBeInTheDocument()
    expect(screen.getByTestId('date-picker-btn')).toHaveTextContent('Date')
    expect(screen.getByDisplayValue('Box souhaité')).toBeInTheDocument()
  })

  it('shows error messages if fields are empty on submit (reservation)', async () => {
    render(<ContactForm />)
    const submitBtn = screen.getByRole('button', { name: /Envoyer/i })
    
    fireEvent.click(submitBtn)

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('Email')
      expect(emailInput.style.border).toBe('1px solid red')
      
      const eventTypeSelect = screen.getByDisplayValue('Type d’événement')
      expect(eventTypeSelect.style.border).toBe('1px solid red')
      
      const dateBtn = screen.getByTestId('date-picker-btn')
      expect(dateBtn.style.border).toBe('1px solid red')
      
      const boxSelect = screen.getByDisplayValue('Box souhaité')
      expect(boxSelect.style.border).toBe('1px solid red')
    })
  })

  it('switches to information request and validates message', async () => {
    render(<ContactForm />)
    const typeSelect = screen.getByDisplayValue('Contact réservation')
    
    fireEvent.change(typeSelect, { target: { value: 'information' } })

    expect(screen.queryByText('Type d’événement')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument()

    const submitBtn = screen.getByRole('button', { name: /Envoyer/i })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      const messageInput = screen.getByPlaceholderText('Message')
      expect(messageInput.style.border).toBe('1px solid red')
    })
  })

  it('submits successfully when all fields are filled (reservation)', async () => {
    vi.mocked(global.fetch).mockResolvedValue({ ok: true } as Response)
    
    render(<ContactForm />)
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByDisplayValue('Type d’événement'), { target: { value: 'anniversaire' } })
    
    const dateBtn = screen.getByTestId('date-picker-btn')
    fireEvent.click(dateBtn)
    
    fireEvent.change(screen.getByDisplayValue('Box souhaité'), { target: { value: 'box1' } })
    
    const submitBtn = screen.getByRole('button', { name: /Envoyer/i })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'POST',
      }))
      expect(screen.getByText('Votre message a bien été envoyé.')).toBeInTheDocument()
    })
  })

  it('submits successfully when all fields are filled (information)', async () => {
    vi.mocked(global.fetch).mockResolvedValue({ ok: true } as Response)
    
    render(<ContactForm />)
    const typeSelect = screen.getByDisplayValue('Contact réservation')
    fireEvent.change(typeSelect, { target: { value: 'information' } })

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello I need info' } })

    const submitBtn = screen.getByRole('button', { name: /Envoyer/i })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"type":"information"')
      }))
      expect(screen.getByText('Votre message a bien été envoyé.')).toBeInTheDocument()
    })
  })
})

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import emailjs from '@emailjs/browser';
import { EmailForm } from './EmailForm';
import messages from '../../../messages/pt.json';

jest.mock('@emailjs/browser', () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
    sendForm: jest.fn()
  }
}));

const renderForm = () =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <EmailForm />
    </NextIntlClientProvider>
  );

const fillAndSubmit = () => {
  fireEvent.change(screen.getByLabelText(messages.contact.name), {
    target: { value: 'Test Name' }
  });
  fireEvent.change(screen.getByLabelText(messages.contact.email), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText(messages.contact.message), {
    target: { value: 'Test message' }
  });
  fireEvent.click(screen.getByRole('button', { name: messages.contact.send }));
};

describe('EmailForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes EmailJS and shows the success message when sendForm resolves with status 200', async () => {
    (emailjs.sendForm as jest.Mock).mockResolvedValue({ status: 200, text: 'OK' });

    renderForm();
    fillAndSubmit();

    expect(emailjs.init).toHaveBeenCalled();
    await waitFor(() =>
      expect(
        screen.getByText(messages.contact.sendYourFeedbackSuccessMsg)
      ).toBeInTheDocument()
    );
  });

  it('shows the failure message when sendForm resolves with a non-200 status', async () => {
    (emailjs.sendForm as jest.Mock).mockResolvedValue({ status: 400, text: 'Bad Request' });

    renderForm();
    fillAndSubmit();

    await waitFor(() =>
      expect(
        screen.getByText(messages.contact.sendYourFeedbackFailMsg)
      ).toBeInTheDocument()
    );
  });

  it('shows the failure message when sendForm rejects', async () => {
    (emailjs.sendForm as jest.Mock).mockRejectedValue(new Error('network error'));

    renderForm();
    fillAndSubmit();

    await waitFor(() =>
      expect(
        screen.getByText(messages.contact.sendYourFeedbackFailMsg)
      ).toBeInTheDocument()
    );
  });
});

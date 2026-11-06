import { useId, useState } from "react";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useDialog } from "../../hooks/useDialog";
interface FormProps {
  handleClose: () => void;
}

interface ToastState {
  isVisible: boolean;
  isSuccess: boolean;
}

const fieldClass =
  "w-full border border-ink/20 bg-paper px-3 py-2.5 font-p text-sm text-ink placeholder:text-ink/65 transition-colors focus:border-blue-deep md:px-4 md:py-3 md:text-base";

const labelClass =
  "font-p text-[11px] uppercase tracking-[0.16em] text-ink/70";

export default function ConnectForm({ handleClose }: FormProps) {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    isSuccess: false,
  });
  const [isSending, setIsSending] = useState(false);
  const titleId = useId();
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  useBodyScrollLock(true);
  const dialogRef = useDialog<HTMLFormElement>(handleClose);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    setIsSending(true);

    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();
      const isSuccess = response.ok && Boolean(data.success);

      setToast({ isVisible: true, isSuccess });

      if (isSuccess) {
        form.reset();
      }

      setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));

        if (isSuccess) {
          setTimeout(handleClose, 300);
        }
      }, 2500);
    } catch {
      setToast({ isVisible: true, isSuccess: false });

      setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 2500);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className={`fixed top-6 left-1/2 z-[95] flex -translate-x-1/2 items-center justify-center border px-5 py-3 font-p text-sm shadow-editorial-sm transition-all duration-300 ease-out ${
          toast.isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0 pointer-events-none"
        } ${
          toast.isSuccess
            ? "border-blue-deep bg-blue-soft text-blue-deep"
            : "border-red-600 bg-red-50 text-red-700"
        }`}
      >
        <p>
          {toast.isSuccess
            ? "Message sent. Thank you."
            : "Message could not be sent. Please try again."}
        </p>
      </div>

      <div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-3 sm:p-8"
        onClick={handleClose}
        role="presentation"
      >
        <form
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onSubmit={handleSubmit}
          aria-busy={isSending}
          className="relative flex max-h-[90vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto overscroll-contain border border-ink bg-white-bg p-4 sm:p-6 md:gap-5 md:p-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-deep">
                Contact
              </p>
              <h2
                id={titleId}
                className="mt-2 font-heading text-3xl tracking-tight text-ink md:text-4xl"
              >
                SEND A MESSAGE
              </h2>
              <p className="mt-1 font-p text-sm text-ink/70">
                Tell me what you are working on.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="grid size-10 shrink-0 place-items-center border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white-bg"
              aria-label="Close contact form"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor={nameId} className={labelClass}>
                Name
              </label>
              <input
                id={nameId}
                data-autofocus
                className={fieldClass}
                type="text"
                placeholder="Your name"
                required
                name="name"
                autoComplete="name"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor={emailId} className={labelClass}>
                Email
              </label>
              <input
                id={emailId}
                type="email"
                placeholder="you@example.com"
                name="email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={subjectId} className={labelClass}>
              Subject
            </label>
            <input
              type="text"
              id={subjectId}
              placeholder="What is this about?"
              name="subject"
              required
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={messageId} className={labelClass}>
              Message
            </label>
            <textarea
              id={messageId}
              placeholder="Write your message here"
              name="message"
              required
              className={`${fieldClass} min-h-32 md:min-h-40`}
            />
          </div>

          <div className="flex w-full justify-end">
            <button
              type="submit"
              disabled={isSending}
              className="w-full border border-blue-deep bg-blue-deep px-5 py-3 font-p text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-ink hover:bg-ink disabled:opacity-60 sm:w-auto"
            >
              {isSending ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

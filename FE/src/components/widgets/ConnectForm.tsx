import { useEffect, useState } from "react";

interface FormProps {
  handleClose: () => void;
}

export default function ConnectForm({ handleClose }: FormProps) {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  const [result, setResult] = useState("");
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORM_ACCESS_KEY;
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-3 sm:p-8"
      onClick={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl h-full max-h-[90vh] overflow-y-auto overscroll-contain flex flex-col gap-2 md:gap-4 p-4 sm:p-4 md:p-6 bg-white-bg rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-wide text-blue-main">
              Let's Connect!
            </h1>
            <p className="font-p text-gray text-sm sm:text-base">
              Send me email and let me help you!
            </p>
          </div>
          <button
            className="mr-4 text-2xl font-bold font-heading"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        {/* nama, email, subjek, pesan, submit */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="formName"
              className="font-p text-blue-main text-xs md:text-[18px]"
            >
              Name
            </label>
            <input
              className="rounded-2xl border border-blue-main focus:shadow-sm focus:shadow-blue-main/20 px-3 py-2 md:px-2 md:py-4 text-sm md:text-base"
              type="text"
              placeholder="Your Name"
              required
              name="name"
              id="formName"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="formEmail"
              className="font-p text-blue-main text-xs md:text-[18px]"
            >
              Email
            </label>
            <input
              type="email"
              id="formEmail"
              placeholder="example@email.com"
              name="email"
              required
              className="rounded-2xl border border-blue-main focus:shadow-sm focus:shadow-blue-main/20 px-3 py-2 md:px-2 md:py-4 text-sm md:text-base"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="formSubject"
            className="font-p text-blue-main text-xs md:text-[18px]"
          >
            Subject
          </label>
          <input
            type="text"
            id="formSubject"
            placeholder="Write the subject of your message"
            name="subject"
            required
            className="rounded-2xl border border-blue-main focus:shadow-sm focus:shadow-blue-main/20 text-start px-3 py-2 md:px-2 md:py-4 text-sm md:text-base"
          />
        </div>

        <textarea
          placeholder="Write your message here"
          name="message"
          className="rounded-2xl border border-blue-main focus:shadow-sm focus:shadow-blue-main/20 w-full min-h-32 md:min-h-40 flex-1 text-start px-3 py-2 md:px-2 md:py-4 text-sm md:text-base"
        ></textarea>

        <div className="flex w-full justify-end">
          <input
            type="submit"
            value="Send"
            className="w-full sm:w-auto sm:min-w-50 text-lg sm:text-2xl font-heading tracking-wide px-4 sm:px-2 py-3 sm:py-4 bg-blue-main rounded-2xl text-white cursor-pointer hover:bg-blue-dark transition"
          />
        </div>
        <p className="text-black/30 font-p text-sm">{result}</p>
      </form>
    </div>
  );
}

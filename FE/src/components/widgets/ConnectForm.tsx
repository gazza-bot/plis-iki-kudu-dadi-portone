import { useEffect, useState } from "react";

interface FormProps {
  handleClose: () => void;
}

export default function ConnectForm({ handleClose }: FormProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
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
    handleClose()
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <form
      onSubmit={handleSubmit}
        className="w-full h-full overflow-scroll flex flex-col gap-2 md:gap-4 p-2 md:p-4 bg-white-bg rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-heading text-4xl tracking-wide text-blue-main">
              Let's Connect!
            </h1>
            <p className="font-p text-gray">
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
        <div className="flex gap-4 w-full">
          <div className="w-full flex flex-col">
            <label htmlFor="formName" className="font-p text-blue-main">
              Name
            </label>
            <input
              className="rounded-2xl border border-blue-main focus:shadow-sm focus:shadow-blue-main/20 px-2 py-4"
              type="text"
              placeholder="Your Name"
              required
              name="name"
              id="formName"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="formEmail">Name</label>
            <input
              type="email"
              id="formEmail"
              placeholder="example@email.com"
              name="email"
              required
              className="rounded-2xl border border-blue-main focus:shadow-sm focus:shadow-blue-main/20 px-2 py-4"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="formSubject">Subject</label>
          <input
            type="text"
            placeholder="Write the subject of your message"
            name="subject"
            required
            className="rounded-2xl border border-blue-main focus:shadow-sm focus:shadow-blue-main/20 text-start px-2 py-4"
          />
        </div>

        <textarea
          placeholder="Write your message here"
          name="message"
          className="rounded-2xl border border-blue-main focus:shadow-sm focus:shadow-blue-main/20 w-full h-1/2 text-start px-2 py-4"
        ></textarea>

        <div className="flex w-full justify-end">
          <input
            type="submit"
            value="Send"
            required
            className="text-2xl w-sm font-heading tracking-wide px-2 py-4 bg-blue-main rounded-2xl text-white"
          />
        </div>
        <p className="text-black/30 font-p">{result}</p>
      </form>
    </div>
  );
}

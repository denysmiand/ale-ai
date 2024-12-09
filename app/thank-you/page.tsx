import Link from "next/link";
import SubmittedData from "./components/SubmittedData";

const ThankYouPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-center text-2xl">Thank you for your submission!</h1>
      <SubmittedData />
      <Link
        href="/"
        className="rounded border px-4 py-1 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        Back to Form
      </Link>
    </div>
  );
};

export default ThankYouPage;

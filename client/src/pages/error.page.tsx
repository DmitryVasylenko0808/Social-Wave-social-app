import { Frown } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10">
      <Frown size={80} className="text-primary-200" />
      <h1 className="text-2xl text-secondary-300 font-normal">
        Oops... something went wrong. Click to{" "}
        <Link to="/" className="text-primary-200 underline">
          Home
        </Link>
      </h1>
    </div>
  );
};

export default ErrorPage;

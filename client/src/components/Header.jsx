import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 p-2 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Orkhan</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>

        <form className="flex items-center bg-slate-100 p-3 rounded-lg">
          <input
            type="text"
            placeholder="Search...."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-slate-600"
          />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="text-slate-700 hover:underline">Sing In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

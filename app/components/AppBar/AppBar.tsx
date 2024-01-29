import { Link } from '@remix-run/react';

const AppBar = () => {
  return (
    <nav className="bg-blue-500 text-white text-center p-4 flex justify-center items-center relative">
      <h1 className="text-lg font-semibold">TaskTrek</h1>
      <Link
        to="/tasks/create"
        className="absolute right-2 flex items-center justify-center text-base bg-blue-500 hover:bg-blue-700 text-white font-bold h-[32px] w-[32px] rounded-full"
      >
        +
      </Link>
    </nav>
  );
};

export default AppBar;

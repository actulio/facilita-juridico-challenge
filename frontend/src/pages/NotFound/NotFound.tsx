import { CiWarning } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-center">
      <div>
        <h1 className="mb-4 text-8xl font-semibold text-red-500">404</h1>
        <p className="text- mb-4 text-3xl text-gray-600">Oops! Page Not Found.</p>
        <div className="flex animate-bounce items-center justify-center">
          <CiWarning className="text-red-500" size={64} />
        </div>
        <p className="mt-4 text-2xl text-gray-600">
          You can return home{' '}
          <Link to="/" className="font-bold text-blue-400">
            HERE
          </Link>
          {'.'}
        </p>
      </div>
    </div>
  );
};

export default NotFound;

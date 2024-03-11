import { PiArrowLeft } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => navigate(-1)}
      className="ml-1 flex cursor-pointer flex-row items-center gap-2 text-sm text-gray-600 hover:text-gray-900 md:ml-2"
    >
      <PiArrowLeft />
      Go back
    </a>
  );
};

export default GoBackButton;

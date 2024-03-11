import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import FormInput from '../../components/FormInput';
import GoBackButton from '../../components/GoBackButton';
import { ClientsService } from '../../services/ClientsService';

const AddClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coord_x: 0,
    coord_y: 0,
  });
  const [loading, setLoading] = useState(false);
  const clientsService = useMemo(() => new ClientsService(), []);
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, coord_x, coord_y } = formData;
    if (coord_x === 0 && coord_y === 0) {
      toast.error('Coordinates cannot be (0, 0)', { duration: 4000, position: 'top-right' });
      return;
    }

    setLoading(true);

    const result = await clientsService.createClient({
      name,
      email,
      phone,
      coord_x,
      coord_y,
    });
    if (result.data) {
      toast.success('Client created', { position: 'top-right' });
      setTimeout(() => navigate('/'), 500);
    } else {
      toast.error(result.error, { duration: 4000, position: 'top-right' });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <GoBackButton />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
              Create Client
            </h2>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleFormChange}
              maxLength={32}
              placeholder="Add a client name"
              required
            />

            <FormInput
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              autoComplete="email"
              required
            />

            <FormInput
              label="Phone"
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleFormChange}
              maxLength={11}
              minLength={10}
              placeholder="99 99999 9999"
              required
            />

            <FormInput
              label="Coordinate X"
              name="coord_x"
              type="number"
              value={formData.coord_x}
              onChange={handleFormChange}
              required
              min={-65536}
              max={65536}
              maxLength={5}
            />

            <FormInput
              label="Coordinate Y"
              name="coord_y"
              type="number"
              value={formData.coord_y}
              onChange={handleFormChange}
              required
              min={-65536}
              max={65536}
              maxLength={5}
            />

            <div>
              <button
                disabled={loading}
                type="submit"
                className="align-center flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500"
              >
                {loading && (
                  <div className="mx-1 mt-[4px] h-4 w-4 animate-spin rounded-full border-4 border-solid border-t-transparent" />
                )}
                <div>Create Client</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClient;

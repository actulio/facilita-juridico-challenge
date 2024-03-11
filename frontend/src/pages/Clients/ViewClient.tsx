import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import FormInput from '../../components/FormInput';
import GoBackButton from '../../components/GoBackButton';
import { ClientsService } from '../../services/ClientsService';

const ViewClient = () => {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    coord_x: 0,
    coord_y: 0,
  });
  const clientsService = useMemo(() => new ClientsService(), []);
  const navigate = useNavigate();
  const { clientId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!clientId) return;
      const result = await clientsService.getClientById(clientId);
      if (result.data) {
        setFormData(result.data);
      } else {
        console.log(result.error);
        toast.error('Could not fetch client', { position: 'top-right' });
        setTimeout(() => navigate('/'), 5000);
      }
    };
    fetchData();
  }, [clientId, navigate, clientsService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await clientsService.updateClient(formData);
    if (result.data) {
      toast.success('Client successfully edited', { position: 'top-right' });
      setTimeout(() => navigate('/'), 500);
    } else {
      toast.error(result.error, { duration: 4000, position: 'top-right' });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <GoBackButton />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
              View Client
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
              onChange={() => {}}
              readOnly
            />

            <FormInput
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={() => {}}
              readOnly
            />

            <FormInput
              label="Phone"
              name="phone"
              type="number"
              onChange={() => {}}
              value={formData.phone}
              readOnly
            />

            <FormInput
              label="Coordinate X"
              name="coord_x"
              type="number"
              value={formData.coord_x}
              onChange={() => {}}
              readOnly
            />

            <FormInput
              label="Coordinate Y"
              name="coord_y"
              type="number"
              value={formData.coord_y}
              onChange={() => {}}
              readOnly
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ViewClient;

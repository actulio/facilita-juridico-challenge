import { Banner, Spinner, Timeline } from 'flowbite-react';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { CiHome } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

import GoBackButton from '../../components/GoBackButton';
import { IClient } from '../../interfaces/IClient';
import { ClientsService } from '../../services/ClientsService';

const BestRoute = () => {
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(0);
  const [route, setRoute] = useState<IClient[]>([]);
  const navigate = useNavigate();

  const clientsService = useMemo(() => new ClientsService(), []);

  useEffect(() => {
    const fetchData = async () => {
      if (distance !== 0) return;
      const result = await clientsService.getBestRoute();
      if (result.data) {
        setDistance(result.data.distance);
        setRoute(result.data.route);
        setLoading(false);
      } else {
        console.log(result.error);
        toast.error('Could not fetch client', { position: 'top-right' });
        setTimeout(() => navigate('/'), 5000);
      }
    };
    if (distance === 0) fetchData();
  }, [clientsService, distance, navigate]);

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-4 lg:px-8">
      <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <GoBackButton />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
          Best Route
        </h2>
      </div>
      <div className="rounded-lg border-2 border-gray-300 p-4 shadow-lg sm:px-10">
        {loading ? (
          <Spinner className="bg-white fill-blue-700" size="xl" />
        ) : (
          <div>
            <p className="mb-4 text-gray-700">{`Minimum distance found: ${distance.toFixed(2)}`}</p>
            <Timeline>
              {route.map((client, idx) => (
                <TimelineClient key={`${client.id}-${idx}`} idx={idx} client={client} />
              ))}
            </Timeline>
          </div>
        )}
      </div>
    </div>
  );
};

const TimelineClient: React.FC<{ client: IClient; idx: number }> = (props) => {
  const { name, phone, coord_x, coord_y } = props.client;

  const isSelf = coord_x === 0 && coord_y === 0;

  const formatPhone = (p: string) => {
    if (p.length === 11) {
      return p.replace(/(\d{2})(\d{5})(\d{4})/, (_, p1, p2, p3) => `(${p1}) ${p2}-${p3}`);
    } else {
      return p.replace(/(\d{2})(\d{4})(\d{4})/, (_, p1, p2, p3) => `(${p1}) ${p2}-${p3}`);
    }
  };

  return (
    <Timeline.Item>
      {isSelf ? <Timeline.Point icon={CiHome} /> : <Timeline.Point />}
      <Timeline.Content>
        <Timeline.Time>{`Coordinates (${coord_x}, ${coord_y})`}</Timeline.Time>
        <Timeline.Title className="capitalize">{isSelf ? 'Home' : name}</Timeline.Title>
        <Timeline.Body>
          {isSelf ? (props.idx === 0 ? 'Starting point' : 'Ending Point') : formatPhone(phone)}
        </Timeline.Body>
      </Timeline.Content>
    </Timeline.Item>
  );
};

export default BestRoute;

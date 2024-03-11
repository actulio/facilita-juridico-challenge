import { Dropdown, Modal, Pagination, Table, inp } from 'flowbite-react';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  CiEdit,
  CiRead,
  CiRoute,
  CiSearch,
  CiSquarePlus,
  CiTrash,
  CiWarning,
} from 'react-icons/ci';
import { SlOptionsVertical } from 'react-icons/sl';
import { Link } from 'react-router-dom';

import { useDebounce } from '../../hooks/useDebounce';
import { IClient } from '../../interfaces/IClient';
import { ClientsService } from '../../services/ClientsService';

const MAX_PER_PAGE = 10;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [clients, setClients] = useState<IClient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClientId, setModalClientId] = useState(0);
  const [search, setSearch] = useState('');

  const clientsService = useMemo(() => new ClientsService(), []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await clientsService.getClients(1);
      if (result.data) {
        setTotal(result.data.total);
        setClients(result.data.clients);
      } else {
        toast.error(result.error, { position: 'top-right' });
      }
    };
    fetchData();
  }, [clientsService]);

  const onPageChange = async (page: number) => {
    const result = await clientsService.getClients(page - 1, search);
    if (result.data) {
      setTotal(result.data.total);
      setClients(result.data.clients);
      setCurrentPage(page);
    } else {
      toast.error(result.error, { position: 'top-right' });
    }
  };

  const onDeleteClient = async () => {
    const deleted = await clientsService.deleteClient(modalClientId);

    if (deleted.data) {
      toast.success('Client deleted', { position: 'top-right' });
      const updated = clients.filter((client) => client.id !== modalClientId);
      if (updated.length > 0) {
        setCurrentPage(currentPage - 1);
        setTotal(updated.length);
        setClients(updated);
        setModalClientId(0);
        setIsModalOpen(false);
        return;
      }

      const result = await clientsService.getClients(currentPage - 1);
      if (result.data) {
        setTotal(result.data.total);
        setClients(result.data.clients);
      } else {
        toast.error(result.error, { position: 'top-right' });
      }
    } else {
      toast.error(deleted.error, { position: 'top-right' });
    }
    setIsModalOpen(false);
  };

  const onOpenModal = (id: number) => {
    setIsModalOpen(true);
    setModalClientId(id);
  };

  const formatPhone = (p: string) => {
    if (p.length === 11) {
      return p.replace(/(\d{2})(\d{5})(\d{4})/, (_, p1, p2, p3) => `(${p1}) ${p2}-${p3}`);
    } else {
      return p.replace(/(\d{2})(\d{4})(\d{4})/, (_, p1, p2, p3) => `(${p1}) ${p2}-${p3}`);
    }
  };

  const getClientsWithSearchFilter = async (text: string) => {
    if (text === search) return;
    const result = await clientsService.getClients(1, search);
    if (result.data) {
      setTotal(result.data.total);
      setClients(result.data.clients);
    } else {
      toast.error(result.error, { position: 'top-right' });
    }
  };

  const debouncedSearch = useDebounce(getClientsWithSearchFilter, 1000);

  return (
    <div className="flex h-screen items-center justify-center p-0 md:p-4">
      <div className="w-[100%] p-2 md:w-[80%]">
        <div className="my-3 flex w-[100%] flex-col-reverse items-center gap-2 sm:flex-row sm:justify-between md:my-0">
          <div className="w-[100%] bg-white sm:w-[300px]">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <CiSearch />
              </div>
              <input
                type="text"
                id="table-search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value.trim());
                  debouncedSearch(e.target.value.trim());
                }}
                className="block w-[100%] rounded-lg border border-gray-300 bg-gray-50 ps-10 text-sm text-gray-900 focus:border-blue-700 "
                placeholder="Search for name or email"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button className="align-center rounded-md border border-gray-900 bg-gradient-to-tl px-3 py-1.5 text-sm font-semibold uppercase leading-6 text-gray-700 shadow-sm hover:border-blue-300 hover:from-purple-500 hover:to-blue-500 hover:text-white sm:text-xs md:my-4 md:px-4 md:py-2">
              <Link className="flex items-center justify-center gap-2" to="/best-route">
                <CiRoute size={20} />
                Best Route
              </Link>
            </button>
            <button className="align-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold uppercase leading-6 text-white shadow-sm hover:bg-blue-500 sm:text-xs md:my-4 md:px-4 md:py-2">
              <Link className="flex items-center justify-center gap-2" to="/add">
                <CiSquarePlus size={20} />
                Add Client
              </Link>
            </button>
          </div>
        </div>
        <Table hoverable>
          <Table.Head>
            <TableHeadCell className="max-w-[200px] md:max-w-[100%]">Client name</TableHeadCell>
            <TableHeadCell className="hidden md:block">Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell className="w-[80px] text-center md:w-[150px]">Actions</TableHeadCell>
          </Table.Head>
          <Table.Body className="divide-y" data-testid="table-body">
            {clients.map((client) => (
              <Table.Row key={client.id} className="bg-white ">
                <TableRowCell className="max-w-[250px] font-medium text-gray-900">
                  {client.name}
                </TableRowCell>
                <TableRowCell className="hidden md:block">{client.email}</TableRowCell>
                <TableRowCell>{formatPhone(client.phone)}</TableRowCell>
                <TableRowCell className="w-[80px] md:w-[150px]">
                  <ActionsCell onOpenModal={onOpenModal} id={client.id} />
                </TableRowCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="my-4 flex justify-center">
          {total === 0 ? (
            <div className="text-sm text-gray-600">No clients found.</div>
          ) : (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(total / MAX_PER_PAGE)}
              onPageChange={onPageChange}
              showIcons
            />
          )}
        </div>
      </div>
      <DeleteModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onDeleteClient}
      />
    </div>
  );
};

const TableHeadCell: React.FC<{
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
}> = (props) => {
  return (
    <Table.HeadCell className={`overflow-hidden px-2 py-2 md:px-6 md:py-4 ${props.className}`}>
      {props.children}
    </Table.HeadCell>
  );
};

const TableRowCell: React.FC<{
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
}> = (props) => {
  return (
    <Table.Cell
      className={`overflow-hidden text-ellipsis px-2 py-2 md:px-6 md:py-4 ${props.className}`}
    >
      {props.children}
    </Table.Cell>
  );
};

const ActionsCell: React.FC<{ id: number; onOpenModal: (id: number) => void }> = ({
  id,
  onOpenModal,
}) => {
  const mdButtonClass =
    'cursor-pointer rounded-lg border p-[2px] text-sm focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100';

  return (
    <div>
      <div className="hidden flex-row justify-center gap-2 md:flex">
        <Link to={`view/${id}`}>
          <button
            className={`border-gray-200 hover:border-gray-300 hover:bg-gray-200 ${mdButtonClass}`}
          >
            <CiRead size={24} />
          </button>
        </Link>
        <Link to={`edit/${id}`}>
          <button
            className={`border-gray-200 hover:border-gray-300 hover:bg-gray-200 ${mdButtonClass}`}
          >
            <CiEdit size={24} />
          </button>
        </Link>
        <button
          className={`hover:border-red-600 hover:bg-red-100 ${mdButtonClass}`}
          onClick={() => onOpenModal(id)}
        >
          <CiTrash color="red" size={24} />
        </button>
      </div>
      <div className="flex justify-center md:hidden">
        <Dropdown
          label=""
          dismissOnClick={true}
          renderTrigger={() => <SlOptionsVertical size={16} />}
        >
          <Dropdown.Item>
            <Link to={`view/${id}`} className="center flex justify-center gap-2">
              <CiRead size={20} />
              View
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to={`view/${id}`} className="center flex justify-center gap-2">
              <CiEdit size={20} />
              Edit
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <button
              className="center flex justify-center gap-2 text-red-600"
              onClick={() => onOpenModal(id)}
            >
              <CiTrash size={20} />
              Delete
            </button>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

const DeleteModal: React.FC<{
  isModalOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: any;
  onSuccess: () => void;
}> = ({ isModalOpen, onClose, onSuccess }) => {
  return (
    <Modal dismissible show={isModalOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <CiWarning className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this client?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              className="align-center focus-visible:outline-red-60 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
              onClick={onSuccess}
            >
              Yes, confirm
            </button>
            <button
              className="align-center flex w-full justify-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-600  shadow-sm"
              onClick={onClose}
            >
              No, cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Dashboard;

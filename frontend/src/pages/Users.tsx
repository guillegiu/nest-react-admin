import React, { useState } from 'react';
import { Loader, Plus, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import Layout from '../components/layout';
import FilterPagination from '../components/shared/FilterPagination';
import Modal from '../components/shared/Modal';
import UsersTable from '../components/users/UsersTable';
import useAuth from '../hooks/useAuth';
import CreateUserRequest from '../models/user/CreateUserRequest';
import UserQuery from '../models/user/UserQuery';
import userService from '../services/UserService';

export default function Users() {
  const { authenticatedUser } = useAuth();

  const [filters, setFilters] = useState<UserQuery>({
    search: '',
    sortBy: '',
    sortOrder: 'ASC',
    page: 1,
    limit: 10,
  });

  const [addUserShow, setAddUserShow] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { data, isLoading } = useQuery(
    ['users', filters],
    () => userService.findAll(filters),
    {
      refetchInterval: 1000,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateUserRequest>();

  const saveUser = async (createUserRequest: CreateUserRequest) => {
    try {
      await userService.save(createUserRequest);
      setAddUserShow(false);
      setError(null);
      reset();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSearch = (search: string) => {
    setFilters({ ...filters, search, page: 1 });
  };

  const handleSort = (sortBy: string, sortOrder: 'ASC' | 'DESC') => {
    setFilters({ ...filters, sortBy, sortOrder, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const sortOptions = [
    { value: 'firstName', label: 'Nombre' },
    { value: 'lastName', label: 'Apellido' },
    { value: 'username', label: 'Usuario' },
    { value: 'role', label: 'Rol' },
    { value: 'dateCreated', label: 'Fecha de creación' },
  ];

  return (
    <Layout>
      <div className="main-header">
        <h1 className="font-semibold text-2xl text-gray-700">Manage Users</h1>
      </div>
      <div className="main-content">
        <button
          className="btn mb-4 flex gap-2 w-full sm:w-auto justify-center items-center"
          onClick={() => setAddUserShow(true)}
        >
          <Plus size={20} /> Add User
        </button>

        <FilterPagination
          onSearch={handleSearch}
          onSort={handleSort}
          onPageChange={handlePageChange}
          total={data?.total || 0}
          currentPage={filters.page || 1}
          limit={filters.limit || 10}
          sortOptions={sortOptions}
          searchPlaceholder="Buscar por nombre, apellido o usuario..."
        />

        <UsersTable data={data?.data || []} isLoading={isLoading} />

        {/* Add User Modal */}
        <Modal show={addUserShow}>
          <div className="flex">
            <h1 className="font-semibold mb-3">Add User</h1>
            <button
              className="ml-auto focus:outline-none"
              onClick={() => {
                reset();
                setError(null);
                setAddUserShow(false);
              }}
            >
              <X size={30} />
            </button>
          </div>
          <hr />

          <form
            className="flex flex-col gap-5 mt-5"
            onSubmit={handleSubmit(saveUser)}
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <input
                type="text"
                className="input sm:w-1/2"
                placeholder="First Name"
                required
                disabled={isSubmitting}
                {...register('firstName')}
              />
              <input
                type="text"
                className="input sm:w-1/2"
                placeholder="Last Name"
                required
                disabled={isSubmitting}
                {...register('lastName')}
              />
            </div>
            <input
              type="text"
              className="input"
              required
              placeholder="Username"
              disabled={isSubmitting}
              {...register('username')}
            />
            <input
              type="password"
              className="input"
              required
              placeholder="Password (min 6 characters)"
              disabled={isSubmitting}
              {...register('password')}
            />
            <select
              className="input"
              required
              {...register('role')}
              disabled={isSubmitting}
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                'Save'
              )}
            </button>
            {error ? (
              <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50">
                {error}
              </div>
            ) : null}
          </form>
        </Modal>
      </div>
    </Layout>
  );
}

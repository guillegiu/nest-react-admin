import React, { useState } from 'react';
import { Loader, Plus, RefreshCw, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import CoursesTable from '../components/courses/CoursesTable';
import Layout from '../components/layout';
import FilterPagination from '../components/shared/FilterPagination';
import Modal from '../components/shared/Modal';
import useAuth from '../hooks/useAuth';
import useTranslation from '../hooks/useTranslation';
import CourseQuery from '../models/course/CourseQuery';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import courseService from '../services/CourseService';

export default function Courses() {
  const [filters, setFilters] = useState<CourseQuery>({
    search: '',
    sortBy: '',
    sortOrder: 'ASC',
    page: 1,
    limit: 10,
  });

  const [addCourseShow, setAddCourseShow] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { authenticatedUser } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, refetch } = useQuery(
    ['courses', filters],
    () => courseService.findAll(filters),
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateCourseRequest>();

  const saveCourse = async (createCourseRequest: CreateCourseRequest) => {
    try {
      await courseService.save(createCourseRequest);
      setAddCourseShow(false);
      reset();
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSearch = (search: string) => {
    setFilters({ ...filters, search, page: 1 });
  };

  const handleSort = (sortBy: string, sortOrder: 'ASC' | 'DESC') => {
    if (sortBy && sortBy.trim() !== '') {
      setFilters({ ...filters, sortBy, sortOrder, page: 1 });
    } else {
      setFilters({ ...filters, sortBy: '', sortOrder: 'ASC', page: 1 });
    }
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const sortOptions = [
    { value: 'name', label: 'Nombre' },
    { value: 'description', label: 'Descripción' },
    { value: 'dateCreated', label: 'Fecha de creación' },
  ];

  return (
    <Layout>
      <div className="main-header">
        <h1 className="font-semibold text-2xl text-gray-700">{t('courses.title')}</h1>
      </div>
      <div className="main-content">
        {authenticatedUser.role !== 'user' ? (
        <div className="flex gap-2 mb-4">
          <button
            className="btn flex gap-2 w-full sm:w-auto justify-center items-center"
            onClick={() => setAddCourseShow(true)}
          >
            <Plus size={20} /> {t('courses.addCourse')}
          </button>
          <button
            className="btn-secondary flex gap-2 w-full sm:w-auto justify-center items-center"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw size={20} />
            {t('courses.refresh')}
          </button>
        </div>
        ) : null}

        <FilterPagination
          onSearch={handleSearch}
          onSort={handleSort}
          onPageChange={handlePageChange}
          total={data?.total || 0}
          currentPage={filters.page || 1}
          limit={filters.limit || 10}
          sortOptions={sortOptions}
          searchPlaceholder={t('courses.searchPlaceholder')}
        />

        <CoursesTable data={data?.data || []} isLoading={isLoading} />

        {/* Add User Modal */}
        <Modal show={addCourseShow}>
          <div className="flex">
            <h1 className="font-semibold mb-3">Add Course</h1>
            <button
              className="ml-auto focus:outline-none"
              onClick={() => {
                reset();
                setAddCourseShow(false);
              }}
            >
              <X size={30} />
            </button>
          </div>
          <hr />

          <form
            className="flex flex-col gap-5 mt-5"
            onSubmit={handleSubmit(saveCourse)}
          >
            <input
              type="text"
              className="input"
              placeholder="Name"
              disabled={isSubmitting}
              required
              {...register('name')}
            />
            <input
              type="text"
              className="input"
              placeholder="Description"
              disabled={isSubmitting}
              required
              {...register('description')}
            />
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

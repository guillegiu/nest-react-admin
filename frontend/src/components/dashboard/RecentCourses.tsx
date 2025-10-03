import React from 'react';
import { BookOpen, Calendar } from 'react-feather';
import { useQuery } from 'react-query';

import courseService from '../../services/CourseService';

export default function RecentCourses() {
  const { data: recentCourses, isLoading } = useQuery(
    'recent-courses',
    courseService.findRecent
  );

  if (isLoading) {
    return (
      <div className="card shadow">
        <h2 className="font-semibold text-xl mb-4">Latest Courses</h2>
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow">
      <h2 className="font-semibold text-xl mb-4">Latest Courses</h2>
      {recentCourses && recentCourses.length > 0 ? (
        <div className="space-y-3">
          {recentCourses.map((course) => (
            <div
              key={course.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <BookOpen className="text-red-500 flex-shrink-0" size={20} />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {course.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={14} />
                <span>{new Date(course.dateCreated).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No courses available</p>
      )}
    </div>
  );
}

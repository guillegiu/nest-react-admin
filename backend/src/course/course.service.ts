import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Course } from './course.entity';
import { CourseQuery } from './course.query';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async save(createCourseDto: CreateCourseDto): Promise<Course> {
    return await Course.create({
      ...createCourseDto,
      dateCreated: new Date(),
    }).save();
  }

  async findAll(courseQuery: CourseQuery): Promise<{ data: Course[]; total: number; page: number; limit: number }> {
    const { search, sortBy, sortOrder, page = 1, limit = 10 } = courseQuery;

    const queryBuilder = this.courseRepository.createQueryBuilder('course');

    if (search) {
      queryBuilder.where(
        '(course.name ILIKE :search OR course.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (sortBy && sortBy.trim() !== '') {
      const validSortFields = ['name', 'description', 'dateCreated'];
      const field = validSortFields.includes(sortBy) ? sortBy : 'dateCreated';
      const validSortOrder = (sortOrder === 'ASC' || sortOrder === 'DESC') ? sortOrder : 'ASC';
      queryBuilder.orderBy(`course.${field}`, validSortOrder);
    } else {
      queryBuilder.orderBy('course.dateCreated', 'DESC');
    }

    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<Course> {
    const course = await Course.findOne(id);
    if (!course) {
      throw new HttpException(
        `Could not find course with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findById(id);
    return await Course.create({ id: course.id, ...updateCourseDto }).save();
  }

  async delete(id: string): Promise<string> {
    const course = await this.findById(id);
    await Course.delete(course);
    return id;
  }

  async count(): Promise<number> {
    return await Course.count();
  }

  async findRecent(): Promise<Course[]> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .orderBy('course.dateCreated', 'DESC')
      .limit(5)
      .getMany();
  }
}

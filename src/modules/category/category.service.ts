import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: string) {
    return this.categoryRepository.findOneBy({ id: id as any });
  }

  create(data: Partial<Category>) {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  async update(id: string, data: Partial<Category>) {
    await this.categoryRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.categoryRepository.delete(id);
  }
}

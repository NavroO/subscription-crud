import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  findOne(id: number): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateData: UpdateSubscriptionDto,
  ): Promise<Subscription | null> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
    });
    if (!subscription) return null;

    Object.assign(subscription, updateData);
    return this.subscriptionRepository.save(subscription);
  }

  async create(data: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create(data);
    return this.subscriptionRepository.save(subscription);
  }

  async remove(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}

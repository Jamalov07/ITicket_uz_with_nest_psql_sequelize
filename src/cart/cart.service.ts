import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartRepo: typeof Cart) {}
  async create(createCartDto: CreateCartDto) {
    const candidate = await this.cartRepo.findOne({
      where: { ticket_id: createCartDto.ticket_id },
    });
    if (candidate) {
      throw new BadRequestException('this ticket already axists in database');
    }
    const newCart = await this.cartRepo.create(createCartDto);
    return newCart;
  }

  async findAll() {
    const carts = await this.cartRepo.findAll();
    if (!carts) {
      throw new BadRequestException('Carts not found');
    }
    return carts;
  }

  async findOne(id: number) {
    const cart = await this.cartRepo.findOne({ where: { id: id } });
    if (!cart) {
      throw new BadRequestException('Cart not found');
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepo.findOne({ where: { id: id } });
    if (!cart) {
      throw new BadRequestException('Cart not found');
    }
    if (updateCartDto.ticket_id) {
      const candidate = await this.cartRepo.findOne({
        where: { ticket_id: updateCartDto.ticket_id },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This ticket already exists');
      }
    }
    const updatedCart = await (
      await this.cartRepo.update(updateCartDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedCart;
  }

  async remove(id: number) {
    const cart = await this.cartRepo.findOne({ where: { id: id } });
    if (!cart) {
      throw new BadRequestException('Cart not found');
    }
    return { message: 'Cart deleted', cart };
  }
}

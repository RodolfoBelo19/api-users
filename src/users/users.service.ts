import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocoment } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocoment>) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string ) {
    return this.userModel.findById(id);
  }

  update(id: string , updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $slot: updateUserDto,
      },
      {
        new: true,
      }
    )
  }

  remove(id: string ) {
    return this.userModel.deleteOne({
      _id: id
    })
  }
}

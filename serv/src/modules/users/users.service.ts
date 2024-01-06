import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async registration({ email, password }) {
    try {
      const candidate = await this.userModel.findOne({ email }).exec()
      if (candidate) throw new HttpException('User with same email has already exist', HttpStatus.BAD_REQUEST)
      const hashPassword = await bcrypt.hash(password, 6)
      const user = await this.userModel.create({ email, password: hashPassword })
      return this.generateToken(user)
    } catch (e) {
      throw e
    }
  }

  async login({ email, password }) {
    try {
      const candidate = await this.userModel.findOne({ email }).exec()
      if (!candidate) throw new HttpException('User with same email hasn`t exist', HttpStatus.BAD_REQUEST)
      const hashPassword = await bcrypt.compare(password, candidate.password)
      if (!hashPassword) throw new HttpException('Incorrect password, try again', HttpStatus.BAD_REQUEST)
      return this.generateToken(candidate)
    } catch (e) {
      throw e
    }
  }

 private generateToken(user){
    return { token: this.jwtService.sign({ email: user.email, password: user.password, id: user._id }) }
  }
}

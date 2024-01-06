import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generate } from 'shortid';
import { Link, LinkDocument } from 'src/schema/link.schema';
import { linksDto } from './links.dto';

@Injectable()
export class LinksService {
  #baseUrl: string;
  constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>) {
    this.#baseUrl = process.env.BASE_URL
  }

  async generateLink({ link, userId, description = '' }: linksDto) {
    try {
      const code = generate(8);
      console.log(this.#baseUrl);
      console.log(process.env.BASE_URL)

      const result = {
        oldLink: link,
        newLink: `${this.#baseUrl}/links/${code}`,
        description,
        userId
      };
      return await this.linkModel.create(result);
    } catch (e) {
      throw e;
    }
  }

  async getAll(userId, page = 1) {
    try {
      const limit = 10;
      const data = await this.linkModel
        .find({ userId })
        .limit(limit)
        .skip(page * limit - limit)
      const count = await this.linkModel.find({ userId }).count()

      return { data: data, count: count }
    } catch (e) {
      return e;
    }
  }

  async getOne(url) {
    try {
   
      return await this.linkModel.findOne({ newLink: `${this.#baseUrl}/links/${url}` }).exec();
    } catch (e) {
      throw e
    }
  }

  async delete(id) {
    try {
      const res = await this.linkModel.deleteOne({_id: id})
      if (res.deletedCount === 0) throw new HttpException('the link with same id didn`t find', HttpStatus.BAD_REQUEST)
      return 'success'
    }
    catch (e) {
      throw e
    }
  }
}

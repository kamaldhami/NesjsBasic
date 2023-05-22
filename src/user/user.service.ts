import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<any> {
    const { email, password } = signUpDto;

    const hash = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hash,
    });

    return user;
  }

  async signin(signUpDto: SignUpDto): Promise<{ token: string; user: any }> {
    const { email, password } = signUpDto;

    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) throw new UnauthorizedException('User not exist');

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) throw new UnauthorizedException('Incorrect password');

    const token = this.jwtService.sign({ _id: user._id, role: 'admin' });

    return { token, user };
  }
}

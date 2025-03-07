import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignupChildDto } from './dto/create-signup-child.dto';
import { UpdateSignupChildDto } from './dto/update-signup-child.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { signupChild } from 'src/shared/schemas/signupChild.schema';
import { User } from 'src/shared/schemas/user.schema';

@Injectable()
export class SignupChildService {
  constructor(
    @InjectModel(signupChild.name) private signupChildModel: Model<signupChild>,
    @InjectModel(User.name) private userModel: Model<User>,

  ) { }
  create(createSignupChildDto: CreateSignupChildDto) {
    return 'This action adds a new signupChild';
  }

  async signupChild(childSignupDto: CreateSignupChildDto): Promise<any> {
    try {
        console.log('Received DTO:', JSON.stringify(childSignupDto, null, 2));

        const { name, age, userName, password, parentId } = childSignupDto;

        if (!userName || typeof userName !== 'string') {
            throw new BadRequestException('Valid username is required');
        }
        console.log('Validated username:', userName);

        // Check if parent exists
        const parent = await this.userModel.findById(parentId);
        console.log('Parent object:', parent);

        if (!parent || parent.role !== 'parent') {
            throw new NotFoundException('Parent not found or invalid parent ID');
        }

        // Check if username is already taken
        const existingUser = await this.signupChildModel.findOne({ userName });
        console.log('Existing user check:', existingUser);

        if (existingUser) {
            console.log('User already exists:', existingUser);
            throw { message: "User already exists", code: 400, userExists: true };
        }

        console.log('Proceeding to create new child entry');

        // Create new child document
        const newChild = new this.signupChildModel({
            name,
            age,
            userName,
            password,
            role: 'child',
            parentId,
            level: 1,
            score: 0,
        });

        console.log('New Child Object (before save):', JSON.stringify(newChild, null, 2));

        // Update parent's children array
        const update = await this.userModel.findByIdAndUpdate(
            parentId,
            { $push: { children: newChild._id } },
            { new: true }
        );
        console.log('Updated Parent Object:', update);

        // Save the child document
        const savedChild = await newChild.save();
        console.log('Saved Child Object:', JSON.stringify(savedChild, null, 2));

        return savedChild;
    } catch (error) {
        console.error('Error in signupChild:', error);
        throw error;
    }
}


  async findAll() {
    const getall = await this.signupChildModel.find();
    return getall;
  }

  async findOne(id: string) {
    const getone =await this.signupChildModel.findById(id);
    return getone;
  }

  async update(id: string, updateSignupChildDto: UpdateSignupChildDto) {
    const update = await this.signupChildModel.findByIdAndUpdate(id, updateSignupChildDto, { new: true });
    return update;
  }

  async remove(id: string) {
    const remove =await this.signupChildModel.findByIdAndDelete(id);
    return remove;
  }
}

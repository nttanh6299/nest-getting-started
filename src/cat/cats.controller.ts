import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ForbiddenException,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, createCatSchema } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';
import { ZodValidationPipe } from 'src/validation.pipe';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles(['admin'])
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @Roles(['admin'])
  async findAll(): Promise<Cat[]> {
    try {
      return this.catsService.findAll();
    } catch {
      throw new ForbiddenException();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Cat id ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `Cat id ${id}: ${updateCatDto.name}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Cat ${id} deleted`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { NeeService } from './nee.service';
import { CreateNeeDto } from './dto/create-nee.dto';
import { UpdateNeeDto } from './dto/update-nee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('nee')
@UseGuards(JwtAuthGuard)
export class NeeController {
  constructor(private readonly neeService: NeeService) {}

  @Post()
  create(@Body() createNeeDto: CreateNeeDto, @Request() req) {
    return this.neeService.create(createNeeDto, req.user.userId);
  }

  @Get()
  findAll(@Query('alunoId') alunoId?: string, @Query('turmaId') turmaId?: string) {
    return this.neeService.findAll(alunoId, turmaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.neeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNeeDto: UpdateNeeDto) {
    return this.neeService.update(id, updateNeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.neeService.remove(id);
  }
}

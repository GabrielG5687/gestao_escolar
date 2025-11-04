import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ConselhosService } from './conselhos.service';
import { CreateConselhoDto } from './dto/create-conselho.dto';
import { UpdateConselhoDto } from './dto/update-conselho.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('conselhos')
@UseGuards(JwtAuthGuard)
export class ConselhosController {
  constructor(private readonly conselhosService: ConselhosService) {}

  @Post()
  create(@Body() createConselhoDto: CreateConselhoDto, @Request() req) {
    return this.conselhosService.create(createConselhoDto, req.user.userId);
  }

  @Get()
  findAll(@Query('turmaId') turmaId?: string, @Query('periodo') periodo?: string) {
    return this.conselhosService.findAll(turmaId, periodo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conselhosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConselhoDto: UpdateConselhoDto) {
    return this.conselhosService.update(id, updateConselhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conselhosService.remove(id);
  }
}

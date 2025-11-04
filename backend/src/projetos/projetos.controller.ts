import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projetos')
@UseGuards(JwtAuthGuard)
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Post()
  create(@Body() createProjetoDto: CreateProjetoDto, @Request() req) {
    return this.projetosService.create(createProjetoDto, req.user.userId);
  }

  @Get()
  findAll(@Query('turmaId') turmaId?: string) {
    return this.projetosService.findAll(turmaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetosService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetosService.remove(id);
  }
}

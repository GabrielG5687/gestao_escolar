import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { PlanejamentosService } from './planejamentos.service';
import { CreatePlanejamentoDto } from './dto/create-planejamento.dto';
import { UpdatePlanejamentoDto } from './dto/update-planejamento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('planejamentos')
@UseGuards(JwtAuthGuard)
export class PlanejamentosController {
  constructor(private readonly planejamentosService: PlanejamentosService) {}

  @Post()
  create(@Body() createPlanejamentoDto: CreatePlanejamentoDto, @Request() req) {
    return this.planejamentosService.create(createPlanejamentoDto, req.user.userId);
  }

  @Get()
  findAll(@Query('ano') ano?: string, @Query('turmaId') turmaId?: string) {
    return this.planejamentosService.findAll(ano ? parseInt(ano) : undefined, turmaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planejamentosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanejamentoDto: UpdatePlanejamentoDto) {
    return this.planejamentosService.update(id, updatePlanejamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planejamentosService.remove(id);
  }
}

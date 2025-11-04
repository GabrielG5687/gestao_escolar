import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ObservacoesService } from './observacoes.service';
import { CreateObservacaoDto } from './dto/create-observacao.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('observacoes')
@UseGuards(JwtAuthGuard)
export class ObservacoesController {
  constructor(private readonly observacoesService: ObservacoesService) {}

  @Post()
  create(@Body() createObservacaoDto: CreateObservacaoDto, @Request() req) {
    return this.observacoesService.create(createObservacaoDto, req.user.userId);
  }

  @Get()
  findAll(
    @Query('turmaId') turmaId?: string,
    @Query('alunoId') alunoId?: string,
    @Query('data') data?: string,
  ) {
    return this.observacoesService.findAll(turmaId, alunoId, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observacoesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.observacoesService.remove(id);
  }
}

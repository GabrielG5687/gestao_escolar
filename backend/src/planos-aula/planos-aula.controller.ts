import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PlanosAulaService } from './planos-aula.service';
import { CreatePlanoAulaDto } from './dto/create-plano-aula.dto';
import { UpdatePlanoAulaDto } from './dto/update-plano-aula.dto';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('planos-aula')
@Controller('planos-aula')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PlanosAulaController {
  constructor(private readonly planosAulaService: PlanosAulaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo plano de aula' })
  @ApiResponse({ status: 201, description: 'Plano criado com sucesso' })
  create(@Body() createPlanoAulaDto: CreatePlanoAulaDto, @Request() req) {
    return this.planosAulaService.create(createPlanoAulaDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar planos de aula' })
  @ApiQuery({ name: 'turmaId', required: false, description: 'Filtrar por turma' })
  @ApiQuery({ name: 'data', required: false, description: 'Filtrar por data' })
  @ApiQuery({ name: 'autorId', required: false, description: 'Filtrar por autor' })
  @ApiResponse({ status: 200, description: 'Lista de planos de aula' })
  findAll(
    @Query('turmaId') turmaId?: string,
    @Query('data') data?: string,
    @Query('autorId') autorId?: string,
  ) {
    return this.planosAulaService.findAll(turmaId, data, autorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar plano de aula por ID' })
  @ApiResponse({ status: 200, description: 'Plano encontrado' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  findOne(@Param('id') id: string) {
    return this.planosAulaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar plano de aula' })
  @ApiResponse({ status: 200, description: 'Plano atualizado' })
  @ApiResponse({ status: 403, description: 'Sem permissão para editar' })
  update(
    @Param('id') id: string,
    @Body() updatePlanoAulaDto: UpdatePlanoAulaDto,
    @Request() req,
  ) {
    return this.planosAulaService.update(id, updatePlanoAulaDto, req.user.userId, req.user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir plano de aula' })
  @ApiResponse({ status: 200, description: 'Plano excluído' })
  @ApiResponse({ status: 403, description: 'Sem permissão para excluir' })
  remove(@Param('id') id: string, @Request() req) {
    return this.planosAulaService.remove(id, req.user.userId, req.user.role);
  }

  @Post(':id/comentarios')
  @ApiOperation({ summary: 'Adicionar comentário ao plano de aula' })
  @ApiResponse({ status: 201, description: 'Comentário adicionado' })
  addComentario(
    @Param('id') id: string,
    @Body() createComentarioDto: CreateComentarioDto,
    @Request() req,
  ) {
    return this.planosAulaService.addComentario(id, createComentarioDto, req.user.userId);
  }

  @Get(':id/comentarios')
  @ApiOperation({ summary: 'Listar comentários do plano de aula' })
  @ApiResponse({ status: 200, description: 'Lista de comentários' })
  getComentarios(@Param('id') id: string) {
    return this.planosAulaService.getComentarios(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../database/entities/user.entity';

@ApiTags('turmas')
@Controller('turmas')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) { }

  @Post()
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @ApiOperation({ summary: 'Criar nova turma' })
  @ApiResponse({ status: 201, description: 'Turma criada com sucesso' })
  create(@Body() createTurmaDto: CreateTurmaDto) {
    return this.turmasService.create(createTurmaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as turmas' })
  @ApiResponse({ status: 200, description: 'Lista de turmas' })
  findAll() {
    return this.turmasService.findAll();
  }

  @Get('minhas-turmas')
  @Roles(Role.PROFESSOR)
  @ApiOperation({ summary: 'Listar turmas do professor logado' })
  @ApiResponse({ status: 200, description: 'Lista de turmas do professor' })
  findMyTurmas(@Request() req) {
    return this.turmasService.findByProfessor(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar turma por ID' })
  @ApiResponse({ status: 200, description: 'Turma encontrada' })
  @ApiResponse({ status: 404, description: 'Turma não encontrada' })
  findOne(@Param('id') id: string) {
    return this.turmasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @ApiOperation({ 
    summary: 'Atualizar turma',
    description: 'Atualiza os dados de uma turma existente. Todos os campos são opcionais.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Turma atualizada com sucesso',
    schema: {
      example: {
        id: '12332',
        nome: '5º Ano B',
        ano: 2025,
        serie: '5º Ano',
        professorResponsavelId: 'uuid-do-professor',
        createdAt: '2025-11-06T10:00:00.000Z',
        updatedAt: '2025-11-06T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Turma não encontrada' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmasService.update(id, updateTurmaDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Excluir turma' })
  @ApiResponse({ status: 200, description: 'Turma excluída' })
  remove(@Param('id') id: string) {
    return this.turmasService.remove(id);
  }
}

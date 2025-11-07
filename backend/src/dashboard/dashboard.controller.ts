import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../database/entities/user.entity';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('supervisor/stats')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @ApiOperation({ 
    summary: 'Estatísticas do painel do supervisor',
    description: 'Retorna estatísticas gerais do sistema para supervisores e administradores'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Estatísticas retornadas com sucesso',
    schema: {
      example: {
        totalTurmas: 10,
        planosPendentes: 5,
        totalObservacoes: 45,
        projetosAtivos: 8,
        totalProfessores: 15,
        totalAlunos: 250
      }
    }
  })
  getStatsSupervisor() {
    return this.dashboardService.getStatsSupervisor();
  }

  @Get('professor/stats')
  @Roles(Role.PROFESSOR)
  @ApiOperation({ 
    summary: 'Estatísticas do painel do professor',
    description: 'Retorna estatísticas pessoais do professor logado'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Estatísticas retornadas com sucesso',
    schema: {
      example: {
        minhasTurmas: 3,
        meusPlanos: 25,
        minhasObservacoes: 45,
        meusProjetos: 2,
        planosAprovados: 20,
        planosPendentes: 5
      }
    }
  })
  getStatsProfessor(@Request() req) {
    return this.dashboardService.getStatsProfessor(req.user.userId);
  }

  @Get('professor/planos-recentes')
  @Roles(Role.PROFESSOR)
  @ApiOperation({ 
    summary: 'Planos de aula recentes do professor',
    description: 'Retorna os últimos 5 planos de aula criados pelo professor'
  })
  @ApiResponse({ status: 200, description: 'Lista de planos recentes' })
  getPlanosRecentes(@Request() req) {
    return this.dashboardService.getPlanosRecentes(req.user.userId);
  }

  @Get('supervisor/planos-pendentes')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @ApiOperation({ 
    summary: 'Planos de aula pendentes de revisão',
    description: 'Retorna planos que aguardam aprovação do supervisor'
  })
  @ApiResponse({ status: 200, description: 'Lista de planos pendentes' })
  getPlanosPendentes() {
    return this.dashboardService.getPlanosPendentesRevisao();
  }

  @Get('supervisor/atividades-recentes')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @ApiOperation({ 
    summary: 'Atividades recentes do sistema',
    description: 'Retorna as últimas observações e projetos criados'
  })
  @ApiResponse({ status: 200, description: 'Lista de atividades recentes' })
  getAtividadesRecentes() {
    return this.dashboardService.getAtividadesRecentes();
  }

  @Get('professor/projetos-ativos')
  @Roles(Role.PROFESSOR)
  @ApiOperation({ 
    summary: 'Projetos ativos do professor',
    description: 'Retorna os projetos em andamento do professor'
  })
  @ApiResponse({ status: 200, description: 'Lista de projetos ativos' })
  getProjetosAtivos(@Request() req) {
    return this.dashboardService.getProjetosAtivos(req.user.userId);
  }
}

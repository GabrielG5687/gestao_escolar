import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../database/entities/user.entity';
import { PedagogicoService } from './pedagogico.service';
import { CreatePlanejamentoBimestralDto } from './dto/create-planejamento-bimestral.dto';
import { CreateAnexoPlanoDto } from './dto/create-anexo-plano.dto';
import { CreateAtividadeAdaptadaDto } from './dto/create-atividade-adaptada.dto';
import { CreateRelatorioSemanalDto } from './dto/create-relatorio-semanal.dto';
import { CreateAtaPedagogicaDto } from './dto/create-ata-pedagogica.dto';

@Controller('pedagogico')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PedagogicoController {
  constructor(private readonly pedagogicoService: PedagogicoService) {}

  // Planejamentos Bimestrais
  @Post('planejamentos-bimestrais')
  @Roles(Role.PROFESSOR)
  createPlanejamentoBimestral(@Body() dto: CreatePlanejamentoBimestralDto, @Request() req) {
    return this.pedagogicoService.createPlanejamentoBimestral(dto, req.user.userId);
  }

  @Get('planejamentos-bimestrais/:turmaId')
  @Roles(Role.PROFESSOR, Role.SUPERVISOR, Role.ADMIN)
  getPlanejamentosBimestrais(@Param('turmaId') turmaId: string) {
    return this.pedagogicoService.getPlanejamentosBimestrais(turmaId);
  }

  @Put('planejamentos-bimestrais/:id')
  @Roles(Role.PROFESSOR)
  updatePlanejamentoBimestral(
    @Param('id') id: string,
    @Body('conteudo') conteudo: string,
    @Request() req
  ) {
    return this.pedagogicoService.updatePlanejamentoBimestral(id, conteudo, req.user.userId);
  }

  // Anexos de Plano de Aula
  @Post('anexos-plano')
  @Roles(Role.PROFESSOR)
  @UseInterceptors(FileInterceptor('arquivo'))
  createAnexoPlano(
    @Body() dto: CreateAnexoPlanoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const caminhoArquivo = file ? `/uploads/${file.filename}` : undefined;
    return this.pedagogicoService.createAnexoPlano(dto, caminhoArquivo);
  }

  @Get('anexos-plano/:planoAulaId')
  @Roles(Role.PROFESSOR, Role.SUPERVISOR, Role.ADMIN)
  getAnexosPlano(@Param('planoAulaId') planoAulaId: string) {
    return this.pedagogicoService.getAnexosPlano(planoAulaId);
  }

  @Delete('anexos-plano/:id')
  @Roles(Role.PROFESSOR)
  deleteAnexoPlano(@Param('id') id: string) {
    return this.pedagogicoService.deleteAnexoPlano(id);
  }

  // Atividades Adaptadas (NEE)
  @Post('atividades-adaptadas')
  @Roles(Role.PROFESSOR)
  createAtividadeAdaptada(@Body() dto: CreateAtividadeAdaptadaDto, @Request() req) {
    return this.pedagogicoService.createAtividadeAdaptada(dto, req.user.userId);
  }

  @Get('atividades-adaptadas/:turmaId')
  @Roles(Role.PROFESSOR, Role.SUPERVISOR, Role.ADMIN)
  getAtividadesAdaptadas(@Param('turmaId') turmaId: string) {
    return this.pedagogicoService.getAtividadesAdaptadas(turmaId);
  }

  @Post('atividades-adaptadas/:id/foto')
  @Roles(Role.PROFESSOR)
  @UseInterceptors(FileInterceptor('foto'))
  addFotoAtividade(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const caminhoFoto = `/uploads/${file.filename}`;
    return this.pedagogicoService.addFotoAtividade(id, caminhoFoto);
  }

  // Relatórios Semanais NEE
  @Post('relatorios-semanais')
  @Roles(Role.PROFESSOR)
  createRelatorioSemanal(@Body() dto: CreateRelatorioSemanalDto, @Request() req) {
    return this.pedagogicoService.createRelatorioSemanal(dto, req.user.userId);
  }

  @Get('relatorios-semanais/:turmaId')
  @Roles(Role.PROFESSOR, Role.SUPERVISOR, Role.ADMIN)
  getRelatoriosSemanais(@Param('turmaId') turmaId: string) {
    return this.pedagogicoService.getRelatoriosSemanais(turmaId);
  }

  // Atas Pedagógicas
  @Post('atas-pedagogicas')
  @Roles(Role.PROFESSOR, Role.SUPERVISOR)
  createAtaPedagogica(@Body() dto: CreateAtaPedagogicaDto, @Request() req) {
    return this.pedagogicoService.createAtaPedagogica(dto, req.user.userId);
  }

  @Get('atas-pedagogicas')
  @Roles(Role.PROFESSOR, Role.SUPERVISOR, Role.ADMIN)
  getAtasPedagogicas(@Request() req) {
    return this.pedagogicoService.getAtasPedagogicas(req.user.userId);
  }

  // Observações do Supervisor
  @Get('observacoes-supervisor')
  @Roles(Role.PROFESSOR)
  getObservacoesSupervisor(@Request() req, @Query('turmaId') turmaId?: string) {
    return this.pedagogicoService.getObservacoesSupervisor(req.user.userId, turmaId);
  }
}

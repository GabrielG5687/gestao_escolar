import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { AtasService } from './atas.service';
import { CreateAtaDto } from './dto/create-ata.dto';
import { UpdateAtaDto } from './dto/update-ata.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('atas')
@UseGuards(JwtAuthGuard)
export class AtasController {
  constructor(private readonly atasService: AtasService) {}

  @Post()
  create(@Body() createAtaDto: CreateAtaDto, @Request() req) {
    return this.atasService.create(createAtaDto, req.user.userId);
  }

  @Get()
  findAll(@Query('turmaId') turmaId?: string, @Query('data') data?: string) {
    return this.atasService.findAll(turmaId, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtaDto: UpdateAtaDto) {
    return this.atasService.update(id, updateAtaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atasService.remove(id);
  }
}

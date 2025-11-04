import { AppDataSource } from '../data-source';
import { User, Role } from '../entities/user.entity';
import { Turma } from '../entities/turma.entity';
import { PlanejamentoAnual } from '../entities/planejamento-anual.entity';
import { PlanoAula, StatusPlano } from '../entities/plano-aula.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  await AppDataSource.initialize();
  console.log('🌱 Iniciando seed...');

  const userRepository = AppDataSource.getRepository(User);
  const turmaRepository = AppDataSource.getRepository(Turma);
  const planejamentoRepository = AppDataSource.getRepository(PlanejamentoAnual);
  const planoAulaRepository = AppDataSource.getRepository(PlanoAula);

  // Criar usuários
  const adminPassword = await bcrypt.hash('admin123', 12);
  const supervisorPassword = await bcrypt.hash('supervisor123', 12);
  const professorPassword = await bcrypt.hash('professor123', 12);

  let admin = await userRepository.findOne({ where: { email: 'admin@escola.com' } });
  if (!admin) {
    admin = userRepository.create({
      nome: 'Administrador',
      email: 'admin@escola.com',
      senha: adminPassword,
      role: Role.ADMIN,
    });
    await userRepository.save(admin);
  }

  let supervisor = await userRepository.findOne({ where: { email: 'supervisor@escola.com' } });
  if (!supervisor) {
    supervisor = userRepository.create({
      nome: 'Maria Supervisora',
      email: 'supervisor@escola.com',
      senha: supervisorPassword,
      role: Role.SUPERVISOR,
    });
    await userRepository.save(supervisor);
  }

  let professor1 = await userRepository.findOne({ where: { email: 'joao@escola.com' } });
  if (!professor1) {
    professor1 = userRepository.create({
      nome: 'João Professor',
      email: 'joao@escola.com',
      senha: professorPassword,
      role: Role.PROFESSOR,
    });
    await userRepository.save(professor1);
  }

  let professor2 = await userRepository.findOne({ where: { email: 'ana@escola.com' } });
  if (!professor2) {
    professor2 = userRepository.create({
      nome: 'Ana Professora',
      email: 'ana@escola.com',
      senha: professorPassword,
      role: Role.PROFESSOR,
    });
    await userRepository.save(professor2);
  }

  console.log('✅ Usuários criados');

  // Criar turmas
  const turma1 = turmaRepository.create({
    nome: '5º Ano A',
    ano: 2025,
    serie: '5º Ano',
    professorResponsavelId: professor1.id,
  });
  await turmaRepository.save(turma1);

  const turma2 = turmaRepository.create({
    nome: '6º Ano B',
    ano: 2025,
    serie: '6º Ano',
    professorResponsavelId: professor2.id,
  });
  await turmaRepository.save(turma2);

  const turma3 = turmaRepository.create({
    nome: '7º Ano A',
    ano: 2025,
    serie: '7º Ano',
    professorResponsavelId: professor1.id,
  });
  await turmaRepository.save(turma3);

  console.log('✅ Turmas criadas');

  // Criar planejamento anual exemplo
  const planejamento = planejamentoRepository.create({
    turmaId: turma1.id,
    anoLetivo: 2025,
    descricao: 'Planejamento anual focado em desenvolvimento de competências de leitura e escrita.',
    autorId: professor1.id,
    periodo: 'anual',
  });
  await planejamentoRepository.save(planejamento);

  console.log('✅ Planejamento anual criado');

  // Criar plano de aula exemplo
  const planoAula = planoAulaRepository.create({
    turmaId: turma1.id,
    data: new Date('2025-02-10'),
    disciplina: 'Português',
    tema: 'Interpretação de Texto',
    objetivo: 'Desenvolver habilidades de interpretação textual',
    recursos: 'Livro didático, quadro, projetor',
    atividades: 'Leitura compartilhada, discussão em grupo, exercícios',
    avaliacaoPlaneada: 'Participação oral e exercícios escritos',
    observacoes: 'Atenção especial aos alunos com dificuldade de leitura',
    autorId: professor1.id,
    status: StatusPlano.PUBLICADO,
  });
  await planoAulaRepository.save(planoAula);

  console.log('✅ Plano de aula criado');

  console.log('🎉 Seed concluído!');
  console.log('\n📝 Credenciais de acesso:');
  console.log('Admin: admin@escola.com / admin123');
  console.log('Supervisor: supervisor@escola.com / supervisor123');
  console.log('Professor: joao@escola.com / professor123');
  console.log('Professor: ana@escola.com / professor123');

  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Erro no seed:', error);
  process.exit(1);
});

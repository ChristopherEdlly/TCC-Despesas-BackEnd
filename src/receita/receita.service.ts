import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { TipoReceita, Receita } from '@prisma/client';

@Injectable()
export class ReceitaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReceitaDto) {
    data.dataRecebimento = new Date(data.dataRecebimento);
    return this.prisma.receita.create({
      data,
    });
  }

  async BuscarPorPainelId(painelId: number) {
    return this.prisma.receita.findMany({
      where: {
        painelId,
      },
    });
  }

  async BuscarPorPainelIdECategoriaId(
    painelId: number,
    categoriaReceitaId: number,
  ) {
    return this.prisma.receita.findMany({
      where: {
        painelId,
        categoriaReceitaId,
      },
    });
  }

  async AtualizarReceita(id: number, data: UpdateReceitaDto) {
    return this.prisma.receita.update({
      where: {
        id,
      },
      data,
    });
  }

  async DeletarReceita(id: number) {
    return this.prisma.receita.delete({
      where: {
        id,
      },
    });
  }

  async calcularSaldoAteData(data: string, painelId: number): Promise<number> {
    const dataFinal = new Date(data);

    // 1️⃣ Buscar receitas únicas do painel dentro do período
    const receitasUnicas = await this.prisma.receita.findMany({
      where: {
        painelId,
        tipo: TipoReceita.Unico,
        dataRecebimento: { lte: dataFinal },
      },
      select: { valor: true },
    });

    // 2️⃣ Buscar receitas fixas do painel que iniciaram antes da data final
    const receitasFixas = await this.prisma.receita.findMany({
      where: {
        painelId,
        tipo: TipoReceita.Fixo,
        dataRecebimento: { lte: dataFinal },
      },
      select: {
        valor: true,
        dataRecebimento: true,
      },
    });

    // 🔢 Somar valores das receitas únicas
    let saldoTotal = receitasUnicas.reduce(
      (acc, receita) => acc + Number(receita.valor),
      0,
    );

    // 🔁 Calcular quanto cada receita fixa foi recebida no período e somar
    receitasFixas.forEach((receita) => {
      const dataInicial = new Date(receita.dataRecebimento);
      const mesesRecebidos =
        (dataFinal.getFullYear() - dataInicial.getFullYear()) * 12 +
        (dataFinal.getMonth() - dataInicial.getMonth()) +
        1;

      if (mesesRecebidos > 0) {
        saldoTotal += Number(receita.valor) * mesesRecebidos;
      }
    });

    return saldoTotal;
  }

  async buscarPorId(id: number) {
    return this.prisma.receita.findUnique({
      where: { id },
    });
  }

  async obterResumoReceitas(painelId: number, periodo: 'mes' | 'ano') {
    const hoje = new Date();
    const inicioPeriodo =
      periodo === 'mes'
        ? new Date(hoje.getFullYear(), hoje.getMonth(), 1)
        : new Date(hoje.getFullYear(), 0, 1);

    // Busca todas as receitas
    const receitas = await this.prisma.receita.findMany({
      where: {
        painelId,
      },
      include: {
        categoriaReceita: true,
      },
    });

    // ESTRUTURA PARA ARMAZENAR TODOS OS DIAS DO PERÍODO ATUAL
    const todasDatas = new Map<string, boolean>();

    // Se for mês, adiciona todos os dias do mês atual
    if (periodo === 'mes') {
      const ultimoDiaMes = new Date(
        hoje.getFullYear(),
        hoje.getMonth() + 1,
        0,
      ).getDate();
      for (let dia = 1; dia <= ultimoDiaMes; dia++) {
        const data = new Date(hoje.getFullYear(), hoje.getMonth(), dia);
        if (data <= hoje) {
          // Não incluir datas futuras
          todasDatas.set(data.toISOString().split('T')[0], true);
        }
      }
    }
    // Se for ano, adiciona todos os meses do ano atual
    else {
      for (let mes = 0; mes < hoje.getMonth() + 1; mes++) {
        const data = new Date(hoje.getFullYear(), mes, 1);
        todasDatas.set(data.toISOString().slice(0, 7), true);
      }
    }

    // Processa as receitas fixas e únicas
    const receitasProcessadas = receitas.reduce<any[]>((acc, receita) => {
      const dataInicial = new Date(receita.dataRecebimento);

      if (receita.tipo === TipoReceita.Unico) {
        if (dataInicial >= inicioPeriodo && dataInicial <= hoje) {
          acc.push(receita);
        }
      } else if (receita.tipo === TipoReceita.Fixo) {
        // CORREÇÃO: Adiciona uma receita fixa apenas nas datas reais de recebimento
        let dataAtual = new Date(dataInicial);

        while (dataAtual <= hoje) {
          if (dataAtual >= inicioPeriodo) {
            acc.push({
              ...receita,
              dataRecebimento: new Date(dataAtual),
            });
          }
          // Avança para o próximo mês mantendo o mesmo dia
          const diaAtual = dataAtual.getDate();
          dataAtual.setMonth(dataAtual.getMonth() + 1);

          // Corrige problemas com meses de diferentes números de dias
          if (dataAtual.getDate() !== diaAtual) {
            // Se o dia mudou (ex: 31/01 para 28/02), voltar para o último dia do mês
            dataAtual.setDate(0);
          }
        }
      }

      return acc;
    }, []);

    // Agrupa por categoria
    const receitasPorCategoria = receitasProcessadas.reduce<
      Record<string, number>
    >((acc, receita) => {
      const categoria = receita.categoriaReceita.nome;

      if (!acc[categoria]) {
        acc[categoria] = 0;
      }
      acc[categoria] = Number(acc[categoria]) + Number(receita.valor);
      return acc;
    }, {});

    // Agrupa por período
    const receitasPorPeriodo = receitasProcessadas.reduce<
      Record<string, number>
    >((acc, receita) => {
      const data =
        periodo === 'mes'
          ? receita.dataRecebimento.toISOString().split('T')[0]
          : receita.dataRecebimento.toISOString().slice(0, 7);

      if (!acc[data]) {
        acc[data] = 0;
      }
      acc[data] = Number(acc[data]) + Number(receita.valor);
      return acc;
    }, {});

    // ADICIONA TODAS AS DATAS DO PERÍODO COMO CHAVES, MESMO SEM MOVIMENTAÇÃO
    const receitasCompletas: Record<string, number> = {};
    for (const data of todasDatas.keys()) {
      receitasCompletas[data] = receitasPorPeriodo[data] || 0;
    }

    // Restante do código permanece igual...

    // Calcula o total de todas as receitas do período
    const total = Object.values(receitasPorCategoria).reduce(
      (sum, valor) => sum + Number(valor),
      0
    );

    return {
      resumoPorCategoria: Object.entries(receitasPorCategoria).map(
        ([nome, valor]) => ({
          nome,
          valor: Number(valor),
        }),
      ),
      resumoPorPeriodo: receitasCompletas,
      total,
    };
  }
}

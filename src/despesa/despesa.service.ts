import { Injectable } from '@nestjs/common';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';

@Injectable()
export class DespesaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDespesaDto) {
        data.dataCompra = new Date(data.dataCompra);
        return this.prisma.despesa.create({ data });
    }

    async buscarPorPainelId(painelId: number) {
        return this.prisma.despesa.findMany({
            where: { painelId },
        });
    }

    async atualizar(id: number, data: UpdateDespesaDto) {
        return this.prisma.despesa.update({
            where: { id },
            data,
        });
    }

    async deletar(id: number) {
        return this.prisma.despesa.delete({
            where: { id },
        });
    }

    async buscarPorId(id: number) {
        return this.prisma.despesa.findUnique({
            where: { id },
        });
    }

    async buscarPorPainelIdECategoriaDespesaId(
        painelId: number,
        categoriaDespesaId: number,
    ) {
        return this.prisma.despesa.findMany({
            where: {
                painelId,
                categoriaDespesaId,
            },
        });
    }

    async calcularTotalDespesasAteData(data: string): Promise<number> {
        const dataFinal = new Date(data);

        // 1️⃣ Buscar despesas diretas (dataCompra até a data fornecida)
        const despesas = await this.prisma.despesa.findMany({
            where: {
                dataCompra: { lte: dataFinal }, // Somente despesas até a data limite
            },
            select: { valor: true },
        });

        // 🔢 Somar valores das despesas diretas
        const totalDespesas = despesas.reduce(
            (acc, despesa) => acc + Number(despesa.valor),
            0,
        );

        return totalDespesas;
    }
}

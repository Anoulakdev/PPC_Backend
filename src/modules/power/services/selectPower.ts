import { PrismaService } from '../../../prisma/prisma.service';

export async function selectPower(prisma: PrismaService, companyId?: number) {
  // สร้างเงื่อนไขในการค้นหา
  const where = companyId ? { companyId: Number(companyId) } : undefined;

  // คำสั่งดึงข้อมูล power ทั้งหมด (พร้อมข้อมูลบริษัท) และเรียงตาม id
  return prisma.power.findMany({
    where,
    select: {
      id: true,
      companyId: true,
      name: true,
    },
    orderBy: {
      company: {
        id: 'asc',
      },
    },
  });
}

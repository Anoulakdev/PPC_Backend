import { PrismaService } from '../../../prisma/prisma.service';

export async function findAllPower(prisma: PrismaService, companyId?: number) {
  // สร้างเงื่อนไขในการค้นหา
  const where = companyId ? { companyId: Number(companyId) } : undefined;

  // คำสั่งดึงข้อมูล power ทั้งหมด (พร้อมข้อมูลบริษัท) และเรียงตาม id
  return prisma.power.findMany({
    where,
    include: {
      company: true,
      voltage: true,
      fuel: true,
      contract: true,
      branch: true,
      region: true,
      owner: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
}

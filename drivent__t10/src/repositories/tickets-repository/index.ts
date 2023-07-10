import { prisma } from '@/config';
import { Prisma } from '@prisma/client';
import { UserTicket } from '@/protocols';

async function getTicketType() {
  return prisma.ticketType.findMany();
}

async function getUserTicket (userId: number) {
    const userTicket = await prisma.$queryRaw<UserTicket>(
        Prisma.sql`	SELECT "Ticket".*, "TicketType".* AS "TicketType" FROM "Ticket"
        JOIN "TicketType" ON ticket."ticketTypeId"="TicketType".id
        JOIN "Enrollment" ON ticket."enrollmentId"="Enrollment".id
        WHERE "Enrollment".userId=${userId}
        `
    );
    return userTicket;
}  

const ticketRepositorie = {
  getTicketType,
  getUserTicket
};

export default ticketRepositorie;

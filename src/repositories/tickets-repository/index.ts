import { prisma } from '@/config';
import { Prisma } from '@prisma/client';
import { UserTicket } from '@/protocols';
import dayjs from 'dayjs';

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

async function getUserEnrollmentInfo (userId : number){
  return prisma.enrollment.findUnique({
    where: { userId }
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data : {
      enrollmentId,
      ticketTypeId,
      status: "RESERVED"
    },
    include: {
      TicketType: true
    }
  });

}

const ticketRepositorie = {
  getTicketType,
  getUserTicket,
  createTicket,
  getUserEnrollmentInfo
};

export default ticketRepositorie;

import { prisma } from '@/config';
import { Prisma } from '@prisma/client';
import { UserTicket } from '@/protocols';
import dayjs from 'dayjs';

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

async function getPaymentByTicket(ticketId: number) {
    const payment = prisma.payment.findFirst({ where: { ticketId } }); 
    return payment;
}

const paymentsRepositorie = {
  getPaymentByTicket
};

export default paymentsRepositorie;

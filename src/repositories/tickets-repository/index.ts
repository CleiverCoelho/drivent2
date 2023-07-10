import { prisma } from '@/config';

async function getTicketType() {
  return prisma.ticketType.findMany();
}

async function getUserTicket (enrollmentId: number) {

    const ticket = await prisma.ticket.findFirst({
      where: { enrollmentId },
      include: {TicketType: true}
    })
    return ticket;
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

async function getTicketById(ticketId: number) {
  const ticket = prisma.ticket.findFirst({ where: { id: ticketId } }); 
  return ticket;
}

const ticketRepositorie = {
  getTicketType,
  getUserTicket,
  createTicket,
  getUserEnrollmentInfo,
  getTicketById
};

export default ticketRepositorie;

import { notFoundError } from '@/errors';
import ticketRepositorie from '@/repositories/tickets-repository';
import enrollmentsService from '../enrollments-service';

async function getTicketType() {
    const result = await ticketRepositorie.getTicketType();
    return result;
}


async function getUserTicket(userId : number) {
    
  const userEnrollment = await enrollmentsService.getUserEnrollmentInfo(userId);
  const userTicket = await ticketRepositorie.getUserTicket(userEnrollment.id);

  if(!userTicket ) throw notFoundError();

  return userTicket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  
  const userEnrollmentInfo = await ticketRepositorie.getUserEnrollmentInfo(userId);
  if(!userEnrollmentInfo) throw notFoundError();

  const result = await ticketRepositorie.createTicket(userEnrollmentInfo.id, ticketTypeId);
  if(!result) throw notFoundError();
  
  return result;
}

const ticketService = {
  getTicketType,
  getUserTicket,
  createTicket
};

export default ticketService

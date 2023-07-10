import { notFoundError } from '@/errors';
import ticketRepositorie from '@/repositories/tickets-repository';

async function getTicketType() {
    const result = ticketRepositorie.getTicketType();
    return result;
}

async function getUserTicket(userId: number) {
    const result = ticketRepositorie.getUserTicket(userId);
    
    if(!result) throw notFoundError();
    
    return result;
}

const ticketService = {
  getTicketType,
  getUserTicket
};

export default ticketService

import { prisma } from '@/config';
import { Payment } from '@prisma/client';  

async function getPaymentByTicket(ticketId: number) {
    const payment = prisma.payment.findFirst({ where: { ticketId } }); 
    return payment;
}

type CreatePayment = Omit<Payment, 'id'>;

async function postPaymentProcess(payment: CreatePayment) {
    const result = prisma.payment.create({
        data: {
            ticketId: payment.ticketId,
            value: payment.value,
            cardIssuer: payment.cardIssuer,
            cardLastDigits: payment.cardLastDigits,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt
        }
    }); 
    return result;
}

const paymentsRepositorie = {
  getPaymentByTicket,
  postPaymentProcess
};

export default paymentsRepositorie;

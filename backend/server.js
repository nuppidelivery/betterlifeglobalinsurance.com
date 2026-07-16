require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

// Twilio Config para SMS e WhatsApp
// Crie uma conta no Twilio (twilio.com) para pegar essas credenciais
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Seu número Twilio para SMS
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Ex: 'whatsapp:+14155238886'
const twilioClient = accountSid && authToken ? twilio(accountSid, authToken) : null;

// Nodemailer Config para Email
// Exemplo usando Gmail (necessário App Password) ou outro SMTP (SendGrid, etc)
const transporter = nodemailer.createTransport({
  service: 'gmail', // ou smtp customizado
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const MESSAGE_CONTENT = `Recebemos as suas informações, obrigado pelo seu interesse!\n\nEm breve um de nossos especialistas te apresentará a melhor cotação e estará ao seu lado, acompanhando todas as etapas.\n\nBetter Life.`;

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, interest } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
  }

  const results = { email: false, sms: false, whatsapp: false };

  // 1. Enviar E-mail
  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Better Life" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Recebemos suas informações - Better Life',
        text: `Olá ${name},\n\n${MESSAGE_CONTENT}`
      });
      results.email = true;
    }
  } catch (error) {
    console.error('Erro ao enviar Email:', error);
  }

  // Formatar telefone para o padrão internacional (E.164) esperado pelo Twilio. Ex: +16892980422 ou +5511999999999
  // Assumindo que o usuário digita o + ou precisamos tratar (para simplificar, assumimos que o frontend mandará certo ou validamos aqui).
  const formattedPhone = phone.startsWith('+') ? phone : `+${phone.replace(/\D/g, '')}`;

  // 2. Enviar SMS
  try {
    if (twilioClient && twilioPhoneNumber) {
      await twilioClient.messages.create({
        body: `Olá ${name}. ${MESSAGE_CONTENT}`,
        from: twilioPhoneNumber,
        to: formattedPhone
      });
      results.sms = true;
    }
  } catch (error) {
    console.error('Erro ao enviar SMS:', error);
  }

  // 3. Enviar WhatsApp
  try {
    if (twilioClient && twilioWhatsAppNumber) {
      await twilioClient.messages.create({
        body: `Olá ${name}. ${MESSAGE_CONTENT}`,
        from: twilioWhatsAppNumber,
        to: `whatsapp:${formattedPhone}`
      });
      results.whatsapp = true;
    }
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
  }

  res.status(200).json({ success: true, message: 'Mensagens enviadas (conforme configuração).', results });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend Better Life rodando na porta ${PORT}`);
  console.log(`Verifique se o arquivo .env está configurado corretamente.`);
});

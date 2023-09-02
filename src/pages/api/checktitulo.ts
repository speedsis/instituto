import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface FormData {
  token: string;
  timeout: number;
  birthdate: string;
  mother: string;
  name: string;
  cpf: string;
  titulo_eleitoral: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      // Verifica se a solicitação é do tipo POST
      const data: FormData = req.body as FormData;
      const { token, timeout, birthdate, mother, name, cpf, titulo_eleitoral } = data;

      const jsonData = JSON.stringify(data);

      const apiUrl = `https://api.infosimples.com/api/v2/consultas/tse/titulo?token=${token}&timeout=${timeout}&birthdate=${encodeURIComponent(
        birthdate
      )}&mother=${encodeURIComponent(mother)}&name=${encodeURIComponent(
        name
      )}&cpf=${encodeURIComponent(cpf)}&titulo_eleitoral=${encodeURIComponent(titulo_eleitoral)}`;

      console.log('apiUrl', apiUrl);

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          "Authorization": "Basic YW5ndWxhcjpAbmd1bEByMA=="
        },
        timeout: 3000,
      };

      

      const response = await fetch(apiUrl, options);
      const res = await response.json();

      console.log('resposta', res);

      if (!response.ok) {
        throw new Error('Erro na requisição à API');
      }

      res.status(200).json(res);
    } else {
      res.status(405).json({ error: 'Método não permitido' }); // Retorna um erro de método não permitido para outras solicitações
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
    res.status(500).json({ error: 'Erro ao fazer a solicitação' });
  }
};

import jwt from 'jsonwebtoken';

const getUserId = (req: any) => {
  const secretKey = process.env.SECRET as string;
  const header = req.req.headers.authorization;

  if (!header) {
    throw new Error('Authentification required');
  }
  // const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(header, secretKey);

  return decoded;
};

export { getUserId as default };

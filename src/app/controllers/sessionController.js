import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // Usuario deve passar email e pass na autenticação
    const { email, password } = req.body;

    // Verificar se o usuario existe
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
    }

    // Verificar se a senha está correta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // payload, token
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

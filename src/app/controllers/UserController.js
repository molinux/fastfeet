import User from '../models/User';

class UserController {
  async store(req, res) {
    // Verificar se já existe o email que está tentando cadastrar
    // Pois ele é único
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // O model já define os campos, por isso nao precisa tratar aqui
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();

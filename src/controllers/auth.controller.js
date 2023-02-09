import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    //jwt token

    return res.status(201).json({ ok: "register" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const passwordRespond = await user.comparePassword(password);
    if (!passwordRespond) {
      return res.status(403).json({ error: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const { token, expiresIn } = generateToken(user.id);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.id, uploads: user.uploads });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

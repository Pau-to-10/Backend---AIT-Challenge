import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true }, //indexa email. Buscar documentos por el email será más sencillo.
  },
  password: {
    type: String,
    required: true,
  },
  uploads: [
    {
      type: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next(); // si modificamos info del user, no tiene que volver a hashear la contraseña
  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Falló el hash de contraseña");
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = model("User", userSchema);

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {*} next 
 */
export const POST = (req, res, next) => {
  const {email, password} = req.body;

  const user = users[email];

  if (!user || user.password !== password) {
    res.status(401).json({
      error: "Invalid credentials"
    });
    return;
  }

  res.cookie('auth_token', "83878ye328hd823hd87h2", { maxAge: 900000, httpOnly: true });
  res.json({
    data: user
  });
};

const users = {
  "ruben.fileti.3@gmail.com": {
    id: 0,
    name: "Ruben",
    surname: "Fileti",
    username: "R",
    password: "test",
    enabled: true,
    role: "admin",
  }
}
export const GET = (req, res, next) => {
  /**@type {Array<string>} */
  const rawHeaders = req.rawHeaders;
  const index = rawHeaders.indexOf('Cookie');
  let cookies = rawHeaders[index+1];
  cookies = cookies.split(';').map(el => el.trim()).map(el => el.split('='));
  let token = cookies.find(el => (el[0] === 'auth_token'));
  if (token) token = token[1];

  const user = users[token];

  if (!user) {
    res.status(401).json({
      error: 'Unauthorized'
    });
    return;
  }

  res.json({
    data: user
  });
}

const users = {
  "83878ye328hd823hd87h2": {
    id: 0,
    name: "Ruben",
    surname: "Fileti",
    username: "R",
    password: "test",
    enabled: true,
    role: "admin",
  }
}
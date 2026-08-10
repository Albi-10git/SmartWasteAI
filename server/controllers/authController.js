const bcrypt = require('bcryptjs');
const User = require('../models/User');

const serializeUser = (user) => ({ id: user._id, username: user.username, email: user.email });

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'All fields are required.' });
    if (username.trim().length < 3 || password.length < 6) return res.status(400).json({ error: 'Username must be at least 3 characters and password at least 6 characters.' });
    if (await User.exists({ $or: [{ username: username.trim() }, { email: email.trim().toLowerCase() }] })) return res.status(400).json({ error: 'Username or email already registered.' });
    const user = await User.create({ username: username.trim(), email: email.trim().toLowerCase(), password: await bcrypt.hash(password, 10) });
    req.session.user = serializeUser(user);
    res.status(201).json({ user: req.session.user });
  } catch (error) { next(error); }
};

exports.login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({ $or: [{ username: usernameOrEmail?.trim() }, { email: usernameOrEmail?.trim().toLowerCase() }] });
    if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(400).json({ error: 'Invalid username/email or password.' });
    req.session.user = serializeUser(user);
    res.json({ user: req.session.user });
  } catch (error) { next(error); }
};

exports.me = (req, res) => res.json({ loggedIn: Boolean(req.session.user), user: req.session.user || null });
exports.logout = (req, res, next) => req.session.destroy((error) => error ? next(error) : res.json({ success: true }));

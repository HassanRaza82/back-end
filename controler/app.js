const User = require('../model/app');

exports.signup = async (req, res) => {
  try {
    const { firstName, secondName, email, phoneNumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    const user = new User({
      firstName,
      secondName,
      email,
      phoneNumber,
      password,
    });

    await user.save();

    res.send('User registered');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.login = async (req, res) => {
  try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(400).json({ msg: 'Invalid credentials' });
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.status(400).json({ msg: 'Invalid credentials' });
     }
     const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
     res.json({
       token,
       user: {
         id: user._id,
         firstName: user.firstName,
         secondName: user.secondName,
         email: user.email,
         phoneNumber: user.phoneNumber,
       },
     });
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
 };
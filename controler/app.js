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

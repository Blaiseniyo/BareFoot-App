import bcrypt from 'bcrypt';
import UserServices from '../services/user.service';
import UsersError from '../utils/userserror';

// get a user profile with either Id or first_name
const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) throw new UsersError('invalid URI', 404);
    const record = await UserServices.getUserByUserName(username);
    if (!record) throw new UsersError('user not found', 400);
    res.status(200).json({ status: 200, message: 'successful got user profile', data: record });
  } catch (err) { next(err); }
};

// update a single user profile
const updateUserProfile = async (req, res, next) => {
  try {
    if (!res.locals.token) return res.status(500).json({ status: 500, message: 'unable to obtain a payload in token' });
    const email = res.locals.token;
    const record = await UserServices.getUserByEmail(email);
    if (!record) throw new UsersError('user not found', 404);
    if (record.dataValues.email !== email) throw new UsersError('owner of profile does not match signed in user', 401);
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10);
    UserServices.updateUser(req.body, email);
    res.status(200).json({ status: 200, message: 'successfully updated user profile' });
  } catch (err) { next(err); }
};
export { getUserProfile, updateUserProfile };

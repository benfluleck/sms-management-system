
export const checkSession = (req, res, next) => {
  if(!req.session.userId) {
    res.status(401).send({
      message: 'Unauthorised access, Please login again'
    })
    ;
  } else {
    next();
  }
};

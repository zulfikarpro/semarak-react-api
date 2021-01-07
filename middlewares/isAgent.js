function isCustomer(req, res, next) {
  if (req.user[0].role_id === "ag") {
    next();
  } else {
    res.status(200).json({
      message: {
        eng: "Oops! You're not an agent.",
        ind: "Oops! Anda bukan agen.",
      },
      status: 400,
    });
  }
}

module.exports = isCustomer;

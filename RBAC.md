users
  POST /login - everyone
  GET /:userId - admin, user
  DELETE /:userId - admin, same user
products
  POST / - admin, user
  DELETE /:productId - admin, same user that created the product
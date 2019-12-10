const Query = {
  async getScreens(parent, args, ctx, info) {
    return ctx.db.query.screens({}, info);
  }
};

module.exports = Query;

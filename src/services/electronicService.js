import Electronic from "../models/Electronic.js";

export default {
  async getAll(filter = {}) {
    let query = Electronic.find({});

    if (filter.searchName) {
      query = query.where("name").regex(new RegExp(filter.searchName, "i"));
    }

    if (filter.searchType) {
      query = query.where({ type: filter.searchType });
    }

    return query;
  },
  async getOne(electronicId) {
    return await Electronic.findById(electronicId).lean();
  },

  async create(electronicData, userId) {
    return await Electronic.create({ ...electronicData, owner: userId });
  },
  async update(electronicId, electronicData) {
    return await Electronic.findByIdAndUpdate(electronicId, electronicData, {
      runValidators: true,
    });
  },
  async deleteOne(electronicId) {
    return await Electronic.findByIdAndDelete(electronicId);
  },

  async buy(electronicId, userId) {
    const electronic = await Electronic.findById(electronicId);

    if (electronic.owner.equals(userId)) {
      throw new Error("You cannot buy your own product!");
    }

    if (electronic.buyingList.includes(userId)) {
      throw new Error("You have already bought this product!");
    }

    electronic.buyingList.push(userId);

    return electronic.save();
  },
};

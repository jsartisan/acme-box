module.exports = {
  Item: {
    id: item => item._id,
    name: item => item.name,
    parent: item => item.parent,
    createdAt: item => item.createdAt,
    isFile: item => item.isFile === true,
    ancestors: async (item, args, { db }) => {
      return await db.Item.find({
        _id: { $in: item.ancestors }
      });
    }
  },

  Query: {
    /**
     * get single item by id
     */
    item: async (parent, args, { db }) => {
      return await db.Item.findOne({ _id: args.id });
    },

    /**
     * get all items of a parent
     */
    items: async (parent, args, { db }) => {
      if (args.parent === "") {
        return await db.Item.find({ parent: null });
      }

      return await db.Item.find({ parent: args.parent });
    }
  },

  Mutation: {
    /**
     * add item of isFile = false
     */
    addItem: async (parent, args, { db }) => {
      const newFolder = new db.Item({
        name: args.name,
        isFile: args.isFile,
        parent: args.parent === "" ? null : args.parent
      });

      // adding ancestors
      if (args.parent !== "") {
        const parentFolder = await db.Item.findOne({ _id: args.parent });

        if (parentFolder && parentFolder.ancestors.length === 0) {
          newFolder.ancestors = [parentFolder._id];
        }

        if (parentFolder && parentFolder.ancestors.length > 0) {
          newFolder.ancestors = [...parentFolder.ancestors, parentFolder._id];
        }
      }

      await newFolder.save();

      return newFolder;
    },

    /**
     * edit item
     */
    editItem: async (parent, args, { db }) => {
      const item = await db.Item.findOne({
        _id: args.id
      });

      item.name = args.name;

      await item.save();

      return item;
    },

    /**
     * delete item by id
     */
    deleteItem: async (parent, args, { db }) => {
      await db.Item.deleteMany({ ancestors: `${args.id}` });
      await db.Item.deleteOne({ _id: args.id });

      return true;
    }
  }
};

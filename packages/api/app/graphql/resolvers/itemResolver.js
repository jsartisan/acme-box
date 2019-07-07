module.exports = {
  Item: {
    id: item => item._id,
    name: item => item.name,
    parent: item => item.parent,
    createdAt: item => item.createdAt,
    isFile: item => item.isFile === true
  },

  Query: {
    items: async (parent, args, { db }) => {
      if (args.parent === "") {
        return await db.Item.find({ parent: null });
      }

      return await db.Item.find({ parent: args.parent });
    }
  },

  Mutation: {
    addFolder: async (parent, args, { db }) => {
      const newFolder = new db.Item({
        name: args.name,
        parent: args.parent === "" ? null : args.parent
      });

      await newFolder.save();

      return newFolder;
    },

    addFile: async (parent, args, { db }) => {
      const newFile = new db.Item({
        name: args.name,
        parent: args.parent === "" ? null : args.parent,
        isFile: true
      });

      await newFile.save();

      return newFile;
    },

    editItem: async (parent, args, { db }) => {
      const item = await db.Item.findOne({
        _id: args.id
      });

      item.name = args.name;

      await item.save();

      return item;
    },

    deleteItem: async (parent, args, { db }) => {
      await db.Item.deleteOne({ _id: args.id });

      return true;
    }
  }
};

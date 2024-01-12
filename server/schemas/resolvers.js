const { User, List, Store } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // GET USER
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId)
          .populate("lists")
          .populate("savedStores");

        return user;
      } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
    },

    // GET LIST
    list: async (_, { listId }) => {
      try {
        const list = await List.findById(listId).populate("listItems");

        if (!list) {
          throw new Error("List not found");
        }

        return list;
      } catch (error) {
        console.error(`Error fetching list: ${error.message}`);
        throw new Error(`Error fetching list: ${error.message}`);
      }
    },

    // GET STORES
    stores: async () => {
      try {
        const stores = await Store.find();

        return stores;
      } catch (error) {
        throw new Error(`Error fetching stores: ${error.message}`);
      }
    },
  },
  Mutation: {
    // LOGIN
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email })
        .populate("lists")
        .populate("savedStores");

      if (!user) {
        throw new AuthenticationError();
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError();
      }

      const token = signToken(user);
      return { token, user };
    },

    // CREATE USER
    createUser: async (_, { fName, lName, email, password }) => {
      // Create User
      const user = await User.create({
        fName,
        lName,
        email,
        password,
      });

      // Generate Token
      const token = signToken(user);

      return { token, user };
    },

    // CREATE LIST
    createList: async (_, { title, userId }, req) => {
      // Ensures authentication
      if (!req.user) {
        throw new AuthenticationError();
      }

      try {
        const list = await List.create({
          title,
          userId: req.user._id,
        });

        await User.findByIdAndUpdate(
          req.user._id,
          { $addToSet: { lists: list._id } },
          { new: true }
        );

        return list;
      } catch (error) {
        throw new Error(`Error creating list: ${error.message}`);
      }
    },

    // DELETE LIST
    deleteList: async (_, { listId }, req) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      const list = await List.findByIdAndDelete(listId);

      if (!list) {
        throw new Error(
          "List not found or you are not authorized to delete this post."
        );
      }

      await User.findByIdAndUpdate(req.user._id, { $pull: { lists: listId } });

      try {
        const updatedUser = await User.findById(req.user._id).populate("lists");

        if (!updatedUser) {
          throw new Error("User data not found after list deletion.");
        }

        return updatedUser;
      } catch (error) {
        console.error("Error fetching updated user data:", error);
        throw new Error("Error occurred during list deletion.");
      }
    },

    // CREATE ITEM
    createItem: async (
      _,
      { listId, itemName, itemPrice, itemSize, itemUrl },
      req
    ) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      // Check if the list exists and the user is authorized
      const list = await List.findOne({ _id: listId, userId: req.user._id });

      if (!list) {
        throw new Error(
          "List not found or you are not authorized to add an item to it."
        );
      }

      const newItem = { itemName, itemPrice, itemSize, itemUrl };

      const updatedList = await List.findByIdAndUpdate(
        listId,
        { $addToSet: { listItems: newItem } },
        { new: true, runValidators: true }
      );

      if (!updatedList) {
        throw new Error("Post not found.");
      }

      return updatedList;
    },

    // DELETE ITEM
    deleteItem: async (_, { listId, itemId }, req) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      const list = await List.findById(listId);

      if (!list || list.userId.toString() !== req.user._id) {
        throw new Error(
          "List not found or you are not authorized to add an item to it."
        );
      }

      const deletedItem = list.listItems.id(itemId);

      const updatedList = await List.findByIdAndUpdate(
        listId,
        { $pull: { listItems: deletedItem } },
        { new: true, runValidators: true }
      );

      if (!updatedList) {
        throw new Error("List not found.");
      }

      return deletedItem;
    },

    // SAVE STORE
    saveStore: async (_, { userId, storeId }, req) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $addToSet: { savedStores: storeId },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      // Find and return the updated store information
      const updatedStore = updatedUser.savedStores.find(
        (store) => store.toString() === storeId
      );

      return updatedStore;
    },

    // UNSAVE STORE
    unsaveStore: async (_, { storeId }, req) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      await User.findByIdAndUpdate(req.user._id, {
        $pull: { savedStores: storeId },
      });

      try {
        // Attempt to fetch the updated user data after list deletion
        const updatedUser = await User.findById(req.user._id).populate(
          "savedStores"
        );

        if (!updatedUser) {
          // If the user data is null, handle the situation accordingly
          throw new Error("User data not found after list deletion.");
        }

        return updatedUser;
      } catch (error) {
        // Handle any errors that might occur during the fetching of updated user data
        console.error("Error fetching updated user data:", error);
        throw new Error("Error occurred during list deletion.");
      }
    },
  },
};

module.exports = resolvers;

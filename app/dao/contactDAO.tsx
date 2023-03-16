import { ObjectId } from "bson";

let contacts;

export default class ContactDAO {
  static async injectDB(conn) {
    if (contacts) {
      return;
    }
    try {
      contacts = await conn.db(process.env.DB_Name).collection("contacts");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  /**
   * Inserts a comment into the `contacts` collection, with the following fields:

     - "name", the name of the user posting the comment
     - "email", the email of the user posting the comment
     - "movie_id", the _id of the movie pertaining to the comment
     - "text", the text of the comment
     - "date", the date when the comment was posted

   * @param {string} movieId - The _id of the movie in the `movies` collection.
   * @param {Object} user - An object containing the user's name and email.
   * @param {string} comment - The text of the comment.
   * @param {string} date - The date on which the comment was posted.
   * @returns {DAOResponse} Returns an object with either DB response or "error"
   */
  static async addComment(movieId, user, comment, date) {
    try {
      // Construct the comment document to be inserted into MongoDB.
      const commentDoc = {
        name: user.name,
        email: user.email,
        movie_id: ObjectId(movieId),
        text: comment,
        date: date,
      };

      return await contacts.insertOne(commentDoc);
    } catch (e) {
      console.error(`Unable to post comment: ${e}`);
      return { error: e };
    }
  }

  /**
   * Updates the comment in the comment collection. Queries for the comment
   * based by both comment _id field as well as the email field to doubly ensure
   * the user has permission to edit this comment.
   * @param {string} commentId - The _id of the comment to update.
   * @param {string} userEmail - The email of the user who owns the comment.
   * @param {string} text - The updated text of the comment.
   * @param {string} date - The date on which the comment was updated.
   * @returns {DAOResponse} Returns an object with either DB response or "error"
   */
  static async updateComment(commentId, userEmail, text, date) {
    try {
      // Use the commentId and userEmail to select the proper comment, then
      // update the "text" and "date" fields of the selected comment.
      const updateResponse = await contacts.updateOne(
        { _id: ObjectId(commentId), email: userEmail },
        { $set: { text, date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update comment: ${e}`);
      return { error: e };
    }
  }
  /**
   Ensures the delete operation is limited so only the user can delete their own
   contacts, but not anyone else's contacts.
   */
  static async deleteComment(commentId, userEmail) {
    try {
      // Use the userEmail and commentId to delete the proper comment.
      const deleteResponse = await contacts.deleteOne({
        _id: ObjectId(commentId),
        email: userEmail,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`);
      return { error: e };
    }
  }

  static async mostActiveCommenters() {
    /**
    Ticket: User Report

    Build a pipeline that returns the 20 most frequent commenters on the MFlix
    site. You can do this by counting the number of occurrences of a user's
    email in the `contacts` collection.
    */
    try {
      // Return the 20 users who have commented the most on MFlix.
      const groupStage = { $group: { _id: "$email", count: { $sum: 1 } } };
      const sortStage = { $sort: { count: -1 } };
      const limitStage = { $limit: 20 };
      const pipeline = [groupStage, sortStage, limitStage];

      // here's how the Read Concern durability is increased
      const readConcern = { level: "majority" };

      const aggregateResult = await contacts.aggregate(pipeline, {
        readConcern,
      });
      return await aggregateResult.toArray();
    } catch (e) {
      console.error(`Unable to retrieve most active commenters: ${e}`);
      return { error: e };
    }
  }
}

/**
 * Success/Error return object
 * @typedef DAOResponse
 * @property {boolean} [success] - Success
 * @property {string} [error] - Error
 */

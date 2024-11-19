### Detailed Description: **Aggregation Pipelines in MongoDB**

Aggregation pipelines in MongoDB are a powerful framework for data transformation and analysis. They process data in stages, with each stage applying specific operations on the input and passing the transformed output to the next stage. Here, we explore concepts used in the provided code:

---

#### **Key Concepts in Aggregation**

1. **`$match`**  
   - Filters documents to pass only those matching specific criteria.
   - Example:  
     ```javascript
     { $match: { _id: new mongoose.Types.ObjectId(req.user._id) } }
     ```
     Filters the data to include only the document matching the user ID.

2. **`$lookup`**  
   - Performs a join between the current collection and another collection.
   - Key Parameters:
     - `from`: The target collection to join with.
     - `localField`: The field in the current collection.
     - `foreignField`: The field in the target collection.
     - `as`: The output array field name for joined data.
   - Example:  
     ```javascript
     {
         $lookup: {
             from: "videos",
             localField: "watchHistory",
             foreignField: "_id",
             as: "watchHistory",
         }
     }
     ```
     Joins `User` with `Video` documents based on the `watchHistory` field.

3. **Nested `$lookup` with Pipelines**  
   - Pipelines inside `$lookup` enable further processing, such as filtering or projecting fields from the joined collection.
   - Example:  
     ```javascript
     {
         $lookup: {
             from: "users",
             localField: "owner",
             foreignField: "_id",
             as: "owner",
             pipeline: [{
                 $project: {
                     fullname: 1,
                     username: 1,
                     avatar: 1
                 }
             }]
         }
     }
     ```
     Fetches owner details (`fullname`, `username`, `avatar`) for each video.

4. **`$addFields`**  
   - Adds computed fields or modifies existing fields in documents.
   - Example:  
     ```javascript
     {
         $addFields: {
             owner: {
                 $first: "$owner"
             }
         }
     }
     ```
     Reduces the `owner` array to a single object using the first element.

5. **`$project`**  
   - Shapes the final output by including or excluding fields.
   - Example:  
     ```javascript
     {
         $project: {
             fullname: 1,
             username: 1,
             avatar: 1
         }
     }
     ```
     Limits the output to only specific fields.

---

#### **Difference Between Nested and Outer Pipelines**
1. **Nested Pipeline (`pipeline` inside `$lookup`)**:
   - Scoped to the results of the parent `$lookup`.
   - Reduces unnecessary data processing as operations are limited to relevant documents.

2. **Outer Pipeline (`pipeline` applied after `$lookup`)**:
   - Applies transformations globally, outside the join context.
   - Useful for shared processing logic across multiple data sources.

---

#### **Critical Bug Resolved**
- **String vs ObjectId Issue**:  
  `req.user._id` was treated as a string, which caused `$match` to fail in certain cases. Converting it to an ObjectId using `new mongoose.Types.ObjectId()` resolved the issue.

- **Nested `$lookup` Scope**:  
  Without proper scoping in pipelines, irrelevant or excessive data could be fetched, leading to performance degradation.

---


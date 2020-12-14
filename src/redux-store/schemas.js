import { schema } from "normalizr";

export const projectSchema = new schema.Entity("projects", {});
export const userSchema = new schema.Entity("users", {});
export const defectSchema = new schema.Entity("defects", {});
export const commentSchema = new schema.Entity("comments", {});

projectSchema.define({
  defects: [defectSchema],
  users: [userSchema]
});

defectSchema.define({
  comments: [commentSchema]
});
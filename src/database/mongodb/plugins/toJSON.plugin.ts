import { Schema, Document, ToObjectOptions } from "mongoose";

function deleteAtPath(obj: Record<string, any>, path: string[], index: number): void {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  if (obj[path[index]]) {
    deleteAtPath(obj[path[index]], path, index + 1);
  }
}

export function toJSON<T extends Document>(schema: Schema<T>) {
  let transform: ((doc: any, ret: any, options: any) => any) | undefined;

  // Only store transform if it is a function, not boolean
  if (schema.options.toJSON && typeof schema.options.toJSON.transform === "function") {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc: any, ret: any, options: ToObjectOptions<T>) {
      Object.keys(schema.paths).forEach((path: string) => {
        const pathOptions = schema.paths[path].options as { private?: boolean };
        if (pathOptions && pathOptions.private) {
          deleteAtPath(ret, path.split("."), 0);
        }
      });

      if (ret._id) {
        ret.id = ret._id.toString();
      }
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;

      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
}

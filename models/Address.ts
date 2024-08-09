// import { Model } from "@nozbe/watermelondb";
// import { field } from "@nozbe/watermelondb/decorators";

// export default class Address extends Model {
//   static table = "addresses";

//   @field("type") type: string;
//   @field("name") name: string;
//   @field("address") address: string;
// }

// error use decorator with next cause error when setup babel config so i custom declare model
// models/Address.ts
import { Model, Q } from "@nozbe/watermelondb";

export default class Address extends Model {
  static table = "addresses";

  // type!: string;
  // name!: string;
  // address!: string;

  static associations = {};

  static fields = {
    type: "string",
    name: "string",
    address: "string",
  };

  get type() {
    return this.asModel._getRaw("type");
  }

  set type(value) {
    this.asModel._setRaw("type", value);
  }

  get name() {
    return this.asModel._getRaw("name");
  }

  set name(value) {
    this.asModel._setRaw("name", value);
  }

  get address() {
    return this.asModel._getRaw("address");
  }

  set address(value) {
    this.asModel._setRaw("address", value);
  }

  static query = Q;
}

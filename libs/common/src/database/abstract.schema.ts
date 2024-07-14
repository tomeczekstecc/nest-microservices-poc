import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
// @ts-ignore
@Prop({ type: SchemaTypes.ObjectId })
export class AbstractDocument {
  _id: Types.ObjectId;
}

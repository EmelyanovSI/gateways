import { Document, model, Schema } from 'mongoose';
import { Gateway } from '@interfaces/gateway.interface';
import { DeviceStatus } from '@constants';

const DeviceSchema: Schema = new Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
    sparse: true
  },
  vendor: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: Object.values(DeviceStatus),
    default: DeviceStatus.Offline
  }
});

const GatewaySchema: Schema = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        const pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return pattern.test(value);
      },
      message: 'Invalid IPv4 address'
    }
  },
  devices: {
    type: [DeviceSchema]
  }
});

export const GatewayModel = model<Gateway & Document>('Gateway', GatewaySchema);

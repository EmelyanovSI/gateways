import { Document, model, Schema } from 'mongoose';
import { PeripheralDevice } from '@interfaces/peripheralDevice.interface';
import { Gateway } from '@interfaces/gateway.interface';
import { Default, DeviceStatus } from '@constants';

const PeripheralDeviceSchema: Schema = new Schema({
  uid: {
    type: Number,
    required: true,
    unique: true
  },
  vendor: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
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
  ipv4Address: {
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
    type: [PeripheralDeviceSchema],
    validate: {
      validator: function (value: PeripheralDevice[]) {
        return value.length <= Default.MAX_DEVICES_COUNT;
      },
      message: `Exceeded the maximum number of peripheral devices (${Default.MAX_DEVICES_COUNT})`
    }
  }
});

export const GatewayModel = model<Gateway & Document>('Gateway', GatewaySchema);

import { Service } from 'typedi';
import { GatewayModel } from '@models/gateway.model';
import { Gateway } from '@interfaces/gateway.interface';
import { Device } from '@interfaces/device.interface';
import { Default } from '@constants';

@Service()
export class GatewayService {
  public async getAllGateways(): Promise<Gateway[]> {
    const gateways: Gateway[] = await GatewayModel.find();
    return gateways;
  }

  public async getGatewayBySerialNumber(gatewaySerialNumber: string): Promise<Gateway> {
    const gateway: Gateway = await GatewayModel.findOne({ serialNumber: gatewaySerialNumber });
    if (!gateway) throw new Error('Gateway not found');
    return gateway;
  }

  public async createGateway(gatewayData: Gateway): Promise<Gateway> {
    const gateway: Gateway = await GatewayModel.create(gatewayData);
    return gateway;
  }

  public async updateGateway(gatewaySerialNumber: string, gatewayData: Gateway): Promise<Gateway> {
    const gateway: Gateway = await GatewayModel.findOneAndUpdate({ serialNumber: gatewaySerialNumber }, gatewayData, { new: true });
    if (!gateway) throw new Error('Gateway not found');
    return gateway;
  }

  public async deleteGateway(gatewaySerialNumber: string): Promise<Gateway> {
    const gateway: Gateway = await GatewayModel.findOneAndDelete({ serialNumber: gatewaySerialNumber });
    if (!gateway) throw new Error('Gateway not found');
    return gateway;
  }

  public async addPeripheralDevice(gatewaySerialNumber: string, device: Device): Promise<Gateway> {
    const gateway = await GatewayModel.findOne({ serialNumber: gatewaySerialNumber });
    if (!gateway) throw new Error('Gateway not found');

    const existingDevice = gateway.devices.find((d) => d.uid === device.uid);
    if (existingDevice) {
      throw new Error(`Device with UID ${device.uid} already exists`);
    }

    if (gateway.devices.length >= Default.MAX_DEVICES_COUNT) {
      throw new Error(`Exceeded the maximum number of peripheral devices (${Default.MAX_DEVICES_COUNT})`);
    }

    gateway.devices.push(device);
    await gateway.save();
    return gateway;
  }

  public async removePeripheralDevice(gatewaySerialNumber: string, deviceUid: number): Promise<Gateway> {
    const gateway = await GatewayModel.findOne({ serialNumber: gatewaySerialNumber });
    if (!gateway) throw new Error('Gateway not found');

    const deviceIndex = gateway.devices.findIndex((device) => device.uid === deviceUid);
    if (deviceIndex === -1) throw new Error('Peripheral device not found');

    gateway.devices.splice(deviceIndex, 1);
    await gateway.save();
    return gateway;
  }
}

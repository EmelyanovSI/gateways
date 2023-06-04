import { Service } from 'typedi';
import { GatewayModel } from '@models/gateway.model';
import { Gateway } from '@interfaces/gateway.interface';
import { PeripheralDevice } from '@interfaces/peripheralDevice.interface';

@Service()
export class GatewayService {
  public async getAllGateways(): Promise<Gateway[]> {
    const gateways: Gateway[] = await GatewayModel.find();
    return gateways;
  }

  public async getGatewayById(gatewayId: string): Promise<Gateway> {
    const gateway: Gateway = await GatewayModel.findById(gatewayId);
    if (!gateway) throw new Error('Gateway not found');
    return gateway;
  }

  public async createGateway(gatewayData: Gateway): Promise<Gateway> {
    const gateway: Gateway = await GatewayModel.create(gatewayData);
    return gateway;
  }

  public async updateGateway(gatewayId: string, gatewayData: Gateway): Promise<Gateway> {
    const gateway: Gateway = await GatewayModel.findByIdAndUpdate(gatewayId, gatewayData, { new: true });
    if (!gateway) throw new Error('Gateway not found');
    return gateway;
  }

  public async deleteGateway(gatewayId: string): Promise<Gateway> {
    const gateway: Gateway = await GatewayModel.findByIdAndDelete(gatewayId);
    if (!gateway) throw new Error('Gateway not found');
    return gateway;
  }

  // public async addPeripheralDevice(gatewayId: string, device: PeripheralDevice): Promise<Gateway> {
  //   const gateway = await GatewayModel.findById(gatewayId);
  //   if (!gateway) throw new Error('Gateway not found');
  //   if (gateway.devices.length >= 10) throw new Error('Exceeded the maximum number of peripheral devices');
  //
  //   gateway.devices.push(device);
  //   await gateway.save();
  //   return gateway;
  // }

  public async addPeripheralDevice(gatewayId: string, device: PeripheralDevice): Promise<Gateway> {
    const gateway = await GatewayModel.findByIdAndUpdate(
      gatewayId,
      { $push: { devices: device } },
      { new: true, runValidators: true }
    );

    if (!gateway) throw new Error('Gateway not found');

    return gateway;
  }

  public async removePeripheralDevice(gatewayId: string, deviceId: number): Promise<Gateway> {
    const gateway = await GatewayModel.findById(gatewayId);
    if (!gateway) throw new Error('Gateway not found');

    const deviceIndex = gateway.devices.findIndex((device) => device.uid === deviceId);
    if (deviceIndex === -1) throw new Error('Peripheral device not found');

    gateway.devices.splice(deviceIndex, 1);
    await gateway.save();
    return gateway;
  }
}

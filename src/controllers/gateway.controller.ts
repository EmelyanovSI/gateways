import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Gateway } from '@interfaces/gateway.interface';
import { GatewayService } from '@services/gateway.service';
import { Device } from '@interfaces/device.interface';

export class GatewayController {
  public gateway = Container.get(GatewayService);

  public getAllGateways = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gateways: Gateway[] = await this.gateway.getAllGateways();
      res.status(200).json({ data: gateways });
    } catch (error) {
      next(error);
    }
  };

  public getGatewayBySerialNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewaySerialNumber: string = req.params.serialNumber;
      const gateway: Gateway = await this.gateway.getGatewayBySerialNumber(gatewaySerialNumber);
      res.status(200).json({ data: gateway });
    } catch (error) {
      next(error);
    }
  };

  public createGateway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewayData: Gateway = req.body;
      const gateway: Gateway = await this.gateway.createGateway(gatewayData);
      res.status(201).json({ data: gateway });
    } catch (error) {
      next(error);
    }
  };

  public updateGateway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewaySerialNumber: string = req.params.serialNumber;
      const gatewayData: Gateway = req.body;
      const updatedGateway: Gateway = await this.gateway.updateGateway(gatewaySerialNumber, gatewayData);
      res.status(200).json({ data: updatedGateway });
    } catch (error) {
      next(error);
    }
  };

  public deleteGateway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewaySerialNumber: string = req.params.serialNumber;
      const deletedGateway: Gateway = await this.gateway.deleteGateway(gatewaySerialNumber);
      res.status(200).json({ data: deletedGateway });
    } catch (error) {
      next(error);
    }
  };

  public addPeripheralDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewaySerialNumber: string = req.params.serialNumber;
      const device: Device = req.body;
      const updatedGateway: Gateway = await this.gateway.addPeripheralDevice(gatewaySerialNumber, device);
      res.status(200).json({ data: updatedGateway });
    } catch (error) {
      next(error);
    }
  };

  public removePeripheralDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewaySerialNumber: string = req.params.serialNumber;
      const deviceUid: number = +req.params.uid;
      const updatedGateway: Gateway = await this.gateway.removePeripheralDevice(gatewaySerialNumber, deviceUid);
      res.status(200).json({ data: updatedGateway });
    } catch (error) {
      next(error);
    }
  };
}

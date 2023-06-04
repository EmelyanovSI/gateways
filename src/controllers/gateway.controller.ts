import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Gateway } from '@interfaces/gateway.interface';
import { GatewayService } from '@services/gateway.service';
import { PeripheralDevice } from '@interfaces/peripheralDevice.interface';

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

  public getGatewayById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewayId: string = req.params.id;
      const gateway: Gateway = await this.gateway.getGatewayById(gatewayId);
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
      const gatewayId: string = req.params.id;
      const gatewayData: Gateway = req.body;
      const updatedGateway: Gateway = await this.gateway.updateGateway(gatewayId, gatewayData);
      res.status(200).json({ data: updatedGateway });
    } catch (error) {
      next(error);
    }
  };

  public deleteGateway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewayId: string = req.params.id;
      const deletedGateway: Gateway = await this.gateway.deleteGateway(gatewayId);
      res.status(200).json({ data: deletedGateway });
    } catch (error) {
      next(error);
    }
  };

  public addPeripheralDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewayId: string = req.params.id;
      const device: PeripheralDevice = req.body;
      const updatedGateway: Gateway = await this.gateway.addPeripheralDevice(gatewayId, device);
      res.status(200).json({ data: updatedGateway });
    } catch (error) {
      next(error);
    }
  };

  public removePeripheralDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gatewayId: string = req.params.id;
      const deviceId: number = +req.params.deviceId;
      const updatedGateway: Gateway = await this.gateway.removePeripheralDevice(gatewayId, deviceId);
      res.status(200).json({ data: updatedGateway });
    } catch (error) {
      next(error);
    }
  };
}

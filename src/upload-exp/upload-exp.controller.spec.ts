import { Test, TestingModule } from '@nestjs/testing';
import { UploadExpController } from './upload-exp.controller';

describe('UploadExpController', () => {
  let controller: UploadExpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadExpController],
    }).compile();

    controller = module.get<UploadExpController>(UploadExpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

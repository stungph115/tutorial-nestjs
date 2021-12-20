import { Test, TestingModule } from '@nestjs/testing';
import { UploadExpService } from './upload-exp.service';

describe('UploadExpService', () => {
  let service: UploadExpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadExpService],
    }).compile();

    service = module.get<UploadExpService>(UploadExpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

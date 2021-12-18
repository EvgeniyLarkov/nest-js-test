import { DenyPublicGuard } from './deny-public.guard';

describe('DenyPublicGuard', () => {
  it('should be defined', () => {
    expect(new DenyPublicGuard()).toBeDefined();
  });
});

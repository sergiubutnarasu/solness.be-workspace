import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from '@solness/custom-repository';
import { CashRegisterEntryRepository } from './repositories';
import { CashRegisterEntryService } from './services';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([CashRegisterEntryRepository]),
  ],
  providers: [CashRegisterEntryService],
  exports: [CashRegisterEntryService],
})
export class CashRegisterModule {}

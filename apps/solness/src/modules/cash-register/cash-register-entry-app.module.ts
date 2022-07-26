import { Module } from '@nestjs/common';
import { CashRegisterModule } from '@solness/cash-register';
import { CashRegisterEntryResolver } from './resolvers';

@Module({
  imports: [CashRegisterModule],
  providers: [CashRegisterEntryResolver],
})
export class CashRegisterAppModule {}

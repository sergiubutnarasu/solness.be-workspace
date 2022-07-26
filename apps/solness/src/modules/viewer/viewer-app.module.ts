import { Module } from '@nestjs/common';
import { ViewerModule } from '@solness/viewer';
import { ViewerResolver } from './resolvers';

@Module({ imports: [ViewerModule], providers: [ViewerResolver] })
export class ViewerAppModule {}

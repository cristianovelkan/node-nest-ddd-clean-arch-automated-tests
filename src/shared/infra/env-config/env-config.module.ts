import { DynamicModule, Module } from '@nestjs/common'
import { EnvConfigService } from './env-config.service'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { join } from 'node:path'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [EnvConfigService],
})
export class EnvConfigModule {
  static forRoot(options: ConfigModuleOptions): DynamicModule {
    return {
      module: EnvConfigModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: [
            join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
          ],
          ...options,
        }),
      ],
    }
  }
}

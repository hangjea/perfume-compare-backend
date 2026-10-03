import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Perfume } from './perfumes/entities/perfume.entity';
import { Note } from './notes/entities/note.entity';
import { PurchaseLink } from './purchase-links/entities/purchase-link.entity';
import { PerfumesModule } from './perfumes/perfumes.module';
import { NotesModule } from './notes/notes.module';
import { PurchaseLinksModule } from './purchase-links/purchase-links.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'perfume_db',
      entities: [Perfume, Note, PurchaseLink],
      synchronize: true,
      logging: true, // SQL 쿼리 로그 확인용
    }),
    PerfumesModule,
    NotesModule,
    PurchaseLinksModule,
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
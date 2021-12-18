import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1639340555113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "marker" RENAME COLUMN "name" TO "nonsensable"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "marker" RENAME COLUMN "nonsensable" TO "name"',
    );
  }
}

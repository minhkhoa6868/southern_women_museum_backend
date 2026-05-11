import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { Quiz, QuizQuestion, QuizChoice, UserAnswer } from './entities/quiz.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, QuizQuestion, QuizChoice, UserAnswer]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

// ─── Request DTOs ───────────────────────────────────────────

export class SubmitAnswerDto {
  @ApiProperty({ example: 'b5238bdc-f73c-4cdf-9721-94319cd82954' })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ example: 'uuid-of-question' })
  @IsUUID()
  @IsNotEmpty()
  question_id: string;

  @ApiProperty({ example: 'uuid-of-choice' })
  @IsUUID()
  @IsNotEmpty()
  choice_id: string;
}

// ─── Response DTOs ──────────────────────────────────────────

export class QuizInfoResponse {
  @ApiProperty() id: string;
  @ApiProperty() room_id: string;
  @ApiProperty() title: string;
  @ApiProperty() title_en: string;
  @ApiProperty() description: string;
  @ApiProperty() time_limit: number;
  @ApiProperty() passing_score: number;
  @ApiProperty() is_active: boolean;
  @ApiProperty() total_questions: number;
}

export class ChoiceResponse {
  @ApiProperty() id: string;
  @ApiProperty() question_id: string;
  @ApiProperty() name: string;
  @ApiProperty() name_en: string;
}

export class QuestionResponse {
  @ApiProperty() id: string;
  @ApiProperty() quiz_id: string;
  @ApiProperty() question_text: string;
  @ApiProperty() question_text_en: string;
  @ApiProperty({ type: [ChoiceResponse] }) choices: ChoiceResponse[];
}

export class QuestionsResponse {
  @ApiProperty({ type: [QuestionResponse] }) questions: QuestionResponse[];
}

export class AnswerResultResponse {
  @ApiProperty() is_correct: boolean;
  @ApiProperty({ nullable: true }) correct_choice_id: string | null;
}

export class QuizResultResponse {
  @ApiProperty() quiz_title: string;
  @ApiProperty() quiz_title_en: string;
  @ApiProperty() score: number;
  @ApiProperty() correct: number;
  @ApiProperty() answered: number;
  @ApiProperty() total: number;
  @ApiProperty() passing_score: number;
  @ApiProperty() passed: boolean;
  @ApiProperty() message: string;
}

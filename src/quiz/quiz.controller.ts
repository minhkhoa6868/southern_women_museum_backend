import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import {
  SubmitAnswerDto,
  QuizInfoResponse,
  QuestionsResponse,
  AnswerResultResponse,
  QuizResultResponse,
} from './dto/quiz.dto';

@ApiTags('quiz')
@Controller('api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // GET /api/quiz/room/:roomId
  @Get('room/:roomId')
  @ApiOperation({ summary: 'Lấy quiz đang active theo roomId' })
  @ApiParam({ name: 'roomId', type: String })
  @ApiResponse({ status: 200, type: QuizInfoResponse })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async getQuizByRoom(@Param('roomId') roomId: string) {
    return this.quizService.getQuizByRoom(roomId);
  }

  // GET /api/quiz/:quizId/questions
  @Get(':quizId/questions')
  @ApiOperation({ summary: 'Lấy toàn bộ câu hỏi + đáp án (không có is_correct)' })
  @ApiParam({ name: 'quizId', type: String })
  @ApiResponse({ status: 200, type: QuestionsResponse })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async getQuestions(@Param('quizId') quizId: string) {
    return this.quizService.getQuestions(quizId);
  }

  // POST /api/quiz/answer
  @Post('answer')
  @ApiOperation({ summary: 'Ghi nhận câu trả lời của user' })
  @ApiResponse({ status: 201, type: AnswerResultResponse })
  @ApiResponse({ status: 400, description: 'Invalid choice' })
  @ApiResponse({ status: 409, description: 'Already answered' })
  async submitAnswer(@Body() dto: SubmitAnswerDto) {
    return this.quizService.submitAnswer(dto);
  }

  // GET /api/quiz/:quizId/result?user_id=xxx
  @Get(':quizId/result')
  @ApiOperation({ summary: 'Lấy kết quả cuối sau khi hoàn thành quiz' })
  @ApiParam({ name: 'quizId', type: String })
  @ApiQuery({ name: 'user_id', type: String })
  @ApiResponse({ status: 200, type: QuizResultResponse })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async getResult(
    @Param('quizId') quizId: string,
    @Query('user_id') userId: string,
  ) {
    return this.quizService.getResult(quizId, userId);
  }
}

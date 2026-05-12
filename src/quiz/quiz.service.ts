import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Quiz, QuizQuestion, QuizChoice, UserAnswer } from './entities/quiz.entities';
import { SubmitAnswerDto } from './dto/quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,

    @InjectRepository(QuizQuestion)
    private readonly questionRepo: Repository<QuizQuestion>,

    @InjectRepository(QuizChoice)
    private readonly choiceRepo: Repository<QuizChoice>,

    @InjectRepository(UserAnswer)
    private readonly answerRepo: Repository<UserAnswer>,
  ) {}

  // ─── GET /api/quiz/room/:roomId ───────────────────────────
  async getQuizByRoom(roomId: string) {
    const quiz = await this.quizRepo.findOne({
      where: { roomId, isActive: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found for this room');
    }

    const totalQuestions = await this.questionRepo.count({
      where: { quizId: quiz.id },
    });

    return {
      id: quiz.id,
      room_id: quiz.roomId,
      title: quiz.title,
      title_en: quiz.titleEn ?? '',
      description: quiz.description ?? '',
      time_limit: quiz.timeLimit,
      passing_score: quiz.passingScore,
      is_active: quiz.isActive,
      total_questions: totalQuestions,
    };
  }

  // ─── GET /api/quiz/:quizId/questions ─────────────────────
  async getQuestions(quizId: string) {
    const quiz = await this.quizRepo.findOne({
      where: { id: quizId, isActive: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found or inactive');
    }

    const questions = await this.questionRepo.find({
      where: { quizId },
      order: { createdAt: 'ASC' },
    });

    if (!questions.length) {
      throw new NotFoundException('No questions found for this quiz');
    }

    const questionIds = questions.map((q) => q.id);

    const choices = await this.choiceRepo.find({
      where: { questionId: In(questionIds) },
      select: ['id', 'questionId', 'name', 'nameEn'],
      // is_correct KHÔNG được select — xử lý phía server
    });

    const result = questions.map((q) => ({
      id: q.id,
      quiz_id: q.quizId,
      question_text: q.questionText,
      question_text_en: q.questionTextEn ?? '',
      choices: choices
        .filter((c) => c.questionId === q.id)
        .map((c) => ({
          id: c.id,
          question_id: c.questionId,
          name: c.name,
          name_en: c.nameEn ?? '',
        })),
    }));

    return { questions: result };
  }

  // ─── POST /api/quiz/answer ────────────────────────────────
  async submitAnswer(dto: SubmitAnswerDto) {
    const { user_id, question_id, choice_id } = dto;

    // Kiểm tra duplicate
    const existing = await this.answerRepo.findOne({
      where: { userId: user_id, questionId: question_id },
    });
    if (existing) {
      throw new ConflictException('Already answered this question');
    }

    // Kiểm tra choice có thuộc question không
    const choice = await this.choiceRepo.findOne({
      where: { id: choice_id, questionId: question_id },
    });
    if (!choice) {
      throw new BadRequestException('Invalid choice for this question');
    }

    // Lấy correct choice để trả về cho client hiển thị feedback
    const correctChoice = await this.choiceRepo.findOne({
      where: { questionId: question_id, isCorrect: true },
      select: ['id'],
    });

    // Lưu UserAnswer — is_correct tính phía server
    await this.answerRepo.save({
      userId: user_id,
      questionId: question_id,
      isCorrect: choice.isCorrect,
    });

    return {
      is_correct: choice.isCorrect,
      correct_choice_id: correctChoice?.id ?? null,
    };
  }

  // ─── GET /api/quiz/:quizId/result ────────────────────────
  async getResult(quizId: string, userId: string) {
    const quiz = await this.quizRepo.findOne({
      where: { id: quizId },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const questions = await this.questionRepo.find({
      where: { quizId },
      select: ['id'],
    });
    if (!questions.length) {
      throw new NotFoundException('No questions found');
    }

    const questionIds = questions.map((q) => q.id);
    const total = questionIds.length;

    const answers = await this.answerRepo.find({
      where: { userId, questionId: In(questionIds) },
      select: ['id', 'isCorrect'],
    });

    const answered = answers.length;
    const correct = answers.filter((a) => a.isCorrect).length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = score >= quiz.passingScore;

    return {
      quiz_title: quiz.title,
      quiz_title_en: quiz.titleEn ?? '',
      score,
      correct,
      answered,
      total,
      passing_score: quiz.passingScore,
      passed,
      message: passed
        ? 'Bạn nhận được 1 món quà lưu niệm!'
        : `Chúc bạn may mắn lần sau. (${score}/${quiz.passingScore}%)`,
    };
  }
}

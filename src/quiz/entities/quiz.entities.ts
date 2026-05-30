import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

// ─── Quizzes ───────────────────────────────────────────────
// ID | room_id | title | description | time_limit | passing_score | is_active | created_at | updated_at | title_en

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'room_id' })
  roomId: string;

  @Column()
  title: string;

  @Column({ name: 'title_en', nullable: true })
  titleEn: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'time_limit' })
  timeLimit: number;

  @Column({ name: 'passing_score' })
  passingScore: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => QuizQuestion, (q) => q.quiz)
  questions: QuizQuestion[];
}

// ─── QuizQuestions ─────────────────────────────────────────
// ID | quiz_id | question_text | created_at | updated_at | question_text_en

@Entity('quiz_questions')
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_id' })
  quizId: string;

  @Column({ name: 'question_text' })
  questionText: string;

  @Column({ name: 'question_text_en', nullable: true })
  questionTextEn: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Quiz, (q) => q.questions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @OneToMany(() => QuizChoice, (c) => c.question)
  choices: QuizChoice[];
}

// ─── QuizChoices ───────────────────────────────────────────
// ID | question_id | name | is_correct | created_at | updated_at | name_en

@Entity('question_choices')
export class QuizChoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_id' })
  questionId: string;

  @Column({ name: 'choice_text' })
  name: string;

  @Column({ name: 'choice_text_en', nullable: true })
  nameEn: string;

  @Column({ name: 'is_correct', default: false })
  isCorrect: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => QuizQuestion, (q) => q.choices)
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestion;
}

// ─── UserAnswer ────────────────────────────────────────────
// ID | user_id | question_id | is_correct | created_at | updated_at

@Entity('user_answers')
export class UserAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'question_id' })
  questionId: string;

  @Column({ name: 'is_correct', default: false })
  isCorrect: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
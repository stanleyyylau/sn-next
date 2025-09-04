import { z } from 'zod';

// Todo 验证 schemas
export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  completed: z.boolean().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.string().datetime().optional().transform((val) => val ? new Date(val) : undefined),
});

export const todoParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Invalid todo ID').transform(Number),
});

// 查询参数验证
export const getTodosQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  completed: z.string().transform((val) => val === 'true').optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  search: z.string().optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoParams = z.infer<typeof todoParamsSchema>;
export type GetTodosQuery = z.infer<typeof getTodosQuerySchema>;

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

// 标准 API 响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// 成功响应
export function successResponse<T>(
  data: T,
  message?: string,
  meta?: ApiResponse['meta'],
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      message,
      meta,
    },
    { status }
  );
}

// 错误响应
export function errorResponse(
  error: string,
  status: number = 500,
  message?: string
): NextResponse<ApiResponse> {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error,
      message,
    },
    { status }
  );
}

// 验证错误响应
export function validationErrorResponse(
  error: ZodError,
  status: number = 400
): NextResponse<ApiResponse> {
  const errorMessages = error.issues.map(err => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: 'Validation failed',
      message: 'Please check your input data',
      data: errorMessages,
    },
    { status }
  );
}

// 处理 API 错误的包装函数
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  if (error instanceof Error) {
    return errorResponse(error.message, 500);
  }

  return errorResponse('Internal server error', 500);
}

// 分页计算
export function calculatePagination(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    total,
    totalPages,
    offset,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// 解析查询参数
export function parseQueryParams<T>(request: NextRequest, schema: { parse: (data: unknown) => T }): T {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  return schema.parse(params);
}

// 解析请求体
export async function parseRequestBody<T>(request: NextRequest, schema: { parse: (data: unknown) => T }): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}

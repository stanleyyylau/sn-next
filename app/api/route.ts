import { db } from '@/db'; // 假设你有一个 db 实例
import { eq, and, count } from 'drizzle-orm';
import {userTable} from "@/schema";

export async function GET(request: Request) {
    // 解析分页参数
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    // 查询用户
    try {
        // 查询用户数据
        const users = await db
            .select()
            .from(userTable)
            .limit(limit)
            .offset(offset);

        // 查询总数
        const [{ count: total }] = await db
            .select({ count: count() })
            .from(userTable);

        // 转换为响应格式（假设直接返回 users，如果需要转换可在此处理）
        return new Response(
            JSON.stringify({
                message: 'Users retrieved successfully',
                data: users,
                pagination: {
                    page,
                    limit,
                    total: Number(total),
                },
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (err: any) {
        return new Response(
            JSON.stringify({
                error: 'Failed to fetch users',
                details: err.message,
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

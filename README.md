# Todo List App

一个基于 Next.js + Neon + Drizzle ORM + Zod 验证的现代化 Todo List 应用。

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: Neon (PostgreSQL)
- **ORM**: Drizzle ORM
- **验证**: Zod
- **表单**: React Hook Form
- **包管理**: pnpm

## 功能特性

- ✅ 完整的 CRUD 操作 (创建、读取、更新、删除)
- ✅ 实时表单验证
- ✅ 优先级管理 (低、中、高)
- ✅ 截止日期设置
- ✅ 完成状态切换
- ✅ 过滤功能 (全部、待完成、已完成)
- ✅ 响应式设计
- ✅ 类型安全
- ✅ 错误处理

## 项目结构

```
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET, POST /api/todos
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE /api/todos/[id]
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # 主页面
├── lib/
│   ├── api-utils.ts              # API 工具函数
│   └── validations.ts            # Zod 验证 schemas
├── schema.ts                     # Drizzle 数据库 schema
├── db.ts                         # 数据库连接
└── drizzle.config.ts             # Drizzle 配置
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置数据库

1. 在 Neon 控制台创建数据库
2. 复制数据库连接字符串
3. 创建 `.env.local` 文件：

```bash
cp .env.example .env.local
```

4. 在 `.env.local` 中填入你的数据库连接字符串：

```env
DATABASE_URL="postgresql://username:password@hostname:port/database?sslmode=require"
```

### 3. 推送数据库 schema

```bash
pnpm drizzle-kit push
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## API 端点

### Todos

- `GET /api/todos` - 获取所有 todos (支持分页、过滤、搜索)
- `POST /api/todos` - 创建新 todo
- `GET /api/todos/[id]` - 获取单个 todo
- `PUT /api/todos/[id]` - 更新 todo
- `DELETE /api/todos/[id]` - 删除 todo

### 查询参数 (GET /api/todos)

- `page` - 页码 (默认: 1)
- `limit` - 每页数量 (默认: 10)
- `completed` - 过滤完成状态 (true/false)
- `priority` - 过滤优先级 (low/medium/high)
- `search` - 搜索标题

## 数据库 Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## 最佳实践

### 1. 类型安全
- 使用 TypeScript 进行类型检查
- Zod 进行运行时验证
- Drizzle 提供数据库类型推断

### 2. 错误处理
- 统一的 API 响应格式
- 详细的错误信息
- 客户端错误处理

### 3. 验证
- 服务端和客户端双重验证
- 详细的验证错误信息
- 类型安全的表单处理

### 4. 数据库操作
- 使用 Drizzle ORM 进行类型安全的数据库操作
- 事务支持
- 连接池管理

## 开发命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 数据库操作
pnpm drizzle-kit push    # 推送 schema 到数据库
pnpm drizzle-kit generate # 生成迁移文件
pnpm drizzle-kit migrate # 运行迁移
```

## 部署

### Vercel (推荐)

1. 连接 GitHub 仓库到 Vercel
2. 设置环境变量 `DATABASE_URL`
3. 部署

### 其他平台

1. 构建应用: `pnpm build`
2. 设置环境变量
3. 启动: `pnpm start`

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
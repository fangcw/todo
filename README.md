## 基于 TS + Vue3 + Koa + MongoDB 实现的 Todo 全栈应用


### 应用特点

- 前后端均用 TypeScript 编写
- 接口统一遵循 RESTful 风格
- 实现服务端的优雅错误处理

### 技术栈

- 语言
  - TypeScript（赋予 JS 强类型语言的特性）
- 前端
  - Quasar（快速构建Vue应用的框架）
  - Vue3（前端框架）
  - Axios（处理 HTTP 请求）
  - Vue-Router（处理页面路由）
  - Pinia（数据状态管理）
- 后端
  - Koa（基于 Node.js 平台的下一代 web 开发框架）
  - Mongoose（内置数据验证， 查询构建，业务逻辑钩子等，开箱即用）

### 本地运行

```bash
# clone
git clone git@github.com:fangcw/todo.git
```

```bash
cd /todo
pnpm install

# 启动后端服务，监听本地 5000 端口，请自行下载 MongoDB，并开启数据库服务
pnpm dev:server

# 启动 Vue 项目
pnpm dev:web
```
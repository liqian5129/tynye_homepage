# CLAUDE.md - tynye AI 项目配置

## 项目概述

tynye AI 是一款智能书签阅读设备的官方网站和用户仪表板应用。面向纸质书籍爱好者，提供笔记管理、AI 阅读分析等功能。

## 技术栈

- **框架**: React 19 + TypeScript 5.8
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 3 (CDN)
- **AI 服务**: Google Gemini API (gemini-3-flash-preview)
- **图标**: Lucide React
- **状态管理**: React Context API

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器 (端口 3000)
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

## 项目结构

```
tynye_homepage/
├── index.html              # HTML 入口，包含 Tailwind CDN 和 Import Maps
├── index.tsx               # React 应用入口
├── App.tsx                 # 主应用组件，管理路由
├── types.ts                # TypeScript 类型定义
├── vite.config.ts          # Vite 配置
│
├── components/             # UI 组件（营销页面）
│   ├── Navbar.tsx          # 导航栏
│   ├── Hero.tsx            # 首页英雄区
│   ├── Features.tsx        # 功能介绍
│   ├── UsageScenarios.tsx  # 使用场景
│   ├── HowItWorks.tsx      # 工作流程
│   ├── DataSecurity.tsx    # 数据安全
│   ├── Testimonials.tsx    # 用户评价
│   ├── Comparison.tsx      # 产品对比
│   ├── Pricing.tsx         # 定价信息
│   ├── DemoSection.tsx     # 演示区域
│   ├── Footer.tsx          # 页脚
│   └── Button.tsx          # 通用按钮组件
│
├── pages/                  # 页面组件
│   ├── LoginPage.tsx       # 登录/注册页
│   └── DashboardPage.tsx   # 用户仪表板（核心功能）
│
├── contexts/               # React Context 状态管理
│   ├── AuthContext.tsx     # 用户认证状态
│   ├── RouterContext.tsx   # SPA 路由管理
│   └── LanguageContext.tsx # 国际化 (中/英文)
│
└── services/               # 业务逻辑服务
    ├── geminiService.ts    # Gemini AI API 封装
    └── mockData.ts         # 模拟数据（笔记、见解）
```

## 核心功能模块

### 1. 路由系统
- 使用 `RouterContext` 实现 SPA 路由
- 路由: `home` | `login` | `dashboard`

### 2. 认证系统
- `AuthContext` 管理用户状态
- 支持邮箱/手机号登录
- 当前为模拟 API（800ms 延迟）

### 3. 国际化
- `LanguageContext` 提供 `t()` 翻译函数
- 支持语言: `en` (英文), `zh` (中文)
- 翻译键值存储在 LanguageContext.tsx

### 4. 仪表板功能
- 笔记类型: text | excerpt | audio | chat
- 视图模式: date | book | tag
- AI 见解生成（周报、深度分析）
- 用户资料配置向导（6步）

## 类型定义 (types.ts)

```typescript
// 核心类型
User          // 用户信息
Note          // 笔记（4种类型）
Insight       // AI 生成的见解
ChatMessage   // 聊天消息
LoadingState  // 加载状态枚举
```

## 开发规范

### 代码风格
- 使用 TypeScript 严格模式
- 组件使用函数式组件 + Hooks
- 样式使用 Tailwind CSS 工具类
- 文件命名: PascalCase (组件), camelCase (服务/工具)

### 组件规范
- 每个组件单独一个文件
- Props 类型定义在组件文件顶部
- 使用 Lucide 图标库

### 状态管理
- 全局状态使用 Context API
- 组件内状态使用 useState/useReducer
- 避免 prop drilling，优先使用 Context

## 环境变量

```bash
GEMINI_API_KEY=xxx  # Google Gemini API 密钥
```

## 品牌设计

### 主题色 (Tailwind 自定义)
- **Primary**: purple-600 (#9333ea)
- **Secondary**: purple-100, purple-50
- **Accent**: 渐变 purple-600 → blue-500

### 设计原则
- 响应式布局 (sm/md/lg 断点)
- 卡片式 UI 设计
- 圆角风格 (rounded-xl, rounded-2xl)

## 重构建议

### 待改进项
1. **路由**: 考虑使用 React Router 替代自定义 RouterContext
2. **状态管理**: 复杂场景可考虑 Zustand 或 Jotai
3. **国际化**: 翻译内容抽离到独立 JSON 文件
4. **API 层**: 创建统一的 API 客户端，替代模拟数据
5. **组件拆分**: DashboardPage.tsx 过大(44KB)，需要拆分
6. **测试**: 添加单元测试和 E2E 测试
7. **样式**: 考虑使用 Tailwind CSS 本地安装替代 CDN

### 目录结构优化建议
```
src/
├── components/
│   ├── common/         # 通用组件
│   ├── marketing/      # 营销页组件
│   └── dashboard/      # 仪表板组件
├── pages/
├── hooks/              # 自定义 Hooks
├── contexts/
├── services/
├── utils/              # 工具函数
├── types/              # 类型定义
├── locales/            # 国际化文件
│   ├── en.json
│   └── zh.json
└── styles/             # 全局样式
```

## 注意事项

- Tailwind CSS 通过 CDN 加载，生产环境建议本地安装
- 当前使用 ES Module Import Maps，部分浏览器兼容性需注意
- mockData.ts 包含测试数据，接入真实 API 时需替换
- DashboardPage.tsx 是功能最复杂的文件，修改时需谨慎

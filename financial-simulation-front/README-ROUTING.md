# Next.js 路由配置说明

## 路由配置位置

在Next.js中，路由是通过**文件系统自动配置**的，不需要手动配置文件。

### 📁 文件系统路由规则

```
app/
├── page.tsx                    # 首页路由: /
├── layout.tsx                  # 根布局
├── about/
│   └── page.tsx               # /about
├── market/
│   ├── page.tsx               # /market
│   ├── layout.tsx             # market布局
│   ├── overview/
│   │   └── page.tsx           # /market/overview
│   ├── watchlist/
│   │   └── page.tsx           # /market/watchlist
│   ├── sectors/
│   │   └── page.tsx           # /market/sectors
│   ├── screener/
│   │   └── page.tsx           # /market/screener
│   ├── top-movers/
│   │   └── page.tsx           # /market/top-movers
│   └── calendar/
│       └── page.tsx           # /market/calendar
```

### 🔧 路由配置规则

1. **文件夹 = 路由段**：每个文件夹代表URL中的一个段
2. **page.tsx = 页面组件**：定义该路由的页面内容
3. **layout.tsx = 布局组件**：定义该路由段的布局
4. **动态路由**：使用 `[param]` 文件夹名

### 📝 已创建的路由

✅ **已存在的路由**：
- `/` - 首页 (app/page.tsx)
- `/market` - Market页面 (app/market/page.tsx)

✅ **新创建的路由**：
- `/market/overview` - 市场概览
- `/market/watchlist` - 观察列表
- `/market/sectors` - 行业板块
- `/market/screener` - 股票筛选器
- `/market/top-movers` - 热门股票
- `/market/calendar` - 财经日历

### 🎯 路由特点

- **自动配置**：无需手动配置路由表
- **嵌套路由**：支持多级嵌套路由
- **布局继承**：子路由继承父路由的布局
- **动态路由**：支持参数化路由
- **类型安全**：TypeScript支持

### 🚀 使用方法

1. **访问路由**：
   - 直接访问URL：`http://localhost:3001/market/watchlist`
   - 通过导航链接：点击侧边栏菜单

2. **添加新路由**：
   - 创建文件夹：`app/new-route/`
   - 添加页面：`app/new-route/page.tsx`
   - 可选布局：`app/new-route/layout.tsx`

3. **修改路由**：
   - 重命名文件夹：修改URL路径
   - 修改page.tsx：修改页面内容

### ✅ 验证

现在所有侧边栏菜单都有对应的路由：
- 点击侧边栏菜单可以正常跳转
- 每个路由都有对应的页面组件
- URL路径与侧边栏链接完全匹配

路由配置完全基于文件系统，无需额外配置！

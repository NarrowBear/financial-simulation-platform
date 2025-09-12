# 导航栏选中状态修复说明

## 问题描述

之前导航栏中的链接都是硬编码的选中状态，导致点击Market后仍然显示Home为选中状态。

## 修复内容

### 1. 顶部导航栏 (`components/navbar.tsx`)

**添加的功能**：
- 导入 `usePathname` hook 获取当前路径
- 使用动态路径判断来设置选中状态
- 为所有导航链接添加动态样式

**修复逻辑**：
```typescript
const pathname = usePathname();

// Home 链接：精确匹配 "/"
pathname === "/" ? "选中样式" : "普通样式"

// Market 链接：匹配 "/market" 开头的路径
pathname.startsWith("/market") ? "选中样式" : "普通样式"
```

### 2. 侧边栏导航 (`components/sidebar.tsx`)

**添加的功能**：
- 导入 `usePathname` hook
- 动态计算菜单项的选中状态
- 支持子菜单的动态选中状态

**修复逻辑**：
```typescript
const pathname = usePathname();

// 主菜单项
isActive: pathname.startsWith("/market")

// 子菜单项
isActive: pathname === "/market"
```

## 修复效果

### ✅ 现在的行为

1. **访问首页** (`/`)：
   - 顶部导航栏：Home 选中（蓝色下划线）
   - 侧边栏：Dashboard 选中（深色背景）

2. **访问Market页面** (`/market`)：
   - 顶部导航栏：Market 选中（蓝色下划线）
   - 侧边栏：Market 选中（深色背景），Watchlist 子项选中（蓝色背景）

3. **访问其他页面**：
   - 根据当前路径动态显示正确的选中状态

### 🎯 技术实现

- **动态路径检测**：使用 Next.js 的 `usePathname` hook
- **精确匹配**：首页使用 `===` 精确匹配
- **前缀匹配**：其他页面使用 `startsWith` 匹配路径前缀
- **子菜单支持**：支持多级导航的选中状态

### 🚀 测试方法

1. **测试首页**：
   - 访问 `http://localhost:3001/`
   - 验证 Home 和 Dashboard 为选中状态

2. **测试Market页面**：
   - 访问 `http://localhost:3001/market`
   - 验证 Market 和 Watchlist 为选中状态

3. **测试导航切换**：
   - 在页面间切换
   - 验证选中状态正确更新

现在导航栏的选中状态完全根据当前路径动态更新了！

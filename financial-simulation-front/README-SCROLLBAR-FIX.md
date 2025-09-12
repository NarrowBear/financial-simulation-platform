# 双重滚动条修复说明

## 问题描述

页面出现了两条滚动条，这是因为存在多个滚动容器导致的。

## 问题原因

1. **根布局**：设置了 `h-screen` 但没有控制溢出
2. **Market页面**：也设置了 `h-screen`，创建了第二个滚动容器
3. **主内容区域**：设置了 `overflow-y-auto`，创建了第三个滚动容器

## 修复方案

### 1. 根布局优化 (`app/layout.tsx`)

**修改前**：
```tsx
<div className="relative flex flex-col h-screen">
  <Navbar />
  <main className="flex-grow">
    {children}
  </main>
</div>
```

**修改后**：
```tsx
<div className="relative flex flex-col h-screen overflow-hidden">
  <Navbar />
  <main className="flex-grow overflow-hidden">
    {children}
  </main>
</div>
```

### 2. Market页面优化 (`components/market-page.tsx`)

**修改前**：
```tsx
<div className="flex h-screen bg-gray-50">
  <div className="flex-1 p-6 overflow-y-auto">
```

**修改后**：
```tsx
<div className="flex h-full bg-gray-50">
  <div className="flex-1 p-6 overflow-y-auto">
```

## 修复效果

### ✅ 现在的滚动结构

```
┌─────────────────────────────────────┐
│ 根容器 (h-screen, overflow-hidden)   │
├─────────────────────────────────────┤
│ 顶部导航栏 (固定)                    │
├─────────────────────────────────────┤
│ 主容器 (flex-grow, overflow-hidden)  │
│ ┌─────────────────────────────────┐ │
│ │ Market页面 (h-full)             │ │
│ ├─────────┬───────────────────────┤ │
│ │ 侧边栏   │ 主内容区域 (overflow-y-auto) │
│ │（固定）  │ ┌─────────────────────┐ │ │
│ │         │ │ 页面内容             │ │ │
│ │         │ │ （可滚动）           │ │ │
│ │         │ └─────────────────────┘ │ │
│ └─────────┴───────────────────────┘ │
└─────────────────────────────────────┘
```

### 🎯 优化结果

1. **单一滚动条**：只有主内容区域可以滚动
2. **固定导航**：顶部导航栏和左侧边栏固定不动
3. **清晰层次**：滚动容器层次分明，避免冲突
4. **用户体验**：滚动行为更加自然和一致

### ✅ 验证

现在访问 `http://localhost:3001/market` 可以看到：
- 只有一条滚动条（在主内容区域）
- 顶部导航栏和左侧边栏固定不动
- 滚动行为流畅自然
- 没有双重滚动条问题

双重滚动条问题已成功修复！

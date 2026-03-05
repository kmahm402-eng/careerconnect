#!/bin/bash
# ============================================================
# CareerConnect - セットアップスクリプト
# ============================================================
# 使い方:
#   1. このファイルを careerconnect-app/ ディレクトリに入れる
#   2. chmod +x setup.sh && ./setup.sh を実行
# ============================================================

echo "🚀 CareerConnect セットアップ開始..."
echo ""

# Node.js チェック
if ! command -v node &> /dev/null; then
    echo "❌ Node.js がインストールされていません"
    echo "   https://nodejs.org/ からインストールしてください（v18以上推奨）"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js v18以上が必要です（現在: $(node -v)）"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# npm install
echo ""
echo "📦 パッケージをインストール中..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install に失敗しました"
    exit 1
fi
echo "✅ パッケージインストール完了"

# .env.local チェック
echo ""
if grep -q "YOUR_PROJECT_ID" .env.local 2>/dev/null; then
    echo "⚠️  .env.local を編集してください："
    echo "   NEXT_PUBLIC_SUPABASE_URL を設定"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY を設定"
    echo ""
    echo "   Supabase ダッシュボード → Settings → API から取得できます"
else
    echo "✅ .env.local 設定済み"
fi

echo ""
echo "============================================================"
echo "  セットアップ完了！"
echo ""
echo "  開発サーバー起動: npm run dev"
echo "  ブラウザで: http://localhost:3000"
echo ""
echo "  Supabase DB構築: sql/001_schema.sql を SQL Editor で実行"
echo "============================================================"

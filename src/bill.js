// クラスの定義
class Item {
    constructor(name, price, stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

const items = [
        new Item("りんご", 100, 10),
        new Item("バナナ", 80, 20),
        new Item("みかん", 50, 15),
        new Item("お肉", 500, 5),
        new Item("牛乳", 300, 25),
        new Item("魚", 400, 30)
    ];

const getItem = (items, itemName) => {
    // itemsにはitemNameが重複するItemが存在しない前提
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.name == itemName) {
            return item
        }
    }
    return null
}

const calcOrderPrice = (items, itemName, orderNum) => {
    if (orderNum <= 0) {
        // 注文数エラー
        return -1
    }
    const item = getItem(items, itemName)
    if (item == null) {
        // itemが存在しない場合エラーを返す
        return -1
    }
    if (item.stock < orderNum) {
        // 在庫数が注文数より少ない場合はエラー
        return -1
    }
    return item.price * orderNum
}

const order = () => {
    const itemName = document.getElementById("itemName").value;
    const orderNum = document.getElementById("orderNum").value;
    if (itemName == "" || orderNum == 0) {
        return "error"
    }
    const item = getItem(items, itemName)
    if (item == null) {
        return "error"
    }
    const price = calcOrderPrice(items, itemName, orderNum)
    if (price < 0) {
        return "error"
    }
    console.log(`合計金額：${price}円`)
    return price
}

// 支払い処理の関数
// price: 商品の価格, paidAmount: 支払金額
function payment(price, paidAmount) {
  // 1. 支払金額のチェック
  // 足りない場合はコンソールにメッセージを出力して終了
  if (paidAmount < price) {
    console.log(`代金${price}円に対して、支払金額が${price - paidAmount}円不足しています。`);
    return;
  } 

  // おつりの計算
  let change = paidAmount - price;
  console.log(`代金: ${price}円 | 支払金額: ${paidAmount}円`);
  console.log(`おつり: ${change}円`);
  console.log("-------------------------");

  if (change === 0) {
    console.log("おつりはありません。");
    return;
  }

  // 2. おつりで最少となる貨幣の枚数を計算
  // 日本の硬貨・紙幣の金種を大きい順に定義（※2000円札は実用性を考慮し除外）
  // denominationsは日本で使用されている貨幣のリスト
  const denominations = [10000, 5000, 1000, 500, 100, 50, 10, 5, 1];
  let totalCount = 0; // 貨幣の合計枚数

  console.log("【おつりの内訳】");
  
  // 各貨幣の枚数を計算
  for (const coin of denominations) {
    // その金種が何枚必要か計算（小数点切り捨て）
    const count = Math.floor(change / coin);
    
    if (count > 0) {
      // 単位を見やすくする（1000円以上は「札」、それ未満は「玉」）
      const unit = coin >= 1000 ? "札" : "玉";

      // お釣りの内訳表示
      console.log(`${coin}円${unit}: ${count}枚`);
      
      // 残りのおつり金額を更新（その金種で割った余り）
      change %= coin;
      totalCount += count;
    }
  }

  //貨幣の合計枚数を表示
  console.log("-------------------------");
  console.log(`お渡しする貨幣の最少合計枚数: ${totalCount}枚\n`);
}

/**
 * ポイント付与およびカード作成を行うアロー関数
 */
const processPointGrant = (totalAmount) => {
    console.log(`--- ポイント付与処理開始 (対象金額: ${totalAmount}円) ---`);

    // 1. ポイントカードの有無を確認
    const hasCard = confirm("ポイントカードをお持ちですか？");
    console.log(`質問: ポイントカードをお持ちですか？ -> 回答: ${hasCard ? "はい" : "いいえ"}`);

    if (hasCard) {
        // 2. 持っている場合
        const points = Math.floor(totalAmount * 0.01);
        console.log(`[ステータス] 既存会員確認済み`);
        console.log(`[結果] ${points}pt を付与しました。`);
    } else {
        // 3. 持っていない場合
        console.log(`[ステータス] 新規作成フロー開始`);
        
        // 3-1. 名前と電話番号を入力
        const name = prompt("お名前を入力してください：");
        console.log(`入力された名前: ${name || "（キャンセル）"}`);

        const phoneNumber = prompt("電話番号を入力してください：");
        console.log(`入力された電話番号: ${phoneNumber || "（キャンセル）"}`);

        if (name && phoneNumber) {
            const points = Math.floor(totalAmount * 0.01);
            console.log(`[登録完了] 氏名: ${name} 様 / TEL: ${phoneNumber}`);
            console.log(`[結果] 新規カードを発行し、${points}pt を付与しました。`);
        } else {
            console.warn(`[中断] 名前または電話番号が未入力のため、処理を中止しました。`);
        }
    }
    console.log(`--- 処理終了 ---`);
};

// メイン処理
const main = () => {
    // ArrayListの代わりに標準の配列を使用します
    const items = [
        new Item("りんご", 100, 10),
        new Item("バナナ", 80, 20),
        new Item("みかん", 50, 15),
        new Item("お肉", 500, 5),
        new Item("牛乳", 300, 25),
        new Item("魚", 400, 30)
    ];

    console.log("お会計システム作成");

    // 確認用：中身を表示
    console.table(items);
};

main();